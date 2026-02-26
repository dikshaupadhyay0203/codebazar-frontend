import api from './api';

export async function askAIAgent(messages) {
    const { data } = await api.post('/ai/chat', { messages });
    return data.data;
}
