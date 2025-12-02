import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const Level3TimeExpressionsLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const timeExpressions = [
        { expression: 'yesterday', example: 'I saw him yesterday.' },
        { expression: 'last week/month/year', example: 'She visited last month.' },
        { expression: '... ago', example: 'He called two days ago.' },
    ];

    const quizQuestions = [
        { sentence: "I went to the cinema ___.", options: ["yesterday", "ago", "last"], answer: "yesterday" },
        { sentence: "She traveled to Japan three years ___.", options: ["yesterday", "ago", "last"], answer: "ago" },
        { sentence: "We had a meeting ___ week.", options: ["yesterday", "ago", "last"], answer: "last" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-8">The Calendar Code: Past Time Expressions</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2"><Calendar />1. Words for "When"</h2>
                <p className="text-slate-600 mb-4">Time expressions tell us <strong>when</strong> a past action happened.</p>
                <div className="space-y-4">
                    {timeExpressions.map(t => (
                        <div key={t.expression} className="p-4 bg-blue-50 rounded-lg">
                            <p className="font-bold text-blue-800 text-xl">{t.expression}</p>
                            <p className="text-slate-600">Example: {t.example}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>He called me <strong>yesterday</strong>.</li>
                    <li>We visited Paris <strong>last year</strong>.</li>
                    <li>They arrived ten minutes <strong>ago</strong>.</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">3. Fill in the Time Word</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-blue-50 rounded-lg">
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

export default Level3TimeExpressionsLesson;