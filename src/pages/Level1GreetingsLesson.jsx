import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { Volume2, MessageSquare, Edit } from 'lucide-react';

const Level1GreetingsLesson = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');

    const greetings = [
        { phrase: "Hello", meaning: "A common, friendly greeting." },
        { phrase: "Hi", meaning: "A more informal 'hello'." },
        { phrase: "Good morning", meaning: "Used from morning until noon." },
        { phrase: "Good afternoon", meaning: "Used from noon until evening." },
        { phrase: "Goodbye", meaning: "Used when you are leaving." },
        { phrase: "My name is...", meaning: "Used to introduce yourself." },
    ];

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-8">The Friendship Formula: Greetings & Introductions</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2"><MessageSquare />1. Words to Say Hello</h2>
                <p className="text-slate-600 mb-4">Greetings are polite words we use when we meet someone.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {greetings.map(g => (
                        <div key={g.phrase} className="p-3 bg-green-50 rounded-lg flex items-center gap-3">
                            <button onClick={() => speak(g.phrase)} className="text-green-600 hover:text-green-800"><Volume2 /></button>
                            <div>
                                <p className="font-bold text-lg text-green-800">{g.phrase}</p>
                                <p className="text-sm text-slate-600">{g.meaning}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">2. A Simple Conversation</h2>
                <div className="p-4 bg-slate-100 rounded-lg space-y-2">
                    <p><strong>Ana:</strong> Hello!</p>
                    <p><strong>Ben:</strong> Hi, Ana!</p>
                    <p><strong>Ana:</strong> This is my friend, Chloe.</p>
                    <p><strong>Ben:</strong> Hello, Chloe. My name is Ben.</p>
                    <p><strong>Chloe:</strong> Hi, Ben. Nice to meet you.</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2"><Edit />3. Introduce Yourself!</h2>
                <p className="text-slate-600 mb-4">Fill in the blank with your name and practice saying the sentence.</p>
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-xl font-semibold text-slate-700">Hello, my name is</p>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full sm:w-48 h-12 text-center text-xl font-bold border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-400"
                        placeholder="your name"
                    />
                    <p className="text-xl font-semibold text-slate-700">.</p>
                </div>
                {name && <p className="text-center mt-4 text-lg">Great! Now try saying it: <strong className="text-green-700">"Hello, my name is {name}."</strong></p>}
            </WorksheetCard>

            <div className="mt-8 text-center">
                <BigButton onClick={() => navigate('/')} className="bg-gray-500 border-gray-600"> ← Back to Home </BigButton>
            </div>
        </div>
    );
};

export default Level1GreetingsLesson;