import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level2ObjectPronounsLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const pronouns = [
        { subject: 'I', object: 'me' },
        { subject: 'You', object: 'you' },
        { subject: 'He', object: 'him' },
        { subject: 'She', object: 'her' },
        { subject: 'It', object: 'it' },
        { subject: 'We', object: 'us' },
        { subject: 'They', object: 'them' },
    ];

    const quizQuestions = [
        { sentence: "She likes ___.", options: ["he", "him"], answer: "him" },
        { sentence: "I can see ___.", options: ["they", "them"], answer: "them" },
        { sentence: "Please give the book to ___.", options: ["I", "me"], answer: "me" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-amber-800 mb-8">Receiving the Action: Object Pronouns</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">1. Who Receives the Action?</h2>
                <p className="text-slate-600 mb-4">Object pronouns receive the action of the verb. They come after the verb or a preposition (like 'to', 'for', 'with').</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {pronouns.map(p => (
                        <div key={p.subject} className="p-4 bg-amber-50 rounded-lg text-center">
                            <p className="font-bold text-amber-800 text-2xl">{p.subject} → {p.object}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>He knows <strong>me</strong>. (NOT: He knows I.)</li>
                    <li>I gave the gift to <strong>her</strong>. (NOT: to she.)</li>
                    <li>The teacher is talking to <strong>us</strong>. (NOT: to we.)</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">3. Choose the Correct Pronoun</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-amber-50 rounded-lg">
                            <p className="text-xl font-semibold text-slate-700 mb-3">{q.sentence.split('___')[0]} _____ {q.sentence.split('___')[1]}</p>
                            <div className="flex items-center gap-4">
                                {q.options.map(option => <button key={option} onClick={() => handleAnswerSelect(index, option)} className={`px-6 py-2 text-lg font-bold rounded-lg border-2 transition-colors disabled:cursor-not-allowed ${answers[index] === option && feedback[index] === true ? 'bg-green-200 border-green-400' : ''} ${answers[index] === option && feedback[index] === false ? 'bg-red-200 border-red-400' : ''} ${!feedback[index] ? 'bg-white border-slate-300 hover:bg-slate-100' : ''}`} disabled={feedback[index] !== undefined}>{option}</button>)}
                            </div>
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

export default Level2ObjectPronounsLesson;