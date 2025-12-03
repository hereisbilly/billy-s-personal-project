import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { Link2 } from 'lucide-react';

const Level3ConjunctionsLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const conjunctions = [
        { word: 'and', use: 'Adds information', example: 'I like coffee and tea.' },
        { word: 'but', use: 'Shows a contrast', example: 'He is tired but he is happy.' },
        { word: 'or', use: 'Shows a choice', example: 'Do you want pizza or pasta?' },
        { word: 'so', use: 'Shows a result', example: 'It was raining, so I took an umbrella.' },
    ];

    const quizQuestions = [
        { sentence: "I want to go, ___ I am too busy.", options: ["and", "but", "so"], answer: "but" },
        { sentence: "She studied hard, ___ she passed the test.", options: ["or", "but", "so"], answer: "so" },
        { sentence: "Would you like water ___ juice?", options: ["and", "or", "so"], answer: "or" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-8">Connecting Ideas: And, But, Or, So</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2"><Link2 />1. The Connecting Words</h2>
                <p className="text-slate-600 mb-4">Conjunctions are words that connect other words, phrases, or sentences.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {conjunctions.map(c => (
                        <div key={c.word} className="p-4 bg-blue-50 rounded-lg">
                            <p className="font-bold text-blue-800 text-3xl">{c.word}</p>
                            <p className="text-slate-600 font-semibold">{c.use}</p>
                            <p className="text-slate-500 italic mt-1">"{c.example}"</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>He is rich <strong>and</strong> famous.</li>
                    <li>I like apples, <strong>but</strong> I don't like oranges.</li>
                    <li>We can go to the cinema <strong>or</strong> the park.</li>
                    <li>She was sick, <strong>so</strong> she went to the doctor.</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">3. Choose the Correct Conjunction</h2>
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

export default Level3ConjunctionsLesson;