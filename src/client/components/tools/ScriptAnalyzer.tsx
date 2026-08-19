import React from 'react';
import { Button } from '@servicenow/react-components/Button';
import './ToolContent.css';

export function ScriptAnalyzer() {
    return (
        <div className="tool-page">
            <div className="tool-header">
                <h1>Script Analyzer</h1>
                <p>Analyze scripts for best practices, performance issues, and security vulnerabilities.</p>
            </div>
            <div className="tool-actions">
                <Button label="Run Full Analysis" variant="primary" icon="code-search-fill" />
                <Button label="Quick Scan" variant="secondary" />
                <Button label="Export Report" variant="tertiary" />
            </div>
            <div className="tool-grid">
                <div className="tool-card">
                    <p className="tool-card-title">Scripts Scanned</p>
                    <p className="tool-card-value">247</p>
                    <p className="tool-card-meta">Last run: 3 min ago</p>
                </div>
                <div className="tool-card">
                    <p className="tool-card-title">Issues Found</p>
                    <p className="tool-card-value">18</p>
                    <p className="tool-card-meta">5 critical, 8 warnings, 5 info</p>
                </div>
                <div className="tool-card">
                    <p className="tool-card-title">Code Quality Score</p>
                    <p className="tool-card-value">87/100</p>
                    <p className="tool-card-meta">Above average</p>
                </div>
            </div>
            <div className="tool-list">
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--red"></span>
                        GlideRecord without query limit in onChange_handler
                    </span>
                    <span className="pp-badge pp-badge--red">Critical</span>
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--yellow"></span>
                        Unused variable in Script Include: UserUtils
                    </span>
                    <span className="pp-badge pp-badge--yellow">Warning</span>
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--yellow"></span>
                        Synchronous AJAX call in client script
                    </span>
                    <span className="pp-badge pp-badge--yellow">Warning</span>
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--green"></span>
                        eval() usage in scheduled job script
                    </span>
                    <span className="pp-badge pp-badge--accent">Info</span>
                </div>
            </div>
        </div>
    );
}
