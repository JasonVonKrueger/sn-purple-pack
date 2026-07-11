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
    filteredCount: number
    tables: TableEntry[]
}

export interface FetchTableParams {
    page: number
    pageSize: number
    search: string
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

export async function fetchTableInspectorData(params: FetchTableParams): Promise<TableInspectorData> {
    const { page, pageSize, search } = params
    // Strip characters that have special meaning in ServiceNow encoded queries
    const trimmed = search.trim().replace(/[\\^=]/g, '')
    const searchQuery = trimmed ? `nameLIKE${trimmed}^ORlabelLIKE${trimmed}` : ''
    const tableQuery = searchQuery ? `${searchQuery}^ORDERBYname` : 'ORDERBYname'

    const [totalTables, customTables, totalFields, rawFilteredCount, tablesRes] = await Promise.all([
        fetchCount('sys_db_object'),
        fetchCount('sys_db_object', 'nameSTARTSWITHx_'),
        fetchCount('sys_dictionary', 'active=true'),
        searchQuery ? fetchCount('sys_db_object', searchQuery) : Promise.resolve(0),
        fetch(
            '/api/now/table/sys_db_object?' +
                new URLSearchParams({
                    sysparm_query: tableQuery,
                    sysparm_limit: pageSize.toString(),
                    sysparm_offset: ((page - 1) * pageSize).toString(),
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

    const filteredCount = searchQuery ? rawFilteredCount : totalTables

    return { totalTables, customTables, totalFields, filteredCount, tables }
}
