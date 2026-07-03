import React from 'react';
import { Button } from '@servicenow/react-components/Button';
import './ToolContent.css';

export function CacheManager() {
    return (
        <div className="tool-page">
            <div className="tool-header">
                <h1>Cache Manager</h1>
                <p>Monitor cache hit rates, manage invalidation, and optimize caching strategies.</p>
            </div>
            <div className="tool-actions">
                <Button label="Flush All Caches" variant="primary-negative" icon="clear-cache-fill" />
                <Button label="Flush Selected" variant="secondary" />
                <Button label="Refresh Stats" variant="tertiary" />
            </div>
            <div className="tool-grid">
                <div className="tool-card">
                    <p className="tool-card-title">Hit Rate</p>
                    <p className="tool-card-value">94.2%</p>
                    <p className="tool-card-meta">Target: &gt; 90%</p>
                </div>
                <div className="tool-card">
                    <p className="tool-card-title">Cache Size</p>
                    <p className="tool-card-value">2.4 GB</p>
                    <p className="tool-card-meta">Max: 4 GB allocated</p>
                </div>
                <div className="tool-card">
                    <p className="tool-card-title">Evictions (1h)</p>
                    <p className="tool-card-value">1,247</p>
                    <p className="tool-card-meta">LRU policy active</p>
                </div>
            </div>
            <div className="tool-list">
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--green"></span>
                        sys_cache_flush — 98.1% hit rate
                    </span>
                    <span className="pp-badge pp-badge--green">Healthy</span>
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--green"></span>
                        glide.ui.cache — 96.4% hit rate
                    </span>
                    <span className="pp-badge pp-badge--green">Healthy</span>
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--yellow"></span>
                        script_include_cache — 82.3% hit rate
                    </span>
                    <span className="pp-badge pp-badge--yellow">Degraded</span>
                </div>
                <div className="tool-list-item">
                    <span className="tool-list-label">
                        <span className="status-dot status-dot--red"></span>
                        metadata_cache — 67.8% hit rate
                    </span>
                    <span className="pp-badge pp-badge--red">Critical</span>
                </div>
            </div>
        </div>
    );
}
