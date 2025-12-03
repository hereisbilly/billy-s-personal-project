import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level4ForSinceLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const timeMarkers = [
        { word: 'for', use: 'a period of time (for two years)' },
        { word: 'since', use: 'a point in time (since 2020)' },
        { word: 'yet', use: 'in negatives & questions (not happened)' },
        { word: 'already', use: 'sooner than expected' },
        { word: 'just', use: 'a very short time ago' },
    ];

    const quizQuestions = [
        { sentence: "I have lived here ___ ten years.", options: ["for", "since"], answer: "for" },
        { sentence: "She hasn't finished her homework ___.", options: ["already", "yet"], answer: "yet" },
        { sentence: "He has ___ arrived.", options: ["just", "since"], answer: "just" },
        { sentence: "We have known each other ___ we were children.", options: ["for", "since"], answer: "since" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-violet-800 mb-8">Time Markers: For, Since, Yet, Already...</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">1. Present Perfect Signal Words</h2>
                <p className="text-slate-600 mb-4">These words are often used with the Present Perfect tense.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {timeMarkers.map(m => (
                        <div key={m.word} className="p-4 bg-violet-50 rounded-lg">
                            <p className="font-bold text-violet-800 text-2xl">{m.word}</p>
                            <p className="text-slate-600">{m.use}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>I have been waiting <strong>for</strong> an hour.</li>
                    <li>She has worked here <strong>since</strong> 2021.</li>
                    <li>Have you eaten <strong>yet</strong>? No, I've <strong>already</strong> eaten.</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">3. Choose the Correct Time Marker</h2>
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

export default Level4ForSinceLesson;