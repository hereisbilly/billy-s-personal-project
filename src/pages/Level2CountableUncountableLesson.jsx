import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level2CountableUncountableLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quizQuestions = [
        { noun: "book", options: ["Countable", "Uncountable"], answer: "Countable" },
        { noun: "water", options: ["Countable", "Uncountable"], answer: "Uncountable" },
        { noun: "chair", options: ["Countable", "Uncountable"], answer: "Countable" },
        { noun: "rice", options: ["Countable", "Uncountable"], answer: "Uncountable" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-amber-800 mb-8">Counting Things: Countable & Uncountable Nouns</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">1. Can You Count It?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-bold text-blue-800 text-xl">Countable Nouns</h3>
                        <p className="text-slate-600">Things you can count. They have a singular and plural form.</p>
                        <p className="italic mt-1">one apple, two apples</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <h3 className="font-bold text-purple-800 text-xl">Uncountable Nouns</h3>
                        <p className="text-slate-600">Things you can't count (liquids, ideas, materials). They only have one form.</p>
                        <p className="italic mt-1">water (not "waters"), information</p>
                    </div>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li><strong>Countable:</strong> cat/cats, person/people, bottle/bottles</li>
                    <li><strong>Uncountable:</strong> milk, music, sand, love, money</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">3. Is it Countable or Uncountable?</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-amber-50 rounded-lg">
                            <p className="text-xl font-semibold text-slate-700 mb-3">Is "<strong>{q.noun}</strong>" countable or uncountable?</p>
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

export default Level2CountableUncountableLesson;