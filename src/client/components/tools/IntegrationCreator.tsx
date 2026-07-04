import React, { useState } from 'react';
import { Input, InputValueSet } from '@servicenow/react-components/Input';
import { Button } from '@servicenow/react-components/Button';
import { Alert } from '@servicenow/react-components/Alert';
import { IntegrationFormState, IntegrationResult, INITIAL_FORM, createIntegration } from './IntegrationService';
import './ToolContent.css';

export function IntegrationCreator() {
    const [form, setForm] = useState<IntegrationFormState>(INITIAL_FORM);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<IntegrationResult | null>(null);

    function updateField(field: keyof IntegrationFormState) {
        return ((event: any) => {
            setForm(prev => ({ ...prev, [field]: event.detail.payload.value }));
        }) as InputValueSet;
    }

    async function handleCreate() {
        setLoading(true);
        setResult(null);
        try {
            const res = await createIntegration(form);
            setResult(res);
            setForm(INITIAL_FORM);
        } catch (err: any) {
            setResult({ type: 'critical', message: err.message || 'An error occurred' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="tool-page">
            <div className="tool-header">
                <h1>Integration Creator</h1>
                <p>Create a service account and OAuth application registry record together as an integration setup.</p>
            </div>
            {result && (
                <Alert status={result.type} content={result.message} icon={result.type === 'positive' ? 'circle-check-fill' : 'circle-exclamation-fill'} />
            )}
            <div className="tool-card">
                <p className="tool-card-title">Service Account</p>
                <div className="tool-grid">
                    <Input label="Username" required value={form.username} onValueSet={updateField('username')} placeholder="svc_integration" />
                    <Input label="First Name" required value={form.firstName} onValueSet={updateField('firstName')} placeholder="Service" />
                    <Input label="Last Name" required value={form.lastName} onValueSet={updateField('lastName')} placeholder="Account" />
                    <Input label="Email" type="email" required value={form.email} onValueSet={updateField('email')} placeholder="svc@example.com" />
                </div>
            </div>
            <div className="tool-card">
                <p className="tool-card-title">OAuth Application</p>
                <div className="tool-grid">
                    <Input label="App Name" required value={form.appName} onValueSet={updateField('appName')} placeholder="My Integration App" />
                    <Input label="Redirect URL" required value={form.redirectUrl} onValueSet={updateField('redirectUrl')} placeholder="https://example.com/callback" />
                    <Input label="Description" value={form.description} onValueSet={updateField('description')} placeholder="Optional description" />
                </div>
            </div>
            <div className="tool-actions">
                <Button label="Create Integration" variant="primary" icon="plug-fill" disabled={loading} onClicked={handleCreate} />
                <Button label="Reset" variant="secondary" onClicked={() => { setForm(INITIAL_FORM); setResult(null); }} />
            </div>
        </div>
    );
}
