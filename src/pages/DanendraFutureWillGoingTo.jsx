import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { WorksheetCard, BigButton } from '../components/common';
import { BookOpen, User, Mic, CheckSquare } from 'lucide-react';

// ...existing code...
const SectionHeader = ({ icon, title, subtitle, color = 'blue' }) => {
    const colors = {
        blue: 'from-blue-500 to-sky-500',
        violet: 'from-violet-500 to-purple-500',
        green: 'from-emerald-500 to-teal-500',
        orange: 'from-amber-500 to-orange-500',
        pink: 'from-pink-500 to-rose-500',
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

// ...existing code...
const DanendraFutureWillGoingTo = () => {
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

    // --- Lesson Data (Future: will vs going to) ---
    const story = "My name is Danendra. I will start a new design project next month. I am going to work with a small team. This year I am going to visit three countries for conferences. My friend Leo will move to this city next year. We are going to see many new places in our neighborhood. My wife, Maria, is going to meet many people through her new job. She will be very busy, but she will enjoy her work.";

    const readingQuestions = [
        { id: 'q1', question: "When will Danendra start his new design project?", keywords: ['next month'] },
        { id: 'q2', question: "How many countries is he going to visit this year?", keywords: ['three'] }
    ];

    const jumbledWordsData = [
        { id: 1, jumbled: "will / I / start / tomorrow", answer: "I will start tomorrow.", img: "https://images.pexels.com/photos/1556706/pexels-photo-1556706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 2, jumbled: "going / am / to / I / travel / next year", answer: "I am going to travel next year.", img: "https://images.pexels.com/photos/2922672/pexels-photo-2922672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 3, jumbled: "will / Leo / move / next year", answer: "Leo will move next year.", img: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 4, jumbled: "is / going / Maria / to / meet / people", answer: "Maria is going to meet people.", img: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 5, jumbled: "We / are / going / to / see / new places", answer: "We are going to see new places.", img: "https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 6, jumbled: "will / she / enjoy / her work", answer: "She will enjoy her work.", img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 7, jumbled: "I / am / going / to / join / the team", answer: "I am going to join the team.", img: "https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 8, jumbled: "will / it / rain / tomorrow", answer: "It will rain tomorrow.", img: "https://images.pexels.com/photos/459451/pexels-photo-459451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 9, jumbled: "are / we / going / to / start / now", answer: "We are going to start now.", img: "https://images.pexels.com/photos/2775269/pexels-photo-2775269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 10, jumbled: "will / you / come / later", answer: "Will you come later?", img: "https://images.pexels.com/photos/4307884/pexels-photo-4307884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 11, jumbled: "They / are / going / to / build / a new house", answer: "They are going to build a new house.", img: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }
    ];

    const mergedQuizData = [
        { q: "I ___ (start) the project tomorrow.", o: ["will start", "am starting", "is going to start"], a: "will start" },
        { q: "She ___ (visit) Tokyo next month.", o: ["will visit", "is going to visit", "visited"], a: "is going to visit" },
        { q: "We ___ (have) a meeting later.", o: ["will have", "are having", "have"], a: "will have" },
        { q: "He ___ (move) to Jakarta next year.", o: ["will move", "is going to move", "moves"], a: "is going to move" },
        { q: "They ___ (not/come) to the party.", o: ["will not come", "are not coming", "did not come"], a: "will not come" },
        { q: "You ___ (meet) him tomorrow?", o: ["Will you meet", "Are you meeting", "Do you meet"], a: "Will you meet" },
        { q: "She ___ (be) a doctor in the future.", o: ["will be", "is going to be", "was"], a: "will be" },
        { q: "I ___ (visit) three countries next year.", o: ["will visit", "am going to visit", "visited"], a: "am going to visit" },
        { q: "He ___ (start) his job on Monday.", o: ["will start", "is going to start", "started"], a: "is going to start" },
        { q: "We ___ (see) many new places.", o: ["will see", "are going to see", "saw"], a: "are going to see" },
        { q: "I ___ (probably/attend) the meeting.", o: ["will probably attend", "am probably attending", "am going to probably attend"], a: "will probably attend" },
        { q: "They ___ (already/decide) to move.", o: ["have decided", "are going to decide", "are going to move"], a: "are going to move" },
        { q: "___ you ___ (help) me later?", o: ["Will...help", "Are...going to help", "Do...help"], a: "Will...help" },
        { q: "She ___ (buy) a new laptop next week.", o: ["will buy", "is going to buy", "buys"], a: "is going to buy" },
        { q: "We ___ (not/finish) now.", o: ["will not finish", "are not going to finish", "did not finish"], a: "are not going to finish" },
        { q: "Maria ___ (attend) the conference.", o: ["will attend", "is going to attend", "attended"], a: "is going to attend" },
        { q: "I ___ (not/forget) your message.", o: ["will not forget", "am not going to forget", "did not forget"], a: "will not forget" },
        { q: "How long ___ you ___ (stay) there?", o: ["will...stay", "are...going to stay", "did...stay"], a: "are...going to stay" },
        { q: "He ___ (probably/win) the award.", o: ["will probably win", "is probably going to win", "probably wins"], a: "will probably win" },
        { q: "They ___ (plan) to launch the app.", o: ["will plan", "are going to plan", "are going to launch"], a: "are going to launch" },
        { q: "The team ___ (train) next week.", o: ["will train", "are going to train", "trained"], a: "will train" },
        { q: "We ___ (meet) at 9 AM.", o: ["will meet", "are going to meet", "meet"], a: "will meet" },
        { q: "I ___ (visit) my parents this weekend.", o: ["will visit", "am going to visit", "visit"], a: "am going to visit" },
        { q: "___ it ___ (rain) tomorrow?", o: ["Will...rain", "Is...going to rain", "Does...rain"], a: "Is...going to rain" },
        { q: "She ___ (not/come) with us.", o: ["will not come", "is not going to come", "did not come"], a: "is not going to come" },
        { q: "They ___ (definitely/approve) the plan.", o: ["will definitely approve", "are going to definitely approve", "definitely approve"], a: "will definitely approve" },
        { q: "I ___ (start) learning Spanish soon.", o: ["will start", "am going to start", "started"], a: "am going to start" },
        { q: "He ___ (probably/leave) early.", o: ["will probably leave", "is probably going to leave", "leaves"], a: "will probably leave" },
        { q: "We ___ (not/accept) the offer.", o: ["will not accept", "are not going to accept", "did not accept"], a: "are not going to accept" },
        { q: "___ they ___ (come) to the meeting?", o: ["Will...come", "Are...going to come", "Do...come"], a: "Are...going to come" },
        { q: "The company ___ (launch) the product next month.", o: ["will launch", "is going to launch", "launched"], a: "is going to launch" }
    ];

    // --- Handlers ---
    const handleReadingAnswerChange = (id, value) => setReadingAnswers(prev => ({ ...prev, [id]: value }));
    const checkReadingAnswer = (id) => {
        const question = readingQuestions.find(q => q.id === id);
        const userAnswer = (readingAnswers[id] || '').toLowerCase();
        const isCorrect = question.keywords.some(keyword => userAnswer.includes(keyword));
        setReadingFeedback(prev => ({ ...prev, [id]: isCorrect ? 'correct' : 'incorrect' }));
    };

    const handleJumbledAnswerChange = (id, value) => setJumbledAnswers(prev => ({ ...prev, [id]: value }));
    const checkJumbledAnswer = (id) => {
        const q = jumbledWordsData.find(item => item.id === id);
        const userAnswer = (jumbledAnswers[id] || '').trim().replace(/\.$/, "").toLowerCase();
        const correctAnswer = q.answer.replace(/\.$/, "").toLowerCase();
        setJumbledFeedback(prev => ({ ...prev, [id]: userAnswer === correctAnswer ? 'correct' : 'incorrect' }));
    };

    const handleQuizAnswer = (option) => {
        if (quizState.feedback) return;
        const isCorrect = option === mergedQuizData[quizState.currentIndex].a;
        setQuizState(prev => ({
            ...prev,
            selectedAnswer: option,
            feedback: isCorrect ? 'correct' : 'incorrect',
            userAnswers: [...prev.userAnswers, { ...mergedQuizData[prev.currentIndex], userAnswer: option, isCorrect }]
        }));
    };

    const handleNextQuizQuestion = () => {
        if (quizState.currentIndex < mergedQuizData.length - 1) {
            setQuizState(prev => ({ ...prev, currentIndex: prev.currentIndex + 1, selectedAnswer: null, feedback: null }));
        } else {
            setQuizFinished(true);
        }
    };

    return (
        <div className="font-sans bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-12 p-4 md:p-8">
                <h1 className="text-4xl font-extrabold text-slate-800 text-center">Future Tenses: Will vs Going To <span className="text-teal-500">for Danendra</span></h1>

                <WorksheetCard>
                    <SectionHeader icon={<BookOpen size={32} className="text-white"/>} title="1. Definition & Grammar" subtitle="Will vs Going To (Future forms)" color="green" />
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Future Tenses</h3>
                            <p className="text-lg text-slate-700 leading-relaxed mb-4">We use <strong>will</strong> for decisions, promises, predictions and <strong>be going to</strong> for intentions and plans or predictions with present evidence.</p>
                            <img src="https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Thinking about the future" className="rounded-lg shadow-md mb-4"/>
                            <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400 space-y-2">
                                <p className="text-slate-600">I/You/We/They <strong className="text-teal-600">are going to + base verb</strong></p>
                                <p className="text-slate-600">He/She/It <strong className="text-teal-600">will + base verb</strong></p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Examples</h3>
                            <p className="text-lg text-slate-700 leading-relaxed mb-4">Short sample sentences using future forms</p>
                            <div className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-400 space-y-2">
                                <p className="text-slate-600">I <strong className="text-rose-600">will</strong> call you later.</p>
                                <p className="text-slate-600">She <strong className="text-rose-600">is going to</strong> visit Japan next year.</p>
                                <p className="text-slate-600">They <strong className="text-rose-600">will</strong> arrive tomorrow.</p>
                            </div>
                        </div>
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<BookOpen size={32} className="text-white"/>} title="2. Reading: Danendra's Future Plans" subtitle="Read the story and answer the questions" color="orange" />
                    <div className="md:flex md:gap-8 items-center">
                        <div className="flex-1">
                            <p className="text-lg text-slate-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: story.replace(/\b(will|going to|am going to|is going to|are going to|will be)\b/gi, '<strong class="text-orange-600 font-semibold">$&</strong>') }} />
                        </div>
                        <div className="flex-shrink-0 w-full md:w-56">
                            <img src="https://images.pexels.com/photos/3183142/pexels-photo-3183142.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Plans for the future" className="w-full h-auto rounded-lg object-cover shadow-md" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Answer the questions:</h3>
                    <div className="space-y-4">
                        {readingQuestions.map(q => (
                            <div key={q.id}>
                                <label htmlFor={q.id} className="font-semibold text-slate-700">{q.question}</label>
                                <div className="flex items-center space-x-2 mt-1">
                                    <input type="text" id={q.id} value={readingAnswers[q.id]} onChange={(e) => setReadingAnswers(prev => ({ ...prev, [q.id]: e.target.value }))} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none" placeholder="Type your answer here..." disabled={!!readingFeedback[q.id]} />
                                    <button onClick={() => {
                                        const question = readingQuestions.find(rr => rr.id === q.id);
                                        const userAnswer = (readingAnswers[q.id] || '').toLowerCase();
                                        const correct = question.keywords.some(k => userAnswer.includes(k));
                                        setReadingFeedback(prev => ({ ...prev, [q.id]: correct ? 'correct' : 'incorrect' }));
                                    }} disabled={!!readingFeedback[q.id]} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-slate-300">Check</button>
                                </div>
                                {readingFeedback[q.id] && (<p className={`mt-1 text-sm font-bold ${readingFeedback[q.id] === 'correct' ? 'text-green-600' : 'text-red-600'}`}> {readingFeedback[q.id] === 'correct' ? '✓ Correct!' : '✗ Not quite, check the story again.'} </p>)}
                            </div>
                        ))}
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<User size={32} className="text-white"/>} title="3. Jumbled Words" subtitle="Arrange the words to make correct future sentences" color="pink"/>
                    <div className="grid md:grid-cols-2 gap-6">
                        {jumbledWordsData.map(item => (
                            <div key={item.id} className="bg-slate-50 p-4 rounded-lg border flex flex-col">
                                <img src={item.img} alt={item.answer} className="w-full h-32 object-cover rounded-lg mb-4"/>
                                <div className="flex-grow">
                                    <p className="h-12 flex items-center justify-center text-slate-600 mb-2 font-semibold text-center">{item.jumbled}</p>
                                    <input type="text" value={jumbledAnswers[item.id] || ''} onChange={(e) => setJumbledAnswers(prev => ({ ...prev, [item.id]: e.target.value }))} className={`w-full p-2 border text-center rounded-lg focus:ring-2 focus:outline-none ${!jumbledFeedback[item.id] ? 'border-pink-300 focus:ring-pink-400' : ''} ${jumbledFeedback[item.id] === 'correct' ? 'border-green-500 bg-green-50 text-green-800' : ''} ${jumbledFeedback[item.id] === 'incorrect' ? 'border-red-500 bg-red-50 text-red-800' : ''}`} placeholder="Your sentence..." />
                                </div>
                                {jumbledFeedback[item.id] && <p className="text-sm mt-1 text-center">Correct: {item.answer}</p>}
                                <button onClick={() => {
                                    const q = jumbledWordsData.find(it => it.id === item.id);
                                    const userAnswer = (jumbledAnswers[item.id] || '').trim().replace(/\.$/, "").toLowerCase();
                                    const correctAnswer = q.answer.replace(/\.$/, "").toLowerCase();
                                    setJumbledFeedback(prev => ({ ...prev, [item.id]: userAnswer === correctAnswer ? 'correct' : 'incorrect' }));
                                }} className="w-full mt-2 text-sm py-1 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:bg-slate-300" disabled={!jumbledAnswers[item.id] || jumbledFeedback[item.id]}> Check Answer </button>
                            </div>
                        ))}
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<Mic size={32} className="text-white"/>} title="4. Speaking: Talk about Future Plans" subtitle="Practice asking and answering with future forms" color="blue" />
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="text-center">
                            <img src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="People talking" className="w-full h-auto rounded-lg object-cover shadow-md"/>
                        </div>
                        <div>
                            <p className="mb-4 text-lg text-slate-700">Discuss these questions with a partner or teacher using will / going to.</p>
                            <h4 className="font-bold text-lg mb-2 text-slate-800">Example Questions:</h4>
                            <ul className="list-disc list-inside space-y-2 text-slate-700 text-lg">
                                <li>Are you going to travel this year?</li>
                                <li>Will you start your new project soon?</li>
                                <li>Is she going to move to a new city?</li>
                                <li>Will they come to the meeting?</li>
                                <li>Are we going to finish on time?</li>
                            </ul>
                        </div>
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<CheckSquare size={32} className="text-white"/>} title="5. Quiz" subtitle="Combined Future tense quiz" color="violet"/>
                    {quizFinished ? (
                        <div className="text-center py-4">
                            <h3 className="text-3xl font-bold text-green-600">Quiz Complete!</h3>
                            <p className="text-xl mt-2">Your Score: {quizState.userAnswers.filter(a=>a.isCorrect).length} / {mergedQuizData.length}</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="font-bold text-slate-500">Question {quizState.currentIndex + 1} of {mergedQuizData.length}</p>
                            <p className="text-3xl font-bold my-8 min-h-[4rem] flex items-center justify-center text-slate-800">{mergedQuizData[quizState.currentIndex].q}</p>
                            <div className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
                                {mergedQuizData[quizState.currentIndex].o.map((option, index) => {
                                    let buttonClass = 'bg-violet-500 text-white hover:bg-violet-600';
                                    if (quizState.feedback) {
                                        const correct = mergedQuizData[quizState.currentIndex].a;
                                        if (option === correct) {
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
                                            onClick={() => {
                                                if (quizState.feedback) return;
                                                const isCorrect = option === mergedQuizData[quizState.currentIndex].a;
                                                setQuizState(prev => ({
                                                    ...prev,
                                                    selectedAnswer: option,
                                                    feedback: isCorrect ? 'correct' : 'incorrect',
                                                    userAnswers: [...prev.userAnswers, { ...mergedQuizData[prev.currentIndex], userAnswer: option, isCorrect }]
                                                }));
                                            }}
                                            className={`p-4 rounded-lg font-bold text-xl transition-all ${buttonClass}`}
                                            disabled={!!quizState.feedback}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>
                            {quizState.feedback && (
                                <div className="mt-6"><BigButton onClick={() => {
                                    if (quizState.currentIndex < mergedQuizData.length - 1) {
                                        setQuizState(prev => ({ ...prev, currentIndex: prev.currentIndex + 1, selectedAnswer: null, feedback: null }));
                                    } else {
                                        setQuizFinished(true);
                                    }
                                }} className="bg-indigo-600 border-indigo-700">Next →</BigButton></div>
                            )}
                        </div>
                    )}
                </WorksheetCard>

                <div className="text-center text-sm text-slate-500">
                    <p>← <Link to="/danendra-introduction" className="text-indigo-600 hover:underline">Back to Danendra's Introduction</Link></p>
                </div>

                <div className="pt-8">
                    <BigButton onClick={() => navigate('/')} className="bg-gray-500 border-gray-600"> ← Back to Home </BigButton>
                </div>
            </div>
        </div>
    );
};

export default DanendraFutureWillGoingTo;