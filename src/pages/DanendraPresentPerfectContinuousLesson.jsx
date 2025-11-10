import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, Gamepad2, CheckSquare, Film } from 'lucide-react';

// Re-usable SectionHeader component
const SectionHeader = ({ icon, title, subtitle, color = "blue" }) => {
    const colors = {
        blue: "from-blue-500 to-sky-500",
        violet: "from-violet-500 to-purple-500",
        green: "from-emerald-500 to-teal-500",
        orange: "from-amber-500 to-orange-500",
        pink: "from-pink-500 to-rose-500",
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

const DanendraPresentPerfectContinuousLesson = () => {
    const navigate = useNavigate();
    const [readingAnswers, setReadingAnswers] = useState({ q1: '', q2: '' });
    const [readingFeedback, setReadingFeedback] = useState({});
    const [jumbledAnswers, setJumbledAnswers] = useState({});
    const [jumbledFeedback, setJumbledFeedback] = useState({});
    const [quizState, setQuizState] = useState({
        currentIndex: 0,
        selectedAnswer: null,
        feedback: null,
        userAnswers: []
    });
    const [quizFinished, setQuizFinished] = useState(false);
    const [gravityFallsQuizState, setGravityFallsQuizState] = useState({
        currentIndex: 0,
        selectedAnswer: null,
        feedback: null,
        userAnswers: []
    });
    const [gravityFallsQuizFinished, setGravityFallsQuizFinished] = useState(false);

    // --- Lesson Data ---

    const story = "My name is Danendra. I have been working on a new design project all week. It's been challenging, but I've been learning a lot. My eyes are tired because I have been staring at the computer for so long. My friend Leo has been helping me. We have been brainstorming ideas for hours. Lately, I have also been trying to exercise more. I have been going to the gym three times a week. It feels good to move after sitting all day.";

    const readingQuestions = [
        { id: 'q1', question: "What has Danendra been working on all week?", keywords: ['design project', 'new design project'] },
        { id: 'q2', question: "Why are his eyes tired?", keywords: ['staring at the computer'] }
    ];

    const jumbledWordsData = [
        { id: 1, jumbled: "I / been / have / working / hard", answer: "I have been working hard.", img: "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 2, jumbled: "She / has / been / all day / studying", answer: "She has been studying all day.", img: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 3, jumbled: "They / have / been / for hours / talking", answer: "They have been talking for hours.", img: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 4, jumbled: "He / has / been / since morning / running", answer: "He has been running since morning.", img: "https://images.pexels.com/photos/1157399/pexels-photo-1157399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 5, jumbled: "We / have / been / waiting / for you", answer: "We have been waiting for you.", img: "https://images.pexels.com/photos/2897883/pexels-photo-2897883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 6, jumbled: "It / has / been / all day / raining", answer: "It has been raining all day.", img: "https://images.pexels.com/photos/1255159/pexels-photo-1255159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    ];

    const quizData = [
        { q: "I ___ (work) here for five years.", o: ["have worked", "have been working"], a: "have been working" },
        { q: "She ___ (study) for three hours.", o: ["has studied", "has been studying"], a: "has been studying" },
        { q: "They ___ (play) tennis since this morning.", o: ["have played", "have been playing"], a: "have been playing" },
        { q: "He looks tired. He ___ (run).", o: ["has run", "has been running"], a: "has been running" },
        { q: "We ___ (wait) for the bus for 30 minutes.", o: ["have waited", "have been waiting"], a: "have been waiting" },
        { q: "It ___ (rain) all day.", o: ["has rained", "has been raining"], a: "has been raining" },
        { q: "How long ___ you ___ (learn) English?", o: ["have...learned", "have...been learning"], a: "have...been learning" },
        { q: "My hands are dirty. I ___ (fix) my bike.", o: ["have fixed", "have been fixing"], a: "have been fixing" },
        { q: "She ___ (watch) that show all afternoon.", o: ["has watched", "has been watching"], a: "has been watching" },
        { q: "They ___ (travel) around Asia for a month.", o: ["have traveled", "have been traveling"], a: "have been traveling" },
        // Added 10 more questions
        { q: "You look out of breath. ___ you ___ (run)?", o: ["Have...run", "Have...been running"], a: "Have...been running" },
        { q: "He ___ (write) emails all morning.", o: ["has written", "has been writing"], a: "has been writing" },
        { q: "They ___ (build) that house for months.", o: ["have built", "have been building"], a: "have been building" },
        { q: "I'm tired because I ___ (not sleep) well lately.", o: ["haven't slept", "haven't been sleeping"], a: "haven't been sleeping" },
        { q: "How long ___ she ___ (wait) for him?", o: ["has...waited", "has...been waiting"], a: "has...been waiting" },
        { q: "We ___ (discuss) this problem for hours.", o: ["have discussed", "have been discussing"], a: "have been discussing" },
        { q: "The kids ___ (play) outside since lunch.", o: ["have played", "have been playing"], a: "have been playing" },
        { q: "My phone ___ (ring) non-stop today.", o: ["has rung", "has been ringing"], a: "has been ringing" },
        { q: "She ___ (learn) to play the guitar for a year.", o: ["has learned", "has been learning"], a: "has been learning" },
        { q: "It ___ (snow) since last night.", o: ["has snowed", "has been snowing"], a: "has been snowing" }
    ];

    const gravityFallsQuizData = [
        { q: "Gideon is a psychic. He ___ (tell) people their futures all day.", o: ["has been telling", "has told"], a: "has been telling", feedback: "Correct! This describes a repeated action over a period of time." },
        { q: "Mabel ___ (go) on dates with Gideon.", o: ["has been going", "has gone"], a: "has been going", feedback: "Correct! This emphasizes the repeated activity of her dates with Gideon." },
        { q: "Dipper is suspicious. He ___ (watch) Gideon closely.", o: ["has been watching", "has watched"], a: "has been watching", feedback: "Correct! This shows Dipper's continuous action of observing Gideon." },
        { q: "Gideon ___ (try) to get the Mystery Shack deed from Stan.", o: ["has been trying", "has tried"], a: "has been trying", feedback: "Correct! This highlights Gideon's ongoing attempt to take over the shack." },
        { q: "Mabel feels uncomfortable. She ___ (think) about how to break up with Gideon.", o: ["has been thinking", "has thought"], a: "has been thinking", feedback: "Correct! This describes her ongoing thought process." },
        { q: "Dipper found a magic amulet. He realizes Gideon ___ (use) it to pretend he has powers.", o: ["has been using", "has used"], a: "has been using", feedback: "Correct! This reveals Gideon's continuous deception." },
        { q: "At the end, Dipper and Gideon ___ (fight) for the amulet.", o: ["have been fighting", "have fought"], a: "have been fighting", feedback: "Correct! This describes the duration of their struggle." },
        { q: "Soos ___ (clean) the carpets all morning, and now he's tired.", o: ["has been cleaning", "has cleaned"], a: "has been cleaning", feedback: "Correct! This focuses on the activity that caused him to be tired." },
        { q: "The townspeople ___ (come) to Gideon's shows for weeks.", o: ["have been coming", "have come"], a: "have been coming", feedback: "Correct! This shows a repeated action over a period of time." },
        { q: "Dipper ___ (read) the journal to find Gideon's weakness.", o: ["has been reading", "has read"], a: "has been reading", feedback: "Correct! This describes the ongoing action of searching for information." }
    ];

    // --- Event Handlers ---

    const handleReadingAnswerChange = (id, value) => setReadingAnswers(prev => ({ ...prev, [id]: value }));
    const checkReadingAnswer = (id) => {
        const question = readingQuestions.find(q => q.id === id);
        const userAnswer = readingAnswers[id].toLowerCase().trim();
        const isCorrect = question.keywords.some(keyword => userAnswer.includes(keyword.toLowerCase()));
        setReadingFeedback(prev => ({ ...prev, [id]: isCorrect ? 'correct' : 'incorrect' }));
    };

    const handleJumbledAnswerChange = (id, value) => setJumbledAnswers(prev => ({ ...prev, [id]: value }));
    const checkJumbledAnswer = (id) => {
        const q = jumbledWordsData.find(item => item.id === id);
        const userAnswer = jumbledAnswers[id]?.trim().toLowerCase().replace(/[.?]/g, '');
        const correctAnswer = q.answer.toLowerCase().replace(/[.?]/g, '');
        setJumbledFeedback(prev => ({ ...prev, [id]: userAnswer === correctAnswer ? 'correct' : 'incorrect' }));
    };

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

    const handleGravityFallsQuizAnswer = (option) => {
        if (gravityFallsQuizState.feedback) return;
        const isCorrect = option === gravityFallsQuizData[gravityFallsQuizState.currentIndex].a;
        setGravityFallsQuizState(prev => ({
            ...prev,
            selectedAnswer: option,
            feedback: isCorrect ? 'correct' : 'incorrect',
            userAnswers: [...prev.userAnswers, { ...gravityFallsQuizData[prev.currentIndex], userAnswer: option, isCorrect }]
        }));
    };

    const handleNextGravityFallsQuizQuestion = () => {
        if (gravityFallsQuizState.currentIndex < gravityFallsQuizData.length - 1) {
            setGravityFallsQuizState(prev => ({ ...prev, currentIndex: prev.currentIndex + 1, selectedAnswer: null, feedback: null }));
        } else {
            setGravityFallsQuizFinished(true);
        }
    };

    const resetGravityFallsQuiz = () => {
        setGravityFallsQuizFinished(false);
        setGravityFallsQuizState({ currentIndex: 0, selectedAnswer: null, feedback: null, userAnswers: [] });
    };

    return (
        <div className="font-sans bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-12 p-4 md:p-8">
                <h1 className="text-4xl font-extrabold text-slate-800 text-center">Present Perfect Continuous <span className="text-teal-500">for Danendra</span></h1>

                <WorksheetCard>
                    <SectionHeader icon={<BookOpen size={32} className="text-white"/>} title="1. What is Present Perfect Continuous?" subtitle="Talking about ongoing actions" color="green" />
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Present Perfect Continuous</h3>
                            <p className="text-lg text-slate-700 leading-relaxed mb-4">
                                We use this tense to talk about an action that started in the past and is still continuing now, or has just stopped but has a result in the present. It focuses on the duration of the action.
                            </p>
                            <ul className="list-disc list-inside text-lg text-slate-700 space-y-2">
                                <li>"You are wet." "Yes, it <strong>has been raining</strong>." (Result in the present)</li>
                                <li>"I <strong>have been waiting</strong> for an hour." (Still continuing)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Structure</h3>
                            <div className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-400 space-y-2">
                                <p className="text-slate-600">Subject + have/has + been + verb-ing</p>
                                <p className="text-slate-600">I <strong>have been working</strong>.</p>
                                <p className="text-slate-600">She <strong>has been studying</strong>.</p>
                                <p className="text-slate-600">They <strong>have been playing</strong>.</p>
                            </div>
                        </div>
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<User size={32} className="text-white"/>} title="2. Reading" subtitle="Read the story and answer the questions" color="orange" />
                    <div className="md:flex md:gap-8 items-start">
                        <div className="flex-1">
                            <p className="text-lg text-slate-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: story.replace(/\b(have been working|'ve been learning|have been staring|has been helping|have been brainstorming|have been trying|have been going)\b/gi, '<strong class="text-orange-600 font-semibold">$&</strong>') }} />
                            <div className="space-y-4">
                                {readingQuestions.map(q => (
                                    <div key={q.id}>
                                        <label className="font-semibold text-slate-700">{q.question}</label>
                                        <div className="flex gap-2 mt-1">
                                            <input 
                                                type="text" 
                                                value={readingAnswers[q.id]} 
                                                onChange={(e) => handleReadingAnswerChange(q.id, e.target.value)}
                                                className="flex-1 p-2 border rounded"
                                                placeholder="Type your answer..."
                                            />
                                            <button 
                                                onClick={() => checkReadingAnswer(q.id)}
                                                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                                            >
                                                Check
                                            </button>
                                        </div>
                                        {readingFeedback[q.id] && (
                                            <p className={`mt-1 ${readingFeedback[q.id] === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                                                {readingFeedback[q.id] === 'correct' ? '✓ Correct!' : '✗ Try again'}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<Gamepad2 size={32} className="text-white"/>} title="3. Jumbled Words" subtitle="Arrange the words to make correct sentences" color="pink"/>
                    <div className="grid md:grid-cols-2 gap-6">
                        {jumbledWordsData.map(item => (
                            <div key={item.id} className="bg-slate-50 p-4 rounded-lg border">
                                <img src={item.img} alt="Jumbled words context" className="w-full h-48 object-cover rounded mb-4"/>
                                <p className="text-center font-semibold mb-2 text-lg">{item.jumbled}</p>
                                <input 
                                    type="text" 
                                    value={jumbledAnswers[item.id] || ''} 
                                    onChange={(e) => handleJumbledAnswerChange(item.id, e.target.value)}
                                    className="w-full p-2 border rounded text-center"
                                    placeholder="Type the correct sentence..."
                                />
                                <button 
                                    onClick={() => checkJumbledAnswer(item.id)}
                                    className="w-full mt-2 p-2 bg-pink-500 text-white rounded hover:bg-pink-600"
                                >
                                    Check Answer
                                </button>
                                {jumbledFeedback[item.id] && (
                                    <p className={`mt-2 text-center font-semibold ${jumbledFeedback[item.id] === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                                        {jumbledFeedback[item.id] === 'correct' ? `✓ Correct! The answer is: "${item.answer}"` : '✗ Not quite, try again!'}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<Film size={32} className="text-white"/>} title="4. Gravity Falls Quiz!" subtitle="Present Perfect Continuous in 'The Hand That Rocks the Mabel' (S1, E4)" color="blue"/>
                    {gravityFallsQuizFinished ? (
                        <div className="text-center py-4">
                            <h3 className="text-3xl font-bold text-green-600">Quiz Complete!</h3>
                            <p className="text-xl mt-2">Your Score: {gravityFallsQuizState.userAnswers.filter(a=>a.isCorrect).length} / {gravityFallsQuizData.length}</p>
                            <div className="mt-6">
                                <BigButton onClick={resetGravityFallsQuiz} className="bg-blue-500 border-blue-600">
                                    Try Again
                                </BigButton>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="font-bold text-slate-500">Question {gravityFallsQuizState.currentIndex + 1} of {gravityFallsQuizData.length}</p>
                            <p className="text-2xl font-bold my-8 min-h-[4rem] flex items-center justify-center text-slate-800">
                                {gravityFallsQuizData[gravityFallsQuizState.currentIndex].q}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                                {gravityFallsQuizData[gravityFallsQuizState.currentIndex].o.map((option, index) => {
                                    let buttonClass = 'bg-blue-500 text-white hover:bg-blue-600';
                                    if (gravityFallsQuizState.feedback) {
                                        if (option === gravityFallsQuizData[gravityFallsQuizState.currentIndex].a) {
                                            buttonClass = 'bg-green-500 text-white';
                                        } else if (option === gravityFallsQuizState.selectedAnswer) {
                                            buttonClass = 'bg-red-500 text-white';
                                        } else {
                                            buttonClass = 'bg-slate-200 text-slate-500';
                                        }
                                    }
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleGravityFallsQuizAnswer(option)}
                                            className={`p-4 rounded-lg font-bold text-xl transition-all ${buttonClass}`}
                                            disabled={!!gravityFallsQuizState.feedback}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>
                            {gravityFallsQuizState.feedback && (
                                <div className="mt-6 text-center">
                                    <p className={`text-lg font-semibold p-3 rounded-lg inline-block ${gravityFallsQuizState.feedback === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {gravityFallsQuizData[gravityFallsQuizState.currentIndex].feedback}
                                    </p>
                                </div>
                            )}
                            {gravityFallsQuizState.feedback && (
                                <div className="mt-6">
                                    <BigButton onClick={handleNextGravityFallsQuizQuestion} className="bg-indigo-600 border-indigo-700">
                                        Next →
                                    </BigButton>
                                </div>
                            )}
                        </div>
                    )}
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<CheckSquare size={32} className="text-white"/>} title="5. Quiz" subtitle="Test your knowledge" color="violet"/>
                    {quizFinished ? (
                        <div className="text-center py-4">
                            <h3 className="text-3xl font-bold text-green-600">Quiz Complete!</h3>
                            <p className="text-xl mt-2">Your Score: {quizState.userAnswers.filter(a=>a.isCorrect).length} / {quizData.length}</p>
                            <div className="mt-6">
                                <BigButton onClick={resetQuiz} className="bg-violet-500 border-violet-600">
                                    Try Again
                                </BigButton>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="font-bold text-slate-500">Question {quizState.currentIndex + 1} of {quizData.length}</p>
                            <p className="text-3xl font-bold my-8 min-h-[4rem] flex items-center justify-center text-slate-800">
                                {quizData[quizState.currentIndex].q}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                                {quizData[quizState.currentIndex].o.map((option, index) => {
                                    let buttonClass = 'bg-violet-500 text-white hover:bg-violet-600';
                                    if (quizState.feedback) {
                                        if (option === quizData[quizState.currentIndex].a) {
                                            buttonClass = 'bg-green-500 text-white';
                                        } else if (option === quizState.selectedAnswer) {
                                            buttonClass = 'bg-red-500 text-white';
                                        } else {
                                            buttonClass = 'bg-slate-200 text-slate-500';
                                        }
                                    }
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleQuizAnswer(option)}
                                            className={`p-4 rounded-lg font-bold text-xl transition-all ${buttonClass}`}
                                            disabled={!!quizState.feedback}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>
                            {quizState.feedback && (
                                <div className="mt-6">
                                    <BigButton onClick={handleNextQuizQuestion} className="bg-indigo-600 border-indigo-700">
                                        Next →
                                    </BigButton>
                                </div>
                            )}
                        </div>
                    )}
                </WorksheetCard>

                <div className="pt-8">
                    <BigButton onClick={() => navigate('/')} className="bg-gray-500 border-gray-600"> ← Back to Home </BigButton>
                </div>
            </div>
        </div>
    );
};

export default DanendraPresentPerfectContinuousLesson;