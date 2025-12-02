import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';

const Level1NumbersLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const cardinals = [
        { num: 1, word: 'One' }, { num: 2, word: 'Two' }, { num: 3, word: 'Three' },
        { num: 4, word: 'Four' }, { num: 5, word: 'Five' }, { num: 6, word: 'Six' },
        { num: 7, word: 'Seven' }, { num: 8, word: 'Eight' }, { num: 9, word: 'Nine' }, { num: 10, word: 'Ten' }
    ];

    const ordinals = [
        { num: '1st', word: 'First' }, { num: '2nd', word: 'Second' }, { num: '3rd', word: 'Third' },
        { num: '4th', word: 'Fourth' }, { num: '5th', word: 'Fifth' }
    ];

    const quizQuestions = [
        { question: "How many cats? 🐈🐈🐈", answer: "3" },
        { question: "What number is this: Five", answer: "5" },
        { question: "Which position is the star? 🔵🔴⭐🟢", answer: "3rd" },
    ];

    const handleAnswerChange = (index, value) => {
        setAnswers(prev => ({ ...prev, [index]: value }));
    };

    const checkAnswer = (index) => {
        const isCorrect = answers[index]?.trim().toLowerCase() === quizQuestions[index].answer.toLowerCase();
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-8">The Number Lineup: Counting & Ordering</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">1. Meet the Numbers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Cardinal Numbers */}
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-bold text-blue-800 text-xl">Cardinal Numbers (How many?)</h3>
                        <p className="text-slate-600 mb-2">These numbers count things. Example: "I have <strong>three</strong> apples."</p>
                        <div className="grid grid-cols-2 gap-2">
                            {cardinals.map(c => <p key={c.num} className="p-2 bg-white rounded">{c.num} = {c.word}</p>)}
                        </div>
                    </div>
                    {/* Ordinal Numbers */}
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <h3 className="font-bold text-purple-800 text-xl">Ordinal Numbers (What position?)</h3>
                        <p className="text-slate-600 mb-2">These numbers show order or position. Example: "He is the <strong>first</strong> in line."</p>
                        <div className="grid grid-cols-1 gap-2">
                            {ordinals.map(o => <p key={o.num} className="p-2 bg-white rounded">{o.num} = {o.word}</p>)}
                        </div>
                    </div>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">2. Spot the Difference</h2>
                <div className="space-y-4">
                    <div className="p-4 bg-slate-100 rounded-lg">
                        <p className="text-lg">"There are <strong>4</strong> cars." (Cardinal - How many)</p>
                    </div>
                    <div className="p-4 bg-slate-100 rounded-lg">
                        <p className="text-lg">"The blue car is <strong>4th</strong>." (Ordinal - Position)</p>
                    </div>
                    <p className="text-center font-semibold text-green-800">One tells you the total, the other tells you the place in line!</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">3. Number Puzzles</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                            <label className="font-semibold text-slate-700 flex-grow text-xl">{q.question}</label>
                            <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-20 h-12 text-center text-xl font-bold border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-400" disabled={feedback[index] !== undefined} />
                            <button onClick={() => checkAnswer(index)} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-slate-300" disabled={feedback[index] !== undefined}>Check</button>
                            {feedback[index] === true && <Check className="text-green-600" size={28} />}
                            {feedback[index] === false && <X className="text-red-600" size={28} />}
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

export default Level1NumbersLesson;