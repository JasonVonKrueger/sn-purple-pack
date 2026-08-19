import React, { useState, useEffect, useRef } from 'react';
import './ScanAndDeploy.css';

type PhaseStatus = 'idle' | 'running' | 'success' | 'error';

interface PhaseState {
    status: PhaseStatus;
    details: string;
    progress: number;
}

const PHASE_DEFS = [
    {
        number: 1,
        title: 'Instance Scan',
        description: 'Runs ServiceNow Instance Scan checks against the update set to detect issues before deployment.',
    },
    {
        number: 2,
        title: 'Commit to Git',
        description: 'Exports the update set XML and commits it to the configured Git repository.',
    },
    {
        number: 3,
        title: 'Deploy to Test',
        description: 'Retrieves the committed XML from Git and applies it to the test ServiceNow instance.',
    },
];

const MOCK_PHASE_OUTPUTS: Record<number, string[]> = {
    1: [
        '✓ Initializing instance scan…',
        '✓ Loading scan check suite (47 checks)',
        '✓ Checking business rules…',
        '✓ Checking client scripts…',
        '✓ Checking script includes…',
        '⚠ Warning: 2 unchecked client scripts detected',
        '✓ Checking UI policies…',
        '✓ Checking access controls…',
        '✓ Scan complete — 1 warning, 0 errors',
    ],
    2: [
        '✓ Connecting to Git remote…',
        '✓ Exporting update set XML (34 records)…',
        '✓ Staging changes…',
        '✓ Committing: "chore: export update set Cohesion Dev"',
        '✓ Pushed to origin/main — commit a3f8c2d',
    ],
    3: [
        '✓ Fetching XML from Git (commit a3f8c2d)…',
        '✓ Connecting to test instance…',
        '✓ Uploading update set XML…',
        '✓ Previewing update set…',
        '✓ No conflicts detected',
        '✓ Committing update set…',
        '✓ Deployment complete — update set applied successfully',
    ],
};

function phaseIcon(status: PhaseStatus, number: number): string {
    if (status === 'success') return '✓';
    if (status === 'error') return '✗';
    if (status === 'running') return '…';
    return String(number);
}

function badgeLabel(status: PhaseStatus): string {
    switch (status) {
        case 'running': return 'Running';
        case 'success': return 'Complete';
        case 'error': return 'Failed';
        default: return 'Pending';
    }
}

function getRecordInfo(): { id: string; name: string } {
    try {
        const params = new URLSearchParams(window.location.search);
        return {
            id: params.get('sysparm_record_id') || '',
            name: params.get('sysparm_record_name') || 'Unknown Update Set',
        };
    } catch (err) {
        console.error('[ScanAndDeploy] Failed to read URL parameters:', err);
        return { id: '', name: 'Unknown Update Set' };
    }
}

export function ScanAndDeploy() {
    const record = getRecordInfo();
    const [phases, setPhases] = useState<PhaseState[]>(
        PHASE_DEFS.map(() => ({ status: 'idle', details: '', progress: 0 }))
    );
    const [isRunning, setIsRunning] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);
    const abortRef = useRef(false);

    function updatePhase(index: number, update: Partial<PhaseState>) {
        setPhases(prev => prev.map((p, i) => (i === index ? { ...p, ...update } : p)));
    }

    async function runPhase(phaseIndex: number): Promise<boolean> {
        const lines = MOCK_PHASE_OUTPUTS[phaseIndex + 1];
        updatePhase(phaseIndex, { status: 'running', details: '', progress: 0 });

        let accumulated = '';
        for (let i = 0; i < lines.length; i++) {
            if (abortRef.current) return false;
            await delay(350 + Math.random() * 250);
            accumulated += (accumulated ? '\n' : '') + lines[i];
            const progress = Math.round(((i + 1) / lines.length) * 100);
            updatePhase(phaseIndex, { details: accumulated, progress });
        }

        await delay(300);
        updatePhase(phaseIndex, { status: 'success', progress: 100 });
        return true;
    }

    async function handleRun() {
        abortRef.current = false;
        setIsRunning(true);
        setIsDone(false);
        setHasFailed(false);
        setPhases(PHASE_DEFS.map(() => ({ status: 'idle', details: '', progress: 0 })));

        for (let i = 0; i < PHASE_DEFS.length; i++) {
            if (abortRef.current) break;
            const ok = await runPhase(i);
            if (!ok) {
                updatePhase(i, { status: 'error', details: 'Operation cancelled.' });
                setHasFailed(true);
                setIsRunning(false);
                return;
            }
        }

        setIsRunning(false);
        setIsDone(true);
    }

    function handleCancel() {
        abortRef.current = true;
    }

    function handleReset() {
        abortRef.current = true;
        setIsRunning(false);
        setIsDone(false);
        setHasFailed(false);
        setPhases(PHASE_DEFS.map(() => ({ status: 'idle', details: '', progress: 0 })));
    }

    const overallStatus = isDone
        ? 'success'
        : hasFailed
        ? 'error'
        : isRunning
        ? 'running'
        : 'idle';

    return (
        <div className="sad-container">
            <div className="sad-header">
                <h2>Scan &amp; Deploy</h2>
                <p>Run a three-phase pipeline: scan the update set, commit it to Git, then deploy it to the test instance.</p>
            </div>

            {record.name && (
                <div className="sad-info-bar">
                    <span className="sad-info-bar-label">Update Set:</span>
                    <span>{record.name}</span>
                </div>
            )}

            <div className="sad-phases">
                {PHASE_DEFS.map((def, i) => {
                    const phase = phases[i];
                    return (
                        <div
                            key={def.number}
                            className={`sad-phase sad-phase--${phase.status}`}
                        >
                            <div className="sad-phase-indicator">
                                <div className="sad-phase-circle">
                                    {phaseIcon(phase.status, def.number)}
                                </div>
                            </div>
                            <div className="sad-phase-body">
                                <div className="sad-phase-title-row">
                                    <span className="sad-phase-title">
                                        Phase {def.number}: {def.title}
                                    </span>
                                    <span className={`sad-phase-badge sad-badge--${phase.status}`}>
                                        {badgeLabel(phase.status)}
                                    </span>
                                </div>
                                <p className="sad-phase-description">{def.description}</p>
                                {phase.status === 'running' && (
                                    <div className="sad-progress-bar">
                                        <div
                                            className="sad-progress-fill"
                                            style={{ width: `${phase.progress}%` }}
                                        />
                                    </div>
                                )}
                                {phase.details && (
                                    <pre className="sad-phase-details">{phase.details}</pre>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="sad-actions">
                {!isRunning && !isDone && !hasFailed && (
                    <button className="sad-btn sad-btn--primary" onClick={handleRun}>
                        Run Pipeline
                    </button>
                )}
                {isRunning && (
                    <button className="sad-btn sad-btn--secondary" onClick={handleCancel}>
                        Cancel
                    </button>
                )}
                {(isDone || hasFailed) && (
                    <button className="sad-btn sad-btn--secondary" onClick={handleReset}>
                        Reset
                    </button>
                )}
                <span
                    className={[
                        'sad-status-text',
                        overallStatus === 'success' && 'sad-status-text--success',
                        overallStatus === 'error' && 'sad-status-text--error',
                    ].filter(Boolean).join(' ')}
                >
                    {overallStatus === 'running' && 'Pipeline running…'}
                    {overallStatus === 'success' && '✓ All phases completed successfully'}
                    {overallStatus === 'error' && '✗ Pipeline failed'}
                </span>
            </div>
        </div>
    );
}

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
