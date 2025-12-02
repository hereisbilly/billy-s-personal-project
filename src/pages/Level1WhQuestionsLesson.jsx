import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const Level1WhQuestionsLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const whWords = [
        { word: 'What', use: 'Asks about a thing', example: 'What is it?' },
        { word: 'Where', use: 'Asks about a place', example: 'Where is the cat?' },
        { word: 'Who', use: 'Asks about a person', example: 'Who is she?' },
    ];

    const quizQuestions = [
        { sentence: "___ is your name?", options: ["What", "Where", "Who"], answer: "What" },
        { sentence: "___ is the teacher?", options: ["What", "Where", "Who"], answer: "Who" },
        { sentence: "___ is the bathroom?", options: ["What", "Where", "Who"], answer: "Where" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-8">The Detective's Toolkit: What, Where, Who</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2"><Search />1. The Question Words</h2>
                <p className="text-slate-600 mb-4">We use these words to ask for information.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {whWords.map(w => (
                        <div key={w.word} className="p-4 bg-orange-50 rounded-lg text-center">
                            <p className="font-bold text-orange-800 text-4xl">{w.word}</p>
                            <p className="text-slate-600 font-semibold mt-1">{w.use}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li><strong>What</strong> is this? - It is a book.</li>
                    <li><strong>Where</strong> is my phone? - It is on the table.</li>
                    <li><strong>Who</strong> is that man? - He is my father.</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">3. Choose the Correct Question Word</h2>
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

export default Level1WhQuestionsLesson;