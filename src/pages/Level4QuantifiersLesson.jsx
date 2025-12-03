import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level4QuantifiersLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quantifiers = [
        { word: 'a few / few', use: 'for countable nouns (friends, books)' },
        { word: 'a little / little', use: 'for uncountable nouns (time, money)' },
        { word: 'enough', use: 'the correct amount' },
        { word: 'plenty of', use: 'more than enough' },
    ];

    const quizQuestions = [
        { sentence: "He has ___ friends, so he's not lonely.", options: ["few", "a few"], answer: "a few" },
        { sentence: "There is ___ milk left, not enough for coffee.", options: ["little", "a little"], answer: "little" },
        { sentence: "Do we have ___ time to finish?", options: ["enough", "plenty of"], answer: "enough" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-violet-800 mb-8">How Much? Advanced Quantifiers</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">1. Expressing Amount with Nuance</h2>
                <p className="text-slate-600 mb-4">Quantifiers tell us about the number or amount of something.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quantifiers.map(q => (
                        <div key={q.word} className="p-4 bg-violet-50 rounded-lg">
                            <p className="font-bold text-violet-800 text-2xl">{q.word}</p>
                            <p className="text-slate-600">{q.use}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">2. A Little vs. Little</h2>
                <div className="p-4 bg-slate-100 rounded-lg space-y-2 text-lg">
                    <p>I have <strong>a little</strong> money. (Positive - I have some money)</p>
                    <p>I have <strong>little</strong> money. (Negative - I have almost no money)</p>
                    <hr className="my-2"/>
                    <p>I have <strong>a few</strong> friends. (Positive - I have some friends)</p>
                    <p>I have <strong>few</strong> friends. (Negative - I have almost no friends)</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">3. Choose the Correct Quantifier</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-violet-50 rounded-lg">
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

export default Level4QuantifiersLesson;