import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level3GoingToLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quizQuestions = [
        { sentence: "I ___ ___ ___ visit my grandparents this weekend.", answer: "am going to" },
        { sentence: "Look at those dark clouds! It ___ ___ ___ rain.", answer: "is going to" },
        { sentence: "They ___ ___ ___ watch a movie tonight.", answer: "are going to" },
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
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-8">Future Plans: Using "Going to"</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">1. Talking About the Future</h2>
                <p className="text-slate-600 mb-4">We use "going to" to talk about future plans and predictions based on evidence.</p>
                <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-bold text-blue-800 text-xl">Formula</h3>
                    <p className="font-mono p-2 bg-white rounded">Subject + am/is/are + going to + Verb (base)</p>
                    <ul className="list-disc list-inside mt-2 text-slate-700">
                        <li><strong>For Plans/Intentions:</strong> "I am going to call my friend."</li>
                        <li><strong>For Predictions (with evidence):</strong> "It's 9-0. They are going to win the game."</li>
                    </ul>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>She <strong>is going to</strong> start a new job next month. (Plan)</li>
                    <li>He studied hard. He <strong>is going to</strong> pass the exam. (Prediction)</li>
                    <li>We <strong>are going to</strong> have a party on Saturday. (Plan)</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">3. Complete the Sentences</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-blue-50 rounded-lg">
                            <label className="font-semibold text-slate-700 text-xl">{q.sentence}</label>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-blue-300 rounded-lg" placeholder="am/is/are going to" disabled={feedback[index] !== undefined} />
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

export default Level3GoingToLesson;