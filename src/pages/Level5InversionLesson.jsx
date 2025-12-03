import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level5InversionLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const rules = [
        { word: 'Never (before)...', example: 'Never before have I seen such beauty.' },
        { word: 'Rarely/Seldom...', example: 'Rarely do we see this kind of talent.' },
        { word: 'Not only... but also...', example: 'Not only did he pass, but he also got the top score.' },
        { word: 'Under no circumstances...', example: 'Under no circumstances should you open that door.' },
    ];

    const quizQuestions = [
        { sentence: "I have never seen such a thing.", inverted: "Never have I seen such a thing." },
        { sentence: "He is not only smart, but he is also funny.", inverted: "Not only is he smart, but he is also funny." },
    ];

    const handleAnswerChange = (index, value) => {
        setAnswers(prev => ({ ...prev, [index]: value }));
    };

    const checkAnswer = (index) => {
        const userAnswer = answers[index]?.trim().replace(/\.$/, '').toLowerCase();
        const correctAnswer = quizQuestions[index].inverted.replace(/\.$/, '').toLowerCase();
        setFeedback(prev => ({ ...prev, [index]: userAnswer === correctAnswer }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-rose-800 mb-8">Emphasis and Style: Introduction to Inversion</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">1. Changing Word Order for Emphasis</h2>
                <p className="text-slate-600 mb-4">Inversion means changing the normal subject-verb word order. We do this after certain negative or limiting adverbs to add emphasis.</p>
                <div className="p-4 bg-rose-50 rounded-lg">
                    <h3 className="font-bold text-rose-800 text-xl">Formula</h3>
                    <p className="font-mono p-2 bg-white rounded">Negative Adverb + Auxiliary Verb + Subject + Main Verb</p>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    {rules.map(r => <li key={r.word}><strong>{r.word}</strong> {r.example.split('...')[1]}</li>)}
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">3. Rewrite for Emphasis</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-rose-50 rounded-lg">
                            <p className="font-semibold text-slate-700">Normal: "{q.sentence}"</p>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-rose-300 rounded-lg" placeholder="Type the inverted sentence..." disabled={feedback[index] !== undefined} />
                                <button onClick={() => checkAnswer(index)} className="px-4 py-2 bg-rose-500 text-white rounded-lg" disabled={feedback[index] !== undefined}>Check</button>
                            </div>
                            {feedback[index] === true && <p className="text-green-600 font-bold mt-2">Correct!</p>}
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

export default Level5InversionLesson;