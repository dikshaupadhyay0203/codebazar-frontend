import { useState } from 'react';
import toast from 'react-hot-toast';
import { askAIAgent } from '../services/aiService';

function AIAgentChat() {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hi! I am your CodeBazaar AI Agent. Ask me what project to buy, compare stacks, or budget-based recommendations.'
        }
    ]);

    const onSend = async () => {
        const trimmed = input.trim();
        if (!trimmed || loading) return;

        const nextMessages = [...messages, { role: 'user', content: trimmed }];
        setMessages(nextMessages);
        setInput('');
        setLoading(true);

        try {
            const response = await askAIAgent(nextMessages);
            setMessages((prev) => [...prev, { role: 'assistant', content: response.reply }]);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to get AI response');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card" style={{ maxWidth: 900, margin: '0 auto' }}>
            <h2>AI Chat Agent</h2>
            <p style={{ opacity: 0.85, marginTop: 0 }}>Get guidance on project selection, pricing, and purchase decisions.</p>

            <div style={{ background: '#0b1220', border: '1px solid #1f2937', borderRadius: 10, padding: 12, minHeight: 420, maxHeight: 420, overflowY: 'auto' }}>
                {messages.map((message, index) => (
                    <div key={`${message.role}-${index}`} style={{ marginBottom: 10, textAlign: message.role === 'user' ? 'right' : 'left' }}>
                        <span style={{ display: 'inline-block', maxWidth: '80%', padding: '8px 10px', borderRadius: 10, background: message.role === 'user' ? '#10B981' : '#1f2937', color: message.role === 'user' ? '#022c22' : '#E5E7EB', whiteSpace: 'pre-wrap' }}>
                            {message.content}
                        </span>
                    </div>
                ))}
                {loading ? <p style={{ color: '#10B981' }}>AI is typing...</p> : null}
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <input
                    className="input"
                    placeholder="Ask anything about projects on CodeBazaar..."
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault();
                            onSend();
                        }
                    }}
                />
                <button className="btn btn-accent" onClick={onSend} disabled={loading}>Send</button>
            </div>
        </div>
    );
}

export default AIAgentChat;
