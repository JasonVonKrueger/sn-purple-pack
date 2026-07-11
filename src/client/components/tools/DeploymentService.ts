export interface UpdateSetEntry {
    sys_id: string;
    name: string;
    state: string;
    scope: string;
    sys_updated_on: string;
    sys_updated_by: string;
}

export interface FetchUpdateSetsParams {
    page: number;
    pageSize: number;
}

export interface UpdateSetsResult {
    entries: UpdateSetEntry[];
    totalCount: number;
}

function getSessionToken(): string {
    const token = (window as unknown as Record<string, unknown>).g_ck;
    if (typeof token !== 'string' || !token) throw new Error('Session token (g_ck) is not available');
    return token;
}

function buildHeaders(): Record<string, string> {
    return {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-UserToken': getSessionToken(),
    };
}

async function fetchCount(): Promise<number> {
    const params = new URLSearchParams({
        sysparm_query: 'state=complete',
        sysparm_count: 'true',
    });
    const res = await fetch(`/api/now/stats/sys_update_set?${params}`, {
        method: 'GET',
        headers: buildHeaders(),
    });
    if (!res.ok) throw new Error(`Failed to fetch update set count: ${res.status} ${res.statusText}`);
    const data = await res.json();
    return parseInt(data.result?.stats?.count ?? '0', 10);
}

interface DisplayValue {
    value: string;
    display_value?: string;
}

interface RawUpdateSetRecord {
    sys_id: DisplayValue | string;
    name: DisplayValue | string;
    state: DisplayValue | string;
    application: DisplayValue | string;
    sys_updated_on: DisplayValue | string;
    sys_updated_by: DisplayValue | string;
}

function displayVal(field: DisplayValue | string | undefined): string {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field.display_value ?? field.value ?? '';
}

export async function fetchCompletedUpdateSets(params: FetchUpdateSetsParams): Promise<UpdateSetsResult> {
    const { page, pageSize } = params;

    const [totalCount, setsRes] = await Promise.all([
        fetchCount(),
        fetch(
            '/api/now/table/sys_update_set?' +
                new URLSearchParams({
                    sysparm_query: 'state=complete^ORDERBYDESCsys_updated_on',
                    sysparm_limit: pageSize.toString(),
                    sysparm_offset: ((page - 1) * pageSize).toString(),
                    sysparm_fields: 'sys_id,name,state,application,sys_updated_on,sys_updated_by',
                    sysparm_display_value: 'all',
                }),
            { method: 'GET', headers: buildHeaders() }
        ),
    ]);

    if (!setsRes.ok) {
        throw new Error(`Failed to fetch update sets: ${setsRes.status} ${setsRes.statusText}`);
    }

    const setsData = await setsRes.json();
    const entries: UpdateSetEntry[] = (setsData.result ?? [] as RawUpdateSetRecord[]).map((r: RawUpdateSetRecord) => ({
        sys_id: displayVal(r.sys_id),
        name: displayVal(r.name),
        state: displayVal(r.state),
        scope: displayVal(r.application) || 'Global',
        sys_updated_on: displayVal(r.sys_updated_on),
        sys_updated_by: displayVal(r.sys_updated_by),
    }));

    return { entries, totalCount };
}
