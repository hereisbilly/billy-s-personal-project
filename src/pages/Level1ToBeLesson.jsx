import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level1ToBeLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const toBeRules = [
        { pronoun: 'I', verb: 'am' },
        { pronoun: 'You', verb: 'are' },
        { pronoun: 'He / She / It', verb: 'is' },
        { pronoun: 'We', verb: 'are' },
        { pronoun: 'They', verb: 'are' },
    ];

    const quizQuestions = [
        { sentence: "I ___ a student.", options: ["am", "is", "are"], answer: "am" },
        { sentence: "She ___ happy.", options: ["am", "is", "are"], answer: "is" },
        { sentence: "They ___ friends.", options: ["am", "is", "are"], answer: "are" },
        { sentence: "The cat ___ small.", options: ["am", "is", "are"], answer: "is" },
        { sentence: "You ___ tall.", options: ["am", "is", "are"], answer: "are" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-8">The "To Be" Team: Am, Is, Are</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">1. The Most Important Verb!</h2>
                <p className="text-slate-600 mb-4">The verb "to be" tells us what someone or something <strong>is</strong>. It changes based on the subject.</p>
                <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-bold text-blue-800 text-xl mb-2">The Rules</h3>
                    {toBeRules.map(rule => (
                        <p key={rule.pronoun} className="text-lg font-mono text-slate-700"><strong className="text-blue-700">{rule.pronoun}</strong> → <strong className="text-purple-700">{rule.verb}</strong></p>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>I <strong>am</strong> a teacher.</li>
                    <li>He <strong>is</strong> happy.</li>
                    <li>The dogs <strong>are</strong> playful.</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">3. Choose the Correct Verb</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-green-50 rounded-lg">
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

export default Level1ToBeLesson;