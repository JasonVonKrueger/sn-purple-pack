import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['scan-and-deploy-ui-action'],
    table: 'sys_ui_action',
    data: {
        name: 'Scan & Deploy',
        table: 'sys_update_set',
        action_name: 'scan_and_deploy',
        client: true,
        onclick: [
            "var gm = new GlideModal('scan_and_deploy');",
            "gm.setTitle('Scan & Deploy');",
            "gm.setWidth(720);",
            "gm.addParam('sysparm_record_id', g_form.getUniqueValue());",
            "gm.addParam('sysparm_record_name', g_form.getValue('name'));",
            "gm.render();",
        ].join('\n'),
        form_button: true,
        active: true,
        hint: 'Run instance scan, commit to Git, and deploy to test instance',
        order: 100,
    },
})
