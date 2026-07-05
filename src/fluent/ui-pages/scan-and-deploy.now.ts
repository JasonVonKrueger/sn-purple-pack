import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import page from '../../client/scan_and_deploy.html'

export const scanAndDeploy = UiPage({
    $id: Now.ID['scan-and-deploy-page'],
    endpoint: 'scan_and_deploy.do',
    description: 'Scan & Deploy - Instance Scan, Git Commit, and Deploy to Test',
    category: 'general',
    html: page,
    direct: true,
})
