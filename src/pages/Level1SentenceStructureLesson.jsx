import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level1SentenceStructureLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const jumbledSentences = [
        { words: ["I", "like", "pizza"], answer: "I like pizza" },
        { words: ["She", "reads", "a book"], answer: "She reads a book" },
        { words: ["They", "play", "football"], answer: "They play football" },
    ];

    const handleAnswerChange = (index, value) => {
        setAnswers(prev => ({ ...prev, [index]: value }));
    };

    const checkAnswer = (index) => {
        const userAnswer = answers[index]?.trim().replace(/\.$/, "").toLowerCase();
        const correctAnswer = jumbledSentences[index].answer.toLowerCase();
        setFeedback(prev => ({ ...prev, [index]: userAnswer === correctAnswer }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-8">The Sentence Builder: Subject-Verb-Object</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">1. The S-V-O Formula</h2>
                <p className="text-slate-600 mb-4">Most simple sentences in English follow a basic pattern: Subject - Verb - Object.</p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-center text-white font-bold text-xl p-4 bg-slate-200 rounded-lg">
                    <div className="p-4 bg-blue-500 rounded-lg w-full sm:w-auto">Subject (Who/What)</div>
                    <div className="text-2xl text-slate-400">+</div>
                    <div className="p-4 bg-purple-500 rounded-lg w-full sm:w-auto">Verb (Action)</div>
                    <div className="text-2xl text-slate-400">+</div>
                    <div className="p-4 bg-orange-500 rounded-lg w-full sm:w-auto">Object (Receives action)</div>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">2. S-V-O in Action</h2>
                <div className="p-4 bg-slate-100 rounded-lg text-center">
                    <p className="text-2xl"><span className="text-blue-600 font-bold">I</span> <span className="text-purple-600 font-bold">eat</span> <span className="text-orange-600 font-bold">an apple</span>.</p>
                    <p className="mt-2 text-slate-600">(Subject: I, Verb: eat, Object: an apple)</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">3. Build a Sentence</h2>
                <p className="text-slate-600 mb-4">Put the words in the correct order to make a sentence.</p>
                <div className="space-y-4">
                    {jumbledSentences.map((q, index) => (
                        <div key={index} className="p-4 bg-green-50 rounded-lg">
                            <p className="text-xl font-semibold text-slate-500 mb-3 text-center">Words: {q.words.join(' / ')}</p>
                            <div className="flex items-center gap-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-400" placeholder="Type the correct sentence..." disabled={feedback[index] !== undefined} />
                                <button onClick={() => checkAnswer(index)} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-slate-300" disabled={feedback[index] !== undefined}>Check</button>
                            </div>
                            {feedback[index] === true && <p className="text-green-600 font-bold mt-2">Correct! The answer is: {q.answer}</p>}
                            {feedback[index] === false && <p className="text-red-600 font-bold mt-2">Not quite. Try again!</p>}
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

export default Level1SentenceStructureLesson;