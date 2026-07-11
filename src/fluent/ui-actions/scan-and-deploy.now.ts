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
        form_button: true,
        active: true,
        hint: 'Run instance scan, commit to Git, and deploy to test instance',
        order: 100,
        script: `function showScanAndDeployModal() {
    var dialog = new GlideModal('scan_and_deploy', true, 600);
    dialog.setTitle('Scan & Deploy');
    dialog.setPreference('sysparm_update_set', g_form.getUniqueValue());
    dialog.render();
}`,
        form_action: true,
        form_button_v2: false,
        form_context_menu: false,
        form_link: false,
        form_menu_button_v2: false,
        format_for_configurable_workspace: false,
        isolate_script: false,
        list_action: false,
        list_banner_button: false,
        list_button: false,
        list_choice: false,
        list_context_menu: false,
        list_link: false,
        list_save_with_form_button: false,
        show_form_icon_only: 'false',
        show_insert: false,
        show_list_icon_only: 'false',
        show_multiple_update: false,
        show_query: false,
        show_update: true,
        sys_domain: 'global',
        sys_domain_path: '/',
        ui11_compatible: false,
        ui16_compatible: false,
        client_script_v2: `function onClick(g_form) {
    const modal = new GlideModal('scan_and_deploy');
    modal.setTitle('Scan & Deploy');
    modal.setWidth(900);
    modal.render();
}`,
        onclick: 'showScanAndDeployModal()',
    },
})
