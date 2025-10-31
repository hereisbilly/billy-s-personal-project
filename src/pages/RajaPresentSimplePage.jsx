// src/pages/RajaPresentSimplePage.jsx

import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Book, User, Users, Mic, Gamepad2, CheckSquare } from 'lucide-react'; // Ikon baru

// --- Komponen UI Lokal ---
const SectionHeader = ({ icon, title, subtitle, color = "blue" }) => {
    const colors = {
        blue: "from-blue-600 to-blue-500",
        violet: "from-violet-500 to-purple-500"
    };
    return (
        <div className={`flex items-center p-4 bg-gradient-to-r ${colors[color]} rounded-xl shadow-lg mb-6`}>
            <div className="flex-shrink-0 bg-white bg-opacity-20 p-3 rounded-full mr-4">{icon}</div>
            <div>
                <h2 className="text-2xl font-bold text-white">{title}</h2>
                <p className="text-blue-100">{subtitle}</p>
            </div>
        </div>
    );
};

const RajaPresentSimplePage = () => {
    const navigate = useNavigate();
    const [readingAnswers, setReadingAnswers] = useState({ q1: '', q2: '' });
    const [readingFeedback, setReadingFeedback] = useState({});
    const [jumbledAnswers, setJumbledAnswers] = useState({});
    const [jumbledFeedback, setJumbledFeedback] = useState({});
    const [gameState, setGameState] = useState({ currentIndex: 0, selectedAnswer: null, feedback: null, userAnswers: [] });
    const [gameFinished, setGameFinished] = useState(false);
    const [reviewState, setReviewState] = useState({ currentIndex: 0, selectedAnswer: null, feedback: null, userAnswers: [] });
    const [quizFinished, setQuizFinished] = useState(false);

    // --- Data Pelajaran ---
    const story = "My name is Alex. I am a graphic designer. I work from home. Every morning, I wake up at 7 AM. I drink a cup of coffee and read the news. My cat sits on the chair next to me. His name is Leo. We live in a small apartment. My wife, Maria, is a doctor. She works at a hospital. Her job is very busy, but she loves it. Our life is simple and happy.";
    const readingQuestions = [
        { id: 'q1', question: "What does Alex do?", keywords: ['graphic designer'] },
        { id: 'q2', question: "Where does his wife (Maria) work?", keywords: ['hospital'] }
    ];
    const jumbledWordsData = [
        { id: 1, jumbled: "I / at 7 AM / wake up", answer: "I wake up at 7 AM." },
        { id: 2, jumbled: "He / coffee / drinks", answer: "He drinks coffee." },
        { id: 3, jumbled: "She / at a hospital / works", answer: "She works at a hospital." },
        { id: 4, jumbled: "They / in an apartment / live", answer: "They live in an apartment." },
        { id: 5, jumbled: "My cat / on the chair / sits", answer: "My cat sits on the chair." },
        { id: 6, jumbled: "do not / I / like tea", answer: "I do not like tea." },
        { id: 7, jumbled: "does not / He / a car / have", answer: "He does not have a car." },
        { id: 8, jumbled: "What / your / name / is", answer: "What is your name?" },
        { id: 9, jumbled: "is / His / Leo / name", answer: "His name is Leo." },
        { id: 10, jumbled: "Her / busy / is / job", answer: "Her job is busy." }
    ];
    const gameQuizData = [
        { q: "I ___ (work) at home.", o: ["work", "works", "am working"], a: "work" },
        { q: "He ___ (drink) coffee.", o: ["drink", "drinks", "is drinking"], a: "drinks" },
        { q: "She ___ (love) her job.", o: ["love", "loves", "is loving"], a: "loves" },
        { q: "We ___ (live) in an apartment.", o: ["live", "lives", "are living"], a: "live" },
        { q: "The cat ___ (sit) on the chair.", o: ["sit", "sits", "is sitting"], a: "sits" },
        { q: "They ___ (not) like tea.", o: ["do not", "does not", "are not"], a: "do not" },
        { q: "He ___ (not) have a car.", o: ["do not", "does not", "is not"], a: "does not" },
        { q: "___ you work here?", o: ["Do", "Does", "Are"], a: "Do" },
        { q: "___ she work here?", o: ["Do", "Does", "Is"], a: "Does" },
        { q: "Where ___ they live?", o: ["do", "does", "are"], a: "do" }
    ];
    const reviewQuizData = [
        { q: "This is my book. It's ___ book.", o: ["my", "your", "his"], a: "my" },
        { q: "He has a pen. It's ___ pen.", o: ["my", "her", "his"], a: "his" },
        { q: "She has a cat. It's ___ cat.", o: ["her", "his", "our"], a: "her" },
        { q: "We have a house. It's ___ house.", o: ["their", "our", "my"], a: "our" },
        { q: "They have a car. It's ___ car.", o: ["their", "his", "her"], a: "their" },
        { q: "What is ___ name?", o: ["my", "your", "his"], a: "your" },
        { q: "The cat loves ___ toys.", o: ["it's", "it", "its"], a: "its" },
        { q: "I ___ (like) coffee.", o: ["like", "likes", "am liking"], a: "like" },
        { q: "She ___ (work) in a bank.", o: ["work", "works", "is working"], a: "works" },
        { q: "He ___ (not) play tennis.", o: ["don't", "doesn't", "isn't"], a: "doesn't" },
        { q: "They ___ (live) in a big city.", o: ["live", "lives", "is living"], a: "live" },
        { q: "We ___ (not) watch TV in the morning.", o: ["don't", "doesn't", "aren't"], a: "don't" },
        { q: "___ he speak Indonesian?", o: ["Do", "Does", "Is"], a: "Does" },
        { q: "___ they have a pet?", o: ["Do", "Does", "Are"], a: "Do" },
        { q: "The sun ___ (rise) in the east.", o: ["rise", "rises", "is rising"], a: "rises" },
        { q: "I ___ (be) a student.", o: ["am", "is", "are"], a: "am" },
        { q: "You ___ (be) my friend.", o: ["am", "is", "are"], a: "are" },
        { q: "He ___ (be) a teacher.", o: ["am", "is", "are"], a: "is" },
        { q: "That is ___ (his/him) bag.", o: ["him", "his", "he"], a: "his" },
        { q: "I love ___ (my/me) family.", o: ["me", "my", "I"], a: "my" },
    ];

    // --- Logic ---
    const handleReadingAnswerChange = (id, value) => setReadingAnswers(prev => ({ ...prev, [id]: value }));
    const checkReadingAnswer = (id) => { const question = readingQuestions.find(q => q.id === id); const userAnswer = readingAnswers[id].toLowerCase(); const isCorrect = question.keywords.every(keyword => userAnswer.includes(keyword)); setReadingFeedback(prev => ({ ...prev, [id]: isCorrect ? 'correct' : 'incorrect' })); };
    const handleJumbledAnswerChange = (id, value) => setJumbledAnswers(prev => ({ ...prev, [id]: value }));
    const checkJumbledAnswer = (id) => { const q = jumbledWordsData.find(item => item.id === id); const userAnswer = jumbledAnswers[id]?.trim().replace(/\.$/, "").toLowerCase(); const correctAnswer = q.answer.replace(/\.$/, "").toLowerCase(); setJumbledFeedback(prev => ({ ...prev, [id]: userAnswer === correctAnswer ? 'correct' : 'incorrect' })); };
    const handleGameAnswer = (option) => { if (gameState.feedback) return; const isCorrect = option === gameQuizData[gameState.currentIndex].a; setGameState(prev => ({ ...prev, selectedAnswer: option, feedback: isCorrect ? 'correct' : 'incorrect', userAnswers: [...prev.userAnswers, { ...gameQuizData[prev.currentIndex], userAnswer: option, isCorrect }] })); };
    const handleNextGameQuestion = () => { if (gameState.currentIndex < gameQuizData.length - 1) { setGameState(prev => ({ ...prev, currentIndex: prev.currentIndex + 1, selectedAnswer: null, feedback: null })); } else { setGameFinished(true); } };
    const handleReviewAnswer = (option) => { if (reviewState.feedback) return; const isCorrect = option === reviewQuizData[reviewState.currentIndex].a; setReviewState(prev => ({ ...prev, selectedAnswer: option, feedback: isCorrect ? 'correct' : 'incorrect', userAnswers: [...prev.userAnswers, { ...reviewQuizData[prev.currentIndex], userAnswer: option, isCorrect }] })); };
    const handleNextReviewQuestion = () => { if (reviewState.currentIndex < reviewQuizData.length - 1) { setReviewState(prev => ({ ...prev, currentIndex: prev.currentIndex + 1, selectedAnswer: null, feedback: null })); } else { setQuizFinished(true); } };

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <h1 className="text-4xl font-extrabold text-slate-800 text-center">Present Simple: Daily Life <span className="text-blue-500">for Raja</span></h1>
            
            <WorksheetCard>
                <SectionHeader icon={<BookOpen size={32} className="text-white"/>} title="1. Definition & Grammar" subtitle="Present Simple & Possessives" />
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">Present Simple</h3>
                        <p className="text-lg text-slate-700 leading-relaxed mb-4">We use the **Present Simple** to talk about **habits, routines, and facts**.</p>
                        <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300 space-y-2">
                            <p className="text-slate-600">I / You / We / They <strong className="text-blue-600">work</strong>.</p>
                            <p className="text-slate-600">He / She / It <strong className="text-blue-600">works</strong>.</p>
                            <p className="text-slate-600">I <strong className="text-red-600">do not</strong> work. (don't)</p>
                            <p className="text-slate-600">He <strong className="text-red-600">does not</strong> work. (doesn't)</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">Possessive Adjectives</h3>
                        <p className="text-lg text-slate-700 leading-relaxed mb-4">We use these words to show who **owns** something.</p>
                        <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300 space-y-2">
                            <p className="text-slate-600">I → <strong className="text-blue-600">My</strong> book</p>
                            <p className="text-slate-600">You → <strong className="text-blue-600">Your</strong> book</p>
                            <p className="text-slate-600">He → <strong className="text-blue-600">His</strong> book</p>
                            <p className="text-slate-600">She → <strong className="text-blue-600">Her</strong> book</p>
                        </div>
                    </div>
                </div>
            </WorksheetCard>

            <WorksheetCard>
                <SectionHeader icon={<Book size={32} className="text-white"/>} title="2. Reading: A Designer's Life" subtitle="Read the story and answer the questions" />
                <div className="md:flex md:gap-8 items-center">
                    <div className="flex-1">
                        <p className="text-lg text-slate-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: story.replace(/\b(work|wake|drink|read|sits|live|works|loves)\b/g, '<strong class="text-blue-600 font-semibold">$&</strong>').replace(/\b(My|His|Our|Her)\b/g, '<strong class="text-rose-500 font-semibold">$&</strong>') }} />
                    </div>
                    <div className="flex-shrink-0 w-full md:w-56">
                        <img 
                            src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                            alt="A person working from a modern home office."
                            className="w-full h-auto rounded-lg object-cover shadow-md"
                        />
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Answer the questions:</h3>
                <div className="space-y-4">
                    {readingQuestions.map(q => (
                        <div key={q.id}>
                            <label htmlFor={q.id} className="font-semibold text-slate-700">{q.question}</label>
                            <div className="flex items-center space-x-2 mt-1">
                                <input type="text" id={q.id} value={readingAnswers[q.id]} onChange={(e) => handleReadingAnswerChange(q.id, e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Type your answer here..." disabled={!!readingFeedback[q.id]} />
                                <button onClick={() => checkReadingAnswer(q.id)} disabled={!!readingFeedback[q.id]} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-slate-300">Check</button>
                            </div>
                            {readingFeedback[q.id] && (<p className={`mt-1 text-sm font-bold ${readingFeedback[q.id] === 'correct' ? 'text-green-600' : 'text-red-600'}`}> {readingFeedback[q.id] === 'correct' ? '✓ Correct!' : '✗ Not quite, check the story again.'} </p>)}
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            <WorksheetCard>
                <SectionHeader icon={<User size={32} className="text-white"/>} title="3. Jumbled Words" subtitle="Arrange the words to make correct sentences" color="blue"/>
                <div className="grid md:grid-cols-2 gap-6">
                    {jumbledWordsData.map(item => (
                        <div key={item.id} className="bg-slate-50 p-4 rounded-lg border flex flex-col">
                            <div className="flex-grow">
                                <p className="h-12 flex items-center justify-center text-slate-600 mb-2 font-semibold text-center">{item.jumbled}</p>
                                <input type="text" value={jumbledAnswers[item.id] || ''} onChange={(e) => handleJumbledAnswerChange(item.id, e.target.value)} className={`w-full p-2 border text-center rounded-lg focus:ring-2 focus:outline-none ${!jumbledFeedback[item.id] ? 'border-slate-300 focus:ring-blue-400' : ''} ${jumbledFeedback[item.id] === 'correct' ? 'border-green-500 bg-green-50 text-green-800' : ''} ${jumbledFeedback[item.id] === 'incorrect' ? 'border-red-500 bg-red-50 text-red-800' : ''}`} placeholder="Your sentence..." />
                            </div>
                            {jumbledFeedback[item.id] && <p className="text-sm mt-1 text-center">Correct: {item.answer}</p>}
                            <button onClick={() => checkJumbledAnswer(item.id)} className="w-full mt-2 text-sm py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-slate-300" disabled={!jumbledAnswers[item.id] || jumbledFeedback[item.id]}> Check Answer </button>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            <WorksheetCard>
                <SectionHeader icon={<Mic size={32} className="text-white"/>} title="4. Speaking: Your Life" subtitle="Practice your skills" />
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="text-center">
                        <img 
                            src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                            alt="Two people having a conversation"
                            className="w-full h-auto rounded-lg object-cover shadow-md"
                        />
                    </div>
                    <div>
                        <p className="mb-4 text-lg text-slate-700">Answer these questions with your teacher.</p>
                        <h4 className="font-bold text-lg mb-2 text-slate-800">Example Questions:</h4>
                        <ul className="list-disc list-inside space-y-2 text-slate-700 text-lg">
                            <li>What time do you wake up?</li>
                            <li>Do you drink coffee or tea?</li>
                            <li>What is your mother's job?</li>
                            <li>What is her name?</li>
                            <li>Do you have a pet? What is its name?</li>
                            <li>Do you live in a house or an apartment?</li>
                        </ul>
                    </div>
                </div>
            </WorksheetCard>

            <WorksheetCard>
                <SectionHeader icon={<Gamepad2 size={32} className="text-white"/>} title="5. Interactive Game" subtitle="Choose the correct verb" />
                {gameFinished ? (<div className="text-center py-4"><h3 className="text-3xl font-bold text-green-600">Game Complete!</h3><p className="text-xl mt-2">Your Score: {gameState.userAnswers.filter(a=>a.isCorrect).length}/{gameQuizData.length}</p></div>) : ( <div className="text-center"> <p className="font-bold text-slate-500">Question {gameState.currentIndex + 1} of {gameQuizData.length}</p> <p className="text-3xl font-bold my-8 min-h-[4rem] flex items-center justify-center text-slate-800">{gameQuizData[gameState.currentIndex].q.replace('___', '_____')}</p> <div className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3"> {gameQuizData[gameState.currentIndex].o.map((option, index) => { let buttonClass = 'bg-sky-500 text-white hover:bg-sky-600'; if (gameState.feedback) { if (option === gameQuizData[gameState.currentIndex].a) buttonClass = 'bg-green-500 text-white'; else if (option === gameState.selectedAnswer) buttonClass = 'bg-red-500 text-white'; else buttonClass = 'bg-slate-200 text-slate-500'; } return (<button key={index} onClick={() => handleGameAnswer(option)} className={`p-4 rounded-lg font-bold text-xl transition-all ${buttonClass}`} disabled={!!gameState.feedback}>{option}</button>); })} </div> {gameState.feedback && ( <div className="mt-6"><BigButton onClick={handleNextGameQuestion} className="bg-slate-800 border-slate-900">Next →</BigButton></div> )} </div> )}
            </WorksheetCard>

            <WorksheetCard>
                <SectionHeader icon={<CheckSquare size={32} className="text-white"/>} title="6. Review Quiz" subtitle="Final fill-in-the-blanks quiz" color="violet"/>
                {quizFinished ? ( <div className="text-center py-4"> <h3 className="text-3xl font-bold text-violet-600">Quiz Complete!</h3> <p className="text-xl mt-2">Your Score: {reviewState.userAnswers.filter(a=>a.isCorrect).length} / {reviewQuizData.length}</p> </div> ) : ( <div className="text-center"> <p className="font-bold text-slate-500">Question {reviewState.currentIndex + 1} of {reviewQuizData.length}</p> <p className="text-3xl font-bold my-8 min-h-[4rem] flex items-center justify-center text-slate-800">{reviewQuizData[reviewState.currentIndex].q.replace('___', '_____')}</p> <div className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3"> {reviewQuizData[reviewState.currentIndex].o.map((option, index) => { let buttonClass = 'bg-violet-500 text-white hover:bg-violet-600'; if (reviewState.feedback) { if (option === reviewQuizData[reviewState.currentIndex].a) buttonClass = 'bg-green-500 text-white'; else if (option === reviewState.selectedAnswer) buttonClass = 'bg-red-500 text-white'; else buttonClass = 'bg-slate-200 text-slate-500'; } return (<button key={index} onClick={() => handleReviewAnswer(option)} className={`p-4 rounded-lg font-bold text-xl transition-all ${buttonClass}`} disabled={!!reviewState.feedback}>{option}</button>); })} </div> {reviewState.feedback && ( <div className="mt-6"><BigButton onClick={handleNextReviewQuestion} className="bg-slate-800 border-slate-900">Next →</BigButton></div> )} </div> )}
            </WorksheetCard>

            <div className="pt-8"> <BigButton onClick={() => navigate('/')} className="bg-slate-500 border-slate-600"> ← Back to Home </BigButton> </div>
        </div>
    );
};

export default RajaPresentSimplePage;