export interface PeerReviewForm {
    updateSetName: string;
    updateSetId: string;
    reviewer: string;
    priority: string;
    notes: string;
}

export interface PeerReviewRecord {
    sys_id: string;
    update_set_name: string;
    requester: { display_value: string; value: string };
    reviewer: { display_value: string; value: string };
    status: string;
    priority: string;
    notes: string;
    review_comments: string;
    requested_on: string;
    sys_created_on: string;
}

export interface UpdateSetOption {
    sys_id: string;
    name: string;
    state: string;
}

const API_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-UserToken': (window as any).g_ck,
};

export async function fetchMyUpdateSets(): Promise<UpdateSetOption[]> {
    const res = await fetch(
        '/api/now/table/sys_update_set?sysparm_query=state=in progress^ORDERBYDESCsys_updated_on&sysparm_limit=20&sysparm_fields=sys_id,name,state',
        { headers: API_HEADERS }
    );
    if (!res.ok) throw new Error('Failed to fetch update sets');
    const data = await res.json();
    return data.result || [];
}

export async function fetchReviews(): Promise<PeerReviewRecord[]> {
    const res = await fetch(
        '/api/now/table/u_peer_review?sysparm_query=ORDERBYDESCsys_created_on&sysparm_limit=25&sysparm_display_value=all',
        { headers: API_HEADERS }
    );
    if (!res.ok) throw new Error('Failed to fetch reviews');
    const data = await res.json();
    return data.result || [];
}

export async function submitReview(form: PeerReviewForm): Promise<string> {
    const res = await fetch('/api/now/table/u_peer_review', {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({
            update_set_name: form.updateSetName,
            update_set_id: form.updateSetId,
            requester: (window as any).NOW?.user_id || '',
            reviewer: form.reviewer,
            priority: form.priority,
            notes: form.notes,
            status: 'pending',
            requested_on: new Date().toISOString().replace('T', ' ').substring(0, 19),
        }),
    });
    if (!res.ok) throw new Error('Failed to submit review request');
    const data = await res.json();
    return data.result.sys_id;
}
