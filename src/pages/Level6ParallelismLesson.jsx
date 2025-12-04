import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level6ParallelismLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quizQuestions = [
        { incorrect: "She likes to run, swimming, and to hike.", correct: "She likes to run, to swim, and to hike." },
        { incorrect: "The report was informative, well-written, and it was helpful.", correct: "The report was informative, well-written, and helpful." },
    ];

    const handleAnswerChange = (index, value) => {
        setAnswers(prev => ({ ...prev, [index]: value }));
    };

    const checkAnswer = (index) => {
        const userAnswer = answers[index]?.trim().replace(/\.$/, '').toLowerCase();
        const correctAnswer = quizQuestions[index].correct.replace(/\.$/, '').toLowerCase();
        setFeedback(prev => ({ ...prev, [index]: userAnswer === correctAnswer }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-sky-800 mb-8">Elegant Writing: Parallelism & Sentence Balance</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">1. Keeping Structures Consistent</h2>
                <p className="text-slate-600 mb-4">Parallelism means using the same grammatical structure for two or more parts of a sentence that are linked. It creates balance and makes sentences easier to read.</p>
                <div className="p-4 bg-sky-50 rounded-lg">
                    <h3 className="font-bold text-sky-800 text-xl">The Rule</h3>
                    <p className="text-slate-700 mt-1">Match nouns with nouns, verbs with verbs, phrases with phrases, and clauses with clauses.</p>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">2. Faulty vs. Parallel</h2>
                <ul className="list-none space-y-4 text-lg text-slate-700">
                    <li><strong className="text-red-500">Faulty:</strong> I enjoy <strong>reading</strong>, <strong>to write</strong>, and <strong>to play</strong> the piano.</li>
                    <li><strong className="text-green-500">Parallel:</strong> I enjoy <strong>reading</strong>, <strong>writing</strong>, and <strong>playing</strong> the piano.</li>
                    <hr/>
                    <li><strong className="text-red-500">Faulty:</strong> He was a great leader, a brilliant speaker, and <strong>also inspired people</strong>.</li>
                    <li><strong className="text-green-500">Parallel:</strong> He was a great leader, a brilliant speaker, and <strong>an inspiration to people</strong>.</li>
                </ul>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">3. Correct the Sentence</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-sky-50 rounded-lg">
                            <p className="font-semibold text-slate-700">Faulty: "{q.incorrect}"</p>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-sky-300 rounded-lg" placeholder="Rewrite the sentence..." disabled={feedback[index] !== undefined} />
                                <button onClick={() => checkAnswer(index)} className="px-4 py-2 bg-sky-500 text-white rounded-lg" disabled={feedback[index] !== undefined}>Check</button>
                            </div>
                            {feedback[index] === true && <p className="text-green-600 font-bold mt-2">Correct!</p>}
                            {feedback[index] === false && <p className="text-red-600 font-bold mt-2">Not quite. A correct version is: "{q.correct}"</p>}
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

export default Level6ParallelismLesson;