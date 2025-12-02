import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { Hand } from 'lucide-react';

const Level1DemonstrativesLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const demonstratives = [
        { word: 'This', use: 'Singular (one thing) & Near', example: 'This is my book.' },
        { word: 'That', use: 'Singular (one thing) & Far', example: 'That is your house.' },
        { word: 'These', use: 'Plural (many things) & Near', example: 'These are my keys.' },
        { word: 'Those', use: 'Plural (many things) & Far', example: 'Those are birds.' },
    ];

    const quizQuestions = [
        { sentence: "___ is my apple. (near)", options: ["This", "That"], answer: "This" },
        { sentence: "___ are your shoes over there. (far)", options: ["These", "Those"], answer: "Those" },
        { sentence: "___ is the sun. (far)", options: ["This", "That"], answer: "That" },
        { sentence: "___ are my hands. (near)", options: ["These", "Those"], answer: "These" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-8">Pointing Words: This, That, These, Those</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2"><Hand />1. The Pointing Words</h2>
                <p className="text-slate-600 mb-4">We use these words to point to things.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {demonstratives.map(d => (
                        <div key={d.word} className="p-4 bg-blue-50 rounded-lg">
                            <p className="font-bold text-blue-800 text-3xl">{d.word}</p>
                            <p className="text-slate-600 font-semibold">{d.use}</p>
                            <p className="text-slate-500 italic mt-1">Example: {d.example}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">2. Near vs. Far</h2>
                <div className="p-4 bg-slate-100 rounded-lg space-y-2 text-lg">
                    <p>Use <strong>This / These</strong> for things close to you.</p>
                    <p>Use <strong>That / Those</strong> for things far from you.</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">3. Choose the Correct Word</h2>
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

export default Level1DemonstrativesLesson;