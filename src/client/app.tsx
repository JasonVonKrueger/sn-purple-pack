import React, { useState } from 'react';
import './app.css';
import { Sidebar } from './components/Sidebar';
import { ToolContent } from './components/ToolContent';

export function App() {
    const params = new URLSearchParams(window.location.search);
    const initialTool = params.get('tool') || 'script-analyzer';
    const [activeTool, setActiveTool] = useState(initialTool);

    function navigateTo(toolId: string, toolName: string) {
        setActiveTool(toolId);
        const path = `?tool=${toolId}`;
        if (window.self !== window.top) {
            (window as any).CustomEvent?.fireTop?.('magellanNavigator.permalink.set', {
                relativePath: `purple_pack.do${path}`,
                title: `Cohesion - ${toolName}`
            });
        } else {
            window.history.pushState({}, '', path);
            document.title = `Cohesion - ${toolName}`;
        }
    }

    return (
        <div className="pp-app">
            <Sidebar activeTool={activeTool} onNavigate={navigateTo} />
            <main className="pp-content">
                <ToolContent activeTool={activeTool} />
            </main>
        </div>
    );
}
