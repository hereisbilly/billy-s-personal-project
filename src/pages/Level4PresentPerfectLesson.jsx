import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level4PresentPerfectLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const rules = [
        { rule: 'Life Experience', example: 'I have been to Japan. (in my life)' },
        { rule: 'Unfinished Time', example: 'She has called me twice this morning. (the morning is not over)' },
        { rule: 'Present Result', example: 'I have lost my keys. (so I can\'t get in now)' },
    ];

    const quizQuestions = [
        { sentence: "She ___ (visit) Paris three times.", answer: "has visited" },
        { sentence: "We ___ (not see) that movie yet.", answer: "have not seen" },
        { sentence: "___ you ever ___ (eat) sushi?", answer: "have eaten" },
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
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-violet-800 mb-8">The Experience Collector: Present Perfect Simple</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">1. Connecting the Past to the Present</h2>
                <p className="text-slate-600 mb-4">The Present Perfect is used for actions where the exact past time is not important, but the connection to the present is.</p>
                <p className="font-mono p-2 bg-violet-50 rounded">Subject + have/has + Past Participle (V3)</p>
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
                    <li>I'<strong>ve finished</strong> my homework. (Result: I am free now)</li>
                    <li>He'<strong>s lived</strong> here for five years. (He still lives here)</li>
                    <li>Have you ever <strong>seen</strong> a ghost? (Experience)</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">3. Practice the Form</h2>
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

export default Level4PresentPerfectLesson;