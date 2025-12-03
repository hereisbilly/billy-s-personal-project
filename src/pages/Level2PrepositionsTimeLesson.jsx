import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level2PrepositionsTimeLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const prepositions = [
        { word: 'in', use: 'Months, years, seasons, parts of the day (in July, in 2023, in the morning)' },
        { word: 'on', use: 'Days and dates (on Monday, on July 4th)' },
        { word: 'at', use: 'Specific times, night (at 5 PM, at night)' },
    ];

    const quizQuestions = [
        { sentence: "My birthday is ___ July.", options: ["in", "on", "at"], answer: "in" },
        { sentence: "The meeting is ___ Monday.", options: ["in", "on", "at"], answer: "on" },
        { sentence: "I wake up ___ 7 AM.", options: ["in", "on", "at"], answer: "at" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-amber-800 mb-8">When Is It? Prepositions of Time</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">1. In, On, At for Time</h2>
                <p className="text-slate-600 mb-4">These prepositions help us talk about when something happens.</p>
                <div className="space-y-2">
                    {prepositions.map(p => (
                        <div key={p.word} className="p-3 bg-amber-50 rounded-lg">
                            <p><strong className="text-amber-800 text-2xl">{p.word}</strong>: {p.use}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>I was born <strong>in</strong> 1990.</li>
                    <li>Let's meet <strong>on</strong> Friday.</li>
                    <li>The movie starts <strong>at</strong> 8:00 PM.</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">3. Choose the Correct Preposition</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-amber-50 rounded-lg">
                            <p className="text-xl font-semibold text-slate-700 mb-3">{q.sentence.split('___')[0]} _____ {q.sentence.split('___')[1]}</p>
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

export default Level2PrepositionsTimeLesson;