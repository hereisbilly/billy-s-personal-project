import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level6FrontingEmphasisLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quizQuestions = [
        { sentence: "I can't stand his arrogance.", fronted: "His arrogance, I can't stand." },
        { sentence: "She walked into the room.", fronted: "Into the room she walked." },
        { sentence: "I remember that day well.", fronted: "That day, I remember well." },
    ];

    const handleAnswerChange = (index, value) => {
        setAnswers(prev => ({ ...prev, [index]: value }));
    };

    const checkAnswer = (index) => {
        const userAnswer = answers[index]?.trim().replace(/\.$/, '').toLowerCase();
        const correctAnswer = quizQuestions[index].fronted.replace(/\.$/, '').toLowerCase();
        setFeedback(prev => ({ ...prev, [index]: userAnswer === correctAnswer }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-sky-800 mb-8">Changing Focus: Fronting & Emphasis</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">1. Moving Phrases to the Front</h2>
                <p className="text-slate-600 mb-4">Fronting is moving a part of the sentence that is not normally at the front to the beginning. We do this to emphasize it. It's common in both speech and writing.</p>
                <div className="p-4 bg-sky-50 rounded-lg">
                    <h3 className="font-bold text-sky-800 text-xl">Types of Fronting</h3>
                    <ul className="list-disc list-inside mt-2 text-slate-700">
                        <li>Fronting an object: "I don't like that music." → "<strong>That music</strong>, I don't like."</li>
                        <li>Fronting a prepositional phrase: "The keys were on the table." → "<strong>On the table</strong> were the keys."</li>
                    </ul>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>Some people I can trust. Others I can't.</li>
                    <li>Up into the air went the balloon.</li>
                    <li>A terrible mess they had made.</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">3. Rewrite for Emphasis</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-sky-50 rounded-lg">
                            <p className="font-semibold text-slate-700">Normal: "{q.sentence}"</p>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-sky-300 rounded-lg" placeholder="Type the fronted sentence..." disabled={feedback[index] !== undefined} />
                                <button onClick={() => checkAnswer(index)} className="px-4 py-2 bg-sky-500 text-white rounded-lg" disabled={feedback[index] !== undefined}>Check</button>
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

export default Level6FrontingEmphasisLesson;