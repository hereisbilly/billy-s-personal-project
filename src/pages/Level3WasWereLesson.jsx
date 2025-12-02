import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level3WasWereLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const wasWereRules = [
        { pronoun: 'I / He / She / It', verb: 'was' },
        { pronoun: 'You / We / They', verb: 'were' },
    ];

    const quizQuestions = [
        { sentence: "I ___ tired yesterday.", options: ["was", "were"], answer: "was" },
        { sentence: "They ___ at the park.", options: ["was", "were"], answer: "were" },
        { sentence: "She ___ a doctor.", options: ["was", "were"], answer: "was" },
        { sentence: "We ___ happy with the result.", options: ["was", "were"], answer: "were" },
        { sentence: "The movie ___ interesting.", options: ["was", "were"], answer: "was" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-8">The Time Machine: Using Was & Were</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">1. "To Be" in the Past</h2>
                <p className="text-slate-600 mb-4">To talk about what something <strong>was</strong> in the past, we use 'was' and 'were'.</p>
                <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-bold text-blue-800 text-xl mb-2">The Rules</h3>
                    {wasWereRules.map(rule => (
                        <p key={rule.pronoun} className="text-lg font-mono text-slate-700"><strong className="text-blue-700">{rule.pronoun}</strong> → <strong className="text-purple-700">{rule.verb}</strong></p>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">2. Examples from Yesterday</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>I <strong>was</strong> at home last night.</li>
                    <li>She <strong>was</strong> happy to see him.</li>
                    <li>They <strong>were</strong> late for the meeting.</li>
                    <li>We <strong>were</strong> friends in school.</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">3. Choose Was or Were</h2>
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

export default Level3WasWereLesson;