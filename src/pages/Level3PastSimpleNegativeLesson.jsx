import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level3PastSimpleNegativeLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quizQuestions = [
        { sentence: "She went to the party.", negative: "She didn't go to the party." },
        { sentence: "They played tennis.", question: "Did they play tennis?" },
        { sentence: "He ate the cake.", negative: "He didn't eat the cake." },
    ];

    const handleAnswerChange = (index, value) => {
        setAnswers(prev => ({ ...prev, [index]: value }));
    };

    const checkAnswer = (index) => {
        const correctAnswer = quizQuestions[index].negative || quizQuestions[index].question;
        const userAnswer = answers[index]?.trim().replace(/\?$/, '').toLowerCase();
        const isCorrect = userAnswer === correctAnswer.replace(/\?$/, '').toLowerCase();
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-8">Past Simple: No & Maybe</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">1. Negatives and Questions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-red-50 rounded-lg">
                        <h3 className="font-bold text-red-800 text-xl">Negative: Saying "No"</h3>
                        <p className="text-slate-600 mb-2">Use <strong>didn't</strong> + the <strong>base verb</strong> (no -ed!).</p>
                        <p className="font-mono p-2 bg-white rounded">Subject + <span className="text-red-600">didn't</span> + Verb (base)</p>
                        <p className="mt-2">Example: He <span className="text-red-600">didn't</span> work.</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <h3 className="font-bold text-purple-800 text-xl">Question: Asking "Maybe?"</h3>
                        <p className="text-slate-600 mb-2">Start with <strong>Did</strong> + use the <strong>base verb</strong>.</p>
                        <p className="font-mono p-2 bg-white rounded"><span className="text-purple-600">Did</span> + Subject + Verb (base)?</p>
                        <p className="mt-2">Example: <span className="text-purple-600">Did</span> you work?</p>
                    </div>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">2. Spot the Change</h2>
                <div className="p-4 bg-slate-100 rounded-lg space-y-2 text-lg">
                    <p>Positive: I <strong>went</strong> home.</p>
                    <p>Negative: I <strong>didn't go</strong> home.</p>
                    <p>Question: <strong>Did</strong> you <strong>go</strong> home?</p>
                    <p className="text-center font-semibold text-blue-800 mt-4">Notice how 'went' changes back to 'go'!</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">3. Sentence Surgery</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-blue-50 rounded-lg">
                            <p className="font-semibold text-slate-700">Positive: "{q.sentence}"</p>
                            <label className="font-semibold text-slate-700 text-xl mt-2 block">Change to {q.negative ? 'Negative' : 'Question'}:</label>
                            <div className="flex items-center gap-2 mt-1">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-blue-300 rounded-lg" placeholder="Your new sentence..." disabled={feedback[index] !== undefined} />
                                <button onClick={() => checkAnswer(index)} className="px-4 py-2 bg-blue-500 text-white rounded-lg" disabled={feedback[index] !== undefined}>Check</button>
                            </div>
                            {feedback[index] === true && <p className="text-green-600 font-bold mt-2">Correct! The answer is: {q.negative || q.question}</p>}
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

export default Level3PastSimpleNegativeLesson;