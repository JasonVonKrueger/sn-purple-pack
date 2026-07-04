export interface SyslogEntry {
    sys_id: string
    level: string
    message: string
    source: string
    sys_created_on: string
}

export interface LogViewerResult {
    entries: SyslogEntry[]
}

// Sys ID of the PP: Get Syslog Records flow — populated after first deploy
const PP_GET_SYSLOG_FLOW_SYS_ID = 'a1b2c3d4e5f647389abcdef012345600'

const headers = () => ({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-UserToken': (window as any).g_ck,
})

export async function fetchSyslogRecords(): Promise<LogViewerResult> {
    // Trigger the flow to run as the system account
    await fetch(`/api/now/v2/workflows/execute?sys_id=${PP_GET_SYSLOG_FLOW_SYS_ID}`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ inputs: {} }),
    })

    // Fetch the most recent warning-level-and-above syslog entries for display
    const query = 'levelINwarning,error,critical^ORDERBYDESCsys_created_on'
    const res = await fetch(
        `/api/now/table/syslog?sysparm_query=${encodeURIComponent(query)}&sysparm_limit=100&sysparm_fields=sys_id,level,message,source,sys_created_on`,
        { method: 'GET', headers: headers() }
    )
    if (!res.ok) throw new Error('Failed to fetch syslog records')
    const data = await res.json()
    return { entries: data.result as SyslogEntry[] }
}
