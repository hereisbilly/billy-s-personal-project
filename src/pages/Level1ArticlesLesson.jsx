import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';

const Level1ArticlesLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quizQuestions = [
        { sentence: "I see ___ cat.", options: ["a", "an"], answer: "a" },
        { sentence: "She has ___ apple.", options: ["a", "an"], answer: "an" },
        { sentence: "___ sun is bright.", options: ["A", "The"], answer: "The" },
        { sentence: "He is ___ doctor.", options: ["a", "an"], answer: "a" },
        { sentence: "That is ___ elephant.", options: ["a", "an"], answer: "an" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-8">The Article Alliance: Using A, An, & The</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">1. The Rules of Articles</h2>
                <p className="text-slate-600 mb-4">Articles are small words that come before nouns.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    {/* A */}
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-bold text-blue-800 text-5xl">A</h3>
                        <p className="text-slate-600 mt-2">Use 'a' before words that start with a <strong>consonant sound</strong>.</p>
                        <p className="font-semibold text-lg mt-2">a cat, a dog, a house</p>
                    </div>
                    {/* An */}
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <h3 className="font-bold text-purple-800 text-5xl">An</h3>
                        <p className="text-slate-600 mt-2">Use 'an' before words that start with a <strong>vowel sound</strong> (a, e, i, o, u).</p>
                        <p className="font-semibold text-lg mt-2">an apple, an elephant</p>
                    </div>
                    {/* The */}
                    <div className="p-4 bg-yellow-50 rounded-lg">
                        <h3 className="font-bold text-yellow-800 text-5xl">The</h3>
                        <p className="text-slate-600 mt-2">Use 'the' for a <strong>specific</strong> or unique noun.</p>
                        <p className="font-semibold text-lg mt-2">the sun, the red car</p>
                    </div>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">2. Spot the Difference</h2>
                <div className="space-y-4">
                    <div className="p-4 bg-slate-100 rounded-lg">
                        <p className="text-lg">"I see <strong>a</strong> dog." (Any dog, not a specific one)</p>
                    </div>
                    <div className="p-4 bg-slate-100 rounded-lg">
                        <p className="text-lg">"I see <strong>the</strong> dog." (A specific dog we both know)</p>
                    </div>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">3. Choose the Correct Article</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-green-50 rounded-lg">
                            <p className="text-xl font-semibold text-slate-700 mb-3">{q.sentence.split('___')[0]} _____ {q.sentence.split('___')[1]}</p>
                            <div className="flex items-center gap-4">
                                {q.options.map(option => {
                                    const isSelected = answers[index] === option;
                                    const isCorrect = feedback[index] === true && isSelected;
                                    const isIncorrect = feedback[index] === false && isSelected;
                                    return <button key={option} onClick={() => handleAnswerSelect(index, option)} className={`px-6 py-2 text-lg font-bold rounded-lg border-2 transition-colors disabled:cursor-not-allowed ${isCorrect ? 'bg-green-200 border-green-400' : ''} ${isIncorrect ? 'bg-red-200 border-red-400' : ''} ${!feedback[index] ? 'bg-white border-slate-300 hover:bg-slate-100' : ''}`} disabled={feedback[index] !== undefined}>{option}</button>
                                })}
                                {feedback[index] === true && <Check className="text-green-600" size={28} />}
                                {feedback[index] === false && <X className="text-red-600" size={28} />}
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

export default Level1ArticlesLesson;