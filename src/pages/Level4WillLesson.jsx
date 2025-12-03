import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level4WillLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const rules = [
        { rule: 'Spontaneous Decision', example: 'The phone is ringing. I\'ll get it!' },
        { rule: 'Prediction (Opinion)', example: 'I think it will rain tomorrow.' },
        { rule: 'Promise / Offer', example: 'I will help you with your homework.' },
    ];

    const quizQuestions = [
        { sentence: "I'm thirsty. I think I ___ buy a drink.", answer: "will" },
        { sentence: "Don't worry, I ___ be careful.", answer: "will" },
        { sentence: "In the year 2050, people ___ live on Mars.", answer: "will" },
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
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-violet-800 mb-8">Crystal Ball Predictions: Future with "Will"</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">1. Using "Will" for the Future</h2>
                <p className="text-slate-600 mb-4">"Will" is used for future actions that are not planned, or are predictions based on opinion.</p>
                <p className="font-mono p-2 bg-violet-50 rounded">Subject + will + Verb (base)</p>
                <div className="space-y-4 mt-4">
                    {rules.map(r => (
                        <div key={r.rule} className="p-4 bg-violet-50 rounded-lg">
                            <p className="font-bold text-violet-800 text-xl">{r.rule}</p>
                            <p className="text-slate-600">Example: {r.example}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>"Oh no, I forgot my wallet!" "Don't worry, I'<strong>ll pay</strong>." (Spontaneous)</li>
                    <li>I think our team <strong>will win</strong> the game. (Prediction)</li>
                    <li>I promise I <strong>will call</strong> you tonight. (Promise)</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">3. Complete with "will"</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-violet-50 rounded-lg">
                            <label className="font-semibold text-slate-700 text-xl">{q.sentence}</label>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-violet-300 rounded-lg" placeholder="Type the verb..." disabled={feedback[index] !== undefined} />
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

export default Level4WillLesson;