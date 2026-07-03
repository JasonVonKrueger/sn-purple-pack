export interface IntegrationFormState {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    appName: string;
    redirectUrl: string;
    description: string;
}

export const INITIAL_FORM: IntegrationFormState = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    appName: '',
    redirectUrl: '',
    description: ''
};

export interface IntegrationResult {
    type: 'positive' | 'critical';
    message: string;
}

export async function createIntegration(form: IntegrationFormState): Promise<IntegrationResult> {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-UserToken': (window as any).g_ck
    };

    // Create service account
    const userRes = await fetch('/api/now/table/sys_user', {
        method: 'POST',
        headers,
        body: JSON.stringify({
            user_name: form.username,
            first_name: form.firstName,
            last_name: form.lastName,
            email: form.email,
            web_service_access_only: true,
            active: true
        })
    });
    if (!userRes.ok) throw new Error('Failed to create service account');
    const userData = await userRes.json();
    const userSysId = userData.result.sys_id;

    // Create OAuth application
    const oauthRes = await fetch('/api/now/table/oauth_entity', {
        method: 'POST',
        headers,
        body: JSON.stringify({
            name: form.appName,
            redirect_url: form.redirectUrl,
            comments: form.description,
            type: 'client',
            active: true
        })
    });
    if (!oauthRes.ok) throw new Error('Failed to create OAuth application');
    const oauthData = await oauthRes.json();

    return {
        type: 'positive',
        message: `Integration created successfully!\n• Service Account: ${form.username} (${userSysId})\n• OAuth App: ${form.appName} (${oauthData.result.sys_id})`
    };
}
