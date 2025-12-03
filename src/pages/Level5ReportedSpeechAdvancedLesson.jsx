import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level5ReportedSpeechAdvancedLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const rules = [
        { type: 'Yes/No Questions', rule: 'Use "if" or "whether".', example: '"Are you tired?" → He asked if I was tired.' },
        { type: 'Wh- Questions', rule: 'Use the question word (what, where...).', example: '"Where do you live?" → He asked where I lived.' },
        { type: 'Commands', rule: 'Use "told" + object + to-infinitive.', example: '"Sit down." → He told me to sit down.' },
        { type: 'Requests', rule: 'Use "asked" + object + to-infinitive.', example: '"Please help me." → She asked me to help her.' },
    ];

    const quizQuestions = [
        { direct: '"Where is the station?"', reported: "He asked where the station was." },
        { direct: '"Do you like coffee?"', reported: "She asked if I liked coffee." },
        { direct: '"Don\'t be late."', reported: "He told me not to be late." },
    ];

    const handleAnswerChange = (index, value) => {
        setAnswers(prev => ({ ...prev, [index]: value }));
    };

    const checkAnswer = (index) => {
        const userAnswer = answers[index]?.trim().replace(/\.$/, '').toLowerCase();
        const correctAnswer = quizQuestions[index].reported.replace(/\.$/, '').toLowerCase();
        setFeedback(prev => ({ ...prev, [index]: userAnswer === correctAnswer }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-rose-800 mb-8">Reporting Questions & Commands</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">1. Reporting More Than Statements</h2>
                <p className="text-slate-600 mb-4">The rules for reporting speech change for questions and commands.</p>
                <div className="space-y-4">
                    {rules.map(r => (
                        <div key={r.type} className="p-4 bg-rose-50 rounded-lg">
                            <p className="font-bold text-rose-800 text-xl">{r.type}</p>
                            <p className="text-slate-600 font-semibold">{r.rule}</p>
                            <p className="text-slate-500 italic mt-1">"{r.example}"</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">2. Word Order Change</h2>
                <p className="text-slate-600 mb-4">Notice that in reported questions, the word order changes back to a normal statement (Subject + Verb).</p>
                <p className="text-lg text-slate-700 p-4 bg-slate-100 rounded-lg">"Where <strong>are you</strong>?" → He asked where <strong>I was</strong>.</p>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">3. Report It!</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-rose-50 rounded-lg">
                            <p className="font-semibold text-slate-700">Direct: {q.direct}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-rose-300 rounded-lg" placeholder="Report the sentence..." disabled={feedback[index] !== undefined} />
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

export default Level5ReportedSpeechAdvancedLesson;