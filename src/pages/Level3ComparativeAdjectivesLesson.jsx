import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level3ComparativeAdjectivesLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const rules = [
        { rule: 'Short Adjectives (1 syllable)', example: 'Add -er (big → bigger, tall → taller)' },
        { rule: 'Long Adjectives (2+ syllables)', example: 'Use "more" (expensive → more expensive)' },
        { rule: 'Irregular Adjectives', example: 'good → better, bad → worse' },
    ];

    const quizQuestions = [
        { sentence: "An elephant is ___ than a mouse.", word: "big", answer: "bigger" },
        { sentence: "This car is ___ than that one.", word: "expensive", answer: "more expensive" },
        { sentence: "Your score is ___ than mine.", word: "good", answer: "better" },
    ];

    const handleAnswerChange = (index, value) => {
        setAnswers(prev => ({ ...prev, [index]: value.toLowerCase() }));
    };

    const checkAnswer = (index) => {
        const isCorrect = answers[index]?.trim() === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-8">Making Comparisons: Comparative Adjectives</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">1. How to Compare Two Things</h2>
                <p className="text-slate-600 mb-4">We use comparative adjectives to compare differences between two objects.</p>
                <div className="space-y-4">
                    {rules.map(r => (
                        <div key={r.rule} className="p-4 bg-blue-50 rounded-lg">
                            <p className="font-bold text-blue-800 text-xl">{r.rule}</p>
                            <p className="text-slate-600">Example: {r.example}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>A plane is <strong>faster than</strong> a car.</li>
                    <li>This book is <strong>more interesting than</strong> that movie.</li>
                    <li>The weather today is <strong>better than</strong> yesterday.</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">3. Complete the Comparison</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-blue-50 rounded-lg">
                            <label className="font-semibold text-slate-700 text-xl">{q.sentence} ({q.word})</label>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-blue-300 rounded-lg" placeholder="Type the comparative..." disabled={feedback[index] !== undefined} />
                                <button onClick={() => checkAnswer(index)} className="px-4 py-2 bg-blue-500 text-white rounded-lg" disabled={feedback[index] !== undefined}>Check</button>
                            </div>
                            {feedback[index] === true && <p className="text-green-600 font-bold mt-2">Correct!</p>}
                            {feedback[index] === false && <p className="text-red-600 font-bold mt-2">Not quite. The answer is: {q.answer}</p>}
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

export default Level3ComparativeAdjectivesLesson;