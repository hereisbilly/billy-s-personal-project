import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level2CanCantLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quizQuestions = [
        { sentence: "A fish ___ swim.", options: ["can", "can't"], answer: "can" },
        { sentence: "A bird ___ sing, but it ___ talk.", options: ["can, can't", "can't, can"], answer: "can, can't" },
        { sentence: "You ___ park here. It's not allowed.", options: ["can", "can't"], answer: "can't" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-amber-800 mb-8">Ability & Permission: Can / Can't</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">1. What is "Can"?</h2>
                <p className="text-slate-600 mb-4">We use "can" to talk about ability (what you are able to do) and permission (what you are allowed to do).</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                        <h3 className="font-bold text-green-800 text-xl">Can (Positive)</h3>
                        <p className="text-slate-600">Ability: "I can speak English."</p>
                        <p className="text-slate-600">Permission: "You can sit here."</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                        <h3 className="font-bold text-red-800 text-xl">Can't (Negative)</h3>
                        <p className="text-slate-600">No Ability: "I can't fly."</p>
                        <p className="text-slate-600">No Permission: "You can't smoke here."</p>
                    </div>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>She <strong>can</strong> play the guitar.</li>
                    <li>We <strong>can't</strong> go to the party.</li>
                    <li><strong>Can</strong> I ask a question? (Question form)</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">3. Choose the Correct Word</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-amber-50 rounded-lg">
                            <p className="text-xl font-semibold text-slate-700 mb-3">{q.sentence.replace('___', '_____')}</p>
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

export default Level2CanCantLesson;