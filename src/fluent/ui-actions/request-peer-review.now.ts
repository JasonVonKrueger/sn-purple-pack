import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['request-peer-review-ui-action'],
    table: 'sys_ui_action',
    data: {
        name: 'Request Peer Review',
        table: 'sys_update_set',
        action_name: 'request_peer_review',
        client: false,
        form_button: true,
        active: true,
        hint: 'Create a peer review request for this update set',
        order: 110,
        script: `var gr = new GlideRecord('u_peer_review');
gr.initialize();
// update_set_name is the display field and is required by the u_peer_review table schema
gr.setValue('update_set_name', current.getValue('name'));
gr.setValue('update_set_id', current.getUniqueValue());
gr.setValue('requester', gs.getUserID());
gr.setValue('status', 'pending');
gr.setValue('requested_on', new GlideDateTime());
var sysId = gr.insert();
if (sysId) {
    gs.addInfoMessage('Peer review request created successfully.');
} else {
    gs.addErrorMessage('Failed to create peer review request. Check that the u_peer_review table exists and all mandatory fields are populated.');
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
    },
})
