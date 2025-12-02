import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const Level1PrepositionsLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const prepositions = [
        { word: 'in', use: 'Inside something', example: 'The apple is in the box.' },
        { word: 'on', use: 'On a surface', example: 'The book is on the table.' },
        { word: 'at', use: 'At a specific point or place', example: 'He is at the door.' },
        { word: 'under', use: 'Below something', example: 'The cat is under the chair.' },
        { word: 'next to', use: 'Beside something', example: 'The pen is next to the book.' },
    ];

    const quizQuestions = [
        { sentence: "The cat is ___ the table.", options: ["in", "on", "at"], answer: "on" },
        { sentence: "The keys are ___ the box.", options: ["in", "on", "under"], answer: "in" },
        { sentence: "My shoes are ___ the bed.", options: ["at", "on", "under"], answer: "under" },
        { sentence: "She is waiting ___ the bus stop.", options: ["in", "on", "at"], answer: "at" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-8">Where Is It? Prepositions of Place</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2"><MapPin />1. Location Words</h2>
                <p className="text-slate-600 mb-4">Prepositions tell us the <strong>location</strong> of something.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {prepositions.map(p => (
                        <div key={p.word} className="p-4 bg-purple-50 rounded-lg">
                            <p className="font-bold text-purple-800 text-3xl">{p.word}</p>
                            <p className="text-slate-600 font-semibold">{p.use}</p>
                            <p className="text-slate-500 italic mt-1">"{p.example}"</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">2. Visual Examples</h2>
                <div className="p-4 bg-slate-100 rounded-lg space-y-2 text-lg">
                    <p>The ball is <strong>in</strong> the box. 📦</p>
                    <p>The book is <strong>on</strong> the desk. 📖</p>
                    <p>The dog is <strong>under</strong> the tree. 🌳</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">3. Choose the Correct Preposition</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-green-50 rounded-lg">
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

export default Level1PrepositionsLesson;