import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level4Conditionals01Lesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quizQuestions = [
        { sentence: "If you heat water, it ___ (boil).", answer: "boils" },
        { sentence: "If it rains tomorrow, I ___ (stay) home.", answer: "will stay" },
        { sentence: "If you don't hurry, you ___ (miss) the bus.", answer: "will miss" },
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
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-violet-800 mb-8">Cause & Effect: Zero & First Conditionals</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">1. "If" Sentences</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-bold text-blue-800 text-xl">Zero Conditional (Facts)</h3>
                        <p className="text-slate-600">For things that are always true (scientific facts, general truths).</p>
                        <p className="font-mono mt-1 p-2 bg-white rounded">If + Present Simple, ... Present Simple</p>
                        <p className="italic mt-1">"If you touch fire, you get burned."</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <h3 className="font-bold text-purple-800 text-xl">First Conditional (Real Future)</h3>
                        <p className="text-slate-600">For a possible situation in the future.</p>
                        <p className="font-mono mt-1 p-2 bg-white rounded">If + Present Simple, ... will + Verb</p>
                        <p className="italic mt-1">"If it is sunny, we will go to the park."</p>
                    </div>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">2. Fact vs. Possibility</h2>
                <div className="p-4 bg-slate-100 rounded-lg space-y-2 text-lg">
                    <p><strong>Zero:</strong> If I <strong>am</strong> late for work, my boss <strong>gets</strong> angry. (Always true)</p>
                    <p><strong>First:</strong> If I <strong>am</strong> late for work today, my boss <strong>will be</strong> angry. (Possible future)</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">3. Complete the Conditional</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-violet-50 rounded-lg">
                            <label className="font-semibold text-slate-700 text-xl">{q.sentence}</label>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-violet-300 rounded-lg" placeholder="Type the verb form..." disabled={feedback[index] !== undefined} />
                                <button onClick={() => checkAnswer(index)} className="px-4 py-2 bg-violet-500 text-white rounded-lg" disabled={feedback[index] !== undefined}>Check</button>
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

export default Level4Conditionals01Lesson;