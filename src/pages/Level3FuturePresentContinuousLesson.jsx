import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level3FuturePresentContinuousLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quizQuestions = [
        { sentence: "I ___ (meet) my friends tomorrow.", answer: "am meeting" },
        { sentence: "She ___ (fly) to Paris next week.", answer: "is flying" },
        { sentence: "What ___ you ___ (do) on Friday evening?", answer: "are doing" },
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
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-8">Future Arrangements: Present Continuous</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">1. Future with Present Continuous</h2>
                <p className="text-slate-600 mb-4">We can use the Present Continuous to talk about fixed plans or arrangements in the near future.</p>
                <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-bold text-blue-800 text-xl">Formula</h3>
                    <p className="font-mono p-2 bg-white rounded">Subject + am/is/are + Verb-ing</p>
                    <p className="mt-2 text-slate-700">It's like making an appointment in your calendar!</p>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">2. Spot the Difference</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                    <div className="p-4 bg-slate-100 rounded-lg"><strong>Now:</strong> "I am watching TV."</div>
                    <div className="p-4 bg-slate-100 rounded-lg"><strong>Future:</strong> "I am watching TV <strong>tonight</strong>."</div>
                </div>
                <p className="text-center font-semibold text-blue-800 mt-4">The time expression (tonight, tomorrow, next week) tells you it's the future!</p>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">3. What Are Your Plans?</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-blue-50 rounded-lg">
                            <label className="font-semibold text-slate-700 text-xl">{q.sentence}</label>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-blue-300 rounded-lg" placeholder="Type the verb form..." disabled={feedback[index] !== undefined} />
                                <button onClick={() => checkAnswer(index)} className="px-4 py-2 bg-blue-500 text-white rounded-lg" disabled={feedback[index] !== undefined}>Check</button>
                            </div>
                            {feedback[index] === true && <p className="text-green-600 font-bold mt-2">Correct!</p>}
                            {feedback[index] === false && <p className="text-red-600 font-bold mt-2">Not quite. The answer is: {q.answer}</p>}
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

export default Level3FuturePresentContinuousLesson;