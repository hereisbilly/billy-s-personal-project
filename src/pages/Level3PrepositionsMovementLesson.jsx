import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Level3PrepositionsMovementLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const prepositions = [
        { word: 'to', use: 'Going in a direction', example: 'I am going to the store.' },
        { word: 'into', use: 'Entering something', example: 'He walked into the room.' },
        { word: 'out of', use: 'Exiting something', example: 'She came out of the house.' },
        { word: 'from', use: 'The starting point', example: 'I flew from New York.' },
        { word: 'across', use: 'From one side to the other', example: 'They swam across the river.' },
    ];

    const quizQuestions = [
        { sentence: "We walked ___ the park.", options: ["to", "into", "from"], answer: "to" },
        { sentence: "The cat jumped ___ the box.", options: ["out of", "into", "across"], answer: "into" },
        { sentence: "She drove ___ the bridge.", options: ["from", "across", "out of"], answer: "across" },
    ];

    const handleAnswerSelect = (index, option) => {
        if (feedback[index] !== undefined) return;
        setAnswers(prev => ({ ...prev, [index]: option }));
        const isCorrect = option === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-8">Where Are You Going? Prepositions of Movement</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2"><ArrowRight />1. Movement Words</h2>
                <p className="text-slate-600 mb-4">These prepositions show direction and movement.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {prepositions.map(p => (
                        <div key={p.word} className="p-4 bg-blue-50 rounded-lg">
                            <p className="font-bold text-blue-800 text-2xl">{p.word}</p>
                            <p className="text-slate-600 font-semibold">{p.use}</p>
                            <p className="text-slate-500 italic mt-1">"{p.example}"</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">2. Visualizing Movement</h2>
                <div className="p-4 bg-slate-100 rounded-lg space-y-2 text-lg">
                    <p>He walked <strong>across</strong> the street. (Side A → Side B)</p>
                    <p>She took the book <strong>from</strong> the shelf. (Shelf is the start)</p>
                    <p>The fish jumped <strong>out of</strong> the water. (Inside → Outside)</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-blue-700 mb-4">3. Choose the Correct Preposition</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-blue-50 rounded-lg">
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

export default Level3PrepositionsMovementLesson;