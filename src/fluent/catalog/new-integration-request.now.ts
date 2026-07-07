import '@servicenow/sdk/global'
import { CatalogItem, SingleLineTextVariable, MultiLineTextVariable, CheckboxVariable, ReferenceVariable } from '@servicenow/sdk/core'

export const newIntegrationRequest = CatalogItem({
    $id: Now.ID['new_integration_request'],
    name: 'New Integration Request',
    shortDescription: 'Request a new system integration',
    variables: {
        integration_name: SingleLineTextVariable({
            question: 'Integration name',
            mandatory: true,
            order: 100,
        }),
        integration_owner: ReferenceVariable({
            question: 'Integration owner',
            mandatory: true,
            order: 200,
            referenceTable: 'sys_user',
        }),
        short_description: MultiLineTextVariable({
            question: 'Short description',
            mandatory: true,
            order: 300,
        }),
        calls_per_hour: SingleLineTextVariable({
            question: 'Calls per hour',
            mandatory: true,
            order: 400,
            validateRegex: '^[0-9]+$',
        }),
        acknowledge: CheckboxVariable({
            question: 'Acknowledge',
            selectionRequired: true,
            order: 500,
        }),
    },
    version: 2,
})
