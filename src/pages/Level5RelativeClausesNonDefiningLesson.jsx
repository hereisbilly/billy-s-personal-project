import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level5RelativeClausesNonDefiningLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quizQuestions = [
        { sentence: "My brother, ___ lives in Canada, is a scientist.", options: ["who", "which", "that"], answer: "who" },
        { sentence: "The Eiffel Tower, ___ is in Paris, is famous.", options: ["who", "which", "that"], answer: "which" },
        { sentence: "I spoke to Sarah, ___ car was parked outside.", options: ["who", "whose", "which"], answer: "whose" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-rose-800 mb-8">Extra Info: Non-Defining Relative Clauses</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">1. Adding Extra, Non-Essential Information</h2>
                <p className="text-slate-600 mb-4">Non-defining relative clauses give extra information that is not essential to identify the noun. They are always separated by commas.</p>
                <div className="p-4 bg-rose-50 rounded-lg">
                    <h3 className="font-bold text-rose-800 text-xl">Key Points</h3>
                    <ul className="list-disc list-inside mt-2 text-slate-700">
                        <li>Always use commas: , who lives in Paris,</li>
                        <li>Use `who` for people, `which` for things.</li>
                        <li>You <strong>cannot</strong> use `that`.</li>
                    </ul>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">2. Defining vs. Non-Defining</h2>
                <div className="p-4 bg-slate-100 rounded-lg space-y-2 text-lg">
                    <p><strong>Defining:</strong> The woman <strong>who lives next door</strong> is a doctor. (Tells us *which* woman).</p>
                    <p><strong>Non-Defining:</strong> My mother, <strong>who lives next door</strong>, is a doctor. (We already know who my mother is; the clause is extra info).</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-rose-700 mb-4">3. Choose the Correct Pronoun</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-rose-50 rounded-lg">
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

export default Level5RelativeClausesNonDefiningLesson;