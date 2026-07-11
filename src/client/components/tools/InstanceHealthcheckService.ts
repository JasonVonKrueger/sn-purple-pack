export type HealthStatus = 'ok' | 'warning' | 'critical' | 'unknown'

export interface HealthFinding {
    level: 'ok' | 'warning' | 'critical' | 'info'
    message: string
}

export interface HealthCategory {
    id: string
    title: string
    status: HealthStatus
    findings: HealthFinding[]
}

export interface HealthCheckResult {
    categories: HealthCategory[]
    criticalCount: number
    warningCount: number
    passedCount: number
    runAt: Date
}

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

/**
 * Returns a UTC datetime string in the format ServiceNow encoded queries expect:
 * "YYYY-MM-DD HH:MM:SS" (no timezone suffix, no milliseconds).
 * ServiceNow stores datetimes as UTC and accepts this format in sysparm_query values.
 */
function hoursAgo(hours: number): string {
    return new Date(Date.now() - hours * 3_600_000).toISOString().replace('T', ' ').slice(0, 19)
}

/**
 * Fetches a COUNT aggregate from a ServiceNow stats endpoint.
 * Returns -1 when the table is inaccessible (403/404) so callers can skip the check.
 */
async function fetchCount(table: string, query: string): Promise<number> {
    const params: Record<string, string> = { sysparm_count: 'true' }
    if (query) params.sysparm_query = query
    const res = await fetch(`/api/now/stats/${encodeURIComponent(table)}?${new URLSearchParams(params)}`, {
        headers: buildHeaders(),
    })
    if (res.status === 403 || res.status === 404) return -1
    if (!res.ok) throw new Error(`Stats fetch failed for ${table}: ${res.status} ${res.statusText}`)
    const data = await res.json()
    return parseInt(data.result?.stats?.count ?? '0', 10)
}

function buildCategory(id: string, title: string, findings: HealthFinding[]): HealthCategory {
    const hasCritical = findings.some(f => f.level === 'critical')
    const hasWarning = findings.some(f => f.level === 'warning')
    const status: HealthStatus = hasCritical ? 'critical' : hasWarning ? 'warning' : 'ok'
    return { id, title, status, findings }
}

function unknownCategory(title: string) {
    return (err: unknown): HealthCategory => ({
        id: title.toLowerCase().replace(/[\s&]+/g, '-'),
        title,
        status: 'unknown',
        findings: [{ level: 'info', message: `Check could not complete: ${err instanceof Error ? err.message : String(err)}` }],
    })
}

// ---------------------------------------------------------------------------
// 1. Scheduled Jobs
// ---------------------------------------------------------------------------
async function checkScheduledJobs(): Promise<HealthCategory> {
    const findings: HealthFinding[] = []

    const overdueCount = await fetchCount('sysauto_script', `active=true^next_action<${hoursAgo(1)}`)
    if (overdueCount < 0) {
        findings.push({ level: 'info', message: 'Scheduled jobs table not accessible.' })
    } else if (overdueCount > 0) {
        findings.push({ level: 'warning', message: `${overdueCount} active scheduled job(s) are more than 60 minutes overdue.` })
    } else {
        findings.push({ level: 'ok', message: 'No significantly overdue scheduled jobs.' })
    }

    const schedErrors = await fetchCount('syslog', `level=2^sourceCONTAINSScheduler^sys_created_on>=${hoursAgo(24)}`)
    if (schedErrors > 0) {
        findings.push({ level: 'warning', message: `${schedErrors} scheduler-related error(s) logged in the last 24 hours.` })
    } else if (schedErrors === 0) {
        findings.push({ level: 'ok', message: 'No scheduler errors in the last 24 hours.' })
    }

    return buildCategory('scheduled-jobs', 'Scheduled Jobs', findings)
}

// ---------------------------------------------------------------------------
// 2. MID Servers & ECC Queue
// ---------------------------------------------------------------------------
async function checkMidServers(): Promise<HealthCategory> {
    const findings: HealthFinding[] = []

    const res = await fetch(
        '/api/now/table/ecc_agent?' +
            new URLSearchParams({ sysparm_fields: 'sys_id,name,status', sysparm_limit: '200' }),
        { headers: buildHeaders() }
    )

    if (res.ok) {
        const agents: Array<{ status: string }> = (await res.json()).result ?? []
        const total = agents.length
        const down = agents.filter(a => a.status !== 'Up').length
        if (total === 0) {
            findings.push({ level: 'info', message: 'No MID Servers configured.' })
        } else if (down > 0) {
            findings.push({ level: 'critical', message: `${down} of ${total} MID Server(s) are not reporting as Up.` })
        } else {
            findings.push({ level: 'ok', message: `All ${total} MID Server(s) reporting Up.` })
        }
    } else {
        findings.push({ level: 'info', message: 'MID Server data not accessible.' })
    }

    const eccErrors = await fetchCount('ecc_queue', `state=error^sys_created_on>=${hoursAgo(24)}`)
    if (eccErrors > 0) {
        findings.push({ level: 'warning', message: `${eccErrors} ECC Queue message(s) in error state in the last 24 hours.` })
    } else if (eccErrors === 0) {
        findings.push({ level: 'ok', message: 'No ECC Queue errors in the last 24 hours.' })
    }

    return buildCategory('mid-servers', 'MID Servers & ECC Queue', findings)
}

// ---------------------------------------------------------------------------
// 3. Integration Health
// ---------------------------------------------------------------------------
async function checkIntegrations(): Promise<HealthCategory> {
    const findings: HealthFinding[] = []

    const restErrors = await fetchCount('syslog', `level=2^sourceCONTAINSRESTMessageV2^sys_created_on>=${hoursAgo(24)}`)
    if (restErrors > 0) {
        findings.push({ level: 'warning', message: `${restErrors} outbound REST error(s) logged in the last 24 hours.` })
    } else if (restErrors === 0) {
        findings.push({ level: 'ok', message: 'No outbound REST errors in the last 24 hours.' })
    } else {
        findings.push({ level: 'info', message: 'System log not accessible.' })
    }

    return buildCategory('integrations', 'Integration Health', findings)
}

// ---------------------------------------------------------------------------
// 4. Workflows & Flows
// ---------------------------------------------------------------------------
async function checkWorkflows(): Promise<HealthCategory> {
    const findings: HealthFinding[] = []

    const stuckWf = await fetchCount('wf_context', `state=executing^sys_created_on<${hoursAgo(24)}`)
    if (stuckWf < 0) {
        findings.push({ level: 'info', message: 'Workflow context table not accessible.' })
    } else if (stuckWf > 0) {
        findings.push({ level: 'warning', message: `${stuckWf} workflow(s) have been executing for more than 24 hours (likely stuck).` })
    } else {
        findings.push({ level: 'ok', message: 'No stuck workflows detected.' })
    }

    const flowErrors = await fetchCount('sys_flow_context', `status=error^sys_created_on>=${hoursAgo(24)}`)
    if (flowErrors > 0) {
        findings.push({ level: 'warning', message: `${flowErrors} Flow Designer execution(s) errored in the last 24 hours.` })
    } else if (flowErrors === 0) {
        findings.push({ level: 'ok', message: 'No Flow Designer errors in the last 24 hours.' })
    }

    return buildCategory('workflows', 'Workflows & Flows', findings)
}

// ---------------------------------------------------------------------------
// 5. Email
// ---------------------------------------------------------------------------
async function checkEmail(): Promise<HealthCategory> {
    const findings: HealthFinding[] = []

    const emailErrors = await fetchCount('sys_email', `state=error^sys_created_on>=${hoursAgo(24)}`)
    if (emailErrors < 0) {
        findings.push({ level: 'info', message: 'Email table not accessible.' })
    } else if (emailErrors > 0) {
        findings.push({ level: 'warning', message: `${emailErrors} email(s) in error state in the last 24 hours.` })
    } else {
        findings.push({ level: 'ok', message: 'No email delivery errors in the last 24 hours.' })
    }

    return buildCategory('email', 'Email', findings)
}

// ---------------------------------------------------------------------------
// 6. System Log
// ---------------------------------------------------------------------------
async function checkSystemLog(): Promise<HealthCategory> {
    const findings: HealthFinding[] = []

    const errors1h = await fetchCount('syslog', `level=2^sys_created_on>=${hoursAgo(1)}`)
    if (errors1h < 0) {
        findings.push({ level: 'info', message: 'System log not accessible.' })
    } else {
        // Threshold of 100 errors/hour matches the original health-check script baseline.
        // Adjust if your instance routinely produces higher error volumes at rest.
        if (errors1h > 100) {
            findings.push({ level: 'critical', message: `Error log volume unusually high — ${errors1h.toLocaleString()} errors in the last hour. Possible active incident.` })
        } else {
            findings.push({ level: 'ok', message: `${errors1h.toLocaleString()} error-level log entries in the last hour.` })
        }
    }

    return buildCategory('system-log', 'System Log', findings)
}

// ---------------------------------------------------------------------------
// 7. Table Growth — samples the 5 most-recently-updated custom u_ tables
//    and reports their current row counts. Full row-count ordering is too
//    expensive to run client-side, so recently-active tables serve as a
//    practical proxy for tables worth monitoring.
// ---------------------------------------------------------------------------
async function checkTableGrowth(): Promise<HealthCategory> {
    const findings: HealthFinding[] = []

    const res = await fetch(
        '/api/now/table/sys_db_object?' +
            new URLSearchParams({
                // Sort by most recently updated as a practical proxy for
                // active tables; a true largest-by-row-count sort would
                // require a separate count query for every table.
                sysparm_query: 'nameSTARTSWITHu_^ORDERBYDESCsys_updated_on',
                sysparm_fields: 'name,label',
                sysparm_limit: '50',
            }),
        { headers: buildHeaders() }
    )

    if (!res.ok) {
        findings.push({ level: 'info', message: 'Table metadata not accessible.' })
        return buildCategory('table-growth', 'Table Growth', findings)
    }

    const tables: Array<{ name: string; label: string }> = ((await res.json()).result ?? []).slice(0, 5)
    if (tables.length === 0) {
        findings.push({ level: 'ok', message: 'No custom (u_) tables found.' })
        return buildCategory('table-growth', 'Table Growth', findings)
    }

    const counts = await Promise.all(tables.map(t => fetchCount(t.name, '').catch(() => -1)))

    for (let i = 0; i < tables.length; i++) {
        const count = counts[i]
        if (count < 0) continue
        const t = tables[i]
        const label = t.label && t.label !== t.name ? `${t.name} (${t.label})` : t.name
        if (count > 500_000) {
            findings.push({ level: 'warning', message: `${label}: ${count.toLocaleString()} rows — review archiving/retention policy.` })
        } else {
            findings.push({ level: 'ok', message: `${label}: ${count.toLocaleString()} rows` })
        }
    }

    if (findings.length === 0) {
        findings.push({ level: 'info', message: 'Could not retrieve row counts for custom tables.' })
    }

    return buildCategory('table-growth', 'Table Growth', findings)
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------
export async function runHealthCheck(): Promise<HealthCheckResult> {
    const categories = await Promise.all([
        checkScheduledJobs().catch(unknownCategory('Scheduled Jobs')),
        checkMidServers().catch(unknownCategory('MID Servers & ECC Queue')),
        checkIntegrations().catch(unknownCategory('Integration Health')),
        checkWorkflows().catch(unknownCategory('Workflows & Flows')),
        checkEmail().catch(unknownCategory('Email')),
        checkSystemLog().catch(unknownCategory('System Log')),
        checkTableGrowth().catch(unknownCategory('Table Growth')),
    ])

    return {
        categories,
        criticalCount: categories.filter(c => c.status === 'critical').length,
        warningCount: categories.filter(c => c.status === 'warning').length,
        passedCount: categories.filter(c => c.status === 'ok').length,
        runAt: new Date(),
    }
}
