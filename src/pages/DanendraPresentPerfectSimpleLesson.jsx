import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckSquare, Volume2, Clock, Star } from 'lucide-react';

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

const DanendraPresentPerfectSimpleLesson = () => {
    const navigate = useNavigate();
    const [quizState, setQuizState] = useState({ currentIndex: 0, selectedAnswer: null, feedback: null, userAnswers: [] });
    const [quizFinished, setQuizFinished] = useState(false);
    const [listeningQuizState, setListeningQuizState] = useState({ currentIndex: 0, selectedAnswer: null, feedback: null, userAnswers: [] });
    const [listeningQuizFinished, setListeningQuizFinished] = useState(false);

    const quizData = [
        { q: "I ___ my homework.", o: ["have finish", "has finished", "have finished"], a: "have finished" },
        { q: "She ___ to Paris three times.", o: ["has been", "have been", "has be"], a: "has been" },
        { q: "They ___ a new car.", o: ["have bought", "has bought", "have buy"], a: "have bought" },
        { q: "He ___ his keys. He can't find them anywhere.", o: ["have lost", "has lost", "has losed"], a: "has lost" },
        { q: "We ___ that movie before.", o: ["has seen", "have seen", "have see"], a: "have seen" },
        { q: "___ you ever eaten sushi?", o: ["Have", "Has", "Did"], a: "Have" },
        { q: "My sister ___ from university.", o: ["have just graduated", "has just graduated", "has just graduate"], a: "has just graduated" },
        { q: "I ___ my breakfast yet.", o: ["haven't eaten", "hasn't eaten", "don't eat"], a: "haven't eaten" },
        { q: "The train ___ already left.", o: ["have", "has", "is"], a: "has" },
        { q: "He ___ in this city for ten years.", o: ["has lived", "have lived", "lived"], a: "has lived" },
    ];

    const listeningQuizData = [
        { sentence: "They have visited the museum.", question: "What have they done?", options: ["Visit the museum", "Visited the museum", "Will visit the museum"], answer: "Visited the museum" },
        { sentence: "She has not finished her work.", question: "Is her work finished?", options: ["Yes", "No", "Maybe"], answer: "No" },
        { sentence: "Have you ever seen a whale?", question: "What is the question asking about?", options: ["A past experience", "A future plan", "A current action"], answer: "A past experience" },
        { sentence: "He has just arrived.", question: "When did he arrive?", options: ["A long time ago", "A very short time ago", "Tomorrow"], answer: "A very short time ago" },
        { sentence: "We have lived here since 2010.", question: "Do they still live here?", options: ["Yes", "No", "It doesn't say"], answer: "Yes" },
    ];

    const handleQuizAnswer = (option) => {
        if (quizState.feedback) return;
        const isCorrect = option === quizData[quizState.currentIndex].a;
        setQuizState(prev => ({ ...prev, selectedAnswer: option, feedback: isCorrect ? 'correct' : 'incorrect', userAnswers: [...prev.userAnswers, { ...quizData[prev.currentIndex], userAnswer: option, isCorrect }] }));
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
        setListeningQuizState(prev => ({ ...prev, selectedAnswer: option, feedback: isCorrect ? 'correct' : 'incorrect', userAnswers: [...prev.userAnswers, { ...listeningQuizData[prev.currentIndex], userAnswer: option, isCorrect }] }));
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
                <h1 className="text-4xl font-extrabold text-slate-800 text-center">Present Perfect Simple <span className="text-green-500">for Danendra</span></h1>

                <WorksheetCard>
                    <SectionHeader icon={<BookOpen size={32} className="text-white"/>} title="1. What is the Present Perfect?" subtitle="Connecting the past with the present" color="blue" />
                    <div className="space-y-4">
                        <p className="text-lg text-slate-700">We use the Present Perfect Simple to talk about actions that happened at an unspecified time in the past, or actions that started in the past and continue to the present.</p>
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h3 className="font-bold text-blue-800">Structure:</h3>
                            <p className="font-mono text-slate-600">Subject + <span className="font-bold">have/has</span> + <span className="font-bold">Past Participle</span></p>
                            <p className="italic text-slate-500 mt-1">Example: "I <strong>have seen</strong> that movie." / "She <strong>has finished</strong> her work."</p>
                        </div>
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<Clock size={32} className="text-white"/>} title="2. When to Use It" subtitle="Key situations for the Present Perfect" color="green" />
                    <div className="space-y-4">
                        <div className="flex gap-4 items-start"><Star className="text-green-500 mt-1 flex-shrink-0" /><div><h3 className="font-bold text-slate-800">Life Experiences</h3><p className="text-slate-600">Used with 'ever' and 'never'. The exact time is not important. <br/><em className="text-sm">"Have you ever been to Japan?" / "He has never tried spicy food."</em></p></div></div>
                        <div className="flex gap-4 items-start"><Star className="text-green-500 mt-1 flex-shrink-0" /><div><h3 className="font-bold text-slate-800">Recent Past with Present Result</h3><p className="text-slate-600">The action is finished, but it has a result now. <br/><em className="text-sm">"I've lost my keys." (Result: I can't get in my house now.)</em></p></div></div>
                        <div className="flex gap-4 items-start"><Star className="text-green-500 mt-1 flex-shrink-0" /><div><h3 className="font-bold text-slate-800">Unfinished Time Periods</h3><p className="text-slate-600">Used with words like 'today', 'this week', 'this year'. <br/><em className="text-sm">"She has called me three times this morning." (The morning is not over yet.)</em></p></div></div>
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<CheckSquare size={32} className="text-white"/>} title="3. Grammar Quiz" subtitle="Choose the correct form" color="violet"/>
                    {quizFinished ? (
                        <div className="text-center py-4"><h3 className="text-3xl font-bold text-green-600">Quiz Complete!</h3><p className="text-xl mt-2">Your Score: {quizState.userAnswers.filter(a=>a.isCorrect).length} / {quizData.length}</p><div className="mt-6"><BigButton onClick={resetQuiz} className="bg-violet-500 border-violet-600">Try Again</BigButton></div></div>
                    ) : (
                        <div className="text-center"><p className="font-bold text-slate-500">Question {quizState.currentIndex + 1} of {quizData.length}</p><p className="text-2xl font-bold my-8 min-h-[4rem] flex items-center justify-center text-slate-800">{quizData[quizState.currentIndex].q}</p><div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto">{quizData[quizState.currentIndex].o.map((option, index) => {let buttonClass = 'bg-violet-500 text-white hover:bg-violet-600'; if (quizState.feedback) {if (option === quizData[quizState.currentIndex].a) buttonClass = 'bg-green-500 text-white'; else if (option === quizState.selectedAnswer) buttonClass = 'bg-red-500 text-white'; else buttonClass = 'bg-slate-200 text-slate-500';} return (<button key={index} onClick={() => handleQuizAnswer(option)} className={`p-4 rounded-lg font-semibold text-lg transition-all ${buttonClass}`} disabled={!!quizState.feedback}>{option}</button>);})}</div>{quizState.feedback && (<div className="mt-6"><BigButton onClick={handleNextQuizQuestion} className="bg-indigo-600 border-indigo-700">Next →</BigButton></div>)}</div>
                    )}
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<Volume2 size={32} className="text-white"/>} title="4. Listening Quiz" subtitle="Listen and answer the question" color="orange"/>
                    {listeningQuizFinished ? (
                        <div className="text-center py-4"><h3 className="text-3xl font-bold text-green-600">Quiz Complete!</h3><p className="text-xl mt-2">Your Score: {listeningQuizState.userAnswers.filter(a=>a.isCorrect).length} / {listeningQuizData.length}</p><div className="mt-6"><BigButton onClick={resetListeningQuiz} className="bg-orange-500 border-orange-600">Try Again</BigButton></div></div>
                    ) : (
                        <div className="text-center"><p className="font-bold text-slate-500">Question {listeningQuizState.currentIndex + 1} of {listeningQuizData.length}</p><p className="text-xl font-semibold my-4 text-slate-700">{listeningQuizData[listeningQuizState.currentIndex].question}</p><button onClick={() => speak(listeningQuizData[listeningQuizState.currentIndex].sentence)} className="bg-orange-500 text-white p-4 rounded-full hover:bg-orange-600 transition-all mb-8"><Volume2 size={32} /></button><div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto">{listeningQuizData[listeningQuizState.currentIndex].options.map((option, index) => {let buttonClass = 'bg-orange-500 text-white hover:bg-orange-600'; if (listeningQuizState.feedback) {if (option === listeningQuizData[listeningQuizState.currentIndex].answer) buttonClass = 'bg-green-500 text-white'; else if (option === listeningQuizState.selectedAnswer) buttonClass = 'bg-red-500 text-white'; else buttonClass = 'bg-slate-200 text-slate-500';} return (<button key={index} onClick={() => handleListeningQuizAnswer(option)} className={`p-4 rounded-lg font-semibold text-lg transition-all ${buttonClass}`} disabled={!!listeningQuizState.feedback}>{option}</button>);})}</div>{listeningQuizState.feedback && (<div className="mt-6"><BigButton onClick={handleNextListeningQuizQuestion} className="bg-indigo-600 border-indigo-700">Next →</BigButton></div>)}</div>
                    )}
                </WorksheetCard>

                <div className="pt-8">
                    <BigButton onClick={() => navigate(-1)} className="bg-gray-500 border-gray-600"> ← Go Back </BigButton>
                </div>
            </div>
        </div>
    );
};

export default DanendraPresentPerfectSimpleLesson;