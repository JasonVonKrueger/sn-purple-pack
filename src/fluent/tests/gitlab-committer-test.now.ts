import '@servicenow/sdk/global'
import { Test } from '@servicenow/sdk/core'

Test(
    {
        $id: Now.ID['gitlab_committer_atf_test'],
        name: 'GitLabCommitter: Unit Tests',
        description: 'Server-side Jasmine tests for the GitLabCommitter script include. Covers configuration validation, update set lookup, empty update sets, and file name sanitisation.',
        active: true,
        failOnServerError: false,
    },
    (atf) => {
        // ------------------------------------------------------------------
        // Step 1 – Configuration validation
        // Verifies that commitUpdateSet returns the correct error shape when
        // one or more required system-property overrides are empty.
        // ------------------------------------------------------------------
        atf.server.runServerSideScript({
            $id: Now.ID['gitlab_committer_test_step_config'],
            jasmineVersion: '3.1',
            script: `
describe('GitLabCommitter - configuration validation', function() {
    function makeCommitter(url, token, projectId) {
        var c = new GitLabCommitter();
        c.gitlabUrl      = url;
        c.gitlabToken    = token;
        c.gitlabProjectId = projectId;
        return c;
    }

    it('returns failure when the GitLab URL is missing', function() {
        var result = makeCommitter('', 'tok', '42')
            .commitUpdateSet('00000000000000000000000000000001');
        expect(result.success).toBe(false);
        expect(result.message).toContain('x_1892699_purple_pack.gitlab.url');
        expect(result.commitUrl).toBe('');
    });

    it('returns failure when the GitLab token is missing', function() {
        var result = makeCommitter('https://gitlab.example.com', '', '42')
            .commitUpdateSet('00000000000000000000000000000001');
        expect(result.success).toBe(false);
        expect(result.message).toContain('x_1892699_purple_pack.gitlab.token');
        expect(result.commitUrl).toBe('');
    });

    it('returns failure when the project ID is missing', function() {
        var result = makeCommitter('https://gitlab.example.com', 'tok', '')
            .commitUpdateSet('00000000000000000000000000000001');
        expect(result.success).toBe(false);
        expect(result.message).toContain('x_1892699_purple_pack.gitlab.project_id');
        expect(result.commitUrl).toBe('');
    });

    it('lists every missing property in the error message', function() {
        var result = makeCommitter('', '', '')
            .commitUpdateSet('00000000000000000000000000000001');
        expect(result.success).toBe(false);
        expect(result.message).toContain('x_1892699_purple_pack.gitlab.url');
        expect(result.message).toContain('x_1892699_purple_pack.gitlab.token');
        expect(result.message).toContain('x_1892699_purple_pack.gitlab.project_id');
    });
});
jasmine.getEnv().execute();
`,
        })

        // ------------------------------------------------------------------
        // Step 2 – Update set lookup
        // Verifies that commitUpdateSet returns the correct error shape when
        // the provided sys_id does not match any sys_update_set record.
        // ------------------------------------------------------------------
        atf.server.runServerSideScript({
            $id: Now.ID['gitlab_committer_test_step_lookup'],
            jasmineVersion: '3.1',
            script: `
describe('GitLabCommitter - update set lookup', function() {
    function configuredCommitter() {
        var c = new GitLabCommitter();
        c.gitlabUrl       = 'https://gitlab.example.com';
        c.gitlabToken     = 'test-token';
        c.gitlabProjectId = '99999';
        return c;
    }

    it('returns failure when the update set sys_id does not exist', function() {
        var result = configuredCommitter()
            .commitUpdateSet('00000000000000000000000000000001');
        expect(result.success).toBe(false);
        expect(result.message).toContain('Update set not found');
        expect(result.message).toContain('00000000000000000000000000000001');
        expect(result.commitUrl).toBe('');
    });
});
jasmine.getEnv().execute();
`,
        })

        // ------------------------------------------------------------------
        // Step 3 – Empty update set
        // Creates a temporary sys_update_set with no associated
        // sys_update_xml records, confirms the expected error, then deletes
        // the temporary record via afterEach.
        // ------------------------------------------------------------------
        atf.server.runServerSideScript({
            $id: Now.ID['gitlab_committer_test_step_empty_set'],
            jasmineVersion: '3.1',
            script: `
describe('GitLabCommitter - empty update set', function() {
    var testUpdateSetId;

    beforeEach(function() {
        var gr = new GlideRecord('sys_update_set');
        gr.setValue('name', 'ATF_GitLabCommitter_Temp_' + gs.generateGUID());
        gr.setValue('state', 'in progress');
        testUpdateSetId = gr.insert();
    });

    afterEach(function() {
        if (testUpdateSetId) {
            var gr = new GlideRecord('sys_update_set');
            if (gr.get(testUpdateSetId)) {
                gr.deleteRecord();
            }
        }
    });

    it('returns failure when the update set contains no sys_update_xml records', function() {
        var c = new GitLabCommitter();
        c.gitlabUrl       = 'https://gitlab.example.com';
        c.gitlabToken     = 'test-token';
        c.gitlabProjectId = '99999';
        var result = c.commitUpdateSet(testUpdateSetId);
        expect(result.success).toBe(false);
        expect(result.message).toContain('No update records found in update set');
        expect(result.commitUrl).toBe('');
    });
});
jasmine.getEnv().execute();
`,
        })

        // ------------------------------------------------------------------
        // Step 4 – File name sanitisation
        // Replicates the safeName regex from commitUpdateSet and asserts the
        // expected output for a variety of update set name inputs.
        // ------------------------------------------------------------------
        atf.server.runServerSideScript({
            $id: Now.ID['gitlab_committer_test_step_filename'],
            jasmineVersion: '3.1',
            script: `
describe('GitLabCommitter - file name sanitisation', function() {
    // Replicates the safeName + path logic from commitUpdateSet
    function toFilePath(directory, updateSetName) {
        var safeName = updateSetName
            .replace(/[^a-zA-Z0-9_-]/g, '_')
            .replace(/_+/g, '_')
            .toLowerCase();
        return directory + '/' + safeName + '.xml';
    }

    it('lowercases and replaces spaces with underscores', function() {
        expect(toFilePath('update-sets', 'My Update Set'))
            .toBe('update-sets/my_update_set.xml');
    });

    it('collapses consecutive special characters into a single underscore', function() {
        expect(toFilePath('update-sets', 'Fix: Bug #42 (hotfix)'))
            .toBe('update-sets/fix_bug_42_hotfix_.xml');
    });

    it('preserves hyphens in the update set name', function() {
        expect(toFilePath('update-sets', 'release-1.0.0'))
            .toBe('update-sets/release-1_0_0.xml');
    });

    it('uses the configured directory as a path prefix', function() {
        expect(toFilePath('exports/v2', 'Sprint 10'))
            .toBe('exports/v2/sprint_10.xml');
    });
});
jasmine.getEnv().execute();
`,
        })
    }
)
