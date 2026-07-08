import { Flow, wfa, trigger, action } from '@servicenow/sdk/automation'
import { ppCreateIntegrationSubflow } from './pp-create-integration-subflow.now'

Flow(
    {
        $id: Now.ID['purple_pack_flow'],
        name: 'Purple Pack',
        description:
            'Main Purple Pack orchestration flow. Triggers when a service account is created and provisions the full integration (OAuth app).',
        runAs: 'system',
        flowPriority: 'MEDIUM',
    },
    wfa.trigger(
        trigger.record.created,
        { $id: Now.ID['trg_service_account_created'] },
        {
            table: 'sys_user',
            condition: 'web_service_access_only=true',
            run_flow_in: 'background',
            run_on_extended: 'false',
            run_when_user_list: [],
            run_when_setting: 'both',
            run_when_user_setting: 'any',
        }
    ),
    (_params) => {
        // Call the PP: Create Integration subflow to provision the OAuth app
        const result = wfa.subflow(
            ppCreateIntegrationSubflow,
            {
                $id: Now.ID['call_create_integration'],
                annotation: 'Create integration for new service account',
            },
            {
                username: wfa.dataPill(_params.trigger.current.user_name, 'string'),
                first_name: wfa.dataPill(_params.trigger.current.first_name, 'string'),
                last_name: wfa.dataPill(_params.trigger.current.last_name, 'string'),
                oauth_app_name: wfa.dataPill(_params.trigger.current.user_name, 'string'),
                email: wfa.dataPill(_params.trigger.current.email, 'string'),
                redirect_url: 'https://localhost/callback',
            }
        )

        // Log the outcome
        wfa.flowLogic.if(
            {
                $id: Now.ID['check_integration_success'],
                condition: `${wfa.dataPill(result.success, 'boolean')}=true`,
                annotation: '',
            },
            () => {
                wfa.action(
                    action.core.log,
                    {
                        $id: Now.ID['log_success'],
                    },
                    {
                        log_level: 'info',
                        log_message: `Purple Pack: Integration provisioned successfully for ${wfa.dataPill(_params.trigger.current.user_name, 'string')}`,
                    }
                )
            }
        )

        wfa.flowLogic.else({ $id: Now.ID['integration_failed'], annotation: '' }, () => {
            wfa.action(
                action.core.log,
                {
                    $id: Now.ID['log_failure'],
                },
                {
                    log_level: 'error',
                    log_message: `Purple Pack: Integration provisioning failed for ${wfa.dataPill(_params.trigger.current.user_name, 'string')}`,
                }
            )
        })
    }
)
