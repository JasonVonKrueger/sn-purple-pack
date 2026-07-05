import { Subflow, wfa, action } from '@servicenow/sdk/automation'

export const ppGetSyslogRecordsSubflow = Subflow(
    {
        $id: Now.ID['pp_get_syslog_flow'],
        name: 'PP: Get Syslog Records',
        description:
            'Runs as the system account on demand and retrieves syslog records from the syslog table.',
        runAs: 'system',
        flowPriority: 'MEDIUM',
        internalName: 'pp_get_syslog',
    },
    (_params) => {
        const syslogs = wfa.action(
            action.core.lookUpRecords,
            {
                $id: Now.ID['lookup_syslog_records'],
                annotation: 'Query up to 100 most recent syslog records at warning level or above',
            },
            {
                table: 'syslog',
                conditions: 'levelINwarning,error,critical',
                sort_column: 'sys_created_on',
                sort_type: 'sort_desc',
                max_results: 100,
            }
        )

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