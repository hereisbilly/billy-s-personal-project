import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level2ImperativesLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quizQuestions = [
        { sentence: "___ the door.", verb: "Close", answer: "Close" },
        { sentence: "Please ___ down.", verb: "sit", answer: "sit" },
        { sentence: "Don't ___!", verb: "shout", answer: "shout" },
    ];

    const handleAnswerChange = (index, value) => {
        setAnswers(prev => ({ ...prev, [index]: value }));
    };

    const checkAnswer = (index) => {
        const isCorrect = answers[index]?.trim().toLowerCase() === quizQuestions[index].answer.toLowerCase();
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-amber-800 mb-8">Giving Orders: Imperatives</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">1. Commands and Requests</h2>
                <p className="text-slate-600 mb-4">Imperatives are used to give commands, orders, or make polite requests. The form is just the base verb!</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-bold text-blue-800 text-xl">Command</h3>
                        <p className="italic mt-1">"Open the window."</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <h3 className="font-bold text-purple-800 text-xl">Polite Request</h3>
                        <p className="italic mt-1">"Please open the window."</p>
                    </div>
                </div>
                 <div className="p-4 bg-red-50 rounded-lg mt-4">
                        <h3 className="font-bold text-red-800 text-xl">Negative Command</h3>
                        <p className="font-mono mt-1 p-2 bg-white rounded">Don't + Verb (base)</p>
                        <p className="italic mt-1">"Don't touch that!"</p>
                    </div>
            </WorksheetCard>

            {/* 2. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">2. Give the Command</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-amber-50 rounded-lg">
                            <label className="font-semibold text-slate-700 text-xl">{q.sentence} (Use the verb: {q.verb})</label>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-amber-300 rounded-lg" placeholder="Type the imperative..." disabled={feedback[index] !== undefined} />
                                <button onClick={() => checkAnswer(index)} className="px-4 py-2 bg-amber-500 text-white rounded-lg" disabled={feedback[index] !== undefined}>Check</button>
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

export default Level2ImperativesLesson;