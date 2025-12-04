import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level6AdvancedArticlesLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const rules = [
        { type: 'General Abstract Concepts', rule: 'Use the zero article (Ø) to talk about abstract ideas in general.', example: 'Ø Love is a powerful emotion. / Ø Knowledge is power.' },
        { type: 'Specific Abstract Concepts', rule: 'Use "the" when referring to a specific instance of that abstract idea.', example: 'The love he felt for his family was immense.' },
    ];

    const quizQuestions = [
        { sentence: "___ happiness is something everyone seeks.", options: ["The", "Ø (no article)"], answer: "Ø (no article)" },
        { sentence: "___ information you gave me was very helpful.", options: ["The", "Ø (no article)"], answer: "The" },
        { sentence: "___ history is a fascinating subject.", options: ["The", "Ø (no article)"], answer: "Ø (no article)" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-sky-800 mb-8">Subtle Meanings: Advanced Article Usage</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">1. The Zero Article (Ø)</h2>
                <p className="text-slate-600 mb-4">One of the most advanced concepts is knowing when *not* to use an article, especially with abstract nouns and general concepts.</p>
                <div className="space-y-4">
                    {rules.map(r => (
                        <div key={r.type} className="p-4 bg-sky-50 rounded-lg">
                            <p className="font-bold text-sky-800 text-xl">{r.type}</p>
                            <p className="text-slate-600 font-semibold mt-1">{r.rule}</p>
                            <p className="text-slate-500 italic mt-2">Example: "{r.example}"</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">2. General vs. Specific</h2>
                <ul className="list-none space-y-4 text-lg text-slate-700">
                    <li><strong className="text-blue-600">General:</strong> Life is short.</li>
                    <li><strong className="text-purple-600">Specific:</strong> The life of a mayfly is very short.</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">3. Choose the Correct Option</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-sky-50 rounded-lg">
                            <p className="text-xl font-semibold text-slate-700 mb-3">{q.sentence.replace('___', '_____')}</p>
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

export default Level6AdvancedArticlesLesson;