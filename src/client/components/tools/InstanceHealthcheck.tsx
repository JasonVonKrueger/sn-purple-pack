import React from 'react';
import { Button } from '@servicenow/react-components/Button';
import { ProgressBar } from '@servicenow/react-components/ProgressBar';
import './ToolContent.css';

export function InstanceHealthcheck() {
    return (
        <div className="tool-page">
            <div className="tool-header">
                <h1>Instance Healthcheck</h1>
                <p>Run comprehensive health checks on your instance configuration and performance.</p>
            </div>
            <div className="tool-actions">
                <Button label="Run Full Check" variant="primary" icon="health-status-fill" />
                <Button label="Quick Check" variant="secondary" />
                <Button label="Schedule Check" variant="tertiary" />
            </div>
            <div className="tool-grid">
                <div className="tool-card">
                    <p className="tool-card-title">Overall Health</p>
                    <p className="tool-card-value">92%</p>
                    <p className="tool-card-meta">Good — 2 issues found</p>
                </div>
                <div className="tool-card">
                    <p className="tool-card-title">Last Full Check</p>
                    <p className="tool-card-value">4h ago</p>
                    <p className="tool-card-meta">Duration: 2m 14s</p>
                </div>
                <div className="tool-card">
                    <p className="tool-card-title">Checks Passed</p>
                    <p className="tool-card-value">46/48</p>
                    <p className="tool-card-meta">2 warnings, 0 critical</p>
                </div>
            </div>
            <div className="tool-list">
                <div className="tool-list-item">
                    <span className="tool-list-label">Database Performance</span>
                    <ProgressBar value={95} max={100} />
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">Security Compliance</span>
                    <ProgressBar value={88} max={100} />
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">Plugin Compatibility</span>
                    <ProgressBar value={100} max={100} />
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--yellow"></span>
                        Orphaned records in sys_dictionary
                    </span>
                    <span className="pp-badge pp-badge--yellow">Warning</span>
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--yellow"></span>
                        3 deprecated API usages found
                    </span>
                    <span className="pp-badge pp-badge--yellow">Warning</span>
                </div>
            </div>
        </div>
    );
}
