import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level6AdvancedPhrasalVerbsLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const rules = [
        { type: 'Particle Placement', rule: 'With separable verbs, the object can go before or after the particle. If the object is a pronoun, it MUST go before.', example: 'Turn the light on. / Turn on the light. / Turn it on. (NOT Turn on it)' },
        { type: 'Phrasal-Prepositional Verbs', rule: 'Verb + Adverb + Preposition. These are always inseparable.', example: 'look forward to, get away with, come up with' },
    ];

    const quizQuestions = [
        { sentence: "I really ___ seeing you next week.", answer: "look forward to" },
        { sentence: "He can't keep lying. He'll never ___ it.", answer: "get away with" },
        { sentence: "She needs to ___ a new idea for the project.", answer: "come up with" },
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
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-sky-800 mb-8">Mastering Phrasal Verbs</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">1. Advanced Structures</h2>
                <p className="text-slate-600 mb-4">Understanding particle placement and three-part phrasal verbs is key to mastery.</p>
                <div className="space-y-4">
                    {rules.map(r => (
                        <div key={r.type} className="p-4 bg-sky-50 rounded-lg">
                            <p className="font-bold text-sky-800 text-xl">{r.type}</p>
                            <p className="text-slate-600 font-semibold">{r.rule}</p>
                            <p className="text-slate-500 italic mt-1">Example: {r.example}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">2. Examples</h2>
                <ul className="list-disc list-inside space-y-2 text-lg text-slate-700">
                    <li>She has to <strong>put up with</strong> a lot of noise.</li>
                    <li>We've <strong>run out of</strong> milk.</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">3. Complete the Sentence</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-sky-50 rounded-lg">
                            <label className="font-semibold text-slate-700 text-xl">{q.sentence.replace('___', '___________')}</label>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-sky-300 rounded-lg" placeholder="Type the phrasal verb..." disabled={feedback[index] !== undefined} />
                                <button onClick={() => checkAnswer(index)} className="px-4 py-2 bg-sky-500 text-white rounded-lg" disabled={feedback[index] !== undefined}>Check</button>
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

export default Level6AdvancedPhrasalVerbsLesson;