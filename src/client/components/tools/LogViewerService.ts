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

// Sys ID of the PP: Get Syslog Records flow — populated after first deploy.
// Must match Now.ID['pp_get_syslog_flow'].id in keys.ts.
const PP_GET_SYSLOG_FLOW_SYS_ID = 'a1b2c3d4e5f647389abcdef012345600'

function getSessionToken(): string {
    const token = (window as unknown as Record<string, unknown>).g_ck
    if (typeof token !== 'string' || !token) throw new Error('Session token (g_ck) is not available')
    return token
}

function buildHeaders(): Record<string, string> {
    return {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-UserToken': getSessionToken(),
    }
}

export async function fetchSyslogRecords(): Promise<LogViewerResult> {
    // Trigger the flow to run as the system account
    const flowRes = await fetch(
        `/api/now/v2/workflows/execute?sys_id=${PP_GET_SYSLOG_FLOW_SYS_ID}`,
        {
            method: 'POST',
            headers: buildHeaders(),
            body: JSON.stringify({ inputs: {} }),
        }
    )
    if (!flowRes.ok) {
        throw new Error(`Flow execution failed: ${flowRes.status} ${flowRes.statusText}`)
    }

    // Fetch the most recent warning-level-and-above syslog entries for display
    const query = 'levelINwarning,error,critical^ORDERBYDESCsys_created_on'
    const tableRes = await fetch(
        `/api/now/table/syslog?sysparm_query=${encodeURIComponent(query)}&sysparm_limit=100&sysparm_fields=sys_id,level,message,source,sys_created_on`,
        { method: 'GET', headers: buildHeaders() }
    )
    if (!tableRes.ok) throw new Error('Failed to fetch syslog records')
    const data = await tableRes.json()
    return { entries: data.result as SyslogEntry[] }
}
