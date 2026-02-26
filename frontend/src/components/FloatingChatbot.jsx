import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { askAIAgent } from '../services/aiService';
import { useAuth } from '../hooks/useAuth';

function FloatingChatbot() {
    const { isAuthenticated } = useAuth();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I am CodeBazaar Assistant. Ask me what project to buy, compare stacks, or budget suggestions.' }
    ]);

    const buttonLabel = useMemo(() => (open ? 'Close' : 'AI Chat'), [open]);

    const onSend = async () => {
        const content = input.trim();
        if (!content || loading) return;

        if (!isAuthenticated) {
            toast.error('Please login to use AI chat');
            return;
        }

        const nextMessages = [...messages, { role: 'user', content }];
        setMessages(nextMessages);
        setInput('');
        setLoading(true);

        try {
            const result = await askAIAgent(nextMessages);
            setMessages((prev) => [...prev, { role: 'assistant', content: result.reply }]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: 'AI is temporarily unavailable. Please try again in a moment.' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="fixed bottom-6 right-6 z-50 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-indigo-500"
            >
                {buttonLabel}
            </button>

            <AnimatePresence>
                {open ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.96 }}
                        className="fixed bottom-24 right-6 z-50 w-[360px] overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
                    >
                        <div className="bg-primary px-4 py-3 text-white">
                            <p className="font-semibold">CodeBazaar Assistant</p>
                            <p className="text-xs opacity-90">Intercom-style quick help</p>
                        </div>

                        <div className="h-80 space-y-2 overflow-y-auto bg-slate-900 p-4">
                            {messages.map((message, idx) => (
                                <div key={`${message.role}-${idx}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${message.role === 'user' ? 'bg-primary text-white' : 'bg-slate-800 text-slate-200'}`}>
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                            {loading ? <p className="text-xs text-slate-400">Assistant is typing...</p> : null}
                        </div>

                        <div className="flex gap-2 border-t border-slate-700 bg-slate-900 p-3">
                            <input
                                className="input"
                                value={input}
                                onChange={(event) => setInput(event.target.value)}
                                placeholder="Ask anything..."
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault();
                                        onSend();
                                    }
                                }}
                            />
                            <button type="button" className="btn-accent" onClick={onSend} disabled={loading}>
                                Send
                            </button>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </>
    );
}

export default FloatingChatbot;
