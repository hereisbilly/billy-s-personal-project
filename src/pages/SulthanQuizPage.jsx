// src/pages/SulthanQuizPage.jsx

import React, { useState, useMemo, useEffect } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const correctSoundUrl = 'https://actions.google.com/sounds/v1/positive/bell_chime.ogg';
const incorrectSoundUrl = 'https://actions.google.com/sounds/v1/negative/beep_buzzer.ogg';
const playSound = (url) => { new Audio(url).play().catch(e => console.error("Error playing sound:", e)); };

const quizData = [
  // Verb 'to be' (10 questions)
  { category: "Verb 'to be'", question: "She ___ a doctor.", options: ["am", "is", "are"], answer: "is" },
  { category: "Verb 'to be'", question: "We ___ students.", options: ["is", "am", "are"], answer: "are" },
  { category: "Verb 'to be'", question: "I ___ happy today.", options: ["is", "am", "are"], answer: "am" },
  { category: "Verb 'to be'", question: "___ they from this school?", options: ["Is", "Are", "Am"], answer: "Are" },
  { category: "Verb 'to be'", question: "This book ___ interesting.", options: ["are", "is", "am"], answer: "is" },
  { category: "Verb 'to be'", question: "My parents ___ at home.", options: ["is", "am", "are"], answer: "are" },
  { category: "Verb 'to be'", question: "It ___ cold outside.", options: ["am", "is", "are"], answer: "is" },
  { category: "Verb 'to be'", question: "You ___ a good friend.", options: ["am", "is", "are"], answer: "are" },
  { category: "Verb 'to be'", question: "He ___ not here.", options: ["am", "is", "are"], answer: "is" },
  { category: "Verb 'to be'", question: "The cats ___ sleeping.", options: ["is", "am", "are"], answer: "are" },

  // Possessive Adjectives (10 questions)
  { category: "Possessive Adjectives", question: "This is my pencil. It is ___ pencil.", options: ["my", "your", "his"], answer: "my" },
  { category: "Possessive Adjectives", question: "You have a new bag. Is that ___ bag?", options: ["his", "your", "her"], answer: "your" },
  { category: "Possessive Adjectives", question: "Sulthan has a bike. It is ___ bike.", options: ["her", "our", "his"], answer: "his" },
  { category: "Possessive Adjectives", question: "Siti likes to read. This is ___ favorite book.", options: ["his", "her", "their"], answer: "her" },
  { category: "Possessive Adjectives", question: "We are a team. This is ___ team.", options: ["our", "your", "my"], answer: "our" },
  { category: "Possessive Adjectives", question: "The students have a project. It is ___ project.", options: ["his", "her", "their"], answer: "their" },
  { category: "Possessive Adjectives", question: "The dog wagged ___ tail.", options: ["it", "its", "it's"], answer: "its" },
  { category: "Possessive Adjectives", question: "Can I borrow ___ pen?", options: ["my", "your", "his"], answer: "your" },
  { category: "Possessive Adjectives", question: "Maria forgot ___ jacket.", options: ["his", "her", "their"], answer: "her" },
  { category: "Possessive Adjectives", question: "My brother and I share a room. It's ___ room.", options: ["my", "their", "our"], answer: "our" },

  // Past Simple (10 questions)
  { category: "Past Simple", question: "Last night, I ___ a movie.", options: ["watch", "watches", "watched"], answer: "watched" },
  { category: "Past Simple", question: "They ___ to Bali last year.", options: ["go", "goes", "went"], answer: "went" },
  { category: "Past Simple", question: "She ___ not come to the party.", options: ["do", "does", "did"], answer: "did" },
  { category: "Past Simple", question: "We ___ delicious food.", options: ["eat", "ate", "eaten"], answer: "ate" },
  { category: "Past Simple", question: "He ___ his homework.", options: ["did", "do", "does"], answer: "did" },
  { category: "Past Simple", question: "___ you study for the test?", options: ["Do", "Did", "Does"], answer: "Did" },
  { category: "Past Simple", question: "I ___ a book yesterday.", options: ["read", "reads", "readed"], answer: "read" },
  { category: "Past Simple", question: "The weather ___ beautiful.", options: ["was", "were", "is"], answer: "was" },
  { category: "Past Simple", question: "They ___ late for the meeting.", options: ["was", "were", "are"], answer: "were" },
  { category: "Past Simple", question: "My friend ___ me a gift.", options: ["give", "gave", "gives"], answer: "gave" },
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

    const handleTimeUp = () => { if (feedback) return; setFeedback('incorrect'); playSound(incorrectSoundUrl); setUserAnswers(prev => [...prev, { ...quizData[currentIndex], userAnswer: null, isCorrect: false }]); };
    useEffect(() => { if (feedback) return; setTimer(30); const interval = setInterval(() => { setTimer(prevTimer => { if (prevTimer === 1) { clearInterval(interval); handleTimeUp(); return 0; } return prevTimer - 1; }); }, 1000); return () => clearInterval(interval); }, [currentIndex, feedback]);
    const handleAnswerSelect = (option) => { if (feedback) return; setSelectedAnswer(option); const isCorrect = option === question.answer; setFeedback(isCorrect ? 'correct' : 'incorrect'); playSound(isCorrect ? correctSoundUrl : incorrectSoundUrl); setUserAnswers(prev => [...prev, { ...question, userAnswer: option, isCorrect }]); };
    const handleNextQuestion = () => { if (currentIndex < quizData.length - 1) { setCurrentIndex(prev => prev + 1); setSelectedAnswer(null); setFeedback(null); } else { setGameState('finished'); } };
    const restartQuiz = () => { setGameState('playing'); setCurrentIndex(0); setSelectedAnswer(null); setFeedback(null); setUserAnswers([]); };
    if (gameState === 'finished') return <ResultsPage userAnswers={userAnswers} onRestart={restartQuiz} />;
    
    const answerColors = ['bg-rose-500', 'bg-sky-500', 'bg-amber-400'];
    return (
        <div className="max-w-4xl mx-auto">
            <div className="h-4 bg-slate-200 rounded-full mb-6 shadow-inner"><div className="h-4 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full transition-all duration-300" style={{ width: `${((currentIndex + 1) / quizData.length) * 100}%` }}></div></div>
            <WorksheetCard className="flex flex-col items-center text-center p-8 md:p-12 relative gap-10">
                <div className={`absolute top-4 right-4 bg-slate-800 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg transition-colors duration-500 ${timer <= 5 ? 'bg-red-500' : ''}`}>{timer}</div>
                <div className="w-full"><p className="font-bold text-slate-500">Question {currentIndex + 1} of {quizData.length}</p><p className="text-4xl md:text-5xl font-extrabold mt-4 text-slate-800">{question.question.replace('___', '_____')}</p></div>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                    {question.options.map((option, index) => {
                        let buttonStateClass = '';
                        if (feedback) { if (option === question.answer) buttonStateClass = 'bg-green-500 border-green-700 text-white transform scale-105 shadow-lg'; else if (option === selectedAnswer) buttonStateClass = 'bg-red-500 border-red-700 text-white'; else buttonStateClass = 'bg-slate-200 border-slate-300 text-slate-500 opacity-50'; } 
                        else { buttonStateClass = `${answerColors[index % answerColors.length]} border-b-4 border-opacity-50 text-white hover:scale-105 hover:shadow-lg`; }
                        return ( <button key={index} onClick={() => handleAnswerSelect(option)} className={`p-6 rounded-lg font-bold text-2xl flex items-center justify-center transition-all duration-200 ${buttonStateClass}`} disabled={!!feedback}> {option} </button> );
                    })}
                </div>
            </WorksheetCard>
            {feedback && ( <div className="mt-6"> <BigButton onClick={handleNextQuestion} className="bg-slate-800 border-slate-900">Next →</BigButton> </div> )}
        </div>
    );
};

const SulthanQuizPage = () => { return ( <div> <h1 className="text-4xl font-extrabold text-slate-800 text-center mb-8">Refreshment Quiz <span className="text-green-500">for Sulthan</span></h1> <QuizPage /> </div> ); };
export default SulthanQuizPage;