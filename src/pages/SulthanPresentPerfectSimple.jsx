import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, User, Mic, Gamepad2, CheckSquare } from 'lucide-react';

// Copy the exact SectionHeader component
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

const SulthanPresentPerfectSimple = () => {
    // Copy all state declarations from DanendraPresentPerfectSimple
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

    // Copy all the data (story, questions, etc.) exactly as they are
    const story = "My name is Sulthan. I have been a graphic designer for five years. I have worked from home since 2020. This month I have finished three projects. I have visited three countries this year. My friend Leo has lived in this city for ten years. We have seen many changes in our neighborhood. My wife, Maria, has met many people through her job. She has been very busy lately, but she has enjoyed her work.";
    
    // Copy the exact readingQuestions array
    const readingQuestions = [
        { id: 'q1', question: "How long has Sarah worked as a graphic designer?", keywords: ['five years'] },
        { id: 'q2', question: "How many projects has she finished this month?", keywords: ['three'] }
    ];

    // Copy the exact jumbledWordsData array
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

    // Copy the exact mergedQuizData array with all 40 questions
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

    // Copy all the handlers exactly as they are
    const handleReadingAnswerChange = (id, value) => setReadingAnswers(prev => ({ ...prev, [id]: value }));
    const checkReadingAnswer = (id) => {
        const question = readingQuestions.find(q => q.id === id);
        const userAnswer = readingAnswers[id].toLowerCase();
        const isCorrect = question.keywords.some(keyword => userAnswer.includes(keyword.toLowerCase()));
        setReadingFeedback(prev => ({ ...prev, [id]: isCorrect ? 'correct' : 'incorrect' }));
    };

    const handleJumbledAnswerChange = (id, value) => setJumbledAnswers(prev => ({ ...prev, [id]: value }));
    const checkJumbledAnswer = (id) => {
        const q = jumbledWordsData.find(item => item.id === id);
        const userAnswer = jumbledAnswers[id]?.trim().toLowerCase();
        const correctAnswer = q.answer.toLowerCase();
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

    // Copy the exact return JSX, just change "for Danendra" to "for Sulthan"
    return (
        <div className="font-sans bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-12 p-4 md:p-8">
                <h1 className="text-4xl font-extrabold text-slate-800 text-center">Present Perfect Simple <span className="text-teal-500">for Sulthan</span></h1>

                <WorksheetCard>
                    <SectionHeader icon={<BookOpen size={32} className="text-white"/>} title="1. Definition & Grammar" subtitle="Understanding Present Perfect" color="green" />
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Present Perfect</h3>
                            <p className="text-lg text-slate-700 leading-relaxed mb-4">
                                We use Present Perfect to talk about:
                            </p>
                            <ul className="list-disc list-inside text-lg text-slate-700 space-y-2">
                                <li>Experiences in life (until now)</li>
                                <li>Actions that started in the past and continue now</li>
                                <li>Recent actions with present results</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Structure</h3>
                            <div className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-400 space-y-2">
                                <p className="text-slate-600">Subject + have/has + past participle</p>
                                <p className="text-slate-600">I <strong>have visited</strong> Paris.</p>
                                <p className="text-slate-600">She <strong>has lived</strong> here for 5 years.</p>
                            </div>
                        </div>
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<BookOpen size={32} className="text-white"/>} title="2. Reading" subtitle="Read the story and answer questions" color="orange" />
                    <div className="md:flex md:gap-8 items-start">
                        <div className="flex-1">
                            <p className="text-lg text-slate-700 leading-relaxed mb-6">{story}</p>
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
                    <SectionHeader icon={<User size={32} className="text-white"/>} title="3. Jumbled Words" subtitle="Arrange the words correctly" color="pink"/>
                    <div className="grid md:grid-cols-2 gap-6">
                        {jumbledWordsData.map(item => (
                            <div key={item.id} className="bg-slate-50 p-4 rounded-lg border">
                                <img src={item.img} alt="" className="w-full h-48 object-cover rounded mb-4"/>
                                <p className="text-center font-semibold mb-2">{item.jumbled}</p>
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
                                    <p className={`mt-2 text-center ${jumbledFeedback[item.id] === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                                        {jumbledFeedback[item.id] === 'correct' ? '✓ Correct!' : '✗ Try again'}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<CheckSquare size={32} className="text-white"/>} title="4. Quiz" subtitle="Test your knowledge" color="violet"/>
                    {quizFinished ? (
                        <div className="text-center py-4">
                            <h3 className="text-3xl font-bold text-green-600">Quiz Complete!</h3>
                            <p className="text-xl mt-2">Your Score: {quizState.userAnswers.filter(a=>a.isCorrect).length} / {mergedQuizData.length}</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="font-bold text-slate-500">Question {quizState.currentIndex + 1} of {mergedQuizData.length}</p>
                            <p className="text-3xl font-bold my-8">{mergedQuizData[quizState.currentIndex].q}</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
                                {mergedQuizData[quizState.currentIndex].o.map((option, index) => {
                                    let buttonClass = 'bg-violet-500 text-white hover:bg-violet-600';
                                    if (quizState.feedback) {
                                        if (option === mergedQuizData[quizState.currentIndex].a) {
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
                                    <button 
                                        onClick={handleNextQuizQuestion}
                                        className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700"
                                    >
                                        Next →
                                    </button>
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

export default SulthanPresentPerfectSimple;