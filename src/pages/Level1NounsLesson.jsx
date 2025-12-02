import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { Check, X, Users, User } from 'lucide-react';

const Level1NounsLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const singularPluralPairs = [
        { singular: 'cat', plural: 'cats' },
        { singular: 'dog', plural: 'dogs' },
        { singular: 'book', plural: 'books' },
        { singular: 'car', plural: 'cars' },
    ];

    const quizQuestions = [
        { question: "One apple, two _____", answer: "apples" },
        { question: "One pen, three _____", answer: "pens" },
        { question: "One _____, five houses", answer: "house" },
    ];

    const handleAnswerChange = (index, value) => {
        setAnswers(prev => ({ ...prev, [index]: value.toLowerCase() }));
    };

    const checkAnswer = (index) => {
        const isCorrect = answers[index]?.trim() === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-8">The Noun Team: One and Many</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">1. The Rule of Plurals</h2>
                <p className="text-slate-600 mb-4">Nouns are words for people, places, or things. They can be singular (one) or plural (more than one).</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <User size={40} className="mx-auto text-blue-500 mb-2" />
                        <h3 className="font-bold text-blue-800 text-2xl">Singular (One)</h3>
                        <p className="text-slate-600 mt-2">Refers to only one noun.</p>
                        <p className="font-semibold text-lg mt-2">a cat, one book</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <Users size={40} className="mx-auto text-purple-500 mb-2" />
                        <h3 className="font-bold text-purple-800 text-2xl">Plural (More than one)</h3>
                        <p className="text-slate-600 mt-2">To make most nouns plural, just add <strong>-s</strong>.</p>
                        <p className="font-semibold text-lg mt-2">two cats, many books</p>
                    </div>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">2. From One to Many</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {singularPluralPairs.map(pair => (
                        <div key={pair.singular} className="p-3 bg-slate-100 rounded-lg text-center">
                            <p className="text-lg font-semibold text-slate-700">{pair.singular} → {pair.plural}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">3. Fill in the Blank</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                            <label className="font-semibold text-slate-700 flex-grow text-xl">{q.question.split('_____')[0]}<span className="inline-block w-24 border-b-2 border-slate-400 mx-2"></span>{q.question.split('_____')[1]}</label>
                            <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-28 h-12 text-center text-xl font-bold border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-400" disabled={feedback[index] !== undefined} />
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

export default Level1NounsLesson;