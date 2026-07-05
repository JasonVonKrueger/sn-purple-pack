import React, { useState } from 'react';
import { Button } from '@servicenow/react-components/Button';
import { Alert } from '@servicenow/react-components/Alert';
import { SyslogEntry, LogViewerResult, fetchSyslogRecords } from './LogViewerService';
import './ToolContent.css';

const LEVEL_DOT: Record<string, string> = {
    error: 'status-dot--red',
    critical: 'status-dot--red',
    warning: 'status-dot--yellow',
}

export function LogViewer() {
    const [entries, setEntries] = useState<SyslogEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleStartStream() {
        setLoading(true);
        setError(null);
        try {
            const result: LogViewerResult = await fetchSyslogRecords();
            setEntries(result.entries);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to retrieve logs');
        } finally {
            setLoading(false);
        }
    }

    function handleClear() {
        setEntries([]);
        setError(null);
    }

    function formatTime(dateStr: string) {
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? dateStr : d.toLocaleTimeString();
    }

    return (
        <div className="tool-page">
            <div className="tool-header">
                <h1>Log Viewer</h1>
                <p>Stream and filter system logs, node logs, and transaction logs in real time.</p>
            </div>
            {error && (
                <Alert status="critical" content={error} icon="circle-exclamation-fill" />
            )}
            <div className="tool-actions">
                <Button label="Start Stream" variant="primary" icon="document-fill" disabled={loading} onClicked={handleStartStream} />
                <Button label="Clear Logs" variant="secondary" onClicked={handleClear} />
                <Button label="Download" variant="tertiary" />
            </div>
            {entries.length > 0 && (
                <div className="tool-grid">
                    <div className="tool-card">
                        <p className="tool-card-title">Log Entries</p>
                        <p className="tool-card-value">{entries.length}</p>
                        <p className="tool-card-meta">Most recent 100 records</p>
                    </div>
                    <div className="tool-card">
                        <p className="tool-card-title">Errors</p>
                        <p className="tool-card-value">{entries.filter(e => e.level === 'error' || e.level === 'critical').length}</p>
                        <p className="tool-card-meta">error + critical</p>
                    </div>
                    <div className="tool-card">
                        <p className="tool-card-title">Warnings</p>
                        <p className="tool-card-value">{entries.filter(e => e.level === 'warning').length}</p>
                        <p className="tool-card-meta">warning level</p>
                    </div>
                </div>
            )}
            {entries.length > 0 && (
                <div className="tool-list">
                    {entries.map((entry) => (
                        <div key={entry.sys_id} className="tool-list-item">
                            <span className="tool-list-label">
                                <span className={`status-dot ${LEVEL_DOT[entry.level] ?? 'status-dot--green'}`}></span>
                                [{entry.level?.toUpperCase()}] {entry.message}
                            </span>
                            <span className="pp-badge">{formatTime(entry.sys_created_on)}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
