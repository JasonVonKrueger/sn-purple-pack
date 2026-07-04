import { Subflow, wfa, action } from '@servicenow/sdk/automation'
import { StringColumn, BooleanColumn } from '@servicenow/sdk/core'

export const ppCreateIntegrationSubflow = Subflow(
    {
        $id: Now.ID['pp_create_integration_subflow'],
        name: 'PP: Create Integration',
        description: 'Creates a service account and an OAuth application registry record for a new integration.',
        runAs: 'system',
        flowPriority: 'MEDIUM',
        inputs: {
            username: StringColumn({ label: 'Username', mandatory: true }),
            first_name: StringColumn({ label: 'First Name', mandatory: true }),
            last_name: StringColumn({ label: 'Last Name', mandatory: true }),
            email: StringColumn({ label: 'Email', mandatory: true }),
            oauth_app_name: StringColumn({ label: 'OAuth App Name', mandatory: true }),
            redirect_url: StringColumn({ label: 'Redirect URL', mandatory: true }),
        },
        outputs: {
            success: BooleanColumn({ label: 'Success', mandatory: true }),
            service_account_id: StringColumn({ label: 'Service Account Sys ID' }),
            oauth_app_id: StringColumn({ label: 'OAuth App Sys ID' }),
        },
        internalName: 'pp_create_integration',
        masterSnapshot: '311ad67e47398310b1197bb4416d43f9',
    },
    (params) => {
        // Step 1: Create the service account (sys_user with web_service_access_only)
        const serviceAccount = wfa.action(
            action.core.createRecord,
            { $id: Now.ID['create_service_account'], annotation: 'Create service account' },
            {
                table_name: 'sys_user',
                values: TemplateValue({
                    user_name: wfa.dataPill(params.inputs.username, 'string'),
                    first_name: wfa.dataPill(params.inputs.first_name, 'string'),
                    last_name: wfa.dataPill(params.inputs.last_name, 'string'),
                    email: wfa.dataPill(params.inputs.email, 'string'),
                    web_service_access_only: 'true',
                    active: 'true',
                }),
            }
        )

        // Step 2: Create the OAuth application registry
        const oauthApp = wfa.action(
            action.core.createRecord,
            { $id: Now.ID['create_oauth_app'], annotation: 'Create OAuth application registry' },
            {
                table_name: 'oauth_entity',
                values: TemplateValue({
                    name: wfa.dataPill(params.inputs.oauth_app_name, 'string'),
                    redirect_url: wfa.dataPill(params.inputs.redirect_url, 'string'),
                    type: 'client',
                    active: 'true',
                }),
            }
        )

        // Step 3: Log the result
        wfa.action(
            action.core.log,
            {
                $id: Now.ID['log_integration_created'],
            },
            {
                log_level: 'info',
                log_message: `Integration created - Service Account: ${wfa.dataPill(serviceAccount.record, 'reference')}, OAuth App: ${wfa.dataPill(oauthApp.record, 'reference')}`,
            }
        )

        // Step 4: Assign outputs
        wfa.flowLogic.assignSubflowOutputs(
            { $id: Now.ID['assign_integration_outputs'], annotation: 'Set subflow outputs' },
            params.outputs,
            {
                success: true,
                service_account_id: wfa.dataPill(serviceAccount.record, 'reference'),
                oauth_app_id: wfa.dataPill(oauthApp.record, 'reference'),
            }
        )
    }
)
