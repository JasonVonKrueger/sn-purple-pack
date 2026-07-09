import React, { useState, useRef } from 'react';
import { Button } from '@servicenow/react-components/Button';
import { Alert } from '@servicenow/react-components/Alert';
import {
    CodeSearchResult,
    ScriptTableKey,
    SCRIPT_TABLES,
    LIMIT_PER_TABLE,
    searchCode,
} from './CodeSearchService';
import './ToolContent.css';

const PAGE_SIZE = 20;

function tableBadgeClass(tableKey: string): string {
    switch (tableKey) {
        case 'sys_script_include': return 'pp-badge pp-badge--purple';
        case 'sys_script_client':  return 'pp-badge pp-badge--green';
        case 'sys_business_rule':  return 'pp-badge pp-badge--yellow';
        case 'sys_script':         return 'pp-badge pp-badge--red';
        case 'sys_ui_script':      return 'pp-badge pp-badge--purple';
        case 'sys_ui_action':      return 'pp-badge pp-badge--green';
        default:                   return 'pp-badge';
    }
}

function recordUrl(r: CodeSearchResult): string {
    return `/${r.table}.do?sys_id=${r.sys_id}`;
}

export function CodeSearch() {
    const [query, setQuery] = useState('');
    const [tableKey, setTableKey] = useState<ScriptTableKey>('all');
    const [allResults, setAllResults] = useState<CodeSearchResult[]>([]);
    const [results, setResults] = useState<CodeSearchResult[]>([]);
    const [total, setTotal] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const inputRef = useRef<HTMLInputElement>(null);

    function applyFilter(items: CodeSearchResult[], key: ScriptTableKey) {
        const filtered = key === 'all' ? items : items.filter(r => r.table === key);
        setResults(filtered);
        setTotal(filtered.length);
    }

    async function handleSearch() {
        const trimmed = query.trim();
        if (!trimmed) return;
        setLoading(true);
        setError(null);
        setPage(1);
        try {
            const res = await searchCode(trimmed, 'all');
            setAllResults(res.results);
            applyFilter(res.results, tableKey);
        } catch (err: any) {
            setError(err.message ?? 'Search failed');
            setAllResults([]);
            setResults([]);
            setTotal(null);
        } finally {
            setLoading(false);
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') handleSearch();
    }

    function handleClear() {
        setQuery('');
        setAllResults([]);
        setResults([]);
        setTotal(null);
        setError(null);
        setPage(1);
        inputRef.current?.focus();
    }

    function handleTableKeyChange(key: ScriptTableKey) {
        setTableKey(key);
        setPage(1);
        if (allResults.length > 0) {
            applyFilter(allResults, key);
        }
    }

    const totalPages = Math.ceil(results.length / PAGE_SIZE);
    const pagedResults = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="tool-page">
            <div className="tool-header">
                <h1>Code Search</h1>
                <p>Search for code across Script Includes, Business Rules, Client Scripts, and more.</p>
            </div>

            <div className="tool-actions">
                <input
                    ref={inputRef}
                    className="tool-search"
                    type="text"
                    placeholder="Search scripts…"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                    style={{ flex: 1 }}
                />
                <Button
                    label="Search"
                    variant="primary"
                    icon="code-search-fill"
                    disabled={loading || !query.trim()}
                    onClicked={handleSearch}
                />
                {(results.length > 0 || total !== null) && (
                    <Button label="Clear" variant="tertiary" onClicked={handleClear} />
                )}
            </div>

            <div className="tool-actions" style={{ flexWrap: 'wrap' }}>
                <Button
                    label="All Types"
                    variant={tableKey === 'all' ? 'primary' : 'secondary'}
                    onClicked={() => handleTableKeyChange('all')}
                />
                {SCRIPT_TABLES.map(t => (
                    <Button
                        key={t.key}
                        label={t.label}
                        variant={tableKey === t.key ? 'primary' : 'secondary'}
                        onClicked={() => handleTableKeyChange(t.key as ScriptTableKey)}
                    />
                ))}
            </div>

            {error && <Alert status="critical" content={error} icon="circle-exclamation-fill" />}

            {total !== null && !loading && (
                <div className="tool-search-wrap">
                    <span className="tool-search-count">
                        {total} result{total !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
                        {tableKey !== 'all' ? ` in ${SCRIPT_TABLES.find(t => t.key === tableKey)?.label ?? tableKey}` : ''}
                        {tableKey === 'all' ? ` (up to ${LIMIT_PER_TABLE} per type shown)` : ''}
                    </span>
                </div>
            )}

            <div className="tool-list">
                {loading && (
                    <div className="tool-list-item">
                        <span className="tool-list-label">Searching…</span>
                    </div>
                )}
                {!loading && pagedResults.map(r => (
                    <div key={`${r.table}-${r.sys_id}`} className="tool-list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                            <span className="tool-list-label" style={{ fontWeight: 600 }}>
                                <span className="status-dot status-dot--purple"></span>
                                <a href={recordUrl(r)} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                                    {r.name}
                                </a>
                                {r.scope_label && r.scope_label !== 'Global' && (
                                    <span style={{ fontWeight: 400, opacity: 0.7 }}> ({r.scope_label})</span>
                                )}
                            </span>
                            <span className={tableBadgeClass(r.table)}>{r.tableLabel}</span>
                        </div>
                        {r.snippet && (
                            <pre className="code-search-snippet">{r.snippet}</pre>
                        )}
                    </div>
                ))}
                {!loading && total === 0 && (
                    <div className="tool-list-item">
                        <span className="tool-list-label">No results found for &ldquo;{query}&rdquo;.</span>
                    </div>
                )}
                {!loading && total === null && (
                    <div className="tool-list-item">
                        <span className="tool-list-label">Enter a search term and press Search or Enter.</span>
                    </div>
                )}
            </div>

            {!loading && totalPages > 1 && (
                <div className="tool-pagination">
                    <button
                        className="tool-pagination-btn"
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                    >
                        Previous
                    </button>
                    <span className="tool-pagination-info">Page {page} of {totalPages}</span>
                    <button
                        className="tool-pagination-btn"
                        disabled={page === totalPages}
                        onClick={() => setPage(p => p + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
