import api from './api';

export async function getProjects(params = {}) {
    const sanitizedParams = Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== '' && value !== null && value !== undefined)
    );

    const { data } = await api.get('/projects', { params: sanitizedParams });
    return data.data;
}

export async function getProjectDetails(projectId) {
    const { data } = await api.get(`/projects/${projectId}`);
    return data.data;
}

export async function uploadProject(formData) {
    const { data } = await api.post('/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data.data;
}

export async function getMyUploads() {
    const { data } = await api.get('/projects/user/my-uploads');
    return data.data;
}

export async function getMyPurchases() {
    const { data } = await api.get('/projects/user/my-purchases');
    return data.data;
}

export async function getPendingProjects() {
    const { data } = await api.get('/projects/admin/pending');
    return data.data;
}

export async function approveProject(projectId) {
    const { data } = await api.patch(`/projects/${projectId}/approve`);
    return data.data;
}

export async function downloadPurchasedProject(projectId) {
    const response = await api.get(`/projects/${projectId}/download`, { responseType: 'blob' });
    return response;
}

export async function addReview(projectId, payload) {
    const { data } = await api.post(`/reviews/${projectId}`, payload);
    return data.data;
}

export async function getCreatorDashboard() {
    const { data } = await api.get('/dashboard/creator');
    return data.data;
}
