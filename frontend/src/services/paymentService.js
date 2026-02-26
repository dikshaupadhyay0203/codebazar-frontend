import api from './api';

export async function buyProject(projectId) {
    const { data } = await api.post('/payments/buy', { projectId });
    return data.data;
}

export async function verifyPayment(payload) {
    const { data } = await api.post('/payments/verify', payload);
    return data.data;
}
