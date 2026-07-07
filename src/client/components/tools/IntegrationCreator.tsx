import React, { useState, useEffect, useRef } from 'react';
import { Input, InputValueSet } from '@servicenow/react-components/Input';
import { Button } from '@servicenow/react-components/Button';
import { Alert } from '@servicenow/react-components/Alert';
import { IntegrationFormState, IntegrationResult, UserOption, INITIAL_FORM, createIntegration, searchUsers, deriveUsername } from './IntegrationService';
import './ToolContent.css';

export function IntegrationCreator() {
    const [form, setForm] = useState<IntegrationFormState>(INITIAL_FORM);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<IntegrationResult | null>(null);
    const [userOptions, setUserOptions] = useState<UserOption[]>([]);
    const [userSearch, setUserSearch] = useState('');
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const nameInputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = nameInputRef.current?.querySelector?.('input');
        if (el) el.focus();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (userSearch && !form.integrationOwner) {
                searchUsers(userSearch).then(setUserOptions);
                setShowUserDropdown(true);
            } else {
                setUserOptions([]);
                setShowUserDropdown(false);
            }
        }, 250);
        return () => clearTimeout(timer);
    }, [userSearch, form.integrationOwner]);

    function updateField(field: keyof IntegrationFormState) {
        return ((event: any) => {
            setForm(prev => ({ ...prev, [field]: event.detail.payload.value }));
        }) as InputValueSet;
    }

    function handleOwnerSearch(event: any) {
        const value: string = event.detail.payload.value;
        setUserSearch(value);
        setForm(prev => ({ ...prev, integrationOwner: '', integrationOwnerName: value }));
    }

    function selectUser(user: UserOption) {
        setForm(prev => ({ ...prev, integrationOwner: user.sys_id, integrationOwnerName: user.name }));
        setUserSearch('');
        setUserOptions([]);
        setShowUserDropdown(false);
    }

    async function handleCreate() {
        setLoading(true);
        setResult(null);
        try {
            const res = await createIntegration(form);
            setResult(res);
            setForm(INITIAL_FORM);
            setUserSearch('');
        } catch (err: any) {
            setResult({ type: 'critical', message: err.message || 'An error occurred' });
        } finally {
            setLoading(false);
        }
    }

    function handleReset() {
        setForm(INITIAL_FORM);
        setResult(null);
        setUserSearch('');
        setUserOptions([]);
        setShowUserDropdown(false);
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
                    <div>
                        <Input label="Service Account Username" value={form.integrationName ? deriveUsername(form.integrationName) : ''} disabled placeholder="Derived from Integration Name" />
                    </div>
                    <div className="pp-reference-wrap">
                        <Input
                            label="Integration Owner"
                            required
                            value={form.integrationOwnerName}
                            onValueSet={handleOwnerSearch as InputValueSet}
                            placeholder="Search for a user..."
                        />
                        {showUserDropdown && userOptions.length > 0 && (
                            <div className="pp-user-dropdown">
                                {userOptions.map(u => (
                                    <button key={u.sys_id} className="pp-user-dropdown-item" type="button" onMouseDown={() => selectUser(u)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') selectUser(u); }}>
                                        {u.name}
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
            <div className="tool-actions">
                <label className="pp-checkbox-label" style={{ width: '100%' }}>
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
