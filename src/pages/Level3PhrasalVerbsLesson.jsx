import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level3PhrasalVerbsLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const phrasalVerbs = [
        { verb: 'get up', meaning: 'to rise from bed' },
        { verb: 'look for', meaning: 'to search for something' },
        { verb: 'turn on', meaning: 'to start a machine or light' },
        { verb: 'turn off', meaning: 'to stop a machine or light' },
    ];

    const quizQuestions = [
        { sentence: "I ___ my keys, but I can't find them.", options: ["look for", "get up", "turn on"], answer: "look for" },
        { sentence: "It's dark. Can you ___ the light?", options: ["turn off", "get up", "turn on"], answer: "turn on" },
        { sentence: "I ___ at 7 AM every morning.", options: ["look for", "get up", "turn off"], answer: "get up" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-8">Verb Power-Ups: Introduction to Phrasal Verbs</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">1. What are Phrasal Verbs?</h2>
                <p className="text-slate-600 mb-4">A phrasal verb is a <strong>verb + preposition/adverb</strong> that creates a new meaning.</p>
                <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="font-mono p-2 bg-white rounded">Verb + Preposition = New Meaning</p>
                    <p className="mt-2 text-slate-700">Example: "look" + "for" = to search</p>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">2. Common Phrasal Verbs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {phrasalVerbs.map(v => (
                        <div key={v.verb} className="p-4 bg-slate-100 rounded-lg">
                            <p className="font-bold text-blue-800 text-xl">{v.verb}</p>
                            <p className="text-slate-600">Meaning: {v.meaning}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">3. Choose the Correct Phrasal Verb</h2>
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

export default Level3PhrasalVerbsLesson;