import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';

const Level1YesNoQuestionsLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const quizQuestions = [
        { statement: "He is a doctor.", question: "Is he a doctor?" },
        { statement: "They are happy.", question: "Are they happy?" },
        { statement: "You are a student.", question: "Are you a student?" },
    ];

    const handleAnswerChange = (index, value) => {
        setAnswers(prev => ({ ...prev, [index]: value }));
    };

    const checkAnswer = (index) => {
        const userAnswer = answers[index]?.trim().replace(/\?$/, '').toLowerCase();
        const correctAnswer = quizQuestions[index].question.replace(/\?$/, '').toLowerCase();
        setFeedback(prev => ({ ...prev, [index]: userAnswer === correctAnswer }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-8">The Question Swap: Yes/No Questions with "To Be"</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2"><HelpCircle />1. How to Ask Yes/No Questions</h2>
                <p className="text-slate-600 mb-4">To make a question, swap the subject and the verb "to be" (am, is, are).</p>
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <p className="text-lg font-semibold">Statement: <span className="text-blue-600">Subject</span> + <span className="text-purple-600">Verb</span>.</p>
                    <p className="text-lg font-semibold mt-2">Question: <span className="text-purple-600">Verb</span> + <span className="text-blue-600">Subject</span>?</p>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">2. Spot the Swap</h2>
                <div className="p-4 bg-slate-100 rounded-lg space-y-2 text-lg">
                    <p>Statement: She <strong>is</strong> happy.</p>
                    <p>Question: <strong>Is</strong> she happy?</p>
                    <hr className="my-2"/>
                    <p>Statement: They <strong>are</strong> tired.</p>
                    <p>Question: <strong>Are</strong> they tired?</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">3. Sentence Surgery</h2>
                <p className="text-slate-600 mb-4">Change the statement into a question.</p>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-green-50 rounded-lg">
                            <p className="font-semibold text-slate-700">Statement: "{q.statement}"</p>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-green-300 rounded-lg" placeholder="Type the question..." disabled={feedback[index] !== undefined} />
                                <button onClick={() => checkAnswer(index)} className="px-4 py-2 bg-green-500 text-white rounded-lg" disabled={feedback[index] !== undefined}>Check</button>
                            </div>
                            {feedback[index] === true && <p className="text-green-600 font-bold mt-2">Correct! The question is: {q.question}</p>}
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

export default Level1YesNoQuestionsLesson;