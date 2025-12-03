import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level5Conditional3Lesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quizQuestions = [
        { sentence: "If I ___ (know) you were coming, I ___ (bake) a cake.", answer: "had known, would have baked" },
        { sentence: "She ___ (pass) the exam if she ___ (study) harder.", answer: "would have passed, had studied" },
        { sentence: "We wouldn't have missed the train if we ___ (leave) earlier.", answer: "had left" },
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
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-rose-800 mb-8">Past Regrets: The Third Conditional</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">1. Imaginary Past Situations</h2>
                <p className="text-slate-600 mb-4">We use the Third Conditional to talk about an imaginary situation in the past and its imaginary result. It's often used to express regret.</p>
                <div className="p-4 bg-rose-50 rounded-lg">
                    <h3 className="font-bold text-rose-800 text-xl">Formula</h3>
                    <p className="font-mono p-2 bg-white rounded">If + Past Perfect, ... would have + Past Participle</p>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>If I <strong>had studied</strong> harder, I <strong>would have passed</strong> the exam. (But I didn't study, so I didn't pass).</li>
                    <li>He <strong>would have been</strong> on time if he <strong>hadn't missed</strong> the bus.</li>
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
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-rose-300 rounded-lg" placeholder="Type the verb forms..." disabled={feedback[index] !== undefined} />
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

export default Level5Conditional3Lesson;