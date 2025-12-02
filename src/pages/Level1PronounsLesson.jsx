import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { User, Users, Dog, Tv } from 'lucide-react';

const Level1PronounsLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const pronouns = [
        { pronoun: 'I', use: 'Talking about yourself' },
        { pronoun: 'You', use: 'Talking to someone' },
        { pronoun: 'He', use: 'Talking about a boy/man' },
        { pronoun: 'She', use: 'Talking about a girl/woman' },
        { pronoun: 'It', use: 'Talking about a thing/animal' },
        { pronoun: 'We', use: 'You and other people' },
        { pronoun: 'They', use: 'Talking about other people/things' },
    ];

    const quizQuestions = [
        { sentence: "Maria is happy. ___ is smiling.", options: ["He", "She", "It"], answer: "She" },
        { sentence: "The dog is big. ___ is friendly.", options: ["He", "She", "It"], answer: "It" },
        { sentence: "Tom and I are friends. ___ play together.", options: ["We", "They", "You"], answer: "We" },
        { sentence: "The students are smart. ___ learn fast.", options: ["We", "They", "You"], answer: "They" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-8">The Pronoun Power-Up: I, You, He, She...</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">1. What are Pronouns?</h2>
                <p className="text-slate-600 mb-4">Pronouns are short words that take the place of a noun. We use them to avoid repeating the same noun.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {pronouns.map(p => (
                        <div key={p.pronoun} className="p-4 bg-blue-50 rounded-lg text-center">
                            <p className="font-bold text-blue-800 text-4xl">{p.pronoun}</p>
                            <p className="text-sm text-slate-600 mt-1">{p.use}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">2. Pronouns in Action</h2>
                <div className="p-4 bg-slate-100 rounded-lg">
                    <p className="text-lg">Instead of: "<strong>David</strong> is tall. <strong>David</strong> is a doctor."</p>
                    <p className="text-lg mt-2">We say: "David is tall. <strong>He</strong> is a doctor."</p>
                    <p className="text-center font-semibold text-green-800 mt-4">'He' replaces 'David'.</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">3. Choose the Correct Pronoun</h2>
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

export default Level1PronounsLesson;