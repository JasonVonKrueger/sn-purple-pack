export interface CodeSearchResult {
    sys_id: string
    name: string
    table: string
    tableLabel: string
    scope_label: string
    snippet: string
}

export interface CodeSearchResponse {
    results: CodeSearchResult[]
    total: number
}

export type ScriptTableKey =
    | 'all'
    | 'sys_script_include'
    | 'sys_script_client'
    | 'sys_script'
    | 'sys_business_rule'
    | 'sys_ui_script'
    | 'sys_ui_action'

export interface ScriptTableMeta {
    key: ScriptTableKey
    label: string
    scriptField: string
    nameField: string
}

export const SCRIPT_TABLES: ScriptTableMeta[] = [
    { key: 'sys_script_include', label: 'Script Include', scriptField: 'script', nameField: 'name' },
    { key: 'sys_script_client',  label: 'Client Script',  scriptField: 'script', nameField: 'name' },
    { key: 'sys_script',         label: 'Scheduled Job',  scriptField: 'script', nameField: 'name' },
    { key: 'sys_business_rule',  label: 'Business Rule',  scriptField: 'script', nameField: 'name' },
    { key: 'sys_ui_script',      label: 'UI Script',      scriptField: 'script', nameField: 'name' },
    { key: 'sys_ui_action',      label: 'UI Action',      scriptField: 'script', nameField: 'name' },
]

const LIMIT_PER_TABLE = 10
const LIMIT_SINGLE_TABLE = 25

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

async function searchTable(meta: ScriptTableMeta, query: string, limit: number): Promise<CodeSearchResult[]> {
    const trimmed = query.trim().replace(/[\\^]/g, '')
    const encodedQuery = `${meta.scriptField}CONTAINS${trimmed}^ORnameCONTAINS${trimmed}^ORDERBYname`
    const params = new URLSearchParams({
        sysparm_query: encodedQuery,
        sysparm_limit: limit.toString(),
        sysparm_fields: `sys_id,${meta.nameField},${meta.scriptField},scope`,
        sysparm_display_value: 'all',
    })
    const res = await fetch(`/api/now/table/${meta.key}?${params}`, {
        method: 'GET',
        headers: buildHeaders(),
    })
    if (!res.ok) throw new Error(`Code search failed on ${meta.key}: ${res.status} ${res.statusText}`)
    const data = await res.json()
    return (data.result ?? []).map((r: any) => {
        const rawScript: string = r[meta.scriptField]?.value ?? r[meta.scriptField] ?? ''
        const snippet = buildSnippet(rawScript, trimmed)
        return {
            sys_id: r.sys_id?.value ?? r.sys_id,
            name: r[meta.nameField]?.display_value ?? r[meta.nameField]?.value ?? r[meta.nameField] ?? '',
            table: meta.key,
            tableLabel: meta.label,
            scope_label: r.scope?.display_value ?? 'Global',
            snippet,
        } satisfies CodeSearchResult
    })
}

function buildSnippet(script: string, query: string): string {
    if (!script || !query) return ''
    const idx = script.toLowerCase().indexOf(query.toLowerCase())
    if (idx === -1) return script.slice(0, 120)
    const start = Math.max(0, idx - 40)
    const end = Math.min(script.length, idx + query.length + 80)
    const prefix = start > 0 ? '…' : ''
    const suffix = end < script.length ? '…' : ''
    return `${prefix}${script.slice(start, end)}${suffix}`
}

export async function searchCode(query: string, tableKey: ScriptTableKey): Promise<CodeSearchResponse> {
    const trimmed = query.trim()
    if (!trimmed) return { results: [], total: 0 }

    let results: CodeSearchResult[]

    if (tableKey === 'all') {
        const settled = await Promise.allSettled(
            SCRIPT_TABLES.map(meta => searchTable(meta, trimmed, LIMIT_PER_TABLE))
        )
        results = settled.flatMap(s => (s.status === 'fulfilled' ? s.value : []))
    } else {
        const meta = SCRIPT_TABLES.find(t => t.key === tableKey)
        if (!meta) return { results: [], total: 0 }
        results = await searchTable(meta, trimmed, LIMIT_SINGLE_TABLE)
    }

    return { results, total: results.length }
}
