import { Flow, wfa, trigger, action } from '@servicenow/sdk/automation'

Flow(
    {
        $id: Now.ID['pp_get_syslog_flow'],
        name: 'PP: Get Syslog Records',
        description:
            'Runs as the system account on a daily schedule and retrieves syslog records from the syslog table.',
        runAs: 'system',
        flowPriority: 'MEDIUM',
        internalName: 'pp_get_syslog',
    },
    wfa.trigger(
        trigger.scheduled.daily,
        { $id: Now.ID['trg_get_syslog_scheduled'] },
        {
            time: '00:00:00',
            timezone: 'UTC',
        }
    ),
    (_params) => {
        // Retrieve the 100 most recent syslog records at warning level or above
        const syslogs = wfa.action(
            action.core.lookupRecords,
            {
                $id: Now.ID['lookup_syslog_records'],
                annotation: 'Query up to 100 most recent syslog records at warning level or above',
            },
            {
                table_name: 'syslog',
                filter_condition: 'levelINwarning,error,critical',
                order_by: 'sys_created_on',
                order_direction: 'descending',
                max_count: '100',
            }
        )

        // Log the number of records retrieved
        wfa.action(
            action.core.log,
            {
                $id: Now.ID['log_syslog_results'],
                annotation: 'Log syslog retrieval result',
            },
            {
                log_level: 'info',
                log_message: `PP: Retrieved ${wfa.dataPill(syslogs.count, 'integer')} syslog records`,
            }
        )
    }
)
