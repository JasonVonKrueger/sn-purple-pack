import React from 'react';
import { Button } from '@servicenow/react-components/Button';
import './ToolContent.css';

export function UpdateSetTracker() {
    return (
        <div className="tool-page">
            <div className="tool-header">
                <h1>Update Set Tracker</h1>
                <p>Track update set progress, compare changes, and manage deployments.</p>
            </div>
            <div className="tool-actions">
                <Button label="Create Update Set" variant="primary" icon="change-fill" />
                <Button label="Compare Sets" variant="secondary" />
                <Button label="Export XML" variant="tertiary" />
            </div>
            <div className="tool-grid">
                <div className="tool-card">
                    <p className="tool-card-title">In Progress</p>
                    <p className="tool-card-value">3</p>
                    <p className="tool-card-meta">Current: Purple Pack Dev</p>
                </div>
                <div className="tool-card">
                    <p className="tool-card-title">Completed (30d)</p>
                    <p className="tool-card-value">28</p>
                    <p className="tool-card-meta">Last completed: 2h ago</p>
                </div>
                <div className="tool-card">
                    <p className="tool-card-title">Total Changes</p>
                    <p className="tool-card-value">412</p>
                    <p className="tool-card-meta">In current set: 34</p>
                </div>
            </div>
            <div className="tool-list">
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--green"></span>
                        Purple Pack Dev — 34 changes
                    </span>
                    <span className="pp-badge pp-badge--green">Current</span>
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--yellow"></span>
                        HR Module Fixes — 12 changes
                    </span>
                    <span className="pp-badge pp-badge--yellow">In Progress</span>
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--yellow"></span>
                        CMDB Cleanup v2 — 8 changes
                    </span>
                    <span className="pp-badge pp-badge--yellow">In Progress</span>
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--purple"></span>
                        Security Patch Jan-2024 — 56 changes
                    </span>
                    <span className="pp-badge pp-badge--purple">Completed</span>
                </div>
            </div>
        </div>
    );
}
