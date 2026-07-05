import React, { useState, useEffect, useRef } from 'react';
import { Input, InputValueSet } from '@servicenow/react-components/Input';
import { Button } from '@servicenow/react-components/Button';
import { Alert } from '@servicenow/react-components/Alert';
import { IntegrationFormState, IntegrationResult, GroupOption, INITIAL_FORM, createIntegration, searchGroups } from './IntegrationService';
import './ToolContent.css';

export function IntegrationCreator() {
    const [form, setForm] = useState<IntegrationFormState>(INITIAL_FORM);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<IntegrationResult | null>(null);
    const [groupOptions, setGroupOptions] = useState<GroupOption[]>([]);
    const [groupSearch, setGroupSearch] = useState('');
    const [showGroupDropdown, setShowGroupDropdown] = useState(false);
    const nameInputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = nameInputRef.current?.querySelector?.('input');
        if (el) el.focus();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (groupSearch && !form.integrationOwner) {
                searchGroups(groupSearch).then(setGroupOptions);
                setShowGroupDropdown(true);
            } else {
                setGroupOptions([]);
                setShowGroupDropdown(false);
            }
        }, 250);
        return () => clearTimeout(timer);
    }, [groupSearch, form.integrationOwner]);

    function updateField(field: keyof IntegrationFormState) {
        return ((event: any) => {
            setForm(prev => ({ ...prev, [field]: event.detail.payload.value }));
        }) as InputValueSet;
    }

    function handleOwnerSearch(event: any) {
        const value: string = event.detail.payload.value;
        setGroupSearch(value);
        setForm(prev => ({ ...prev, integrationOwner: '', integrationOwnerName: value }));
    }

    function selectGroup(group: GroupOption) {
        setForm(prev => ({ ...prev, integrationOwner: group.sys_id, integrationOwnerName: group.name }));
        setGroupSearch('');
        setGroupOptions([]);
        setShowGroupDropdown(false);
    }

    async function handleCreate() {
        setLoading(true);
        setResult(null);
        try {
            const res = await createIntegration(form);
            setResult(res);
            setForm(INITIAL_FORM);
            setGroupSearch('');
        } catch (err: any) {
            setResult({ type: 'critical', message: err.message || 'An error occurred' });
        } finally {
            setLoading(false);
        }
    }

    function handleReset() {
        setForm(INITIAL_FORM);
        setResult(null);
        setGroupSearch('');
        setGroupOptions([]);
        setShowGroupDropdown(false);
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
                <p className="tool-card-title">Integration Details</p>
                <div className="tool-grid">
                    <div ref={nameInputRef}>
                        <Input label="Integration Name" required value={form.integrationName} onValueSet={updateField('integrationName')} placeholder="My Integration" />
                    </div>
                    <div className="pp-reference-wrap">
                        <Input
                            label="Integration Owner"
                            required
                            value={form.integrationOwnerName}
                            onValueSet={handleOwnerSearch as InputValueSet}
                            placeholder="Search for a group..."
                        />
                        {showGroupDropdown && groupOptions.length > 0 && (
                            <div className="pp-group-dropdown">
                                {groupOptions.map(g => (
                                    <button key={g.sys_id} className="pp-group-dropdown-item" type="button" onMouseDown={() => selectGroup(g)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') selectGroup(g); }}>
                                        {g.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="tool-grid-full">
                        <label className="pp-textarea-label">Short Description</label>
                        <textarea
                            className="pp-textarea"
                            value={form.shortDescription}
                            onChange={e => setForm(prev => ({ ...prev, shortDescription: e.target.value }))}
                            placeholder="Briefly describe the purpose of this integration"
                            rows={3}
                        />
                    </div>
                    <div>
                        <Input label="How many requests per hour" value={form.requestsPerHour} onValueSet={updateField('requestsPerHour')} placeholder="e.g. 500" />
                    </div>
                </div>
            </div>
            <div className="tool-card">
                <p className="tool-card-title">Service Account</p>
                <div className="tool-grid">
                    <Input label="Username" value={form.username} onValueSet={updateField('username')} placeholder="svc_integration" />
                    <Input label="First Name" value={form.firstName} onValueSet={updateField('firstName')} placeholder="Service" />
                    <Input label="Last Name" value={form.lastName} onValueSet={updateField('lastName')} placeholder="Account" />
                </div>
            </div>
            <div className="tool-card">
                <p className="tool-card-title">OAuth Application</p>
                <div className="tool-grid">
                    <Input label="App Name" value={form.appName} onValueSet={updateField('appName')} placeholder="My Integration App" />
                    <Input label="Redirect URL" value={form.redirectUrl} onValueSet={updateField('redirectUrl')} placeholder="https://example.com/callback" />
                    <Input label="Description" value={form.description} onValueSet={updateField('description')} placeholder="Optional description" />
                </div>
            </div>
            <div className="tool-actions">
                <label className="pp-checkbox-label">
                    <input
                        type="checkbox"
                        className="pp-checkbox"
                        checked={form.throttleAcknowledged}
                        onChange={e => setForm(prev => ({ ...prev, throttleAcknowledged: e.target.checked }))}
                    />
                    I understand that my requests may be throttled based on platform performance.
                </label>
                <Button label="Create Integration" variant="primary" icon="plug-fill" disabled={loading || !form.throttleAcknowledged} onClicked={handleCreate} />
                <Button label="Reset" variant="secondary" onClicked={handleReset} />
            </div>
        </div>
    );
}
