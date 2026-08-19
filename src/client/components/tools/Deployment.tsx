import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@servicenow/react-components/Button';
import { Alert } from '@servicenow/react-components/Alert';
import { fetchCompletedUpdateSets, type UpdateSetEntry } from './DeploymentService';
import './ToolContent.css';

const PAGE_SIZE = 10;

export function Deployment() {
    const [entries, setEntries] = useState<UpdateSetEntry[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    const load = useCallback(async (p: number) => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchCompletedUpdateSets({ page: p, pageSize: PAGE_SIZE });
            setEntries(result.entries);
            setTotalCount(result.totalCount);
        } catch (err: any) {
            setError(err.message ?? 'Failed to load update sets');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load(page);
    }, [load, page]);

    function handlePageChange(newPage: number) {
        setSelectedId(null);
        setPage(newPage);
    }

    function handleRowSelect(id: string) {
        setSelectedId(prev => (prev === id ? null : id));
    }

    function handleDeploy() {
        if (!selectedId) return;
        const entry = entries.find(e => e.sys_id === selectedId);
        if (!entry) return;
        alert(`Deploying: ${entry.name}`);
    }

    return (
        <div className="tool-page">
            <div className="tool-header">
                <h1>Deployment</h1>
                <p>Select a completed update set and deploy it to this instance.</p>
            </div>

            <div className="tool-actions">
                <Button
                    label="Deploy"
                    variant="primary"
                    icon="change-fill"
                    disabled={!selectedId}
                    onClicked={handleDeploy}
                />
                <Button
                    label="Refresh"
                    variant="secondary"
                    icon="rotate-clockwise-fill"
                    disabled={loading}
                    onClicked={() => { setSelectedId(null); load(page); }}
                />
            </div>

            {error && <Alert status="critical" content={error} icon="circle-exclamation-fill" />}

            <div className="deployment-table-wrap">
                <table className="deployment-table">
                    <thead>
                        <tr>
                            <th className="deployment-th deployment-th--select"></th>
                            <th className="deployment-th">Set Name</th>
                            <th className="deployment-th">State</th>
                            <th className="deployment-th">Scope</th>
                            <th className="deployment-th">Last Updated</th>
                            <th className="deployment-th">Updated By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td className="deployment-td deployment-td--empty" colSpan={6}>
                                    Loading update sets…
                                </td>
                            </tr>
                        )}
                        {!loading && entries.length === 0 && !error && (
                            <tr>
                                <td className="deployment-td deployment-td--empty" colSpan={6}>
                                    No completed update sets found.
                                </td>
                            </tr>
                        )}
                        {!loading && entries.map(entry => (
                            <tr
                                key={entry.sys_id}
                                className={`deployment-row${selectedId === entry.sys_id ? ' deployment-row--selected' : ''}`}
                                onClick={() => handleRowSelect(entry.sys_id)}
                            >
                                <td className="deployment-td deployment-td--select">
                                    <input
                                        type="radio"
                                        className="deployment-radio"
                                        checked={selectedId === entry.sys_id}
                                        onChange={() => handleRowSelect(entry.sys_id)}
                                        aria-label={`Select ${entry.name}`}
                                    />
                                </td>
                                <td className="deployment-td deployment-td--name">{entry.name}</td>
                                <td className="deployment-td">
                                    <span className="pp-badge pp-badge--accent">{entry.state}</span>
                                </td>
                                <td className="deployment-td">{entry.scope}</td>
                                <td className="deployment-td deployment-td--mono">{entry.sys_updated_on}</td>
                                <td className="deployment-td">{entry.sys_updated_by}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {!loading && totalPages > 1 && (
                <div className="tool-pagination">
                    <button
                        className="tool-pagination-btn"
                        disabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}
                    >
                        Previous
                    </button>
                    <span className="tool-pagination-info">Page {page} of {totalPages}</span>
                    <button
                        className="tool-pagination-btn"
                        disabled={page === totalPages}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
