import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level6GerundInfinitiveAdvancedLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const rules = [
        { verb: 'stop', gerund: 'stop doing (quit an activity)', infinitive: 'stop to do (stop in order to do something else)' },
        { verb: 'remember', gerund: 'remember doing (recall a memory)', infinitive: 'remember to do (not forget to do something)' },
        { verb: 'try', gerund: 'try doing (experiment)', infinitive: 'try to do (make an effort)' },
    ];

    const quizQuestions = [
        { sentence: "I stopped ___ smoke.", options: ["to smoke", "smoking"], answer: "to smoke", meaning: "I paused what I was doing in order to have a cigarette." },
        { sentence: "I stopped ___ last year.", options: ["to smoke", "smoking"], answer: "smoking", meaning: "I quit the habit of smoking." },
        { sentence: "I remember ___ the door.", options: ["to lock", "locking"], answer: "locking", meaning: "I have a memory of the action of locking it." },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-sky-800 mb-8">Gerund vs. Infinitive: Advanced Nuances</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">1. Verbs with a Change in Meaning</h2>
                <p className="text-slate-600 mb-4">For some verbs, the choice between a gerund or an infinitive dramatically changes the meaning of the sentence.</p>
                <div className="space-y-4">
                    {rules.map(r => (
                        <div key={r.verb} className="p-4 bg-sky-50 rounded-lg">
                            <p className="font-bold text-sky-800 text-xl uppercase">{r.verb}</p>
                            <p className="text-slate-600 mt-1"><strong>+ Gerund:</strong> {r.gerund}</p>
                            <p className="text-slate-600"><strong>+ Infinitive:</strong> {r.infinitive}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>He <strong>tried to open</strong> the jar, but it was stuck. (effort)</li>
                    <li>He <strong>tried adding</strong> some oil to the lid. (experiment)</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">3. Choose the Correct Form</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-sky-50 rounded-lg">
                            <p className="text-xl font-semibold text-slate-700 mb-3">{q.sentence.replace('___', '___________')}</p>
                            <div className="flex items-center gap-4">
                                {q.options.map(option => <button key={option} onClick={() => handleAnswerSelect(index, option)} className={`px-6 py-2 text-lg font-bold rounded-lg border-2 transition-colors disabled:cursor-not-allowed ${answers[index] === option && feedback[index] === true ? 'bg-green-200 border-green-400' : ''} ${answers[index] === option && feedback[index] === false ? 'bg-red-200 border-red-400' : ''} ${!feedback[index] ? 'bg-white border-slate-300 hover:bg-slate-100' : ''}`} disabled={feedback[index] !== undefined}>{option}</button>)}
                            </div>
                            {feedback[index] !== undefined && <p className="text-sky-700 font-bold mt-2">Correct! Meaning: {q.meaning}</p>}
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

export default Level6GerundInfinitiveAdvancedLesson;