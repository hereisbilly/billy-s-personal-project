import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { User, Users, Dog } from 'lucide-react';

const Level1PossessiveAdjectivesLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const possessives = [
        { pronoun: 'I', possessive: 'my' },
        { pronoun: 'You', possessive: 'your' },
        { pronoun: 'He', possessive: 'his' },
        { pronoun: 'She', possessive: 'her' },
        { pronoun: 'It', possessive: 'its' },
        { pronoun: 'We', possessive: 'our' },
        { pronoun: 'They', possessive: 'their' },
    ];

    const quizQuestions = [
        { sentence: "I have a cat. It is ___ cat.", options: ["my", "your", "his"], answer: "my" },
        { sentence: "He has a book. It is ___ book.", options: ["her", "his", "its"], answer: "his" },
        { sentence: "They have a car. It is ___ car.", options: ["our", "your", "their"], answer: "their" },
        { sentence: "She has a pen. It is ___ pen.", options: ["his", "her", "my"], answer: "her" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-8">My Stuff, Your Stuff: Possessive Adjectives</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">1. Words That Show Ownership</h2>
                <p className="text-slate-600 mb-4">We use these words to show who owns something.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {possessives.map(p => (
                        <div key={p.pronoun} className="p-4 bg-yellow-50 rounded-lg text-center">
                            <p className="font-bold text-yellow-800 text-2xl">{p.pronoun} → {p.possessive}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>This is <strong>my</strong> house.</li>
                    <li>That is <strong>his</strong> dog.</li>
                    <li>Are these <strong>your</strong> keys?</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">3. Choose the Correct Word</h2>
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

export default Level1PossessiveAdjectivesLesson;