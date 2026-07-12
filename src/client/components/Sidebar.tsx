import React from 'react';
import { Icon, type IconName } from '@servicenow/react-components/Icon';
import './Sidebar.css';

interface NavItem {
    id: string;
    label: string;
    icon: IconName;
}

const NAV_ITEMS: NavItem[] = [
    { id: 'script-analyzer', label: 'Script Analyzer', icon: 'code-search-fill' },
    { id: 'table-inspector', label: 'Table Inspector', icon: 'table-search-fill' },
    { id: 'log-viewer', label: 'Log Viewer', icon: 'document-fill' },
    { id: 'code-search', label: 'Code Search', icon: 'list-search-fill' },
    { id: 'update-set-tracker', label: 'Update Set Tracker', icon: 'change-fill' },
    { id: 'instance-healthcheck', label: 'Instance Healthcheck', icon: 'health-status-fill' },
    { id: 'integration-creator', label: 'Integration Creator', icon: 'plug-fill' },
    { id: 'peer-review', label: 'Peer Review', icon: 'user-group-fill' },
    { id: 'deployment', label: 'Deployment', icon: 'rocketship-fill' },
];

interface SidebarProps {
    activeTool: string;
    onNavigate: (id: string, label: string) => void;
}

export function Sidebar({ activeTool, onNavigate }: SidebarProps) {
    return (
        <aside className="pp-sidebar">
            <div className="pp-sidebar-header">
                <Icon icon="toolbox-fill" size="lg" />
                <span className="pp-sidebar-title">Purple Pack</span>
            </div>
            <nav className="pp-sidebar-nav">
                {NAV_ITEMS.map((item) => (
                    <div
                        key={item.id}
                        className={`pp-nav-item ${activeTool === item.id ? 'pp-nav-item--active' : ''}`}
                        onClick={() => onNavigate(item.id, item.label)}
                        role="button"
                        tabIndex={0}
                    >
                        <Icon icon={item.icon} size="md" />
                        <span className="pp-nav-label">{item.label}</span>
                    </div>
                ))}
            </nav>
            <div className="pp-sidebar-footer">
                <span className="pp-version">v1.0.0</span>
            </div>
        </aside>
    );
}
