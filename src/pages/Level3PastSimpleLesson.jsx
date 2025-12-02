import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level3PastSimpleLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const regularVerbs = [
        { base: 'work', past: 'worked' }, { base: 'play', past: 'played' }, { base: 'watch', past: 'watched' }
    ];
    const irregularVerbs = [
        { base: 'go', past: 'went' }, { base: 'eat', past: 'ate' }, { base: 'see', past: 'saw' }
    ];

    const quizQuestions = [
        { sentence: "Yesterday, I ___ (work) for 8 hours.", answer: "worked" },
        { sentence: "She ___ (go) to the store last night.", answer: "went" },
        { sentence: "We ___ (eat) pizza for dinner.", answer: "ate" },
        { sentence: "He ___ (play) football with his friends.", answer: "played" },
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
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-8">Yesterday's Actions: The Past Simple</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">1. Talking About Finished Actions</h2>
                <p className="text-slate-600 mb-4">The Past Simple tense is for actions that started and finished in the past.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                        <h3 className="font-bold text-green-800 text-xl">Regular Verbs (Easy!)</h3>
                        <p className="text-slate-600">Just add <strong>-ed</strong>.</p>
                        {regularVerbs.map(v => <p key={v.base} className="font-mono">{v.base} → {v.past}</p>)}
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                        <h3 className="font-bold text-yellow-800 text-xl">Irregular Verbs (Tricky!)</h3>
                        <p className="text-slate-600">These change in special ways. You must remember them!</p>
                        {irregularVerbs.map(v => <p key={v.base} className="font-mono">{v.base} → {v.past}</p>)}
                    </div>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>I <strong>walked</strong> to the park. (Regular)</li>
                    <li>She <strong>saw</strong> a movie. (Irregular)</li>
                    <li>They <strong>played</strong> a game. (Regular)</li>
                    <li>He <strong>ate</strong> a sandwich. (Irregular)</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">3. What Did They Do?</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-blue-50 rounded-lg">
                            <label className="font-semibold text-slate-700 text-xl">{q.sentence}</label>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400" placeholder="Type the past tense verb..." disabled={feedback[index] !== undefined} />
                                <button onClick={() => checkAnswer(index)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-slate-300" disabled={feedback[index] !== undefined}>Check</button>
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

export default Level3PastSimpleLesson;