import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level6AdvancedConditionalsLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const rules = [
        { word: 'Unless', use: 'Means "if not" or "except if".', example: 'You will fail unless you study.' },
        { word: 'Provided that / Providing that', use: 'A stronger "if"; emphasizes the condition.', example: 'You can go out, provided that you finish your homework first.' },
        { word: 'On condition that', use: 'Very formal; sets a strict, non-negotiable condition.', example: 'He was offered the job on condition that he sign a two-year contract.' },
    ];

    const quizQuestions = [
        { sentence: "I won't go ___ you go with me.", options: ["Unless", "Provided that"], answer: "Unless" },
        { sentence: "You can borrow the car, ___ you promise to be careful.", options: ["unless", "providing that"], answer: "providing that" },
        { sentence: "The loan was approved ___ the business plan was solid.", options: ["unless", "on condition that"], answer: "on condition that" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-sky-800 mb-8">Strict Conditions: Advanced Conditional Forms</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">1. Beyond "If"</h2>
                <p className="text-slate-600 mb-4">These phrases are used to set conditions, similar to "if", but with different levels of formality and emphasis.</p>
                <div className="space-y-4">
                    {rules.map(r => (
                        <div key={r.word} className="p-4 bg-sky-50 rounded-lg">
                            <p className="font-bold text-sky-800 text-xl">{r.word}</p>
                            <p className="text-slate-600 font-semibold">{r.use}</p>
                            <p className="text-slate-500 italic mt-1">"{r.example}"</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li><strong>Unless</strong> you have a ticket, you can't get in.</li>
                    <li>We will proceed with the project, <strong>provided that</strong> funding is secured.</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">3. Choose the Best Option</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-sky-50 rounded-lg">
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

export default Level6AdvancedConditionalsLesson;