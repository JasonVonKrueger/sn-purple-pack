import React from 'react';
import { Button } from '@servicenow/react-components/Button';
import './ToolContent.css';

export function TableInspector() {
    return (
        <div className="tool-page">
            <div className="tool-header">
                <h1>Table Inspector</h1>
                <p>Browse and inspect table schemas, relationships, and field configurations.</p>
            </div>
            <div className="tool-actions">
                <Button label="Refresh Schema" variant="primary" icon="table-search-fill" />
                <Button label="Compare Tables" variant="secondary" />
            </div>
            <div className="tool-grid">
                <div className="tool-card">
                    <p className="tool-card-title">Tables Loaded</p>
                    <p className="tool-card-value">1,842</p>
                    <p className="tool-card-meta">Including custom tables</p>
                </div>
                <div className="tool-card">
                    <p className="tool-card-title">Custom Tables</p>
                    <p className="tool-card-value">64</p>
                    <p className="tool-card-meta">Across 12 scopes</p>
                </div>
                <div className="tool-card">
                    <p className="tool-card-title">Total Fields</p>
                    <p className="tool-card-value">23.4K</p>
                    <p className="tool-card-meta">Avg 12.7 per table</p>
                </div>
            </div>
            <div className="tool-list">
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--purple"></span>
                        incident — 89 fields, 14 business rules
                    </span>
                    <span className="pp-badge pp-badge--purple">System</span>
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--purple"></span>
                        sc_req_item — 72 fields, 8 business rules
                    </span>
                    <span className="pp-badge pp-badge--purple">System</span>
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--green"></span>
                        x_custom_tasks — 24 fields, 3 business rules
                    </span>
                    <span className="pp-badge pp-badge--green">Custom</span>
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--green"></span>
                        x_app_config — 8 fields, 1 business rule
                    </span>
                    <span className="pp-badge pp-badge--green">Custom</span>
                </div>
            </div>
        </div>
    );
}
