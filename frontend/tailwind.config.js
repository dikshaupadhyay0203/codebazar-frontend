/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#6366F1',
                secondary: '#22C55E',
                appbg: '#0F172A',
                card: '#1E293B',
                textmain: '#E2E8F0'
            },
            boxShadow: {
                glass: '0 10px 30px rgba(0,0,0,0.35)'
            }
        }
    },
    plugins: []
};
