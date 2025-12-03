import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level3ModalsObligationLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const modals = [
        { word: 'must', use: 'Strong obligation, often from the speaker (a rule)', example: 'You must wear a seatbelt.' },
        { word: 'have to', use: 'Strong obligation, often from an external source (a law)', example: 'I have to work on Saturday.' },
        { word: 'should', use: 'Advice or a recommendation (a good idea)', example: 'You should eat more vegetables.' },
    ];

    const quizQuestions = [
        { sentence: "It's a good idea. You ___ see a doctor.", options: ["must", "have to", "should"], answer: "should" },
        { sentence: "It's the law. You ___ stop at a red light.", options: ["must", "should"], answer: "must" },
        { sentence: "My boss told me. I ___ finish this report today.", options: ["have to", "should"], answer: "have to" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-8">Rules & Advice: Must, Have to, Should</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">1. Obligation & Necessity</h2>
                <p className="text-slate-600 mb-4">These modal verbs express if something is necessary or a good idea.</p>
                <div className="space-y-4">
                    {modals.map(m => (
                        <div key={m.word} className="p-4 bg-blue-50 rounded-lg">
                            <p className="font-bold text-blue-800 text-2xl">{m.word}</p>
                            <p className="text-slate-600 font-semibold">{m.use}</p>
                            <p className="text-slate-500 italic mt-1">"{m.example}"</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">2. Strong vs. Soft</h2>
                <div className="p-4 bg-slate-100 rounded-lg space-y-2 text-lg">
                    <p><strong>Must / Have to</strong> = Strong. It's necessary. 100%.</p>
                    <p><strong>Should</strong> = Soft. It's a good idea. 50%.</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">3. Choose the Correct Modal</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-blue-50 rounded-lg">
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

export default Level3ModalsObligationLesson;