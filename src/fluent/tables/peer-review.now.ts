import '@servicenow/sdk/global'
import { Table, StringColumn, ReferenceColumn, ChoiceColumn, DateTimeColumn } from '@servicenow/sdk/core'

export const u_peer_review = Table({
    name: 'u_peer_review',
    label: 'Peer Review',
    display: 'update_set_name',
    allow_web_service_access: true,
    accessible_from: 'public',
    actions: ['create', 'read', 'update', 'delete'],
    auto_number: {
        prefix: 'PR',
        number: 1000,
        number_of_digits: 5,
    },
    schema: {
        update_set_name: StringColumn({
            label: 'Update Set Name',
            maxLength: 200,
            mandatory: true,
        }),
        update_set_id: StringColumn({
            label: 'Update Set ID',
            maxLength: 32,
        }),
        requester: ReferenceColumn({
            label: 'Requester',
            referenceTable: 'sys_user',
            mandatory: true,
        }),
        reviewer: ReferenceColumn({
            label: 'Reviewer',
            referenceTable: 'sys_user',
            mandatory: true,
        }),
        status: ChoiceColumn({
            label: 'Status',
            dropdown: 'dropdown_without_none',
            default: 'pending',
            choices: {
                pending: { label: 'Pending', sequence: 0 },
                in_review: { label: 'In Review', sequence: 1 },
                approved: { label: 'Approved', sequence: 2 },
                changes_requested: { label: 'Changes Requested', sequence: 3 },
                rejected: { label: 'Rejected', sequence: 4 },
            },
        }),
        priority: ChoiceColumn({
            label: 'Priority',
            dropdown: 'dropdown_without_none',
            default: 'normal',
            choices: {
                low: { label: 'Low', sequence: 0 },
                normal: { label: 'Normal', sequence: 1 },
                high: { label: 'High', sequence: 2 },
                critical: { label: 'Critical', sequence: 3 },
            },
        }),
        notes: StringColumn({
            label: 'Notes',
            maxLength: 4000,
        }),
        review_comments: StringColumn({
            label: 'Review Comments',
            maxLength: 4000,
        }),
        requested_on: DateTimeColumn({
            label: 'Requested On',
        }),
        reviewed_on: DateTimeColumn({
            label: 'Reviewed On',
        }),
    },
})
