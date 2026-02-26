/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#8B5CF6',
                secondary: '#94A3B8',
                appbg: '#020617',
                sidebar: '#0F172A',
                card: '#1F2937',
                border: '#334155',
                textmain: '#E2E8F0',
                textmuted: '#94A3B8'
            },
            boxShadow: {
                glass: '0 10px 30px rgba(0,0,0,0.35)'
            }
        }
    },
    plugins: []
};
