import React from 'react';
import { Button } from '@servicenow/react-components/Button';
import './ToolContent.css';

export function LogViewer() {
    return (
        <div className="tool-page">
            <div className="tool-header">
                <h1>Log Viewer</h1>
                <p>Stream and filter system logs, node logs, and transaction logs in real time.</p>
            </div>
            <div className="tool-actions">
                <Button label="Start Stream" variant="primary" icon="document-fill" />
                <Button label="Clear Logs" variant="secondary" />
                <Button label="Download" variant="tertiary" />
            </div>
            <div className="tool-grid">
                <div className="tool-card">
                    <p className="tool-card-title">Log Entries (24h)</p>
                    <p className="tool-card-value">12.8K</p>
                    <p className="tool-card-meta">Peak: 2,140/hr at 14:00</p>
                </div>
                <div className="tool-card">
                    <p className="tool-card-title">Errors</p>
                    <p className="tool-card-value">34</p>
                    <p className="tool-card-meta">Down 12% from yesterday</p>
                </div>
                <div className="tool-card">
                    <p className="tool-card-title">Warnings</p>
                    <p className="tool-card-value">156</p>
                    <p className="tool-card-meta">Up 8% from yesterday</p>
                </div>
            </div>
            <div className="tool-list">
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--red"></span>
                        [ERROR] NullPointerException in UserSessionManager
                    </span>
                    <span className="pp-badge">10:42:33</span>
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--yellow"></span>
                        [WARN] Slow query detected: incident table (4.2s)
                    </span>
                    <span className="pp-badge">10:41:58</span>
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--green"></span>
                        [INFO] Scheduled job completed: DataArchive
                    </span>
                    <span className="pp-badge">10:40:12</span>
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--yellow"></span>
                        [WARN] Memory usage above 80% on node2
                    </span>
                    <span className="pp-badge">10:39:45</span>
                </div>
            </div>
        </div>
    );
}
