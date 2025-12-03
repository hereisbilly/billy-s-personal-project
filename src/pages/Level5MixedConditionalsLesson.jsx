import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level5MixedConditionalsLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quizQuestions = [
        { sentence: "If I ___ (listen) to your advice, I wouldn't be in trouble now.", answer: "had listened" },
        { sentence: "If he were more careful, he ___ (not break) his leg yesterday.", answer: "wouldn't have broken" },
        { sentence: "If I ___ (not be) afraid of spiders, I ___ (pick) it up.", answer: "weren't, would have picked" },
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
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-rose-800 mb-8">Mixing Time: Mixed Conditionals</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">1. Blending Time Frames</h2>
                <p className="text-slate-600 mb-4">Mixed conditionals combine different time frames in one sentence, usually mixing the second and third conditionals.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-bold text-blue-800 text-xl">Past Condition → Present Result</h3>
                        <p className="font-mono mt-1 p-2 bg-white rounded">If + Past Perfect, ... would + Verb</p>
                        <p className="italic mt-1">"If I <strong>had taken</strong> that job, I <strong>would be</strong> rich now."</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <h3 className="font-bold text-purple-800 text-xl">Present Condition → Past Result</h3>
                        <p className="font-mono mt-1 p-2 bg-white rounded">If + Past Simple, ... would have + P.P.</p>
                        <p className="italic mt-1">"If I <strong>were</strong> a good cook, I <strong>would have made</strong> dinner."</p>
                    </div>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>If she <strong>had studied</strong> medicine, she <strong>would be</strong> a doctor now.</li>
                    <li>If I <strong>wasn't</strong> so busy, I <strong>would have gone</strong> to the party last night.</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">3. Complete the Sentence</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-rose-50 rounded-lg">
                            <label className="font-semibold text-slate-700 text-xl">{q.sentence}</label>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-rose-300 rounded-lg" placeholder="Type the verb form(s)..." disabled={feedback[index] !== undefined} />
                                <button onClick={() => checkAnswer(index)} className="px-4 py-2 bg-rose-500 text-white rounded-lg" disabled={feedback[index] !== undefined}>Check</button>
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

export default Level5MixedConditionalsLesson;