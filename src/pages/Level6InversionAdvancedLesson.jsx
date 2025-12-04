import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level6InversionAdvancedLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const rules = [
        { word: 'No sooner... than...', example: 'No sooner had I sat down than the phone rang.' },
        { word: 'Hardly/Scarcely... when...', example: 'Hardly had the movie started when he fell asleep.' },
        { word: 'Not until...', example: 'Not until I saw the evidence did I believe him.' },
    ];

    const quizQuestions = [
        { sentence: "As soon as I arrived, the problems started.", inverted: "No sooner had I arrived than the problems started." },
        { sentence: "I didn't understand the situation until he explained it.", inverted: "Not until he explained it did I understand the situation." },
    ];

    const handleAnswerChange = (index, value) => {
        setAnswers(prev => ({ ...prev, [index]: value }));
    };

    const checkAnswer = (index) => {
        const userAnswer = answers[index]?.trim().replace(/\.$/, '').toLowerCase();
        const correctAnswer = quizQuestions[index].inverted.replace(/\.$/, '').toLowerCase();
        setFeedback(prev => ({ ...prev, [index]: userAnswer === correctAnswer }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-sky-800 mb-8">Literary Flair: Advanced Inversion</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">1. More Ways to Invert for Emphasis</h2>
                <p className="text-slate-600 mb-4">These structures are common in formal or literary writing to connect two events that happen in quick succession.</p>
                <div className="space-y-4">
                    {rules.map(r => (
                        <div key={r.word} className="p-4 bg-sky-50 rounded-lg">
                            <p className="font-bold text-sky-800 text-xl">{r.word}</p>
                            <p className="text-slate-500 italic mt-1">"{r.example}"</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">2. Rewrite for Emphasis</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-sky-50 rounded-lg">
                            <p className="font-semibold text-slate-700">Normal: "{q.sentence}"</p>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-sky-300 rounded-lg" placeholder="Type the inverted sentence..." disabled={feedback[index] !== undefined} />
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

export default Level6InversionAdvancedLesson;