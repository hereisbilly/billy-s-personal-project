import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level6AdvancedConjunctionsLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const markers = [
        { word: 'Nevertheless / Nonetheless', use: 'Contrast (like "but" or "however")' },
        { word: 'Furthermore / Moreover', use: 'Addition (like "and" or "also")' },
        { word: 'Inasmuch as', use: 'Reason/Extent (like "because" or "since")' },
        { word: 'Thereby', use: 'Result (shows the result of an action)' },
    ];

    const quizQuestions = [
        { sentence: "The plan was risky. ___, we decided to proceed.", options: ["Furthermore", "Nevertheless"], answer: "Nevertheless" },
        { sentence: "The new system is more efficient. ___, it is cheaper to run.", options: ["Thereby", "Furthermore"], answer: "Furthermore" },
        { sentence: "He passed the exam, ___ securing his place at the university.", options: ["inasmuch as", "thereby"], answer: "thereby" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-sky-800 mb-8">Academic & Formal Links: Discourse Markers</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">1. Connecting Ideas Formally</h2>
                <p className="text-slate-600 mb-4">Discourse markers are words or phrases that connect, organize, and manage what we say or write. These are common in academic and formal contexts.</p>
                <div className="space-y-4">
                    {markers.map(m => (
                        <div key={m.word} className="p-4 bg-sky-50 rounded-lg">
                            <p className="font-bold text-sky-800 text-xl">{m.word}</p>
                            <p className="text-slate-600 font-semibold">{m.use}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>It was a difficult journey; <strong>nevertheless</strong>, they arrived on time.</li>
                    <li>The research is flawed <strong>inasmuch as</strong> it relies on a small sample size.</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">3. Choose the Best Marker</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-sky-50 rounded-lg">
                            <p className="text-xl font-semibold text-slate-700 mb-3">{q.sentence.replace('___', '___________')}</p>
                            <div className="flex items-center gap-4">
                                {q.options.map(option => <button key={option} onClick={() => handleAnswerSelect(index, option)} className={`px-6 py-2 text-lg font-bold rounded-lg border-2 transition-colors disabled:cursor-not-allowed ${answers[index] === option && feedback[index] === true ? 'bg-green-200 border-green-400' : ''} ${answers[index] === option && feedback[index] === false ? 'bg-red-200 border-red-400' : ''} ${!feedback[index] ? 'bg-white border-slate-300 hover:bg-slate-100' : ''}`} disabled={feedback[index] !== undefined}>{option}</button>)}
                            </div>
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

export default Level6AdvancedConjunctionsLesson;