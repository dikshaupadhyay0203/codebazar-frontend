import api from './api';

export async function registerUser(payload) {
    const { data } = await api.post('/auth/send-otp', payload);
    return data.data;
}

export async function verifyRegistrationOtp(payload) {
    const { data } = await api.post('/auth/verify-otp', payload);
    return data.data;
}

export async function resendRegistrationOtp(payload) {
    const { data } = await api.post('/auth/resend-otp', payload);
    return data.data;
}

export async function loginUser(payload) {
    const { data } = await api.post('/auth/login', payload);
    return data.data;
}
