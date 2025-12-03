import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level4PastContinuousVsPastSimpleLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quizQuestions = [
        { sentence: "While I ___ (drive), I ___ (see) a deer.", options: ["was driving, saw", "drove, was seeing"], answer: "was driving, saw" },
        { sentence: "He ___ (fall) asleep while he ___ (watch) TV.", options: ["fell, was watching", "was falling, watched"], answer: "fell, was watching" },
        { sentence: "When the phone ___ (ring), she ___ (take) a shower.", options: ["rang, was taking", "was ringing, took"], answer: "rang, was taking" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-violet-800 mb-8">Background vs. Main Event: Past Continuous vs. Past Simple</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">1. Interrupted Actions</h2>
                <p className="text-slate-600 mb-4">We often use these tenses together. The Past Continuous is the longer, "background" action. The Past Simple is the shorter, "interrupting" action.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-bold text-blue-800 text-xl">Past Continuous</h3>
                        <p className="text-slate-600">The longer background action.</p>
                        <p className="italic mt-1">"I was walking..."</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <h3 className="font-bold text-purple-800 text-xl">Past Simple</h3>
                        <p className="text-slate-600">The short action that interrupts.</p>
                        <p className="italic mt-1">"...when it started to rain."</p>
                    </div>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">2. Visualizing the Story</h2>
                <div className="p-4 bg-slate-100 rounded-lg space-y-2 text-lg">
                    <p>I <strong className="text-blue-600">was reading</strong> a book (long action) when the phone <strong className="text-purple-600">rang</strong> (short, interrupting action).</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">3. Choose the Correct Tenses</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-violet-50 rounded-lg">
                            <p className="text-xl font-semibold text-slate-700 mb-3">{q.sentence}</p>
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                {q.options.map(option => <button key={option} onClick={() => handleAnswerSelect(index, option)} className={`px-4 py-2 text-lg font-bold rounded-lg border-2 transition-colors disabled:cursor-not-allowed w-full ${answers[index] === option && feedback[index] === true ? 'bg-green-200 border-green-400' : ''} ${answers[index] === option && feedback[index] === false ? 'bg-red-200 border-red-400' : ''} ${!feedback[index] ? 'bg-white border-slate-300 hover:bg-slate-100' : ''}`} disabled={feedback[index] !== undefined}>{option}</button>)}
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

export default Level4PastContinuousVsPastSimpleLesson;