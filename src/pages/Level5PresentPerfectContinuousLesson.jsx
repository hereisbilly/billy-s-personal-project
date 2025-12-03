import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level5PresentPerfectContinuousLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quizQuestions = [
        { sentence: "How long ___ you ___ (learn) English?", answer: "have been learning" },
        { sentence: "She's tired. She ___ (work) all day.", answer: "has been working" },
        { sentence: "It ___ (rain) for hours.", answer: "has been raining" },
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
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-rose-800 mb-8">Ongoing Past: Present Perfect Continuous</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">1. Actions Over Time</h2>
                <p className="text-slate-600 mb-4">We use this tense for an action that started in the past and is still continuing, or has recently stopped but has a result in the present.</p>
                <div className="p-4 bg-rose-50 rounded-lg">
                    <h3 className="font-bold text-rose-800 text-xl">Formula</h3>
                    <p className="font-mono p-2 bg-white rounded">Subject + have/has + been + Verb-ing</p>
                    <ul className="list-disc list-inside mt-2 text-slate-700">
                        <li>Focus on duration: "I <strong>have been waiting</strong> for an hour."</li>
                        <li>Recent action with result: "The ground is wet because it <strong>has been raining</strong>."</li>
                    </ul>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>She <strong>has been talking</strong> on the phone for two hours.</li>
                    <li>We <strong>have been living</strong> here since 2010.</li>
                    <li>I'm tired because I <strong>have been studying</strong> all night.</li>
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
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-rose-300 rounded-lg" placeholder="Type the verb form..." disabled={feedback[index] !== undefined} />
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

export default Level5PresentPerfectContinuousLesson;