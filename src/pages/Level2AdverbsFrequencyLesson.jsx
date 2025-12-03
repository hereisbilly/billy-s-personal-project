import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level2AdverbsFrequencyLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const adverbs = [
        { word: 'always', percent: '100%' },
        { word: 'usually', percent: '90%' },
        { word: 'often', percent: '70%' },
        { word: 'sometimes', percent: '50%' },
        { word: 'never', percent: '0%' },
    ];

    const quizQuestions = [
        { sentence: "I ___ drink coffee in the morning. (100%)", answer: "always" },
        { sentence: "She is ___ late for class. (0%)", answer: "never" },
        { sentence: "We ___ watch movies on weekends. (50%)", answer: "sometimes" },
    ];

    const handleAnswerChange = (index, value) => {
        setAnswers(prev => ({ ...prev, [index]: value.toLowerCase() }));
    };

    const checkAnswer = (index) => {
        const isCorrect = answers[index]?.trim() === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-amber-800 mb-8">How Often? Adverbs of Frequency</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">1. Saying How Often</h2>
                <p className="text-slate-600 mb-4">These adverbs tell us how frequently an action happens.</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {adverbs.map(a => (
                        <div key={a.word} className="p-4 bg-amber-50 rounded-lg text-center">
                            <p className="font-bold text-amber-800 text-2xl">{a.word}</p>
                            <p className="text-slate-600">{a.percent}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">2. Where to Put Them</h2>
                <div className="p-4 bg-slate-100 rounded-lg space-y-2 text-lg">
                    <p>Before the main verb: "He <strong>always</strong> helps."</p>
                    <p>After the verb 'to be': "He is <strong>always</strong> helpful."</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-amber-700 mb-4">3. Complete the Sentence</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-amber-50 rounded-lg">
                            <label className="font-semibold text-slate-700 text-xl">{q.sentence}</label>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-amber-300 rounded-lg" placeholder="Type the adverb..." disabled={feedback[index] !== undefined} />
                                <button onClick={() => checkAnswer(index)} className="px-4 py-2 bg-amber-500 text-white rounded-lg" disabled={feedback[index] !== undefined}>Check</button>
                            </div>
                            {feedback[index] === true && <p className="text-green-600 font-bold mt-2">Correct!</p>}
                            {feedback[index] === false && <p className="text-red-600 font-bold mt-2">Not quite. The answer is: {q.answer}</p>}
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

export default Level2AdverbsFrequencyLesson;