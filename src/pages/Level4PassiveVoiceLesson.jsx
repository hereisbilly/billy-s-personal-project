import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level4PassiveVoiceLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quizQuestions = [
        { active: "Someone cleans the office every day.", passive: "The office is cleaned every day." },
        { active: "They built this bridge in 1960.", passive: "This bridge was built in 1960." },
        { active: "Someone stole my bike.", passive: "My bike was stolen." },
    ];

    const handleAnswerChange = (index, value) => {
        setAnswers(prev => ({ ...prev, [index]: value }));
    };

    const checkAnswer = (index) => {
        const userAnswer = answers[index]?.trim().replace(/\.$/, '').toLowerCase();
        const correctAnswer = quizQuestions[index].passive.replace(/\.$/, '').toLowerCase();
        setFeedback(prev => ({ ...prev, [index]: userAnswer === correctAnswer }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-violet-800 mb-8">Shifting Focus: The Passive Voice</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">1. When the Action is More Important</h2>
                <p className="text-slate-600 mb-4">We use the passive voice when we want to focus on the action, not who did it. The object of the active sentence becomes the subject of the passive sentence.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-bold text-blue-800 text-xl">Present Simple Passive</h3>
                        <p className="font-mono mt-1 p-2 bg-white rounded">am/is/are + Past Participle</p>
                        <p className="italic mt-1">"English is spoken here."</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <h3 className="font-bold text-purple-800 text-xl">Past Simple Passive</h3>
                        <p className="font-mono mt-1 p-2 bg-white rounded">was/were + Past Participle</p>
                        <p className="italic mt-1">"The window was broken."</p>
                    </div>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">2. Active vs. Passive</h2>
                <div className="p-4 bg-slate-100 rounded-lg space-y-2 text-lg">
                    <p><strong>Active:</strong> Leonardo da Vinci painted the Mona Lisa.</p>
                    <p><strong>Passive:</strong> The Mona Lisa was painted by Leonardo da Vinci.</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">3. Change to Passive</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-violet-50 rounded-lg">
                            <p className="font-semibold text-slate-700">Active: "{q.active}"</p>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-violet-300 rounded-lg" placeholder="Type the passive sentence..." disabled={feedback[index] !== undefined} />
                                <button onClick={() => checkAnswer(index)} className="px-4 py-2 bg-violet-500 text-white rounded-lg" disabled={feedback[index] !== undefined}>Check</button>
                            </div>
                            {feedback[index] === true && <p className="text-green-600 font-bold mt-2">Correct!</p>}
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            <div className="mt-8 text-center">
                <BigButton onClick={() => navigate('/')} className="bg-gray-500 border-gray-600"> ← Back to Home </BigButton>
            </div>
        </div>
    );
};

export default Level4PassiveVoiceLesson;