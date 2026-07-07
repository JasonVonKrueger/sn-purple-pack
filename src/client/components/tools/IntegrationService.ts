export interface IntegrationFormState {
    integrationName: string
    integrationOwner: string
    integrationOwnerName: string
    shortDescription: string
    requestsPerHour: string
    throttleAcknowledged: boolean
}

export const INITIAL_FORM: IntegrationFormState = {
    integrationName: '',
    integrationOwner: '',
    integrationOwnerName: '',
    shortDescription: '',
    requestsPerHour: '',
    throttleAcknowledged: false,
}

export function deriveUsername(integrationName: string): string {
    const normalized = integrationName.trim().toUpperCase().replace(/[^A-Z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    return `SV-IT-SNC-${normalized}`;
}

export interface UserOption {
    sys_id: string
    name: string
    user_name: string
}

export async function searchUsers(query: string): Promise<UserOption[]> {
    if (!query) return []
    const params = new URLSearchParams({
        // search both full name and username so queries like "tommie.reuland" resolve correctly
        sysparm_query: `nameLIKE${query}^ORuser_nameLIKE${query}^active=true^web_service_access_only=false`,
        sysparm_fields: 'sys_id,name,user_name',
        sysparm_limit: '10',
    })
    const res = await fetch(`/api/now/table/sys_user?${params}`, {
        headers: {
            Accept: 'application/json',
            'X-UserToken': (window as any).g_ck,
        },
    })
    if (!res.ok) return []
    const data = await res.json()
    return (data.result ?? []).map((r: any) => ({ sys_id: r.sys_id, name: r.name, user_name: r.user_name }))
}

export interface IntegrationResult {
    type: 'positive' | 'critical'
    message: string
}

export async function createIntegration(form: IntegrationFormState): Promise<IntegrationResult> {
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-UserToken': (window as any).g_ck,
    }

    const username = deriveUsername(form.integrationName);

    // Create service account
    const userRes = await fetch('/api/now/table/sys_user', {
        method: 'POST',
        headers,
        body: JSON.stringify({
            user_name: username,
            first_name: 'Service Account',
            last_name: form.integrationName,
            web_service_access_only: true,
            active: true,
        }),
    })
    if (!userRes.ok) throw new Error('Failed to create service account')
    const userData = await userRes.json()
    const userSysId = userData.result.sys_id

    // Assign required roles to the service account
    const roleNames = ['oauth_user', 'snc_platform_rest_api_access']
    for (const roleName of roleNames) {
        const roleRes = await fetch(`/api/now/table/sys_user_role?sysparm_query=name=${roleName}&sysparm_fields=sys_id&sysparm_limit=1`, { headers })
        if (!roleRes.ok) throw new Error(`Failed to look up role: ${roleName}`)
        const roleData = await roleRes.json()
        const roleSysId = roleData.result?.[0]?.sys_id
        if (!roleSysId) throw new Error(`Role not found: ${roleName}`)
        const assignRes = await fetch('/api/now/table/sys_user_has_role', {
            method: 'POST',
            headers,
            body: JSON.stringify({ user: userSysId, role: roleSysId }),
        })
        if (!assignRes.ok) throw new Error(`Failed to assign role: ${roleName}`)
    }

    // Create OAuth application registry with client credentials grant type linked to the service account
    const oauthRes = await fetch('/api/now/table/oauth_entity', {
        method: 'POST',
        headers,
        body: JSON.stringify({
            name: form.integrationName,
            comments: form.shortDescription,
            type: 'client',
            grant_type: 'client_credentials',
            user: userSysId,
            active: true,
        }),
    })
    if (!oauthRes.ok) throw new Error('Failed to create OAuth application')
    const oauthData = await oauthRes.json()

    return {
        type: 'positive',
        message: `Integration "${form.integrationName}" created successfully!\n• Service Account: ${username} (${userSysId})\n• OAuth App: ${form.integrationName} (${oauthData.result.sys_id})`,
    }
}
