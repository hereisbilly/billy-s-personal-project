import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level6EllipsisSubstitutionLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const rules = [
        { type: 'Ellipsis', rule: 'Omitting words that are understood from context.', example: 'A: "Are you coming?" B: "I might be [coming]."' },
        { type: 'Substitution', rule: 'Using words like "one/ones", "so", "do" to replace a word or clause.', example: 'A: "I need a pen." B: "Here, take this one [pen]."' },
    ];

    const quizQuestions = [
        { sentence: 'He said he would help, and he did.', replaced: "help" },
        { sentence: 'I wanted a coffee, but they didn\'t have any.', replaced: "coffee" },
        { sentence: 'I like the red shirt more than the blue one.', replaced: "shirt" },
    ];

    const handleAnswerChange = (index, value) => {
        setAnswers(prev => ({ ...prev, [index]: value.toLowerCase() }));
    };

    const checkAnswer = (index) => {
        const isCorrect = answers[index]?.trim() === quizQuestions[index].replaced;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-sky-800 mb-8">Sounding Natural: Ellipsis & Substitution</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">1. Avoiding Repetition</h2>
                <p className="text-slate-600 mb-4">In natural speech and writing, we often omit or replace words to avoid sounding repetitive and robotic.</p>
                <div className="space-y-4">
                    {rules.map(r => (
                        <div key={r.type} className="p-4 bg-sky-50 rounded-lg">
                            <p className="font-bold text-sky-800 text-xl">{r.type}</p>
                            <p className="text-slate-600 font-semibold">{r.rule}</p>
                            <p className="text-slate-500 italic mt-1">{r.example}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">2. More Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>"Will it rain?" "I hope not." (not = it doesn't rain)</li>
                    <li>"I love this song." "So do I." (So do I = I love this song too)</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">3. What is being replaced or omitted?</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-sky-50 rounded-lg">
                            <label className="font-semibold text-slate-700 text-xl">"{q.sentence}"</label>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-sky-300 rounded-lg" placeholder="What word is replaced/omitted?" disabled={feedback[index] !== undefined} />
                                <button onClick={() => checkAnswer(index)} className="px-4 py-2 bg-sky-500 text-white rounded-lg" disabled={feedback[index] !== undefined}>Check</button>
                            </div>
                            {feedback[index] === true && <p className="text-green-600 font-bold mt-2">Correct!</p>}
                            {feedback[index] === false && <p className="text-red-600 font-bold mt-2">Not quite. The answer is: {q.replaced}</p>}
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

export default Level6EllipsisSubstitutionLesson;