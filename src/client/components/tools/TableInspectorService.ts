export interface TableEntry {
    sys_id: string
    name: string
    label: string
    is_custom: boolean
    scope_label: string
}

export interface TableInspectorData {
    totalTables: number
    customTables: number
    totalFields: number
    tables: TableEntry[]
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

async function fetchCount(table: string, query?: string): Promise<number> {
    const params = new URLSearchParams({ sysparm_count: 'true' })
    if (query) params.set('sysparm_query', query)
    const res = await fetch(`/api/now/stats/${table}?${params}`, {
        method: 'GET',
        headers: buildHeaders(),
    })
    if (!res.ok) throw new Error(`Failed to fetch count from ${table}: ${res.status} ${res.statusText}`)
    const data = await res.json()
    return parseInt(data.result?.stats?.count ?? '0', 10)
}

export async function fetchTableInspectorData(): Promise<TableInspectorData> {
    const [totalTables, customTables, totalFields, tablesRes] = await Promise.all([
        fetchCount('sys_db_object'),
        fetchCount('sys_db_object', 'nameSTARTSWITHx_'),
        fetchCount('sys_dictionary', 'active=true'),
        fetch(
            '/api/now/table/sys_db_object?' +
                new URLSearchParams({
                    sysparm_query: 'ORDERBYDESCsys_updated_on',
                    sysparm_limit: '20',
                    sysparm_fields: 'sys_id,name,label,scope',
                    sysparm_display_value: 'all',
                }),
            { method: 'GET', headers: buildHeaders() }
        ),
    ])

    if (!tablesRes.ok) {
        throw new Error(`Failed to fetch table list: ${tablesRes.status} ${tablesRes.statusText}`)
    }

    const tablesData = await tablesRes.json()
    const tables: TableEntry[] = (tablesData.result ?? []).map((r: any) => ({
        sys_id: r.sys_id?.value ?? r.sys_id,
        name: r.name?.value ?? r.name,
        label: r.label?.display_value ?? r.label?.value ?? r.label,
        is_custom: (r.name?.value ?? r.name ?? '').startsWith('x_'),
        scope_label: r.scope?.display_value ?? 'Global',
    }))

    return { totalTables, customTables, totalFields, tables }
}
