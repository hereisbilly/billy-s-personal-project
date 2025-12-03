import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level4RelativeClausesLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const pronouns = [
        { word: 'who', use: 'for people' },
        { word: 'which', use: 'for things' },
        { word: 'that', use: 'for people or things' },
        { word: 'where', use: 'for places' },
    ];

    const quizQuestions = [
        { sentence: "The woman ___ lives next door is a doctor.", options: ["who", "which", "where"], answer: "who" },
        { sentence: "This is the book ___ I told you about.", options: ["who", "which", "where"], answer: "which" },
        { sentence: "That's the restaurant ___ we had dinner.", options: ["who", "which", "where"], answer: "where" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-violet-800 mb-8">Adding Detail: Defining Relative Clauses</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">1. Identifying People, Places, and Things</h2>
                <p className="text-slate-600 mb-4">Defining relative clauses give essential information to identify which person or thing we are talking about.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pronouns.map(p => (
                        <div key={p.word} className="p-4 bg-violet-50 rounded-lg">
                            <p className="font-bold text-violet-800 text-2xl">{p.word}</p>
                            <p className="text-slate-600">{p.use}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">2. Combining Sentences</h2>
                <div className="p-4 bg-slate-100 rounded-lg space-y-2 text-lg">
                    <p>The man is a teacher. He lives next door.</p>
                    <p>→ The man <strong>who lives next door</strong> is a teacher.</p>
                    <hr className="my-2"/>
                    <p>I bought a car. It is very fast.</p>
                    <p>→ The car <strong>which I bought</strong> is very fast.</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">3. Choose the Correct Pronoun</h2>
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

export default Level4RelativeClausesLesson;