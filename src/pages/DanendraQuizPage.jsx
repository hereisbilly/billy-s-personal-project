// src/pages/DanendraQuizPage.jsx

import React, { useState, useMemo, useEffect } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

// --- Sound Effects ---
const correctSoundUrl = 'https://actions.google.com/sounds/v1/positive/bell_chime.ogg';
const incorrectSoundUrl = 'https://actions.google.com/sounds/v1/negative/beep_buzzer.ogg';
const playSound = (url) => { new Audio(url).play().catch(e => console.error("Error playing sound:", e)); };

// --- Data Kuis Ulasan (30 Pertanyaan) ---
const quizData = [
  // Verb 'to be' (7 questions)
  { category: "Verb 'to be'", question: "My name ___ Danendra.", options: ["am", "is", "are"], answer: "is" },
  { category: "Verb 'to be'", question: "The basketball players ___ tall.", options: ["is", "am", "are"], answer: "are" },
  { category: "Verb 'to be'", question: "I ___ not from this city.", options: ["is", "am", "are"], answer: "am" },
  { category: "Verb 'to be'", question: "___ she your sister?", options: ["Is", "Are", "Am"], answer: "Is" },
  { category: "Verb 'to be'", question: "My favorite sport ___ basketball.", options: ["are", "is", "am"], answer: "is" },
  { category: "Verb 'to be'", question: "We ___ ready for the game.", options: ["is", "am", "are"], answer: "are" },
  { category: "Verb 'to be'", question: "It ___ a sunny day today.", options: ["am", "is", "are"], answer: "is" },
  // Present Simple (8 questions)
  { category: "Present Simple", question: "He ___ basketball every afternoon.", options: ["play", "plays", "playing"], answer: "plays" },
  { category: "Present Simple", question: "They ___ like watching football.", options: ["don't", "doesn't", "isn't"], answer: "don't" },
  { category: "Present Simple", question: "I usually ___ breakfast at 7 AM.", options: ["eat", "eats", "eating"], answer: "eat" },
  { category: "Present Simple", question: "She ___ to school by bus.", options: ["go", "goes", "going"], answer: "goes" },
  { category: "Present Simple", question: "My cat ___ milk.", options: ["drink", "drinks", "drinking"], answer: "drinks" },
  { category: "Present Simple", question: "___ you speak English?", options: ["Do", "Does", "Are"], answer: "Do" },
  { category: "Present Simple", question: "He ___ have a car.", options: ["don't", "isn't", "doesn't"], answer: "doesn't" },
  { category: "Present Simple", question: "We ___ in a big house.", options: ["live", "lives", "living"], answer: "live" },
  // Prepositions (7 questions)
  { category: "Prepositions", question: "The ball is ___ the box.", options: ["on", "under", "in"], answer: "in" },
  { category: "Prepositions", question: "My shoes are ___ my bed.", options: ["on", "under", "in"], answer: "under" },
  { category: "Prepositions", question: "The clock is ___ the wall.", options: ["in", "on", "under"], answer: "on" },
  { category: "Prepositions", question: "He sits ___ the chair.", options: ["in", "on", "under"], answer: "on" },
  { category: "Prepositions", question: "I put the book ___ my bag.", options: ["on", "under", "in"], answer: "in" },
  { category: "Prepositions", question: "The cat is hiding ___ the table.", options: ["in", "on", "under"], answer: "under" },
  { category: "Prepositions", question: "The poster is ___ my bedroom wall.", options: ["on", "in", "under"], answer: "on" },
  // Past Simple (8 questions)
  { category: "Past Simple", question: "Yesterday, I ___ a great movie.", options: ["watch", "watches", "watched"], answer: "watched" },
  { category: "Past Simple", question: "He ___ to the court last night.", options: ["go", "goes", "went"], answer: "went" },
  { category: "Past Simple", question: "We ___ not see the game.", options: ["do", "does", "did"], answer: "did" },
  { category: "Past Simple", question: "They ___ pizza for dinner.", options: ["eat", "ate", "eaten"], answer: "ate" },
  { category: "Past Simple", question: "She ___ her homework.", options: ["did", "do", "does"], answer: "did" },
  { category: "Past Simple", question: "___ you finish the race?", options: ["Do", "Did", "Does"], answer: "Did" },
  { category: "Past Simple", question: "I ___ a new phone last week.", options: ["buy", "bought", "buys"], answer: "bought" },
  { category: "Past Simple", question: "He ___ very tired after the game.", options: ["was", "were", "is"], answer: "was" },
];

const ResultsPage = ({ userAnswers, onRestart }) => {
    const navigate = useNavigate();
    const analysis = useMemo(() => {
        const total = userAnswers.length;
        const correct = userAnswers.filter(a => a.isCorrect).length;
        const incorrect = total - correct;
        const score = total === 0 ? 0 : Math.round((correct / total) * 100);
        let grade, feedback;
        if (score >= 93) { grade = 'A'; feedback = "Excellent! You have mastered these topics."; } 
        else if (score >= 85) { grade = 'B'; feedback = "Great job! You have a strong understanding."; }
        else if (score >= 75) { grade = 'C'; feedback = "Good work! A little review will help."; }
        else if (score >= 65) { grade = 'D'; feedback = "You're on the right track, let's review some topics."; }
        else { grade = 'F'; feedback = "Let's review these topics together to build a stronger foundation."; }
        return { total, correct, incorrect, score, grade, feedback };
    }, [userAnswers]);
    const incorrectAnswers = userAnswers.filter(a => !a.isCorrect);

    return (
        <WorksheetCard className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-extrabold text-center text-teal-600 mb-8">Quiz Results</h2>
            <div className="text-center mb-8">
                <p className="text-2xl text-slate-500">Your Grade</p>
                <p className="text-9xl font-black text-green-500">{analysis.grade}</p>
                <p className="text-2xl font-bold mt-2">{analysis.score}%</p>
                <p className="text-lg text-slate-600 mt-4">{analysis.feedback}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-center my-8">
                <div className="bg-green-100 p-4 rounded-lg"><p className="text-4xl font-bold text-green-600">{analysis.correct}</p><p className="text-green-500">Correct</p></div>
                <div className="bg-red-100 p-4 rounded-lg"><p className="text-4xl font-bold text-red-600">{analysis.incorrect}</p><p className="text-red-500">Incorrect</p></div>
            </div>
            {incorrectAnswers.length > 0 && (
                 <div className="mb-10">
                    <h3 className="text-3xl font-bold mb-4">Questions to Review</h3>
                    <div className="space-y-4">
                        {incorrectAnswers.map((answer, index) => (
                            <div key={index} className="p-4 border-l-4 border-slate-200 bg-slate-50 rounded-r-lg">
                                <p className="text-xs text-slate-400 font-bold uppercase">{answer.category}</p>
                                <p className="text-slate-600 text-lg">{answer.question}</p>
                                <p className="text-red-500 font-semibold">Your answer: {answer.userAnswer || "Time's Up!"}</p>
                                <p className="text-green-600 font-semibold">Correct answer: {answer.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="space-y-4 mt-8">
                <BigButton onClick={onRestart} className="bg-slate-500 border-slate-600">Practice Again</BigButton>
                <BigButton onClick={() => navigate('/')} className="bg-gradient-to-r from-teal-500 to-cyan-500 border-teal-600">Back to Home</BigButton>
            </div>
        </WorksheetCard>
    );
};

const QuizPage = () => {
    const [gameState, setGameState] = useState('playing');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [timer, setTimer] = useState(30);
    
    const question = quizData[currentIndex];

    const handleTimeUp = () => {
        if (feedback) return;
        setFeedback('incorrect');
        playSound(incorrectSoundUrl);
        setUserAnswers(prev => [
            ...prev,
            { ...quizData[currentIndex], userAnswer: null, isCorrect: false }
        ]);
    };

    useEffect(() => {
        if (feedback) {
            return;
        }
        setTimer(30);
        const interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer === 1) {
                    clearInterval(interval);
                    handleTimeUp();
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [currentIndex, feedback]);

    const handleAnswerSelect = (option) => {
        if (feedback) return;
        setSelectedAnswer(option);
        const isCorrect = option === question.answer;
        setFeedback(isCorrect ? 'correct' : 'incorrect');
        playSound(isCorrect ? correctSoundUrl : incorrectSoundUrl);
        setUserAnswers(prev => [...prev, { ...question, userAnswer: option, isCorrect }]);
    };

    const handleNextQuestion = () => {
        if (currentIndex < quizData.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setFeedback(null);
        } else {
            setGameState('finished');
        }
    };

    const restartQuiz = () => {
        setGameState('playing');
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setFeedback(null);
        setUserAnswers([]);
    };

    if (gameState === 'finished') {
        return <ResultsPage userAnswers={userAnswers} onRestart={restartQuiz} />;
    }

    const answerColors = ['bg-rose-500', 'bg-sky-500', 'bg-amber-400'];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="h-4 bg-slate-200 rounded-full mb-6 shadow-inner">
                <div className="h-4 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / quizData.length) * 100}%` }}></div>
            </div>
            
            {/* ✅ FIXED LAYOUT HERE */}
            <WorksheetCard className="flex flex-col items-center text-center p-8 md:p-12 relative gap-10">
                <div className={`absolute top-4 right-4 bg-slate-800 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg transition-colors duration-500 ${timer <= 5 ? 'bg-red-500' : ''}`}>
                    {timer}
                </div>
                
                <div className="w-full">
                    <p className="font-bold text-slate-500">Question {currentIndex + 1} of {quizData.length}</p>
                    <p className="text-4xl md:text-5xl font-extrabold mt-4 text-slate-800">{question.question.replace('___', '_____')}</p>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                    {question.options.map((option, index) => {
                        let buttonStateClass = '';
                        if (feedback) {
                            if (option === question.answer) buttonStateClass = 'bg-green-500 border-green-700 text-white transform scale-105 shadow-lg';
                            else if (option === selectedAnswer) buttonStateClass = 'bg-red-500 border-red-700 text-white';
                            else buttonStateClass = 'bg-slate-200 border-slate-300 text-slate-500 opacity-50';
                        } else {
                            buttonStateClass = `${answerColors[index % answerColors.length]} border-b-4 border-opacity-50 text-white hover:scale-105 hover:shadow-lg`;
                        }
                        return ( <button key={index} onClick={() => handleAnswerSelect(option)} className={`p-6 rounded-lg font-bold text-2xl flex items-center justify-center transition-all duration-200 ${buttonStateClass}`} disabled={!!feedback}> {option} </button> );
                    })}
                </div>
            </WorksheetCard>
            {feedback && ( <div className="mt-6"> <BigButton onClick={handleNextQuestion} className="bg-slate-800 border-slate-900">Next →</BigButton> </div> )}
        </div>
    );
};

const DanendraQuizPage = () => {
    return (
        <div>
            <h1 className="text-4xl font-extrabold text-slate-800 text-center mb-8">Refreshment Quiz <span className="text-green-500">for Danendra</span></h1>
            <QuizPage />
        </div>
    );
}

export default DanendraQuizPage;