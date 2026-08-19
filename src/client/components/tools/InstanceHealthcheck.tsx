import React, { useState } from 'react';
import { Button } from '@servicenow/react-components/Button';
import { Alert } from '@servicenow/react-components/Alert';
import { HealthStatus, HealthCheckResult, runHealthCheck } from './InstanceHealthcheckService';
import './ToolContent.css';

function statusBadgeClass(status: HealthStatus): string {
    switch (status) {
        case 'ok': return 'pp-badge pp-badge--green'
        case 'warning': return 'pp-badge pp-badge--yellow'
        case 'critical': return 'pp-badge pp-badge--red'
        default: return 'pp-badge'
    }
}

function statusLabel(status: HealthStatus): string {
    switch (status) {
        case 'ok': return 'OK'
        case 'warning': return 'Warning'
        case 'critical': return 'Critical'
        default: return 'Unknown'
    }
}

function findingDotClass(level: string): string {
    switch (level) {
        case 'ok': return 'status-dot status-dot--green'
        case 'warning': return 'status-dot status-dot--yellow'
        case 'critical': return 'status-dot status-dot--red'
        default: return 'status-dot status-dot--accent'
    }
}

const LOADING_LABELS = [
    'Scheduled Jobs',
    'MID Servers & ECC Queue',
    'Integration Health',
    'Workflows & Flows',
    'Email',
    'System Log',
    'Table Growth',
]

export function InstanceHealthcheck() {
    const [result, setResult] = useState<HealthCheckResult | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleRun = () => {
        setLoading(true)
        setError(null)
        runHealthCheck()
            .then(r => { setResult(r); setLoading(false) })
            .catch((e: unknown) => {
                setError(e instanceof Error ? e.message : 'Health check failed')
                setLoading(false)
            })
    }

    const overallStatus: HealthStatus | null = result
        ? result.criticalCount > 0 ? 'critical' : result.warningCount > 0 ? 'warning' : 'ok'
        : null

    return (
        <div className="tool-page">
            <div className="tool-header">
                <h1>Instance Health Check</h1>
                <p>Run a comprehensive check of scheduled jobs, MID servers, integrations, workflows, email delivery, and more.</p>
            </div>

            <div className="tool-actions">
                <Button
                    label={loading ? 'Running checks…' : 'Run Health Check'}
                    variant="primary"
                    icon="health-status-fill"
                    disabled={loading}
                    onClicked={handleRun}
                />
                {result && !loading && (
                    <span className="health-last-run">
                        Last run: {result.runAt.toLocaleTimeString()}
                    </span>
                )}
            </div>

            {error && <Alert status="critical" content={error} icon="circle-exclamation-fill" />}

            {/* Loading skeleton */}
            {loading && (
                <div className="tool-list">
                    {LOADING_LABELS.map(name => (
                        <div key={name} className="tool-list-item">
                            <span className="tool-list-label">
                                <span className="status-dot status-dot--accent"></span>
                                Checking {name}…
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty state */}
            {!result && !loading && !error && (
                <div className="tool-list">
                    <div className="health-empty-state">
                        <span className="health-empty-icon" aria-hidden="true">⚕</span>
                        <p className="health-empty-title">Ready to check your instance</p>
                        <p className="health-empty-sub">Click "Run Health Check" to analyze 7 health categories in parallel.</p>
                    </div>
                </div>
            )}

            {/* Results */}
            {result && !loading && (
                <>
                    {/* Summary banner */}
                    <div className={`health-summary-banner health-summary-banner--${overallStatus}`}>
                        <span className="health-summary-icon" aria-hidden="true">
                            {overallStatus === 'ok' && '✓'}
                            {overallStatus === 'warning' && '⚠'}
                            {overallStatus === 'critical' && '✕'}
                        </span>
                        <span>
                            {overallStatus === 'ok' && 'Instance looks healthy — no issues detected.'}
                            {overallStatus === 'warning' && `${result.warningCount} warning${result.warningCount !== 1 ? 's' : ''} found — review the items below.`}
                            {overallStatus === 'critical' && `${result.criticalCount} critical issue${result.criticalCount !== 1 ? 's' : ''} require${result.criticalCount === 1 ? 's' : ''} immediate attention.`}
                        </span>
                    </div>

                    {/* Summary cards */}
                    <div className="tool-grid">
                        <div className="tool-card">
                            <p className="tool-card-title">Critical Issues</p>
                            <p className="tool-card-value" style={result.criticalCount > 0 ? { color: 'rgb(201,54,2)' } : undefined}>
                                {result.criticalCount}
                            </p>
                            <p className="tool-card-meta">Require immediate attention</p>
                        </div>
                        <div className="tool-card">
                            <p className="tool-card-title">Warnings</p>
                            <p className="tool-card-value" style={result.warningCount > 0 ? { color: 'rgb(168,137,21)' } : undefined}>
                                {result.warningCount}
                            </p>
                            <p className="tool-card-meta">Review recommended</p>
                        </div>
                        <div className="tool-card">
                            <p className="tool-card-title">Checks Passed</p>
                            <p className="tool-card-value">{result.passedCount} / {result.categories.length}</p>
                            <p className="tool-card-meta">Categories with no issues</p>
                        </div>
                    </div>

                    {/* Category cards */}
                    <div className="health-category-grid">
                        {result.categories.map(cat => (
                            <div key={cat.id} className={`health-category-card health-category-card--${cat.status}`}>
                                <div className="health-category-header">
                                    <span className="health-category-title">{cat.title}</span>
                                    <span className={statusBadgeClass(cat.status)}>
                                        {statusLabel(cat.status)}
                                    </span>
                                </div>
                                <div className="health-findings">
                                    {cat.findings.map((finding, i) => (
                                        <div key={i} className="health-finding">
                                            <span className={findingDotClass(finding.level)}></span>
                                            <span className="health-finding-text">{finding.message}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
