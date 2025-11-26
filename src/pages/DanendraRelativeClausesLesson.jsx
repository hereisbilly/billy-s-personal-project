import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Link2, CheckSquare, Volume2 } from 'lucide-react';

// Re-usable SectionHeader component
const SectionHeader = ({ icon, title, subtitle, color = "blue" }) => {
    const colors = {
        blue: "from-blue-500 to-sky-500",
        violet: "from-violet-500 to-purple-500",
        green: "from-emerald-500 to-teal-500",
    };
    return (
        <div className={`flex items-center p-4 bg-gradient-to-r ${colors[color]} rounded-xl shadow-lg mb-6`}>
            <div className="flex-shrink-0 bg-white bg-opacity-20 p-3 rounded-full mr-4">{icon}</div>
            <div>
                <h2 className="text-2xl font-bold text-white">{title}</h2>
                <p className="text-sky-100">{subtitle}</p>
            </div>
        </div>
    );
};

const DanendraRelativeClausesLesson = () => {
    const navigate = useNavigate();
    const [quizState, setQuizState] = useState({ currentIndex: 0, selectedAnswer: null, feedback: null, userAnswers: [] });
    const [quizFinished, setQuizFinished] = useState(false);
    const [listeningQuizState, setListeningQuizState] = useState({ currentIndex: 0, selectedAnswer: null, feedback: null, userAnswers: [] });
    const [listeningQuizFinished, setListeningQuizFinished] = useState(false);

    const pronouns = [
        { pronoun: "who", use: "for people", example: "The man <strong>who</strong> called you is my boss." },
        { pronoun: "which", use: "for things and animals", example: "This is the book <strong>which</strong> I was telling you about." },
        { pronoun: "that", use: "for people, things, and animals (more informal)", example: "The car <strong>that</strong> he bought is red." },
        { pronoun: "whose", use: "for possession", example: "She's the artist <strong>whose</strong> paintings are famous." },
        { pronoun: "where", use: "for places", example: "This is the park <strong>where</strong> we met." },
    ];

    const quizData = [
        { q: "The designer ___ created this logo is very talented.", o: ["who", "which", "whose"], a: "who" },
        { q: "This is the city ___ I grew up.", o: ["which", "where", "who"], a: "where" },
        { q: "I have a friend ___ father is a pilot.", o: ["who", "which", "whose"], a: "whose" },
        { q: "The phone, ___ I bought last week, is already broken.", o: ["who", "which", "that"], a: "which" },
        { q: "The person ___ you need to speak to is on vacation.", o: ["who", "which", "where"], a: "who" },
        { q: "I don't like movies ___ have sad endings.", o: ["that", "where", "whose"], a: "that" },
        { q: "Do you know the reason ___ the store is closed today?", o: ["which", "why", "where"], a: "why" },
        { q: "That's the student ___ project won first prize.", o: ["who", "which", "whose"], a: "whose" },
        { q: "The restaurant ___ we had dinner last night was excellent.", o: ["which", "where", "who"], a: "where" },
        { q: "My sister, ___ is a doctor, lives in New York.", o: ["who", "which", "whose"], a: "who" },
        { q: "I read a book ___ was written by a famous author.", o: ["that", "who", "whose"], a: "that" },
        { q: "The boy ___ bike was stolen went to the police.", o: ["who", "which", "whose"], a: "whose" },
        { q: "This is the hospital ___ I was born.", o: ["which", "where", "when"], a: "where" },
        { q: "The teacher ___ class I enjoy the most is Mr. Smith.", o: ["who", "which", "whose"], a: "whose" },
        { q: "I'll never forget the day ___ I graduated.", o: ["which", "where", "when"], a: "when" },
        { q: "The computer ___ I use for work is very fast.", o: ["who", "which", "whose"], a: "which" },
        { q: "The artist ___ painted this is from France.", o: ["who", "which", "where"], a: "who" },
        { q: "This is the park ___ we often play.", o: ["which", "where", "who"], a: "where" },
        { q: "The girl ___ is sitting next to you is my cousin.", o: ["who", "which", "whose"], a: "who" },
        { q: "I found the keys ___ I had lost yesterday.", o: ["that", "who", "where"], a: "that" },
    ];

    const listeningQuizData = [
        { type: 'complete', sentence: "I visited the village ... my grandfather was born.", question: "I visited the village ___ my grandfather was born.", options: ["which", "where", "who"], answer: "where" },
        { type: 'complete', sentence: "The woman ... is standing over there is my aunt.", question: "The woman ___ is standing over there is my aunt.", options: ["who", "which", "whose"], answer: "who" },
        { type: 'complete', sentence: "This is the dog ... we found in the park.", question: "This is the dog ___ we found in the park.", options: ["who", "that", "whose"], answer: "that" },
        { type: 'complete', sentence: "He's the writer ... books are bestsellers.", question: "He's the writer ___ books are bestsellers.", options: ["who", "which", "whose"], answer: "whose" },
        { type: 'complete', sentence: "I'll never forget the day ... we first met.", question: "I'll never forget the day ___ we first met.", options: ["when", "where", "which"], answer: "when" },
        { type: 'identify', sentence: "The man who lives next door is a pilot.", options: ["Defining", "Non-defining"], answer: "Defining" },
        { type: 'identify', sentence: "My phone, which is two years old, works perfectly.", options: ["Defining", "Non-defining"], answer: "Non-defining" },
        { type: 'identify', sentence: "I like the pizza that they make at that restaurant.", options: ["Defining", "Non-defining"], answer: "Defining" },
        { type: 'identify', sentence: "Mr. Jones, whose daughter is in my class, is a lawyer.", options: ["Defining", "Non-defining"], answer: "Non-defining" },
        { type: 'identify', sentence: "This is the park where we had the picnic.", options: ["Defining", "Non-defining"], answer: "Defining" },
    ];

    const handleQuizAnswer = (option) => {
        if (quizState.feedback) return;
        const isCorrect = option === quizData[quizState.currentIndex].a;
        setQuizState(prev => ({
            ...prev,
            selectedAnswer: option,
            feedback: isCorrect ? 'correct' : 'incorrect',
            userAnswers: [...prev.userAnswers, { ...quizData[prev.currentIndex], userAnswer: option, isCorrect }]
        }));
    };

    const handleNextQuizQuestion = () => {
        if (quizState.currentIndex < quizData.length - 1) {
            setQuizState(prev => ({ ...prev, currentIndex: prev.currentIndex + 1, selectedAnswer: null, feedback: null }));
        } else {
            setQuizFinished(true);
        }
    };

    const resetQuiz = () => {
        setQuizFinished(false);
        setQuizState({ currentIndex: 0, selectedAnswer: null, feedback: null, userAnswers: [] });
    };

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    const handleListeningQuizAnswer = (option) => {
        if (listeningQuizState.feedback) return;
        const isCorrect = option === listeningQuizData[listeningQuizState.currentIndex].answer;
        setListeningQuizState(prev => ({
            ...prev,
            selectedAnswer: option,
            feedback: isCorrect ? 'correct' : 'incorrect',
            userAnswers: [...prev.userAnswers, { ...listeningQuizData[prev.currentIndex], userAnswer: option, isCorrect }]
        }));
    };

    const handleNextListeningQuizQuestion = () => {
        if (listeningQuizState.currentIndex < listeningQuizData.length - 1) {
            setListeningQuizState(prev => ({ ...prev, currentIndex: prev.currentIndex + 1, selectedAnswer: null, feedback: null }));
        } else {
            setListeningQuizFinished(true);
        }
    };

    const resetListeningQuiz = () => {
        setListeningQuizFinished(false);
        setListeningQuizState({ currentIndex: 0, selectedAnswer: null, feedback: null, userAnswers: [] });
    };

    return (
        <div className="font-sans bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-12 p-4 md:p-8">
                <h1 className="text-4xl font-extrabold text-slate-800 text-center">Relative Clauses <span className="text-green-500">for Danendra</span></h1>

                <WorksheetCard>
                    <SectionHeader icon={<BookOpen size={32} className="text-white"/>} title="1. What are Relative Clauses?" subtitle="Clauses that give more information about a noun" color="green" />
                    <div className="space-y-6 text-lg">
                        <p className="text-slate-700">A relative clause is a part of a sentence that starts with a relative pronoun (like <strong>who, which, that, whose, where</strong>). It acts like an adjective to describe a noun.</p>
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Defining vs. Non-Defining</h3>
                            <p className="mb-2"><strong>Defining:</strong> Gives essential information. No commas needed. <br/><span className="text-sm text-slate-500 italic ml-4">"The man <strong>who lives next door</strong> is a doctor." (We need this info to know which man.)</span></p>
                            <p><strong>Non-Defining:</strong> Gives extra, non-essential information. Use commas. <br/><span className="text-sm text-slate-500 italic ml-4">"My brother, <strong>who lives in London</strong>, is visiting." (We already know who my brother is.)</span></p>
                        </div>
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<Link2 size={32} className="text-white"/>} title="2. Relative Pronouns" subtitle="The words that connect the clauses" color="blue" />
                    <div className="grid md:grid-cols-2 gap-4">
                        {pronouns.map(p => (
                            <div key={p.pronoun} className="p-4 bg-slate-100 rounded-lg">
                                <h3 className="text-lg font-bold text-blue-700">{p.pronoun}</h3>
                                <p className="text-slate-600">Use: {p.use}</p>
                                <p className="text-slate-700 italic mt-1" dangerouslySetInnerHTML={{ __html: p.example }} />
                            </div>
                        ))}
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<CheckSquare size={32} className="text-white"/>} title="3. Quiz" subtitle="Choose the correct relative pronoun" color="violet"/>
                    {quizFinished ? (
                        <div className="text-center py-4">
                            <h3 className="text-3xl font-bold text-green-600">Quiz Complete!</h3>
                            <p className="text-xl mt-2">Your Score: {quizState.userAnswers.filter(a=>a.isCorrect).length} / {quizData.length}</p>
                            <div className="mt-6"><BigButton onClick={resetQuiz} className="bg-violet-500 border-violet-600">Try Again</BigButton></div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="font-bold text-slate-500">Question {quizState.currentIndex + 1} of {quizData.length}</p>
                            <p className="text-2xl font-bold my-8 min-h-[4rem] flex items-center justify-center text-slate-800">{quizData[quizState.currentIndex].q}</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
                                {quizData[quizState.currentIndex].o.map((option, index) => {
                                    let buttonClass = 'bg-violet-500 text-white hover:bg-violet-600';
                                    if (quizState.feedback) {
                                        if (option === quizData[quizState.currentIndex].a) buttonClass = 'bg-green-500 text-white';
                                        else if (option === quizState.selectedAnswer) buttonClass = 'bg-red-500 text-white';
                                        else buttonClass = 'bg-slate-200 text-slate-500';
                                    }
                                    return (<button key={index} onClick={() => handleQuizAnswer(option)} className={`p-4 rounded-lg font-semibold text-lg transition-all ${buttonClass}`} disabled={!!quizState.feedback}>{option}</button>);
                                })}
                            </div>
                            {quizState.feedback && (<div className="mt-6"><BigButton onClick={handleNextQuizQuestion} className="bg-indigo-600 border-indigo-700">Next →</BigButton></div>)}
                        </div>
                    )}
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<Volume2 size={32} className="text-white"/>} title="4. Listening Quiz" subtitle="Listen and complete the sentence" color="green"/>
                    {listeningQuizFinished ? (
                        <div className="text-center py-4">
                            <h3 className="text-3xl font-bold text-green-600">Quiz Complete!</h3>
                            <p className="text-xl mt-2">Your Score: {listeningQuizState.userAnswers.filter(a=>a.isCorrect).length} / {listeningQuizData.length}</p>
                            <div className="mt-6"><BigButton onClick={resetListeningQuiz} className="bg-green-500 border-green-600">Try Again</BigButton></div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="font-bold text-slate-500">Question {listeningQuizState.currentIndex + 1} of {listeningQuizData.length}</p>
                            {listeningQuizData[listeningQuizState.currentIndex].type === 'complete' ? (
                                <p className="text-2xl font-bold my-4 text-slate-800">{listeningQuizData[listeningQuizState.currentIndex].question}</p>
                            ) : (
                                <p className="text-xl font-semibold my-4 text-slate-700">Is the relative clause in this sentence defining or non-defining?</p>
                            )}
                            <button onClick={() => speak(listeningQuizData[listeningQuizState.currentIndex].sentence)} className="bg-green-500 text-white p-4 rounded-full hover:bg-green-600 transition-all mb-8">
                                <Volume2 size={32} />
                            </button>
                            {listeningQuizData[listeningQuizState.currentIndex].type === 'identify' && (
                                <p className="text-2xl font-bold mb-4 text-slate-800 italic">"{listeningQuizData[listeningQuizState.currentIndex].sentence}"</p>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
                                {listeningQuizData[listeningQuizState.currentIndex].options.map((option, index) => {
                                    let buttonClass = 'bg-green-500 text-white hover:bg-green-600';
                                    if (listeningQuizState.feedback) {
                                        if (option === listeningQuizData[listeningQuizState.currentIndex].answer) buttonClass = 'bg-green-500 text-white';
                                        else if (option === listeningQuizState.selectedAnswer) buttonClass = 'bg-red-500 text-white';
                                        else buttonClass = 'bg-slate-200 text-slate-500';
                                    }
                                    return (<button key={index} onClick={() => handleListeningQuizAnswer(option)} className={`p-4 rounded-lg font-semibold text-lg transition-all ${buttonClass}`} disabled={!!listeningQuizState.feedback}>{option}</button>);
                                })}
                            </div>
                            {listeningQuizState.feedback && (<div className="mt-6"><BigButton onClick={handleNextListeningQuizQuestion} className="bg-indigo-600 border-indigo-700">Next →</BigButton></div>)}
                        </div>
                    )}
                </WorksheetCard>

                <div className="pt-8">
                    <BigButton onClick={() => navigate(-1)} className="bg-gray-500 border-gray-600"> ← Go Back </BigButton>
                </div>
            </div>
        </div>
    );
};

export default DanendraRelativeClausesLesson;