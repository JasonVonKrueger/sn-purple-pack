import React from 'react';
import { ScriptAnalyzer } from './tools/ScriptAnalyzer';
import { TableInspector } from './tools/TableInspector';
import { LogViewer } from './tools/LogViewer';
import { CodeSearch } from './tools/CodeSearch';
import { CacheManager } from './tools/CacheManager';
import { UpdateSetTracker } from './tools/UpdateSetTracker';
import { InstanceHealthcheck } from './tools/InstanceHealthcheck';
import { IntegrationCreator } from './tools/IntegrationCreator';
import { PeerReview } from './tools/PeerReview';
import { Deployment } from './tools/Deployment';

interface ToolContentProps {
    activeTool: string;
}

export function ToolContent({ activeTool }: ToolContentProps) {
    switch (activeTool) {
        case 'script-analyzer': return <ScriptAnalyzer />;
        case 'table-inspector': return <TableInspector />;
        case 'log-viewer': return <LogViewer />;
        case 'code-search': return <CodeSearch />;
        case 'cache-manager': return <CacheManager />;
        case 'update-set-tracker': return <UpdateSetTracker />;
        case 'instance-healthcheck': return <InstanceHealthcheck />;
        case 'integration-creator': return <IntegrationCreator />;
        case 'peer-review': return <PeerReview />;
        case 'deployment': return <Deployment />;
        default: return <ScriptAnalyzer />;
    }
}
