import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level6ComplexNounPhrasesLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quizQuestions = [
        { sentence: "The committee made a decision. It has implications.", combined: "The decision made by the committee has implications." },
        { sentence: "A theory was proposed by the scientist. It changed everything.", combined: "The theory proposed by the scientist changed everything." },
    ];

    const handleAnswerChange = (index, value) => {
        setAnswers(prev => ({ ...prev, [index]: value }));
    };

    const checkAnswer = (index) => {
        const userAnswer = answers[index]?.trim().replace(/\.$/, '').toLowerCase();
        const correctAnswer = quizQuestions[index].combined.replace(/\.$/, '').toLowerCase();
        setFeedback(prev => ({ ...prev, [index]: userAnswer === correctAnswer }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-sky-800 mb-8">Complex Noun Phrases & Post-modification</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">1. Packing Information into Noun Phrases</h2>
                <p className="text-slate-600 mb-4">Post-modification means adding information after a noun to describe it in more detail. This is a key feature of academic and formal writing, allowing you to create dense, informative sentences.</p>
                <div className="p-4 bg-sky-50 rounded-lg">
                    <h3 className="font-bold text-sky-800 text-xl">Common Post-modifiers</h3>
                    <ul className="list-disc list-inside mt-2 text-slate-700">
                        <li>Prepositional phrases: "The book <strong>on the table</strong>"</li>
                        <li>Participle clauses: "The man <strong>sitting over there</strong>" / "The report <strong>written by the team</strong>"</li>
                        <li>Relative clauses: "The woman <strong>who I met yesterday</strong>"</li>
                    </ul>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">2. Building a Complex Phrase</h2>
                <div className="p-4 bg-slate-100 rounded-lg space-y-2 text-lg">
                    <p><strong>Simple:</strong> A report was published.</p>
                    <p><strong>Complex:</strong> A report <strong>published by the university</strong> showed a significant trend.</p>
                    <p><strong>Very Complex:</strong> The recent report <strong>on climate change published by the university</strong> showed a significant trend.</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">3. Combine the Sentences</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-sky-50 rounded-lg">
                            <p className="font-semibold text-slate-700">Combine: "{q.sentence}"</p>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-sky-300 rounded-lg" placeholder="Rewrite as one sentence..." disabled={feedback[index] !== undefined} />
                                <button onClick={() => checkAnswer(index)} className="px-4 py-2 bg-sky-500 text-white rounded-lg" disabled={feedback[index] !== undefined}>Check</button>
                            </div>
                            {feedback[index] === true && <p className="text-green-600 font-bold mt-2">Excellent!</p>}
                            {feedback[index] === false && <p className="text-red-600 font-bold mt-2">Not quite. A good answer is: "{q.combined}"</p>}
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

export default Level6ComplexNounPhrasesLesson;