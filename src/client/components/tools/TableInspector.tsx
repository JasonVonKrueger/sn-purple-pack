import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@servicenow/react-components/Button';
import { Alert } from '@servicenow/react-components/Alert';
import { TableInspectorData, fetchTableInspectorData } from './TableInspectorService';
import './ToolContent.css';

const PAGE_SIZE = 25;

export function TableInspector() {
    const [data, setData] = useState<TableInspectorData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const load = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            setData(await fetchTableInspectorData());
            setCurrentPage(1);
        } catch (err: any) {
            setError(err.message ?? 'Failed to load table data');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    const avgFields = data && data.totalTables > 0
        ? (data.totalFields / data.totalTables).toFixed(1)
        : '—';

    const totalPages = data ? Math.ceil(data.tables.length / PAGE_SIZE) : 0;
    const pagedTables = data
        ? data.tables.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
        : [];

    function formatFieldCount(n: number): string {
        return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n.toString();
    }

    function tableDisplayLabel(name: string, label: string, scopeLabel: string): string {
        const labelSuffix = label && label !== name ? ` — ${label}` : '';
        const scopeSuffix = scopeLabel && scopeLabel !== 'Global' ? ` (${scopeLabel})` : '';
        return `${name}${labelSuffix}${scopeSuffix}`;
    }

    return (
        <div className="tool-page">
            <div className="tool-header">
                <h1>Table Inspector</h1>
                <p>Browse and inspect table schemas, relationships, and field configurations.</p>
            </div>
            <div className="tool-actions">
                <Button label="Refresh Schema" variant="primary" icon="table-search-fill" disabled={loading} onClicked={load} />
                <Button label="Compare Tables" variant="secondary" />
            </div>
            {error && <Alert status="critical" content={error} icon="circle-exclamation-fill" />}
            <div className="tool-grid">
                <div className="tool-card">
                    <p className="tool-card-title">Tables Loaded</p>
                    <p className="tool-card-value">{loading ? '…' : (data?.totalTables.toLocaleString() ?? '—')}</p>
                    <p className="tool-card-meta">Including custom tables</p>
                </div>
                <div className="tool-card">
                    <p className="tool-card-title">Custom Tables</p>
                    <p className="tool-card-value">{loading ? '…' : (data?.customTables.toLocaleString() ?? '—')}</p>
                    <p className="tool-card-meta">Scoped application tables</p>
                </div>
                <div className="tool-card">
                    <p className="tool-card-title">Total Fields</p>
                    <p className="tool-card-value">{loading ? '…' : (data ? formatFieldCount(data.totalFields) : '—')}</p>
                    <p className="tool-card-meta">Avg {avgFields} per table</p>
                </div>
            </div>
            <div className="tool-list">
                {loading && (
                    <div className="tool-list-item">
                        <span className="tool-list-label">Loading tables…</span>
                    </div>
                )}
                {!loading && pagedTables.map(t => (
                    <div key={t.sys_id} className="tool-list-item">
                        <span className="tool-list-label">
                            <span className={`status-dot status-dot--${t.is_custom ? 'green' : 'purple'}`}></span>
                            {tableDisplayLabel(t.name, t.label, t.scope_label)}
                        </span>
                        <span className={`pp-badge${t.is_custom ? ' pp-badge--green' : ' pp-badge--purple'}`}>
                            {t.is_custom ? 'Custom' : 'System'}
                        </span>
                    </div>
                ))}
                {!loading && data?.tables.length === 0 && (
                    <div className="tool-list-item">
                        <span className="tool-list-label">No tables found</span>
                    </div>
                )}
            </div>
            {!loading && totalPages > 1 && (
                <div className="tool-pagination">
                    <button
                        className="tool-pagination-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                    >
                        ← Previous
                    </button>
                    <span className="tool-pagination-info">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="tool-pagination-btn"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
}
