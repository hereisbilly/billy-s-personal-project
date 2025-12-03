import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level2AdjectivesLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const adjectives = ['big', 'small', 'happy', 'sad', 'red', 'blue', 'hot', 'cold'];

    const quizQuestions = [
        { sentence: "The elephant is ___.", options: ["big", "small"], answer: "big" },
        { sentence: "The sun is ___.", options: ["hot", "cold"], answer: "hot" },
        { sentence: "He is smiling. He is ___.", options: ["happy", "sad"], answer: "happy" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-amber-800 mb-8">Describing Words: Basic Adjectives</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">1. What are Adjectives?</h2>
                <p className="text-slate-600 mb-4">Adjectives are words that describe nouns (people, places, things).</p>
                <div className="p-4 bg-amber-50 rounded-lg flex flex-wrap gap-3">
                    {adjectives.map(adj => (
                        <span key={adj} className="px-3 py-1 bg-white text-amber-800 font-semibold rounded-full border-2 border-amber-200">{adj}</span>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">2. How to Use Adjectives</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                    <div className="p-4 bg-slate-100 rounded-lg">
                        <p>Before a noun:</p>
                        <p>It is a <strong>big</strong> house.</p>
                    </div>
                    <div className="p-4 bg-slate-100 rounded-lg">
                        <p>After the verb 'to be':</p>
                        <p>The house is <strong>big</strong>.</p>
                    </div>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">3. Choose the Correct Adjective</h2>
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

export default Level2AdjectivesLesson;