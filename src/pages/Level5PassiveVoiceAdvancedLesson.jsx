import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level5PassiveVoiceAdvancedLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const passiveForms = [
        { tense: 'Present Continuous', form: 'is/are being + P.P.', example: 'The house is being built.' },
        { tense: 'Present Perfect', form: 'has/have been + P.P.', example: 'The work has been finished.' },
        { tense: 'Modals', form: 'modal + be + P.P.', example: 'The email will be sent.' },
    ];

    const quizQuestions = [
        { active: "They are cleaning the room now.", passive: "The room is being cleaned now." },
        { active: "Someone has stolen my wallet.", passive: "My wallet has been stolen." },
        { active: "You must finish the report by 5 PM.", passive: "The report must be finished by 5 PM." },
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
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-rose-800 mb-8">Advanced Focus: The Passive Voice</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">1. Passive Voice in Other Tenses</h2>
                <p className="text-slate-600 mb-4">The passive can be used with most English tenses. The main verb is always the past participle.</p>
                <div className="space-y-4">
                    {passiveForms.map(p => (
                        <div key={p.tense} className="p-4 bg-rose-50 rounded-lg">
                            <p className="font-bold text-rose-800 text-xl">{p.tense}</p>
                            <p className="font-mono mt-1 p-2 bg-white rounded">{p.form}</p>
                            <p className="italic mt-1">"{p.example}"</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>A new bridge <strong>is being built</strong>.</li>
                    <li>My car <strong>has been repaired</strong>.</li>
                    <li>This work <strong>should be done</strong> carefully.</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">3. Change to Passive</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-rose-50 rounded-lg">
                            <p className="font-semibold text-slate-700">Active: "{q.active}"</p>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-rose-300 rounded-lg" placeholder="Type the passive sentence..." disabled={feedback[index] !== undefined} />
                                <button onClick={() => checkAnswer(index)} className="px-4 py-2 bg-rose-500 text-white rounded-lg" disabled={feedback[index] !== undefined}>Check</button>
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

export default Level5PassiveVoiceAdvancedLesson;