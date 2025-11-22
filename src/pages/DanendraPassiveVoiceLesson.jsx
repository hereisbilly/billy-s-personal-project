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

const DanendraPassiveVoiceLesson = () => {
    const navigate = useNavigate();
    const [readingAnswers, setReadingAnswers] = useState({ q1: '', q2: '', q3: '', q4: '', q5: '' });
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

    const story = "In our city, many new buildings are being built. A new bridge was completed last year. The design for the bridge was created by a famous architect. Every day, hundreds of cars are driven across it. The city's history is displayed in the local museum. The museum is visited by thousands of tourists every year. Important decisions for the city are made by the city council. It's a great place to live!";

    const readingQuestions = [
        { id: 'q1', question: "What was completed last year?", keywords: ['bridge', 'new bridge'] },
        { id: 'q2', question: "Who is the museum visited by?", keywords: ['tourists', 'thousands of tourists'] },
        { id: 'q3', question: "Who was the bridge's design created by?", keywords: ['architect', 'famous architect'] },
        { id: 'q4', question: "What is displayed in the local museum?", keywords: ["city's history", 'history'] },
        { id: 'q5', question: "Who are important city decisions made by?", keywords: ['city council', 'council'] }
    ];

    const jumbledWordsData = [
        { id: 1, jumbled: "The cake / was / by my mother / made", answer: "The cake was made by my mother.", img: "https://images.pexels.com/photos/1028704/pexels-photo-1028704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 2, jumbled: "This book / was / written / in 1990", answer: "This book was written in 1990.", img: "https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 3, jumbled: "The window / was / broken / by the ball", answer: "The window was broken by the ball.", img: "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 4, jumbled: "English / is / spoken / here", answer: "English is spoken here.", img: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 5, jumbled: "The car / is / being / repaired", answer: "The car is being repaired.", img: "https://images.pexels.com/photos/4488636/pexels-photo-4488636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 6, jumbled: "The project / will be / finished / soon", answer: "The project will be finished soon.", img: "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    ];

    const quizData = [
        { q: "The Mona Lisa ___ by Leonardo da Vinci.", o: ["painted", "was painted"], a: "was painted" },
        { q: "My car ___ last night.", o: ["was stolen", "stole"], a: "was stolen" },
        { q: "A new hospital ___ in our town right now.", o: ["is built", "is being built"], a: "is being built" },
        { q: "This report must ___ by tomorrow.", o: ["be finished", "finished"], a: "be finished" },
        { q: "The letters ___ yesterday.", o: ["were sent", "sent"], a: "were sent" },
        { q: "The movie ___ by millions of people.", o: ["has seen", "has been seen"], a: "has been seen" },
        { q: "The food ___ by a famous chef.", o: ["is prepared", "prepares"], a: "is prepared" },
        { q: "The bridge ___ in 2010.", o: ["was built", "built"], a: "was built" },
        { q: "The problem ___ by the manager.", o: ["will solve", "will be solved"], a: "will be solved" },
        { q: "The results ___ announced next week.", o: ["are announced", "will be announced"], a: "will be announced" },
    ];

    const gravityFallsQuizData = [
        { q: "The Mystery Shack ___ by Stan Pines.", o: ["is run", "runs"], a: "is run", feedback: "Correct! The focus is on the Shack, not Stan. The Shack is the receiver of the action." },
        { q: "Journal 3 ___ by Dipper in the woods.", o: ["was found", "found"], a: "was found", feedback: "Correct! The focus is on the Journal. It received the action of being found." },
        { q: "Mabel ___ by Gideon for a while.", o: ["was liked", "liked"], a: "was liked", feedback: "Correct! The focus is on Mabel and what happened to her." },
        { q: "The town of Gravity Falls ___ by many strange creatures.", o: ["is inhabited", "inhabits"], a: "is inhabited", feedback: "Correct! We are focusing on the town, not the creatures." },
        { q: "The portal ___ by Stan in secret for many years.", o: ["was being built", "was building"], a: "was being built", feedback: "Correct! This shows a continuous action in the past that was done to the portal." },
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
                <h1 className="text-4xl font-extrabold text-slate-800 text-center">Passive Voice <span className="text-teal-500">for Danendra</span></h1>

                <WorksheetCard>
                    <SectionHeader icon={<BookOpen size={32} className="text-white"/>} title="1. What is the Passive Voice?" subtitle="Focusing on the action, not the actor" color="green" />
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Active vs. Passive</h3>
                            <p className="text-lg text-slate-700 leading-relaxed mb-4">
                                In an <strong>active</strong> sentence, the subject does the action. In a <strong>passive</strong> sentence, the subject receives the action.
                            </p>
                            <ul className="list-none text-lg text-slate-700 space-y-4">
                                <li><strong>Active:</strong> The architect designed the bridge. (Focus on the architect)</li>
                                <li><strong>Passive:</strong> The bridge was designed by the architect. (Focus on the bridge)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Structure</h3>
                            <div className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-400 space-y-2">
                                <p className="text-slate-600">Subject + to be (am, is, are, was, were) + past participle</p>
                                <p className="text-slate-600">The bridge <strong>was designed</strong>.</p>
                                <p className="text-slate-600">The museum <strong>is visited</strong>.</p>
                                <p className="text-slate-600">The project <strong>will be finished</strong>.</p>
                            </div>
                        </div>
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<User size={32} className="text-white"/>} title="2. Reading" subtitle="Read the story and answer the questions" color="orange" />
                    <p className="text-lg text-slate-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: story.replace(/\b(are being built|was completed|was created|are driven|is displayed|is visited|are made)\b/gi, '<strong class="text-orange-600 font-semibold">$&</strong>') }} />
                    <div className="space-y-4">
                        {readingQuestions.map(q => (
                            <div key={q.id}>
                                <label className="font-semibold text-slate-700">{q.question}</label>
                                <div className="flex gap-2 mt-1">
                                    <input type="text" value={readingAnswers[q.id]} onChange={(e) => handleReadingAnswerChange(q.id, e.target.value)} className="flex-1 p-2 border rounded" placeholder="Type your answer..." />
                                    <button onClick={() => checkReadingAnswer(q.id)} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Check</button>
                                </div>
                                {readingFeedback[q.id] && (<p className={`mt-1 ${readingFeedback[q.id] === 'correct' ? 'text-green-600' : 'text-red-600'}`}>{readingFeedback[q.id] === 'correct' ? '✓ Correct!' : '✗ Try again'}</p>)}
                            </div>
                        ))}
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<Gamepad2 size={32} className="text-white"/>} title="3. Jumbled Words" subtitle="Arrange the words to make passive sentences" color="pink"/>
                    <div className="grid md:grid-cols-2 gap-6">
                        {jumbledWordsData.map(item => (
                            <div key={item.id} className="bg-slate-50 p-4 rounded-lg border">
                                <img src={item.img} crossOrigin="anonymous" alt="Jumbled words context" className="w-full h-48 object-cover rounded mb-4"/>
                                <p className="text-center font-semibold mb-2 text-lg">{item.jumbled}</p>
                                <input type="text" value={jumbledAnswers[item.id] || ''} onChange={(e) => handleJumbledAnswerChange(item.id, e.target.value)} className="w-full p-2 border rounded text-center" placeholder="Type the correct sentence..." />
                                <button onClick={() => checkJumbledAnswer(item.id)} className="w-full mt-2 p-2 bg-pink-500 text-white rounded hover:bg-pink-600">Check Answer</button>
                                {jumbledFeedback[item.id] && (<p className={`mt-2 text-center font-semibold ${jumbledFeedback[item.id] === 'correct' ? 'text-green-600' : 'text-red-600'}`}>{jumbledFeedback[item.id] === 'correct' ? `✓ Correct! The answer is: "${item.answer}"` : '✗ Not quite, try again!'}</p>)}
                            </div>
                        ))}
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<Film size={32} className="text-white"/>} title="4. Gravity Falls Quiz!" subtitle="Passive Voice in Gravity Falls" color="blue"/>
                    {gravityFallsQuizFinished ? (
                        <div className="text-center py-4">
                            <h3 className="text-3xl font-bold text-green-600">Quiz Complete!</h3>
                            <p className="text-xl mt-2">Your Score: {gravityFallsQuizState.userAnswers.filter(a=>a.isCorrect).length} / {gravityFallsQuizData.length}</p>
                            <div className="mt-6"><BigButton onClick={resetGravityFallsQuiz} className="bg-blue-500 border-blue-600">Try Again</BigButton></div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="font-bold text-slate-500">Question {gravityFallsQuizState.currentIndex + 1} of {gravityFallsQuizData.length}</p>
                            <p className="text-2xl font-bold my-8 min-h-[4rem] flex items-center justify-center text-slate-800">{gravityFallsQuizData[gravityFallsQuizState.currentIndex].q}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                                {gravityFallsQuizData[gravityFallsQuizState.currentIndex].o.map((option, index) => {
                                    let buttonClass = 'bg-blue-500 text-white hover:bg-blue-600';
                                    if (gravityFallsQuizState.feedback) {
                                        if (option === gravityFallsQuizData[gravityFallsQuizState.currentIndex].a) buttonClass = 'bg-green-500 text-white';
                                        else if (option === gravityFallsQuizState.selectedAnswer) buttonClass = 'bg-red-500 text-white';
                                        else buttonClass = 'bg-slate-200 text-slate-500';
                                    }
                                    return (<button key={index} onClick={() => handleGravityFallsQuizAnswer(option)} className={`p-4 rounded-lg font-bold text-xl transition-all ${buttonClass}`} disabled={!!gravityFallsQuizState.feedback}>{option}</button>);
                                })}
                            </div>
                            {gravityFallsQuizState.feedback && (<div className="mt-6 text-center"><p className={`text-lg font-semibold p-3 rounded-lg inline-block ${gravityFallsQuizState.feedback === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{gravityFallsQuizData[gravityFallsQuizState.currentIndex].feedback}</p></div>)}
                            {gravityFallsQuizState.feedback && (<div className="mt-6"><BigButton onClick={handleNextGravityFallsQuizQuestion} className="bg-indigo-600 border-indigo-700">Next →</BigButton></div>)}
                        </div>
                    )}
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<CheckSquare size={32} className="text-white"/>} title="5. Quiz" subtitle="Test your knowledge" color="violet"/>
                    {quizFinished ? (
                        <div className="text-center py-4">
                            <h3 className="text-3xl font-bold text-green-600">Quiz Complete!</h3>
                            <p className="text-xl mt-2">Your Score: {quizState.userAnswers.filter(a=>a.isCorrect).length} / {quizData.length}</p>
                            <div className="mt-6"><BigButton onClick={resetQuiz} className="bg-violet-500 border-violet-600">Try Again</BigButton></div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="font-bold text-slate-500">Question {quizState.currentIndex + 1} of {quizData.length}</p>
                            <p className="text-3xl font-bold my-8 min-h-[4rem] flex items-center justify-center text-slate-800">{quizData[quizState.currentIndex].q}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                                {quizData[quizState.currentIndex].o.map((option, index) => {
                                    let buttonClass = 'bg-violet-500 text-white hover:bg-violet-600';
                                    if (quizState.feedback) {
                                        if (option === quizData[quizState.currentIndex].a) buttonClass = 'bg-green-500 text-white';
                                        else if (option === quizState.selectedAnswer) buttonClass = 'bg-red-500 text-white';
                                        else buttonClass = 'bg-slate-200 text-slate-500';
                                    }
                                    return (<button key={index} onClick={() => handleQuizAnswer(option)} className={`p-4 rounded-lg font-bold text-xl transition-all ${buttonClass}`} disabled={!!quizState.feedback}>{option}</button>);
                                })}
                            </div>
                            {quizState.feedback && (<div className="mt-6"><BigButton onClick={handleNextQuizQuestion} className="bg-indigo-600 border-indigo-700">Next →</BigButton></div>)}
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

export default DanendraPassiveVoiceLesson;