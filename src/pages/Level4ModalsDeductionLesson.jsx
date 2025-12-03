import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level4ModalsDeductionLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const modals = [
        { word: 'must be', use: 'Almost 100% sure (positive)', example: 'He\'s not answering. He must be busy.' },
        { word: 'might be / could be', use: 'Possible (50% sure)', example: 'She might be at the library.' },
        { word: 'can\'t be', use: 'Almost 100% sure (negative)', example: 'That can\'t be true!' },
    ];

    const quizQuestions = [
        { sentence: "The lights are off. They ___ home.", options: ["must be", "can't be"], answer: "can't be" },
        { sentence: "He hasn't eaten all day. He ___ hungry.", options: ["must be", "might be"], answer: "must be" },
        { sentence: "I'm not sure where she is. She ___ at the gym.", options: ["must be", "might be"], answer: "might be" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-violet-800 mb-8">Detective Work: Modals of Deduction</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">1. Making Guesses (Deduction)</h2>
                <p className="text-slate-600 mb-4">We use these modals to say how sure we are about something.</p>
                <div className="space-y-4">
                    {modals.map(m => (
                        <div key={m.word} className="p-4 bg-violet-50 rounded-lg">
                            <p className="font-bold text-violet-800 text-2xl">{m.word}</p>
                            <p className="text-slate-600 font-semibold">{m.use}</p>
                            <p className="text-slate-500 italic mt-1">"{m.example}"</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">2. How Sure Are You?</h2>
                <div className="p-4 bg-slate-100 rounded-lg space-y-2 text-lg">
                    <p>John's car is gone. He <strong>must be</strong> out.</p>
                    <p>I don't know where Sarah is. She <strong>might be</strong> sick.</p>
                    <p>You just ate a huge lunch. You <strong>can't be</strong> hungry again!</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">3. Choose the Correct Modal</h2>
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

export default Level4ModalsDeductionLesson;