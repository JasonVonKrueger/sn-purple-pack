import '@servicenow/sdk/global'
import { ScriptInclude } from '@servicenow/sdk/core'

ScriptInclude({
    $id: Now.ID['gitlab_committer'],
    name: 'GitLabCommitter',
    script: Now.include('../../server/script-includes/gitlab-committer.js'),
    description: 'Exports a ServiceNow update set as XML and commits it to a configured GitLab repository. Reads connection details from system properties prefixed with x_1892699_purple_pack.gitlab.*',
    accessibleFrom: 'public',
})
