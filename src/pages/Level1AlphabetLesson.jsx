import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { Volume2, Check, X } from 'lucide-react';

const Level1AlphabetLesson = () => {
    const navigate = useNavigate();
    const [quizAnswers, setQuizAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const vowels = 'AEIOU'.split('');

    const letterExamples = {
        A: 'Apple', B: 'Ball', C: 'Cat', D: 'Dog', E: 'Elephant', F: 'Fish', G: 'Goat', H: 'Hat', I: 'Igloo', J: 'Jar', K: 'Kite', L: 'Lion', M: 'Moon', N: 'Net', O: 'Octopus', P: 'Pig', Q: 'Queen', R: 'Ring', S: 'Sun', T: 'Tree', U: 'Umbrella', V: 'Vase', W: 'Watch', X: 'X-ray', Y: 'Yo-yo', Z: 'Zebra'
    };

    const speak = (text, rate = 1) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = rate;
        window.speechSynthesis.speak(utterance);
    };

    const quizQuestions = [
        { question: "What is the first letter of 'Dog'?", answer: "D" },
        { question: "What is the first letter of 'Sun'?", answer: "S" },
        { question: "What is the first letter of 'Apple'?", answer: "A" },
    ];

    const handleQuizChange = (index, value) => {
        setQuizAnswers(prev => ({ ...prev, [index]: value.toUpperCase() }));
    };

    const checkQuizAnswer = (index) => {
        const isCorrect = quizAnswers[index] === quizQuestions[index].answer;
        setFeedback(prev => ({ ...prev, [index]: isCorrect }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-8">The ABC Adventure: Mastering Letters & Sounds</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">1. Meet the Alphabet</h2>
                <p className="text-slate-600 mb-4">The English alphabet has 26 letters. Each letter has an uppercase (big) and a lowercase (small) form.</p>
                <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-2 text-center">
                    {alphabet.map(letter => (
                        <button key={letter} onClick={() => speak(letter)} className="p-2 bg-green-50 rounded-lg border-2 border-green-200 hover:bg-green-100 transition-colors">
                            <span className="font-bold text-2xl text-green-800">{letter}</span>
                            <span className="text-xl text-green-600">{letter.toLowerCase()}</span>
                        </button>
                    ))}
                </div>
                <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                    <h3 className="font-bold text-yellow-800">Vowels & Consonants</h3>
                    <p className="text-slate-700">Letters are either vowels or consonants. Vowels are special sounds.</p>
                    <p className="font-bold text-xl mt-2">Vowels: <span className="text-red-500">{vowels.join(', ')}</span></p>
                    <p className="text-slate-600">All other letters are consonants.</p>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">2. Letter Sounds in Action</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {alphabet.slice(0, 12).map(letter => (
                        <div key={letter} className="p-3 bg-slate-100 rounded-lg text-center">
                            <p className="text-4xl font-bold text-green-700">{letter}</p>
                            <button onClick={() => speak(letterExamples[letter])} className="flex items-center justify-center gap-2 text-slate-600 hover:text-green-600 w-full">
                                {letterExamples[letter]} <Volume2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-green-700 mb-4">3. What's the First Letter?</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                            <label className="font-semibold text-slate-700 flex-grow">{q.question}</label>
                            <input type="text" maxLength="1" value={quizAnswers[index] || ''} onChange={(e) => handleQuizChange(index, e.target.value)} className="w-12 h-12 text-center text-2xl font-bold border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-400" disabled={feedback[index] !== undefined} />
                            <button onClick={() => checkQuizAnswer(index)} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-slate-300" disabled={feedback[index] !== undefined}>Check</button>
                            {feedback[index] === true && <Check className="text-green-600" size={28} />}
                            {feedback[index] === false && <X className="text-red-600" size={28} />}
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

export default Level1AlphabetLesson;