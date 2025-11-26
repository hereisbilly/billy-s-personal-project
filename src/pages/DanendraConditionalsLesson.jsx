import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckSquare, Volume2 } from 'lucide-react';

// Re-usable SectionHeader component
const SectionHeader = ({ icon, title, subtitle, color = "blue" }) => {
    const colors = {
        blue: "from-blue-500 to-sky-500",
        violet: "from-violet-500 to-purple-500",
        green: "from-emerald-500 to-teal-500",
        orange: "from-amber-500 to-orange-500",
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

const DanendraConditionalsLesson = () => {
    const navigate = useNavigate();
    const [quizState, setQuizState] = useState({ currentIndex: 0, selectedAnswer: null, feedback: null, userAnswers: [] });
    const [quizFinished, setQuizFinished] = useState(false);
    const [listeningQuizState, setListeningQuizState] = useState({ currentIndex: 0, selectedAnswer: null, feedback: null, userAnswers: [] });
    const [listeningQuizFinished, setListeningQuizFinished] = useState(false);

    const conditionals = [
        { type: "Zero Conditional", use: "General truths and scientific facts.", structure: "If + Present Simple, ... Present Simple.", example: "If you heat ice, it melts.", color: "bg-sky-100 border-sky-400" },
        { type: "First Conditional", use: "Real possibility in the future.", structure: "If + Present Simple, ... will + base verb.", example: "If it rains, we will stay inside.", color: "bg-green-100 border-green-400" },
        { type: "Second Conditional", use: "Unreal/hypothetical situation in the present or future.", structure: "If + Past Simple, ... would + base verb.", example: "If I had a million dollars, I would buy a big house.", color: "bg-amber-100 border-amber-400" },
        { type: "Third Conditional", use: "Hypothetical situation in the past; regret.", structure: "If + Past Perfect, ... would have + past participle.", example: "If I had studied, I would have passed the exam.", color: "bg-red-100 border-red-400" },
    ];

    const quizData = [
        { q: "If you freeze water, it ___ into ice.", o: ["turns", "will turn", "would turn"], a: "turns", type: "Zero" },
        { q: "If I ___ you, I would apologize.", o: ["am", "was", "were"], a: "were", type: "Second" },
        { q: "We will miss the bus if we ___ soon.", o: ["don't leave", "didn't leave", "hadn't left"], a: "don't leave", type: "First" },
        { q: "If she had known about the meeting, she ___.", o: ["would come", "will come", "would have come"], a: "would have come", type: "Third" },
        { q: "What will you do if you ___ the lottery?", o: ["win", "won", "had won"], a: "win", type: "First" },
        { q: "If I had a superpower, I ___ to fly.", o: ["would choose", "will choose", "chose"], a: "would choose", type: "Second" },
        { q: "He wouldn't have been late if he ___ earlier.", o: ["woke up", "had woken up", "wakes up"], a: "had woken up", type: "Third" },
        { q: "Plants die if they ___ enough water.", o: ["don't get", "won't get", "wouldn't get"], a: "don't get", type: "Zero" },
        { q: "If I ___ a bird, I would fly all over the world.", o: ["am", "was", "were"], a: "were", type: "Second" },
        { q: "You will be tired tomorrow if you ___ to bed late.", o: ["go", "went", "had gone"], a: "go", type: "First" },
        { q: "I would have helped you if you ___ me.", o: ["asked", "had asked", "ask"], a: "had asked", type: "Third" },
        { q: "When the sun goes down, it ___ dark.", o: ["will get", "gets", "would get"], a: "gets", type: "Zero" },
        { q: "He would travel more if he ___ more money.", o: ["has", "had", "will have"], a: "had", type: "Second" },
        { q: "If I have time, I ___ you later.", o: ["will call", "called", "would call"], a: "will call", type: "First" },
        { q: "If we had taken a taxi, we ___ the plane.", o: ["wouldn't miss", "won't miss", "wouldn't have missed"], a: "wouldn't have missed", type: "Third" },
        { q: "If you don't water plants, they ___.", o: ["die", "will die", "would die"], a: "die", type: "Zero" },
        { q: "If they lived closer, we ___ them more often.", o: ["will see", "would see", "saw"], a: "would see", type: "Second" },
        { q: "What ___ if you fail the exam?", o: ["will you do", "would you do", "did you do"], a: "will you do", type: "First" },
        { q: "She ___ to the party if she had been invited.", o: ["would come", "will come", "would have come"], a: "would have come", type: "Third" },
        { q: "If I had known you were coming, I ___ a cake.", o: ["baked", "will bake", "would have baked"], a: "would have baked", type: "Third" },
    ];

    const listeningQuizData = [
        { type: 'identify', sentence: "If I were an astronaut, I would travel to Mars.", options: ["First", "Second", "Third"], answer: "Second" },
        { type: 'identify', sentence: "If you mix blue and yellow, you get green.", options: ["Zero", "First", "Second"], answer: "Zero" },
        { type: 'identify', sentence: "She would have called you if she had had your number.", options: ["Second", "Third", "First"], answer: "Third" },
        { type: 'identify', sentence: "If we hurry, we will catch the train.", options: ["Zero", "First", "Second"], answer: "First" },
        { type: 'identify', sentence: "If I had seen the movie, I would have told you about it.", options: ["Second", "Third", "First"], answer: "Third" },
        { type: 'complete', sentence: "If you study hard...", options: ["you would pass.", "you will pass.", "you would have passed."], answer: "you will pass." },
        { type: 'complete', sentence: "If I were rich...", options: ["I will buy a yacht.", "I would buy a yacht.", "I would have bought a yacht."], answer: "I would buy a yacht." },
        { type: 'complete', sentence: "If you had told me...", options: ["I would have helped.", "I will help.", "I would help."], answer: "I would have helped." },
        { type: 'complete', sentence: "If ice gets warm...", options: ["it will melt.", "it melts.", "it would melt."], answer: "it melts." },
        { type: 'complete', sentence: "If I had more time...", options: ["I will read more books.", "I would read more books.", "I would have read more books."], answer: "I would read more books." },
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
                <h1 className="text-4xl font-extrabold text-slate-800 text-center">Conditionals <span className="text-blue-500">for Danendra</span></h1>

                <WorksheetCard>
                    <SectionHeader icon={<BookOpen size={32} className="text-white"/>} title="1. What are Conditionals?" subtitle="Sentences with 'if' that talk about results" color="blue" />
                    <div className="space-y-4">
                        {conditionals.map(cond => (
                            <div key={cond.type} className={`p-4 rounded-lg border-l-4 ${cond.color}`}>
                                <h3 className="text-xl font-bold text-slate-800">{cond.type}</h3>
                                <p className="text-slate-600 mt-1"><strong>Use:</strong> {cond.use}</p>
                                <p className="font-mono text-sm text-slate-500 mt-2"><strong>Structure:</strong> {cond.structure}</p>
                                <p className="text-slate-700 italic mt-2"><strong>Example:</strong> "{cond.example}"</p>
                            </div>
                        ))}
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<CheckSquare size={32} className="text-white"/>} title="2. Quiz" subtitle="Choose the correct form" color="violet"/>
                    {quizFinished ? (
                        <div className="text-center py-4">
                            <h3 className="text-3xl font-bold text-green-600">Quiz Complete!</h3>
                            <p className="text-xl mt-2">Your Score: {quizState.userAnswers.filter(a=>a.isCorrect).length} / {quizData.length}</p>
                            <div className="mt-6"><BigButton onClick={resetQuiz} className="bg-violet-500 border-violet-600">Try Again</BigButton></div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="font-bold text-slate-500">Question {quizState.currentIndex + 1} of {quizData.length}</p>
                            <p className="text-sm text-slate-400 mb-4">(Testing: {quizData[quizState.currentIndex].type} Conditional)</p>
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
                    <SectionHeader icon={<Volume2 size={32} className="text-white"/>} title="3. Listening Quiz" subtitle="Listen and identify the conditional type" color="orange"/>
                    {listeningQuizFinished ? (
                        <div className="text-center py-4">
                            <h3 className="text-3xl font-bold text-green-600">Quiz Complete!</h3>
                            <p className="text-xl mt-2">Your Score: {listeningQuizState.userAnswers.filter(a=>a.isCorrect).length} / {listeningQuizData.length}</p>
                            <div className="mt-6"><BigButton onClick={resetListeningQuiz} className="bg-orange-500 border-orange-600">Try Again</BigButton></div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="font-bold text-slate-500">Question {listeningQuizState.currentIndex + 1} of {listeningQuizData.length}</p>
                            {listeningQuizData[listeningQuizState.currentIndex].type === 'identify' ? (
                                <p className="text-xl font-semibold my-4 text-slate-700">Listen to the sentence. What type of conditional is it?</p>
                            ) : (
                                <>
                                    <p className="text-xl font-semibold my-4 text-slate-700">Listen and complete the sentence:</p>
                                    <p className="text-2xl font-bold mb-4 text-slate-800">{listeningQuizData[listeningQuizState.currentIndex].sentence}</p>
                                </>
                            )}
                            <button onClick={() => speak(listeningQuizData[listeningQuizState.currentIndex].sentence)} className="bg-orange-500 text-white p-4 rounded-full hover:bg-orange-600 transition-all mb-8">
                                <Volume2 size={32} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
                                {listeningQuizData[listeningQuizState.currentIndex].options.map((option, index) => {
                                    let buttonClass = 'bg-orange-500 text-white hover:bg-orange-600';
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

export default DanendraConditionalsLesson;