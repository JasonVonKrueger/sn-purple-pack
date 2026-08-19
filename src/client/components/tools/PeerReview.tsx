import React, { useState, useEffect } from 'react';
import { Input, InputValueSet } from '@servicenow/react-components/Input';
import { Button } from '@servicenow/react-components/Button';
import { Alert } from '@servicenow/react-components/Alert';
import {
    PeerReviewForm,
    PeerReviewRecord,
    UpdateSetOption,
    fetchMyUpdateSets,
    fetchReviews,
    submitReview,
} from './PeerReviewService';
import './ToolContent.css';

const PRIORITIES = ['low', 'normal', 'high', 'critical'];

function statusBadgeClass(status: string): string {
    switch (status) {
        case 'approved': return 'pp-badge pp-badge--green';
        case 'rejected': case 'changes_requested': return 'pp-badge pp-badge--red';
        case 'in_review': return 'pp-badge pp-badge--yellow';
        default: return 'pp-badge pp-badge--purple';
    }
}

export function PeerReview() {
    const [view, setView] = useState<'request' | 'reviews'>('reviews');
    const [updateSets, setUpdateSets] = useState<UpdateSetOption[]>([]);
    const [reviews, setReviews] = useState<PeerReviewRecord[]>([]);
    const [form, setForm] = useState<PeerReviewForm>({ updateSetName: '', updateSetId: '', reviewer: '', priority: 'normal', notes: '' });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ type: 'positive' | 'critical'; message: string } | null>(null);
    const [selectedUsIndex, setSelectedUsIndex] = useState(-1);

    useEffect(() => { fetchMyUpdateSets().then(setUpdateSets).catch(() => {}); }, []);
    useEffect(() => { if (view === 'reviews') fetchReviews().then(setReviews).catch(() => {}); }, [view]);

    function selectUpdateSet(index: number) {
        setSelectedUsIndex(index);
        setForm(prev => ({ ...prev, updateSetName: updateSets[index].name, updateSetId: updateSets[index].sys_id }));
    }

    async function handleSubmit() {
        if (!form.updateSetName) {
            setResult({ type: 'critical', message: 'An update set is required.' });
            return;
        }
        setLoading(true); setResult(null);
        try {
            const sysId = await submitReview(form);
            setResult({ type: 'positive', message: `Review request created (${sysId})` });
            setForm({ updateSetName: '', updateSetId: '', reviewer: '', priority: 'normal', notes: '' });
            setSelectedUsIndex(-1);
        } catch (err: any) { setResult({ type: 'critical', message: err.message }); }
        finally { setLoading(false); }
    }

    return (
        <div className="tool-page">
            <div className="tool-header">
                <h1>Peer Review</h1>
                <p>Request peer reviews of update sets and track review status.</p>
            </div>
            <div className="tool-actions">
                <Button label="View Requests" variant={view === 'reviews' ? 'primary' : 'secondary'} icon="list-fill" onClicked={() => setView('reviews')} />
                <Button label="New Request" variant={view === 'request' ? 'primary' : 'secondary'} icon="document-fill" onClicked={() => setView('request')} />
            </div>
            {result && <Alert status={result.type} content={result.message} icon={result.type === 'positive' ? 'circle-check-fill' : 'circle-exclamation-fill'} />}
            {view === 'request' ? (
                <div className="tool-card">
                    <p className="tool-card-title">Select Update Set</p>
                    <div className="tool-list">
                        {updateSets.map((us, i) => (
                            <div key={us.sys_id} className="tool-list-item" style={{ cursor: 'pointer', background: selectedUsIndex === i ? 'rgba(var(--pp-accent-3), 0.08)' : undefined }} onClick={() => selectUpdateSet(i)}>
                                <span className="tool-list-label">{us.name}</span>
                                {selectedUsIndex === i && <span className="pp-badge pp-badge--purple">Selected</span>}
                            </div>
                        ))}
                        {updateSets.length === 0 && <div className="tool-list-item"><span className="tool-list-label">No in-progress update sets found</span></div>}
                    </div>
                    <div className="tool-grid">
                        <Input label="Notes" value={form.notes} onValueSet={((e: any) => setForm(prev => ({ ...prev, notes: e.detail.payload.value }))) as InputValueSet} placeholder="Optional notes" />
                    </div>
                    <p className="tool-card-title">Priority</p>
                    <div className="tool-actions">
                        {PRIORITIES.map(p => (
                            <Button key={p} label={p.charAt(0).toUpperCase() + p.slice(1)} variant={form.priority === p ? 'primary' : 'secondary'} onClicked={() => setForm(prev => ({ ...prev, priority: p }))} />
                        ))}
                    </div>
                    <div className="tool-actions">
                        <Button label="Submit Request" variant="primary" icon="send-fill" disabled={loading} onClicked={handleSubmit} />
                    </div>
                </div>
            ) : (
                <div className="tool-list">
                    {reviews.map(r => (
                        <div key={r.sys_id} className="tool-list-item">
                            <span className="tool-list-label">
                                <span className="status-dot status-dot--purple"></span>
                                {r.update_set_name} — {r.reviewer?.display_value || 'Unknown'}
                            </span>
                            <span className={statusBadgeClass(r.status)}>{r.status?.replace('_', ' ')}</span>
                        </div>
                    ))}
                    {reviews.length === 0 && <div className="tool-list-item"><span className="tool-list-label">There are currently no Peer Review requests.</span></div>}
                </div>
            )}
        </div>
    );
}
