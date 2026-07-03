import React from 'react';
import { Button } from '@servicenow/react-components/Button';
import { ProgressBar } from '@servicenow/react-components/ProgressBar';
import './ToolContent.css';

export function PerformanceMonitor() {
    return (
        <div className="tool-page">
            <div className="tool-header">
                <h1>Performance Monitor</h1>
                <p>Track response times, throughput, and resource utilization across your instance.</p>
            </div>
            <div className="tool-actions">
                <Button label="Refresh Metrics" variant="primary" icon="chart-line-fill" />
                <Button label="Set Baseline" variant="secondary" />
            </div>
            <div className="tool-grid">
                <div className="tool-card">
                    <p className="tool-card-title">Avg Response Time</p>
                    <p className="tool-card-value">142ms</p>
                    <p className="tool-card-meta">Target: &lt; 200ms</p>
                </div>
                <div className="tool-card">
                    <p className="tool-card-title">Transactions/min</p>
                    <p className="tool-card-value">3,847</p>
                    <p className="tool-card-meta">Peak: 5,120 at 09:15</p>
                </div>
                <div className="tool-card">
                    <p className="tool-card-title">Active Sessions</p>
                    <p className="tool-card-value">284</p>
                    <p className="tool-card-meta">Capacity: 500</p>
                </div>
            </div>
            <div className="tool-list">
                <div className="tool-list-item">
                    <span className="tool-list-label">CPU Usage — Node 1</span>
                    <ProgressBar value={62} max={100} />
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">CPU Usage — Node 2</span>
                    <ProgressBar value={48} max={100} />
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">Memory — Node 1</span>
                    <ProgressBar value={74} max={100} />
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">Memory — Node 2</span>
                    <ProgressBar value={81} max={100} />
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">Disk I/O</span>
                    <ProgressBar value={35} max={100} />
                </div>
            </div>
        </div>
    );
}
