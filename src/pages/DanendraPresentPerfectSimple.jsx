import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, User, Mic, Gamepad2, CheckSquare } from 'lucide-react';

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

const DanendraPresentPerfectSimple = () => {
    const navigate = useNavigate();
    const [readingAnswers, setReadingAnswers] = useState({ q1: '', q2: '' });
    const [readingFeedback, setReadingFeedback] = useState({});
    const [jumbledAnswers, setJumbledAnswers] = useState({});
    const [jumbledFeedback, setJumbledFeedback] = useState({});
    const [gameState, setGameState] = useState({ currentIndex: 0, selectedAnswer: null, feedback: null, userAnswers: [] });
    const [gameFinished, setGameFinished] = useState(false);
    const [reviewState, setReviewState] = useState({ currentIndex: 0, selectedAnswer: null, feedback: null, userAnswers: [] });
    const [quizFinished, setQuizFinished] = useState(false);

    // Quiz state (fixes "quizState is not defined" runtime error)
    const [quizState, setQuizState] = useState({
        currentIndex: 0,
        selectedAnswer: null,
        feedback: null,
        userAnswers: []
    });
    // NOTE: quizFinished is declared later with the unified quiz state — do not redeclare here.

    // --- Lesson Data (Present Perfect Simple) ---
    const story = "My name is Danendra. I have been a graphic designer for five years. I have worked from home since 2020. This month I have finished three projects. I have visited three countries this year. My friend Leo has lived in this city for ten years. We have seen many changes in our neighborhood. My wife, Maria, has met many people through her job. She has been very busy lately, but she has enjoyed her work.";
    const readingQuestions = [
        { id: 'q1', question: "How long has Danendra worked as a graphic designer?", keywords: ['five years'] },
        { id: 'q2', question: "How many projects has he finished this month?", keywords: ['three'] }
    ];

    const jumbledWordsData = [
        { id: 1, jumbled: "I / been / have / to Paris", answer: "I have been to Paris.", img: "https://images.pexels.com/photos/21014/pexels-photo.jpg" },
        { id: 2, jumbled: "She / many / has / countries / visited", answer: "She has visited many countries.", img: "https://images.pexels.com/photos/19090/pexels-photo.jpg" },
        { id: 3, jumbled: "They / here / have / lived / for five years", answer: "They have lived here for five years.", img: "https://images.pexels.com/photos/210647/pexels-photo-210647.jpeg" },
        { id: 4, jumbled: "He / finished / has / the report", answer: "He has finished the report.", img: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg" },
        { id: 5, jumbled: "We / have / already / eaten", answer: "We have already eaten.", img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 6, jumbled: "I / never / have / tried / sushi", answer: "I have never tried sushi.", img: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 7, jumbled: "Maria / has / met / many people", answer: "Maria has met many people.", img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" },
        { id: 8, jumbled: "You / have / seen / this movie", answer: "You have seen this movie.", img: "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 9, jumbled: "He / has / lived / in London", answer: "He has lived in London.", img: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg" },
        { id: 10, jumbled: "We / have / met / before", answer: "We have met before.", img: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg" }
    ];

    const mergedQuizData = [
        { q: "I ___ (finish) the task.", o: ["finished", "have finished", "has finished"], a: "have finished" },
        { q: "She ___ (visit) Japan twice.", o: ["have visited", "has visited", "visited"], a: "has visited" },
        { q: "We ___ (see) that movie already.", o: ["have seen", "has seen", "saw"], a: "have seen" },
        { q: "He ___ (live) here since 2015.", o: ["have lived", "has lived", "lived"], a: "has lived" },
        { q: "They ___ (never/try) sushi.", o: ["have never tried", "has never tried", "never tried"], a: "have never tried" },
        { q: "You ___ (meet) my friend before?", o: ["have met", "has met", "met"], a: "have met" },
        { q: "She ___ (be) to London.", o: ["have been", "has been", "was"], a: "has been" },
        { q: "I ___ (work) here for three years.", o: ["have worked", "has worked", "worked"], a: "have worked" },
        { q: "He ___ (finish) his homework.", o: ["have finished", "has finished", "finished"], a: "has finished" },
        { q: "We ___ (already/eat) lunch.", o: ["have already eaten", "has already eaten", "already ate"], a: "have already eaten" },
        { q: "I ___ (be) to Bali.", o: ["have been", "has been", "was"], a: "have been" },
        { q: "She ___ (visit) her family.", o: ["have visited", "has visited", "visited"], a: "has visited" },
        { q: "They ___ (never/see) snow.", o: ["have never seen", "has never seen", "never saw"], a: "have never seen" },
        { q: "He ___ (work) here since 2018.", o: ["have worked", "has worked", "worked"], a: "has worked" },
        { q: "We ___ (meet) before.", o: ["have met", "has met", "met"], a: "have met" },
        { q: "Maria ___ (already/finish) the report.", o: ["has already finished", "have already finished", "already finished"], a: "has already finished" },
        { q: "I ___ (not/try) that dish.", o: ["have not tried", "has not tried", "did not try"], a: "have not tried" },
        { q: "___ you ever been to New York?", o: ["Have", "Has", "Did"], a: "Have" },
        { q: "He ___ (see) the new museum.", o: ["have seen", "has seen", "saw"], a: "has seen" },
        { q: "They ___ (live) here all their lives.", o: ["have lived", "has lived", "lived"], a: "have lived" },
        { q: "The teacher ___ (explain) the lesson.", o: ["have explained", "has explained", "explained"], a: "has explained" },
        { q: "We ___ (not/receive) any news.", o: ["have not received", "has not received", "did not receive"], a: "have not received" },
        { q: "How long ___ you ___ (study) English?", o: ["have...studied", "has...studied", "did...study"], a: "have...studied" },
        { q: "She ___ (travel) to five continents.", o: ["have traveled", "has traveled", "traveled"], a: "has traveled" },
        { q: "The movie ___ (just/start).", o: ["have just started", "has just started", "just started"], a: "has just started" },
        { q: "I ___ (never/eat) spicy food.", o: ["have never eaten", "has never eaten", "never ate"], a: "have never eaten" },
        { q: "They ___ (already/leave) the office.", o: ["have already left", "has already left", "already left"], a: "have already left" },
        { q: "___ he ___ (finish) the project?", o: ["Has...finished", "Have...finished", "Did...finish"], a: "Has...finished" },
        { q: "We ___ (not/see) her since Monday.", o: ["have not seen", "has not seen", "did not see"], a: "have not seen" },
        { q: "The weather ___ (be) great lately.", o: ["have been", "has been", "was"], a: "has been" }
    ];

    // --- Logic (same handlers pattern as Raja) ---
    const handleReadingAnswerChange = (id, value) => setReadingAnswers(prev => ({ ...prev, [id]: value }));
    const checkReadingAnswer = (id) => {
        const question = readingQuestions.find(q => q.id === id);
        const userAnswer = (readingAnswers[id] || '').toLowerCase();
        const isCorrect = question.keywords.every(keyword => userAnswer.includes(keyword));
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
                <h1 className="text-4xl font-extrabold text-slate-800 text-center">Present Perfect Simple <span className="text-teal-500">for Danendra</span></h1>

                <WorksheetCard>
                    <SectionHeader icon={<BookOpen size={32} className="text-white"/>} title="1. Definition & Grammar" subtitle="Present Perfect Simple" color="green" />
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Present Perfect Simple</h3>
                            <p className="text-lg text-slate-700 leading-relaxed mb-4">We use Present Perfect to talk about <strong>experiences, completed actions with present relevance, and actions started in the past that continue now</strong>.</p>
                            <img src="https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Person reflecting on experiences" className="rounded-lg shadow-md mb-4"/>
                            <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-400 space-y-2">
                                <p className="text-slate-600">I/You/We/They <strong className="text-teal-600">have + past participle</strong></p>
                                <p className="text-slate-600">He/She/It <strong className="text-teal-600">has + past participle</strong></p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Examples</h3>
                            <p className="text-lg text-slate-700 leading-relaxed mb-4">Short sample sentences using Present Perfect Simple</p>
                            <div className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-400 space-y-2">
                                <p className="text-slate-600">I <strong className="text-rose-600">have visited</strong> Paris.</p>
                                <p className="text-slate-600">She <strong className="text-rose-600">has finished</strong> her work.</p>
                                <p className="text-slate-600">They <strong className="text-rose-600">have lived</strong> here for ten years.</p>
                            </div>
                        </div>
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<BookOpen size={32} className="text-white"/>} title="2. Reading: Danendra's Experiences" subtitle="Read the story and answer the questions" color="orange" />
                    <div className="md:flex md:gap-8 items-center">
                        <div className="flex-1">
                            <p className="text-lg text-slate-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: story.replace(/\b(have|has|been|worked|finished|visited|lived|seen|met|enjoyed)\b/gi, '<strong class="text-orange-600 font-semibold">$&</strong>') }} />
                        </div>
                        <div className="flex-shrink-0 w-full md:w-56">
                            <img src="https://images.pexels.com/photos/3183142/pexels-photo-3183142.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="A person thinking about past experiences" className="w-full h-auto rounded-lg object-cover shadow-md" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Answer the questions:</h3>
                    <div className="space-y-4">
                        {readingQuestions.map(q => (
                            <div key={q.id}>
                                <label htmlFor={q.id} className="font-semibold text-slate-700">{q.question}</label>
                                <div className="flex items-center space-x-2 mt-1">
                                    <input type="text" id={q.id} value={readingAnswers[q.id]} onChange={(e) => handleReadingAnswerChange(q.id, e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none" placeholder="Type your answer here..." disabled={!!readingFeedback[q.id]} />
                                    <button onClick={() => checkReadingAnswer(q.id)} disabled={!!readingFeedback[q.id]} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-slate-300">Check</button>
                                </div>
                                {readingFeedback[q.id] && (<p className={`mt-1 text-sm font-bold ${readingFeedback[q.id] === 'correct' ? 'text-green-600' : 'text-red-600'}`}> {readingFeedback[q.id] === 'correct' ? '✓ Correct!' : '✗ Not quite, check the story again.'} </p>)}
                            </div>
                        ))}
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<User size={32} className="text-white"/>} title="3. Jumbled Words" subtitle="Arrange the words to make correct Present Perfect sentences" color="pink"/>
                    <div className="grid md:grid-cols-2 gap-6">
                        {jumbledWordsData.map(item => (
                            <div key={item.id} className="bg-slate-50 p-4 rounded-lg border flex flex-col">
                                <img src={item.img} alt={item.answer} className="w-full h-32 object-cover rounded-lg mb-4"/>
                                <div className="flex-grow">
                                    <p className="h-12 flex items-center justify-center text-slate-600 mb-2 font-semibold text-center">{item.jumbled}</p>
                                    <input type="text" value={jumbledAnswers[item.id] || ''} onChange={(e) => handleJumbledAnswerChange(item.id, e.target.value)} className={`w-full p-2 border text-center rounded-lg focus:ring-2 focus:outline-none ${!jumbledFeedback[item.id] ? 'border-pink-300 focus:ring-pink-400' : ''} ${jumbledFeedback[item.id] === 'correct' ? 'border-green-500 bg-green-50 text-green-800' : ''} ${jumbledFeedback[item.id] === 'incorrect' ? 'border-red-500 bg-red-50 text-red-800' : ''}`} placeholder="Your sentence..." />
                                </div>
                                {jumbledFeedback[item.id] && <p className="text-sm mt-1 text-center">Correct: {item.answer}</p>}
                                <button onClick={() => checkJumbledAnswer(item.id)} className="w-full mt-2 text-sm py-1 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:bg-slate-300" disabled={!jumbledAnswers[item.id] || jumbledFeedback[item.id]}> Check Answer </button>
                            </div>
                        ))}
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<Mic size={32} className="text-white"/>} title="4. Speaking: Talk about Experiences" subtitle="Practice asking and answering with Present Perfect" color="blue" />
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="text-center">
                            <img src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Two people asking about experiences" className="w-full h-auto rounded-lg object-cover shadow-md"/>
                        </div>
                        <div>
                            <p className="mb-4 text-lg text-slate-700">Discuss these questions with a partner or teacher using Present Perfect.</p>
                            <h4 className="font-bold text-lg mb-2 text-slate-800">Example Questions:</h4>
                            <ul className="list-disc list-inside space-y-2 text-slate-700 text-lg">
                                <li>Have you ever visited another country?</li>
                                <li>How long have you worked/studied here?</li>
                                <li>Have you finished your homework?</li>
                                <li>Have you ever tried a new hobby recently?</li>
                                <li>Have you ever met someone famous?</li>
                            </ul>
                        </div>
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<CheckSquare size={32} className="text-white"/>} title="5. Quiz" subtitle="Combined Present Perfect quiz (more questions)" color="violet"/>
                    {quizFinished ? (
                        <div className="text-center py-4">
                            <h3 className="text-3xl font-bold text-green-600">Quiz Complete!</h3>
                            <p className="text-xl mt-2">Your Score: {quizState.userAnswers.filter(a=>a.isCorrect).length} / {mergedQuizData.length}</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="font-bold text-slate-500">Question {quizState.currentIndex + 1} of {mergedQuizData.length}</p>
                            <p className="text-3xl font-bold my-8 min-h-[4rem] flex items-center justify-center text-slate-800">{mergedQuizData[quizState.currentIndex].q.replace('___', '_____')}</p>
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
                                <div className="mt-6"><BigButton onClick={handleNextQuizQuestion} className="bg-indigo-600 border-indigo-700">Next →</BigButton></div>
                            )}
                        </div>
                    )}
                </WorksheetCard>

                <div className="text-center text-sm text-slate-500">
                    <p>← <Link to="/danendra-introduction" className="text-indigo-600 hover:underline">Back to Danendra's Introduction</Link></p>
                </div>
            </div>
        </div>
    );
};

export default DanendraPresentPerfectSimple;