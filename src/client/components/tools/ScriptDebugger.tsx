import React from 'react';
import { Button } from '@servicenow/react-components/Button';
import './ToolContent.css';

export function ScriptDebugger() {
    return (
        <div className="tool-page">
            <div className="tool-header">
                <h1>Script Debugger</h1>
                <p>Set breakpoints, inspect variables, and step through server-side scripts.</p>
            </div>
            <div className="tool-actions">
                <Button label="Start Debug Session" variant="primary" icon="bug-search-fill" />
                <Button label="Step Over" variant="secondary" />
                <Button label="Step Into" variant="secondary" />
                <Button label="Continue" variant="tertiary" />
            </div>
            <div className="tool-grid">
                <div className="tool-card">
                    <p className="tool-card-title">Active Breakpoints</p>
                    <p className="tool-card-value">7</p>
                    <p className="tool-card-meta">Across 3 scripts</p>
                </div>
                <div className="tool-card">
                    <p className="tool-card-title">Watch Expressions</p>
                    <p className="tool-card-value">4</p>
                    <p className="tool-card-meta">2 variables, 2 expressions</p>
                </div>
                <div className="tool-card">
                    <p className="tool-card-title">Call Stack Depth</p>
                    <p className="tool-card-value">5</p>
                    <p className="tool-card-meta">Current frame: processRequest</p>
                </div>
            </div>
            <div className="tool-list">
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--red"></span>
                        Breakpoint hit: UserUtils.js:42
                    </span>
                    <span className="pp-badge pp-badge--red">Paused</span>
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--accent"></span>
                        current.state = &quot;resolved&quot;
                    </span>
                    <span className="pp-badge pp-badge--accent">Variable</span>
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--accent"></span>
                        gr.getRowCount() = 148
                    </span>
                    <span className="pp-badge pp-badge--accent">Expression</span>
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--green"></span>
                        Session timeout: 28 min remaining
                    </span>
                    <span className="pp-badge pp-badge--green">Active</span>
                </div>
            </div>
        </div>
    );
}
