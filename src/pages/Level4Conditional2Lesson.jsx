import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level4Conditional2Lesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quizQuestions = [
        { sentence: "If I ___ (win) the lottery, I ___ (buy) a big house.", answer: "won, would buy" },
        { sentence: "If she ___ (have) more time, she ___ (travel) more.", answer: "had, would travel" },
        { sentence: "What ___ you ___ (do) if you ___ (be) the president?", answer: "would do, were" },
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
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-violet-800 mb-8">Dreaming Big: The Second Conditional</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">1. Unreal or Hypothetical Situations</h2>
                <p className="text-slate-600 mb-4">We use the Second Conditional to talk about imaginary situations in the present or future.</p>
                <div className="p-4 bg-violet-50 rounded-lg">
                    <h3 className="font-bold text-violet-800 text-xl">Formula</h3>
                    <p className="font-mono p-2 bg-white rounded">If + Past Simple, ... would + Verb (base)</p>
                    <p className="mt-2 text-slate-700">Note: With 'to be', we often use 'were' for all subjects (If I were you...).</p>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>If I <strong>had</strong> a million dollars, I <strong>would travel</strong> the world. (I don't have it)</li>
                    <li>If he <strong>knew</strong> the answer, he <strong>would tell</strong> us. (He doesn't know)</li>
                    <li>If I <strong>were</strong> you, I <strong>would study</strong> harder. (Giving advice)</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">3. What Would You Do?</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-violet-50 rounded-lg">
                            <label className="font-semibold text-slate-700 text-xl">{q.sentence}</label>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-violet-300 rounded-lg" placeholder="Type the verb forms..." disabled={feedback[index] !== undefined} />
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

export default Level4Conditional2Lesson;