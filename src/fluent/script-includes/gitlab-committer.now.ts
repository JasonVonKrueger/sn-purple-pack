import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['gitlab_committer'],
    table: 'sys_script_include',
    data: {
        name: 'GitLabCommitter',
        api_name: 'x_1892699_purple_pack.GitLabCommitter',
        description:
            'Exports a ServiceNow update set as XML and commits it to a configured GitLab repository. ' +
            'Reads connection details from system properties prefixed with x_1892699_purple_pack.gitlab.*',
        active: true,
        access: 'public',
        script: `
var GitLabCommitter = Class.create();
GitLabCommitter.prototype = {

    /**
     * Initialises the committer by reading GitLab connection details from
     * system properties.  All properties live under the application prefix
     * so they can be managed through the standard System Properties UI.
     *
     * Required properties
     *   x_1892699_purple_pack.gitlab.url         – GitLab base URL (e.g. https://gitlab.example.com)
     *   x_1892699_purple_pack.gitlab.token        – Personal / project access token
     *   x_1892699_purple_pack.gitlab.project_id   – Numeric project ID or URL-encoded namespace/project path
     *
     * Optional properties
     *   x_1892699_purple_pack.gitlab.branch       – Target branch (default: main)
     *   x_1892699_purple_pack.gitlab.directory    – Directory inside the repo where XML files are written (default: update-sets)
     */
    initialize: function () {
        this.gitlabUrl       = gs.getProperty('x_1892699_purple_pack.gitlab.url', '').replace(/\\/$/, '');
        this.gitlabToken     = gs.getProperty('x_1892699_purple_pack.gitlab.token', '');
        this.gitlabProjectId = gs.getProperty('x_1892699_purple_pack.gitlab.project_id', '');
        this.gitlabBranch    = gs.getProperty('x_1892699_purple_pack.gitlab.branch', 'main');
        this.directory       = gs.getProperty('x_1892699_purple_pack.gitlab.directory', 'update-sets');
    },

    /**
     * Exports the given update set as XML and commits the file to GitLab.
     *
     * @param  {string} updateSetSysId  sys_id of the sys_update_set record to commit.
     * @return {object} Result object: { success: boolean, message: string, commitUrl: string }
     */
    commitUpdateSet: function (updateSetSysId) {
        try {
            this._validateConfig();
        } catch (configErr) {
            return { success: false, message: configErr.message, commitUrl: '' };
        }

        // ------------------------------------------------------------------
        // 1. Fetch update set metadata
        // ------------------------------------------------------------------
        var updateSetGr = new GlideRecord('sys_update_set');
        if (!updateSetGr.get(updateSetSysId)) {
            return { success: false, message: 'Update set not found: ' + updateSetSysId, commitUrl: '' };
        }

        var updateSetName = updateSetGr.getValue('name') || updateSetSysId;

        // ------------------------------------------------------------------
        // 2. Build the XML document from sys_update_xml records
        // ------------------------------------------------------------------
        var xmlContent;
        try {
            xmlContent = this._exportUpdateSetXml(updateSetSysId, updateSetName);
        } catch (exportErr) {
            return { success: false, message: 'XML export failed: ' + exportErr.message, commitUrl: '' };
        }

        if (!xmlContent) {
            return { success: false, message: 'No update records found in update set: ' + updateSetName, commitUrl: '' };
        }

        // ------------------------------------------------------------------
        // 3. Derive a deterministic file name and commit message
        // ------------------------------------------------------------------
        var safeName = updateSetName.replace(/[^a-zA-Z0-9_\\-]/g, '_').replace(/_+/g, '_').toLowerCase();
        var fileName = this.directory + '/' + safeName + '.xml';
        var commitMessage = 'chore: export update set \\"' + updateSetName + '\\"';

        // ------------------------------------------------------------------
        // 4. Commit to GitLab
        // ------------------------------------------------------------------
        try {
            return this._commitToGitLab(fileName, xmlContent, commitMessage);
        } catch (commitErr) {
            return { success: false, message: 'GitLab commit failed: ' + commitErr.message, commitUrl: '' };
        }
    },

    // -----------------------------------------------------------------------
    // Private helpers
    // -----------------------------------------------------------------------

    /**
     * Validates that all required system properties are set.
     * Throws an Error if any required property is missing.
     */
    _validateConfig: function () {
        var missing = [];
        if (!this.gitlabUrl)       missing.push('x_1892699_purple_pack.gitlab.url');
        if (!this.gitlabToken)     missing.push('x_1892699_purple_pack.gitlab.token');
        if (!this.gitlabProjectId) missing.push('x_1892699_purple_pack.gitlab.project_id');
        if (missing.length > 0) {
            throw new Error('Missing required GitLab system properties: ' + missing.join(', '));
        }
    },

    /**
     * Queries sys_update_xml for all records belonging to the given update set
     * and serialises them into a standard ServiceNow update-set XML envelope.
     *
     * @param  {string} updateSetSysId  sys_id of the update set.
     * @param  {string} updateSetName   Human-readable name used in the XML header comment.
     * @return {string} Complete XML document as a string.
     */
    _exportUpdateSetXml: function (updateSetSysId, updateSetName) {
        var xmlDoc = new XMLDocument2();
        xmlDoc.setVersion('1.0');

        var root = xmlDoc.createElement('unload');
        root.setAttribute('unload_date', new GlideDateTime().getDisplayValue());
        xmlDoc.setRoot(root);

        // Add a header comment so the file is self-describing
        root.appendChild(
            xmlDoc.createComment(
                ' ServiceNow update set export' +
                ' | name: ' + updateSetName +
                ' | sys_id: ' + updateSetSysId +
                ' | exported: ' + new GlideDateTime().getDisplayValueInternal() +
                ' | instance: ' + gs.getProperty('instance_name', 'unknown') +
                ' '
            )
        );

        var count = 0;
        var updateXmlGr = new GlideRecord('sys_update_xml');
        updateXmlGr.addQuery('update_set', updateSetSysId);
        updateXmlGr.orderBy('name');
        updateXmlGr.query();

        while (updateXmlGr.next()) {
            // payload contains the raw XML fragment for this update record
            var payload = updateXmlGr.getValue('payload');
            if (!payload) {
                continue;
            }

            try {
                var payloadDoc = new XMLDocument2();
                payloadDoc.parseXML(payload);
                var payloadRoot = payloadDoc.getFirstElement();
                if (payloadRoot) {
                    // Import the payload element into our document
                    root.appendChild(root.getOwnerDocument().importNode(payloadRoot.getNode(), true));
                }
            } catch (parseErr) {
                // Fall back to embedding the raw payload inside a <record_update> wrapper
                var fallbackEl = xmlDoc.createElement('record_update');
                fallbackEl.setAttribute('table', updateXmlGr.getValue('name'));
                fallbackEl.setAttribute('sys_id', updateXmlGr.getValue('sys_id'));
                fallbackEl.setCDATASection(payload);
                root.appendChild(fallbackEl);
            }

            count++;
        }

        if (count === 0) {
            return null;
        }

        return '<?xml version="1.0" encoding="UTF-8"?>\\n' + xmlDoc.toString();
    },

    /**
     * Creates or updates a file in the GitLab repository via the GitLab
     * Repository Files API.  Uses RESTMessageV2 so the call honours any
     * outbound proxy configured on the instance.
     *
     * @param  {string} filePath      Path inside the repository (e.g. update-sets/my_set.xml).
     * @param  {string} content       File content to write.
     * @param  {string} commitMessage Git commit message.
     * @return {object} { success: boolean, message: string, commitUrl: string }
     */
    _commitToGitLab: function (filePath, content, commitMessage) {
        var encodedProjectId = encodeURIComponent(this.gitlabProjectId);
        var encodedFilePath  = encodeURIComponent(filePath);
        var filesApiUrl      = this.gitlabUrl + '/api/v4/projects/' + encodedProjectId +
                               '/repository/files/' + encodedFilePath;

        // Encode content as Base64 (GitLab Files API requires this)
        var encodedContent = GlideStringUtil.base64Encode(content);

        var body = {
            branch: this.gitlabBranch,
            content: encodedContent,
            encoding: 'base64',
            commit_message: commitMessage
        };

        // Try a PUT (update existing file) first; fall back to POST (create new file)
        // if the file does not yet exist (GitLab returns 400 for PUT on non-existent files).
        var method = 'PUT';
        var rm = new sn_ws.RESTMessageV2();
        rm.setEndpoint(filesApiUrl);
        rm.setHttpMethod(method);
        rm.setRequestHeader('PRIVATE-TOKEN', this.gitlabToken);
        rm.setRequestHeader('Content-Type', 'application/json');
        rm.setRequestBody(JSON.stringify(body));

        var response = rm.execute();
        var statusCode = response.getStatusCode();

        // GitLab returns 400 "A file with this name doesn't exist" when the file is new
        if (statusCode === 400 || statusCode === 404) {
            method = 'POST';
            rm.setHttpMethod(method);
            response = rm.execute();
            statusCode = response.getStatusCode();
        }

        var responseBody = response.getBody();

        if (statusCode === 200 || statusCode === 201) {
            var parsed = {};
            try { parsed = JSON.parse(responseBody); } catch (e) { gs.debug('GitLabCommitter: failed to parse success response body: ' + e.message); }
            var commitUrl = this.gitlabUrl + '/' + this.gitlabProjectId +
                            '/-/commit/' + (parsed.commit_id || '');
            return {
                success: true,
                message: 'Committed ' + filePath + ' to ' + this.gitlabBranch,
                commitUrl: commitUrl
            };
        }

        // Attempt to surface a meaningful error from the GitLab response body
        var errorDetail = responseBody;
        try {
            var errObj = JSON.parse(responseBody);
            if (errObj.message) errorDetail = errObj.message;
        } catch (e) { gs.debug('GitLabCommitter: failed to parse error response body: ' + e.message); }

        throw new Error('HTTP ' + statusCode + ' from GitLab: ' + errorDetail);
    },

    type: 'GitLabCommitter'
};
`.trim(),
    },
})
