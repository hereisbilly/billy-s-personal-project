import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level5CleftSentencesLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const rules = [
        { type: 'It-Cleft', rule: 'It + is/was + [emphasized part] + that/who...', example: '"It was the dog that ate my homework."' },
        { type: 'Wh-Cleft', rule: 'What... + is/was + [emphasized part]', example: '"What I need is a long vacation."' },
    ];

    const quizQuestions = [
        { sentence: "I need a coffee.", cleftType: "What", answer: "What I need is a coffee." },
        { sentence: "John broke the window.", cleftType: "It", answer: "It was John who broke the window." },
    ];

    const handleAnswerChange = (index, value) => {
        setAnswers(prev => ({ ...prev, [index]: value }));
    };

    const checkAnswer = (index) => {
        const userAnswer = answers[index]?.trim().replace(/\.$/, '').toLowerCase();
        const correctAnswer = quizQuestions[index].answer.replace(/\.$/, '').toLowerCase();
        setFeedback(prev => ({ ...prev, [index]: userAnswer === correctAnswer }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-rose-800 mb-8">Emphasis with Cleft Sentences</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">1. Splitting a Sentence for Emphasis</h2>
                <p className="text-slate-600 mb-4">Cleft sentences "cleave" (split) a single clause into two parts to emphasize a specific piece of information.</p>
                <div className="space-y-4">
                    {rules.map(r => (
                        <div key={r.type} className="p-4 bg-rose-50 rounded-lg">
                            <p className="font-bold text-rose-800 text-xl">{r.type}</p>
                            <p className="text-slate-600 font-semibold">{r.rule}</p>
                            <p className="text-slate-500 italic mt-1">{r.example}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">2. Before and After</h2>
                <div className="p-4 bg-slate-100 rounded-lg space-y-2 text-lg">
                    <p><strong>Normal:</strong> The manager made the decision. → <strong>It-Cleft:</strong> It was <strong>the manager</strong> who made the decision.</p>
                    <p><strong>Normal:</strong> I want a new car. → <strong>Wh-Cleft:</strong> What I want is <strong>a new car</strong>.</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">3. Rewrite for Emphasis</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-rose-50 rounded-lg">
                            <p className="font-semibold text-slate-700">Normal: "{q.sentence}" (Use a '{q.cleftType}' cleft)</p>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-rose-300 rounded-lg" placeholder="Type the cleft sentence..." disabled={feedback[index] !== undefined} />
                                <button onClick={() => checkAnswer(index)} className="px-4 py-2 bg-rose-500 text-white rounded-lg" disabled={feedback[index] !== undefined}>Check</button>
                            </div>
                            {feedback[index] === true && <p className="text-green-600 font-bold mt-2">Correct!</p>}
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

export default Level5CleftSentencesLesson;