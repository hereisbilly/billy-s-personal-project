import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level5ParticipleClausesLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quizQuestions = [
        { sentence: "The man who is sitting over there is my boss.", reduced: "The man sitting over there is my boss." },
        { sentence: "The letter that was written by John arrived today.", reduced: "The letter written by John arrived today." },
        { sentence: "Feeling tired, she went to bed early.", original: "Because she felt tired, she went to bed early." },
    ];

    const handleAnswerChange = (index, value) => {
        setAnswers(prev => ({ ...prev, [index]: value }));
    };

    const checkAnswer = (index) => {
        const userAnswer = answers[index]?.trim().replace(/\.$/, '').toLowerCase();
        const correctAnswer = quizQuestions[index].reduced.replace(/\.$/, '').toLowerCase();
        setFeedback(prev => ({ ...prev, [index]: userAnswer === correctAnswer }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-rose-800 mb-8">Shortening Sentences: Participle Clauses</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">1. Reducing Relative Clauses</h2>
                <p className="text-slate-600 mb-4">Participle clauses are a way to make sentences more concise by replacing a relative clause.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-bold text-blue-800 text-xl">Present Participle (-ing)</h3>
                        <p className="text-slate-600">Replaces an active verb.</p>
                        <p className="italic mt-1">"The boy <strong>who is playing</strong>..." → "The boy <strong>playing</strong>..."</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <h3 className="font-bold text-purple-800 text-xl">Past Participle (-ed/V3)</h3>
                        <p className="text-slate-600">Replaces a passive verb.</p>
                        <p className="italic mt-1">"The car <strong>that was stolen</strong>..." → "The car <strong>stolen</strong>..."</p>
                    </div>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">2. More Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>Do you know the woman <strong>talking to Tom</strong>?</li>
                    <li>Most of the goods <strong>made in this factory</strong> are exported.</li>
                    <li><strong>Tired from the long journey</strong>, he went straight to bed. (Also used for reason)</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">3. Reduce the Sentence</h2>
                <div className="space-y-4">
                    {quizQuestions.slice(0, 2).map((q, index) => (
                        <div key={index} className="p-4 bg-rose-50 rounded-lg">
                            <p className="font-semibold text-slate-700">Original: "{q.sentence}"</p>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-rose-300 rounded-lg" placeholder="Type the reduced sentence..." disabled={feedback[index] !== undefined} />
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

export default Level5ParticipleClausesLesson;