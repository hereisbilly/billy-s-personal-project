import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level5ModalsDeductionPastLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const modals = [
        { word: 'must have + P.P.', use: 'Almost 100% sure (positive)', example: 'The ground is wet. It must have rained.' },
        { word: 'might/could have + P.P.', use: 'Possible (50% sure)', example: 'She might have forgotten.' },
        { word: 'can\'t/couldn\'t have + P.P.', use: 'Almost 100% sure (negative)', example: 'He can\'t have finished already!' },
    ];

    const quizQuestions = [
        { sentence: "He's not here. He ___ (forget) about the meeting.", answer: "must have forgotten" },
        { sentence: "She didn't answer the phone. She ___ (be) asleep.", answer: "might have been" },
        { sentence: "The cake is gone! Someone ___ (eat) it.", answer: "must have eaten" },
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
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-rose-800 mb-8">Past Detective: Modals of Deduction (Past)</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">1. Making Guesses About the Past</h2>
                <p className="text-slate-600 mb-4">We use these modal forms to say how sure we are about something that happened in the past.</p>
                <div className="space-y-4">
                    {modals.map(m => (
                        <div key={m.word} className="p-4 bg-rose-50 rounded-lg">
                            <p className="font-bold text-rose-800 text-xl">{m.word}</p>
                            <p className="text-slate-600 font-semibold">{m.use}</p>
                            <p className="text-slate-500 italic mt-1">"{m.example}"</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>The lights are on. They <strong>must have arrived</strong> home.</li>
                    <li>I can't find my keys. I <strong>could have left</strong> them in the car.</li>
                    <li>He passed the test? He <strong>can't have studied</strong> at all! That's a surprise.</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">3. Complete the Deduction</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-rose-50 rounded-lg">
                            <label className="font-semibold text-slate-700 text-xl">{q.sentence}</label>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-rose-300 rounded-lg" placeholder="Type the modal form..." disabled={feedback[index] !== undefined} />
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

export default Level5ModalsDeductionPastLesson;