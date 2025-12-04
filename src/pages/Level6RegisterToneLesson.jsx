import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level6RegisterToneLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const rules = [
        { type: 'Formal', characteristics: 'Complex sentences, advanced vocabulary, no contractions, use of "whom", prepositions not at the end.', example: 'To whom should I address the letter?' },
        { type: 'Informal', characteristics: 'Simpler sentences, contractions, phrasal verbs, ending with prepositions.', example: 'Who should I send the letter to?' },
    ];

    const quizQuestions = [
        { sentence: "This is the person ___ I spoke with.", options: ["who", "whom"], answer: "who", register: "Informal" },
        { sentence: "___ did you give the documents?", options: ["To whom", "Who... to"], answer: "To whom", register: "Formal" },
        { sentence: "I can't come to the party.", options: ["Formal", "Informal"], answer: "Informal", register: "This uses a contraction ('can\'t')." },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-sky-800 mb-8">Context is King: Register & Tone</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">1. Formal vs. Informal Grammar</h2>
                <p className="text-slate-600 mb-4">The grammatical choices we make change depending on the situation (e.g., an academic essay vs. a text message to a friend). This is called "register".</p>
                <div className="space-y-4">
                    {rules.map(r => (
                        <div key={r.type} className="p-4 bg-sky-50 rounded-lg">
                            <p className="font-bold text-sky-800 text-xl">{r.type}</p>
                            <p className="text-slate-600 font-semibold mt-1">{r.characteristics}</p>
                            <p className="text-slate-500 italic mt-2">Example: "{r.example}"</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">2. Spot the Difference</h2>
                <ul className="list-none space-y-4 text-lg text-slate-700">
                    <li><strong className="text-blue-600">Informal:</strong> What are you looking for?</li>
                    <li><strong className="text-purple-600">Formal:</strong> For what are you looking?</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">3. Identify the Register/Correct Form</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-sky-50 rounded-lg">
                            <p className="text-xl font-semibold text-slate-700 mb-3">{q.sentence.replace('___', '_____')}</p>
                            <div className="flex items-center gap-4">
                                {q.options.map(option => <button key={option} onClick={() => handleAnswerSelect(index, option)} className={`px-6 py-2 text-lg font-bold rounded-lg border-2 transition-colors disabled:cursor-not-allowed ${answers[index] === option && feedback[index] === true ? 'bg-green-200 border-green-400' : ''} ${answers[index] === option && feedback[index] === false ? 'bg-red-200 border-red-400' : ''} ${!feedback[index] ? 'bg-white border-slate-300 hover:bg-slate-100' : ''}`} disabled={feedback[index] !== undefined}>{option}</button>)}
                            </div>
                            {feedback[index] !== undefined && <p className="text-sky-700 font-bold mt-2">This is a more <strong>{q.register}</strong> structure.</p>}
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

export default Level6RegisterToneLesson;