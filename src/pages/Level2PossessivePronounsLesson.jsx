import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level2PossessivePronounsLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const pronouns = [
        { adj: 'my', pro: 'mine' },
        { adj: 'your', pro: 'yours' },
        { adj: 'his', pro: 'his' },
        { adj: 'her', pro: 'hers' },
        { adj: 'our', pro: 'ours' },
        { adj: 'their', pro: 'theirs' },
    ];

    const quizQuestions = [
        { sentence: "This is my book. The book is ___.", options: ["my", "mine"], answer: "mine" },
        { sentence: "That is her car. The car is ___.", options: ["her", "hers"], answer: "hers" },
        { sentence: "These are their shoes. The shoes are ___.", options: ["their", "theirs"], answer: "theirs" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-amber-800 mb-8">It's Mine! Possessive Pronouns</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">1. Showing Ownership Without a Noun</h2>
                <p className="text-slate-600 mb-4">Possessive pronouns replace a possessive adjective + noun to avoid repetition.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {pronouns.map(p => (
                        <div key={p.adj} className="p-4 bg-amber-50 rounded-lg text-center">
                            <p className="font-bold text-amber-800 text-2xl">{p.adj} → {p.pro}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">2. Spot the Difference</h2>
                <div className="p-4 bg-slate-100 rounded-lg space-y-2 text-lg">
                    <p>This is <strong>my book</strong>. → This book is <strong>mine</strong>.</p>
                    <p>Is that <strong>your car</strong>? → Is that car <strong>yours</strong>?</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">3. Choose the Correct Pronoun</h2>
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

export default Level2PossessivePronounsLesson;