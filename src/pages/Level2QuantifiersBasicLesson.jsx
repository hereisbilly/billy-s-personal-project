import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level2QuantifiersBasicLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quantifiers = [
        { word: 'some', use: 'in positive sentences (+)' },
        { word: 'any', use: 'in negative (-) and question (?) sentences' },
        { word: 'a lot of', use: 'a large quantity (for both C & U nouns)' },
        { word: 'many', use: 'a large quantity (for C nouns)' },
        { word: 'much', use: 'a large quantity (for U nouns, usually in -/? sentences)' },
    ];

    const quizQuestions = [
        { sentence: "I have ___ friends.", options: ["some", "any"], answer: "some" },
        { sentence: "Do you have ___ questions?", options: ["some", "any"], answer: "any" },
        { sentence: "There isn't ___ milk left.", options: ["some", "any"], answer: "any" },
        { sentence: "She has ___ books.", options: ["a lot of", "much"], answer: "a lot of" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-amber-800 mb-8">How Much? Basic Quantifiers</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">1. Words for Quantity</h2>
                <p className="text-slate-600 mb-4">Quantifiers tell us the amount or number of something.</p>
                <div className="space-y-2">
                    {quantifiers.map(q => (
                        <div key={q.word} className="p-3 bg-amber-50 rounded-lg">
                            <p><strong className="text-amber-800 text-xl">{q.word}</strong>: {q.use}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>I need <strong>some</strong> water.</li>
                    <li>I don't have <strong>any</strong> money.</li>
                    <li>There are <strong>a lot of</strong> people. / There is <strong>a lot of</strong> traffic.</li>
                    <li>How <strong>many</strong> students are there?</li>
                    <li>How <strong>much</strong> time do you have?</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">3. Choose the Correct Quantifier</h2>
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

export default Level2QuantifiersBasicLesson;