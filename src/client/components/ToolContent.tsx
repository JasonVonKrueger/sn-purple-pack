import React from 'react';
import { ScriptAnalyzer } from './tools/ScriptAnalyzer';
import { TableInspector } from './tools/TableInspector';
import { LogViewer } from './tools/LogViewer';
import { PerformanceMonitor } from './tools/PerformanceMonitor';
import { CacheManager } from './tools/CacheManager';
import { ScriptDebugger } from './tools/ScriptDebugger';
import { UpdateSetTracker } from './tools/UpdateSetTracker';
import { InstanceHealthcheck } from './tools/InstanceHealthcheck';
import { IntegrationCreator } from './tools/IntegrationCreator';
import { PeerReview } from './tools/PeerReview';

interface ToolContentProps {
    activeTool: string;
}

export function ToolContent({ activeTool }: ToolContentProps) {
    switch (activeTool) {
        case 'script-analyzer': return <ScriptAnalyzer />;
        case 'table-inspector': return <TableInspector />;
        case 'log-viewer': return <LogViewer />;
        case 'performance-monitor': return <PerformanceMonitor />;
        case 'cache-manager': return <CacheManager />;
        case 'script-debugger': return <ScriptDebugger />;
        case 'update-set-tracker': return <UpdateSetTracker />;
        case 'instance-healthcheck': return <InstanceHealthcheck />;
        case 'integration-creator': return <IntegrationCreator />;
        case 'peer-review': return <PeerReview />;
        default: return <ScriptAnalyzer />;
    }
}
