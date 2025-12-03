import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level4PresentPerfectVsPastSimpleLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quizQuestions = [
        { sentence: "I ___ (see) that movie last week.", options: ["saw", "have seen"], answer: "saw" },
        { sentence: "She ___ (live) in London since 2015.", options: ["lived", "has lived"], answer: "has lived" },
        { sentence: "___ you ___ (finish) your homework yet?", options: ["Did...finish", "Have...finished"], answer: "Have...finished" },
        { sentence: "He ___ (go) to the store an hour ago.", options: ["went", "has gone"], answer: "went" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-violet-800 mb-8">Time Detectives: Present Perfect vs. Past Simple</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">1. Finished Time vs. Unfinished Time</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-bold text-blue-800 text-xl">Past Simple</h3>
                        <p className="text-slate-600">For finished actions at a <strong>specific</strong> time in the past.</p>
                        <p className="font-semibold mt-2">Keywords: yesterday, last year, in 2010, ago</p>
                        <p className="italic mt-1">"I visited Rome in 2018."</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <h3 className="font-bold text-purple-800 text-xl">Present Perfect</h3>
                        <p className="text-slate-600">For actions at an <strong>unspecific</strong> time, or actions connected to now.</p>
                        <p className="font-semibold mt-2">Keywords: ever, never, for, since, yet, already</p>
                        <p className="italic mt-1">"I have visited Rome."</p>
                    </div>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">2. Spot the Difference</h2>
                <div className="p-4 bg-slate-100 rounded-lg space-y-2 text-lg">
                    <p>I <strong>lost</strong> my keys yesterday. (The action is finished. I probably found them.)</p>
                    <p>I <strong>have lost</strong> my keys. (The action has a result now. I can't find them.)</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">3. Choose the Correct Tense</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-violet-50 rounded-lg">
                            <p className="text-xl font-semibold text-slate-700 mb-3">{q.sentence}</p>
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

export default Level4PresentPerfectVsPastSimpleLesson;