import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level6AdvancedAspectsLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const comparisons = [
        { simple: 'I\'ve read that book.', continuous: 'I\'ve been reading that book.', nuance: 'Completion vs. Ongoing/Recent Activity' },
        { simple: 'He had fixed the car.', continuous: 'He had been fixing the car.', nuance: 'Result vs. Duration before a past event' },
    ];

    const quizQuestions = [
        { sentence: "I'm exhausted! I ___ all day.", options: ["'ve worked", "'ve been working"], answer: "'ve been working", explanation: "The focus is on the recent, continuous activity that caused the exhaustion." },
        { sentence: "She ___ three reports this morning.", options: ["has written", "has been writing"], answer: "has written", explanation: "The focus is on the completed achievement (three reports)." },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-sky-800 mb-8">The Full Story: Advanced Perfect & Continuous Aspects</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">1. Nuances of Meaning</h2>
                <p className="text-slate-600 mb-4">The choice between simple and continuous perfect aspects often depends on what you want to emphasize: completion or duration.</p>
                <div className="space-y-4">
                    {comparisons.map(c => (
                        <div key={c.nuance} className="p-4 bg-sky-50 rounded-lg">
                            <p className="font-bold text-sky-800 text-xl">{c.nuance}</p>
                            <p className="text-slate-700 mt-1"><strong>Simple:</strong> {c.simple}</p>
                            <p className="text-slate-700"><strong>Continuous:</strong> {c.continuous}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">2. Context is Key</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>"I'<strong>ve painted</strong> the room." (The job is finished. Look at the result.)</li>
                    <li>"I'<strong>ve been painting</strong> the room." (That's how I've spent my time. I might not be finished.)</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">3. Choose the Best Tense</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-sky-50 rounded-lg">
                            <p className="text-xl font-semibold text-slate-700 mb-3">{q.sentence.split('___')[0]} _____ {q.sentence.split('___')[1]}</p>
                            <div className="flex items-center gap-4">
                                {q.options.map(option => <button key={option} onClick={() => handleAnswerSelect(index, option)} className={`px-6 py-2 text-lg font-bold rounded-lg border-2 transition-colors disabled:cursor-not-allowed ${answers[index] === option && feedback[index] === true ? 'bg-green-200 border-green-400' : ''} ${answers[index] === option && feedback[index] === false ? 'bg-red-200 border-red-400' : ''} ${!feedback[index] ? 'bg-white border-slate-300 hover:bg-slate-100' : ''}`} disabled={feedback[index] !== undefined}>{option}</button>)}
                            </div>
                            {feedback[index] === false && <p className="text-red-600 font-bold mt-2">Not quite. {q.explanation}</p>}
                            {feedback[index] === true && <p className="text-green-600 font-bold mt-2">Correct! {q.explanation}</p>}
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

export default Level6AdvancedAspectsLesson;