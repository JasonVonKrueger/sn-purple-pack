import '@servicenow/sdk/global'
import { Record } from '@servicenow/sdk/core'

Record({
    $id: Now.ID['validate_update_set_name'],
    table: 'sys_script',
    data: {
        name: 'Validate Update Set Name',
        collection: 'sys_update_set',
        when: 'before',
        action_insert: true,
        action_update: true,
        action_delete: false,
        action_query: false,
        active: true,
        add_message: false,
        advanced: true,
        description: 'Enforces the Cohesion update set naming convention: x_<scope>_<app>_(feat|fix|chore|refactor|hotfix)_<TICKET-123>_<description>_YYYYMMDD',
        order: 100,
        script: Now.include('../../server/business-rules/validate-update-set-name.js'),
    },
})
