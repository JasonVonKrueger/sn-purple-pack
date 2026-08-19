import React from 'react';
import { createRoot } from 'react-dom/client';
import { ScanAndDeploy } from './components/ScanAndDeploy';
import './theme.css';

const container = document.getElementById('scan-deploy-root');
if (container) {
    const root = createRoot(container);
    root.render(<ScanAndDeploy />);
}
