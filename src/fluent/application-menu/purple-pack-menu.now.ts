import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['purple_pack_app_menu'],
    table: 'sys_app_application',
    data: {
        title: 'Purple Pack',
        active: true,
        category: 'custom',
        roles: ['admin'],
    },
})

Record({
    $id: Now.ID['pp_control_board_module'],
    table: 'sys_app_module',
    data: {
        title: 'Control Board',
        application: Now.ID['purple_pack_app_menu'],
        link_type: 'DIRECT',
        name: 'x_1892699_purple_pack.control_board',
        query: '/purple_pack.do',
        order: 100,
        active: true,
        roles: ['admin'],
    },
})

Record({
    $id: Now.ID['pp_properties_module'],
    table: 'sys_app_module',
    data: {
        title: 'Properties',
        application: Now.ID['purple_pack_app_menu'],
        link_type: 'DIRECT',
        name: 'x_1892699_purple_pack.properties',
        query: '/sys_properties_list.do?sysparm_query=nameSTARTSWITHx_1892699&sysparm_view=',
        order: 200,
        active: true,
        roles: ['admin'],
    },
})
