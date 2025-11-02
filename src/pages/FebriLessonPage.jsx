import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WorksheetCard, BigButton } from '../components/common';
import { BookOpen, User, Mic, Gamepad2, CheckSquare } from 'lucide-react';

const SectionHeader = ({ icon, title, subtitle, color }) => (
    <div className={`flex items-center p-4 rounded-lg bg-${color}-500 text-white`}>
        <div className="mr-3">{icon}</div>
        <div>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-sm">{subtitle}</p>
        </div>
    </div>
);

const FebriPresentLesson = () => {
    const navigate = useNavigate();
    const [readingAnswers, setReadingAnswers] = useState({ q1: '', q2: '', q3: '', q4: '', q5: '' });
    const [readingFeedback, setReadingFeedback] = useState({});
    const [jumbledAnswers, setJumbledAnswers] = useState({});
    const [jumbledFeedback, setJumbledFeedback] = useState({});
    const [gameState, setGameState] = useState({ currentIndex: 0, selectedAnswer: null, feedback: null, userAnswers: [] });
    const [gameFinished, setGameFinished] = useState(false);
    const [reviewState, setReviewState] = useState({ currentIndex: 0, selectedAnswer: null, feedback: null, userAnswers: [] });
    const [quizFinished, setQuizFinished] = useState(false);

    // --- Lesson Data (To Be) ---
    const story = "Hi! My name is Sarah. I am a teacher. My brother is a doctor. We are from Canada. Our parents are retired. They are happy in their new house. The weather is cold today, but the sky is clear. My students are excited about their English class. Learning is fun!";
    
    const readingQuestions = [
        { id: 'q1', question: "What is Sarah's job?", keywords: ['teacher'] },
        { id: 'q2', question: "What is her brother's job?", keywords: ['doctor'] },
        { id: 'q3', question: "Where are they from?", keywords: ['canada'] },
        { id: 'q4', question: "How is the weather today?", keywords: ['cold'] },
        { id: 'q5', question: "How do the students feel about their English class?", keywords: ['excited'] }
    ];

    const jumbledWordsData = [
        { id: 1, jumbled: "student / a / am / I", answer: "I am a student.", 
          img: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg" },
        { id: 2, jumbled: "doctors / they / are", answer: "They are doctors.", 
          img: "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg" },
        { id: 3, jumbled: "brother / is / my / he", answer: "He is my brother.", 
          img: "https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg" },
        { id: 4, jumbled: "happy / we / are", answer: "We are happy.", 
          img: "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg" },
        { id: 5, jumbled: "teacher / a / she / is", answer: "She is a teacher.", 
          img: "https://images.pexels.com/photos/3769714/pexels-photo-3769714.jpeg" },
        { id: 6, jumbled: "cold / weather / is / the", answer: "The weather is cold.", 
          img: "https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg" },
        { id: 7, jumbled: "right / you / are", answer: "You are right.", 
          img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" },
        { id: 8, jumbled: "today / is / sunny / it", answer: "It is sunny today.", 
          img: "https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg" },
        { id: 9, jumbled: "here / the / are / students", answer: "The students are here.", 
          img: "https://images.pexels.com/photos/8199172/pexels-photo-8199172.jpeg" },
        { id: 10, jumbled: "happy / I / am", answer: "I am happy.", 
          img: "https://images.pexels.com/photos/2869318/pexels-photo-2869318.jpeg" }
    ];

    const mergedQuizData = [
        // Original questions
        { q: "I ___ a student.", o: ["am", "is", "are"], a: "am" },
        { q: "She ___ a doctor.", o: ["am", "is", "are"], a: "is" },
        { q: "They ___ teachers.", o: ["am", "is", "are"], a: "are" },
        { q: "The book ___ on the table.", o: ["am", "is", "are"], a: "is" },
        { q: "We ___ friends.", o: ["am", "is", "are"], a: "are" },
        { q: "He ___ my brother.", o: ["am", "is", "are"], a: "is" },
        { q: "You ___ right.", o: ["am", "is", "are"], a: "are" },
        { q: "It ___ cold today.", o: ["am", "is", "are"], a: "is" },
        { q: "I ___ from Indonesia.", o: ["am", "is", "are"], a: "am" },
        { q: "The students ___ in class.", o: ["am", "is", "are"], a: "are" },
        { q: "The weather ___ nice.", o: ["am", "is", "are"], a: "is" },
        { q: "My parents ___ at home.", o: ["am", "is", "are"], a: "are" },
        { q: "___ you a teacher?", o: ["Am", "Is", "Are"], a: "Are" },
        { q: "The sky ___ blue.", o: ["am", "is", "are"], a: "is" },
        { q: "We ___ ready to learn.", o: ["am", "is", "are"], a: "are" },
        // New questions to reach 40
        { q: "The classroom ___ big.", o: ["am", "is", "are"], a: "is" },
        { q: "___ I late?", o: ["Am", "Is", "Are"], a: "Am" },
        { q: "My friends ___ happy.", o: ["am", "is", "are"], a: "are" },
        { q: "She ___ my sister.", o: ["am", "is", "are"], a: "is" },
        { q: "They ___ in the garden.", o: ["am", "is", "are"], a: "are" },
        { q: "The cat ___ sleeping.", o: ["am", "is", "are"], a: "is" },
        { q: "I ___ hungry.", o: ["am", "is", "are"], a: "am" },
        { q: "We ___ in the library.", o: ["am", "is", "are"], a: "are" },
        { q: "The movie ___ interesting.", o: ["am", "is", "are"], a: "is" },
        { q: "___ they students?", o: ["Am", "Is", "Are"], a: "Are" },
        { q: "He ___ tall.", o: ["am", "is", "are"], a: "is" },
        { q: "You ___ my best friend.", o: ["am", "is", "are"], a: "are" },
        { q: "The food ___ delicious.", o: ["am", "is", "are"], a: "is" },
        { q: "I ___ tired today.", o: ["am", "is", "are"], a: "am" },
        { q: "The children ___ playing.", o: ["am", "is", "are"], a: "are" },
        { q: "___ it raining?", o: ["Am", "Is", "Are"], a: "Is" },
        { q: "We ___ at the park.", o: ["am", "is", "are"], a: "are" },
        { q: "The house ___ beautiful.", o: ["am", "is", "are"], a: "is" },
        { q: "They ___ my neighbors.", o: ["am", "is", "are"], a: "are" },
        { q: "I ___ happy to help.", o: ["am", "is", "are"], a: "am" },
        { q: "The water ___ cold.", o: ["am", "is", "are"], a: "is" },
        { q: "___ we there yet?", o: ["Am", "Is", "Are"], a: "Are" },
        { q: "She ___ kind.", o: ["am", "is", "are"], a: "is" },
        { q: "The dogs ___ barking.", o: ["am", "is", "are"], a: "are" },
        { q: "It ___ time to go.", o: ["am", "is", "are"], a: "is" }
    ];

    // --- Logic (copy from Raja's lesson) ---
    const handleReadingAnswerChange = (id, value) => setReadingAnswers(prev => ({ ...prev, [id]: value }));
    const checkReadingAnswer = (id) => {
        const question = readingQuestions.find(q => q.id === id);
        const userAnswer = readingAnswers[id].toLowerCase();
        const isCorrect = question.keywords.every(keyword => userAnswer.includes(keyword));
        setReadingFeedback(prev => ({ ...prev, [id]: isCorrect ? 'correct' : 'incorrect' }));
    };
    const handleJumbledAnswerChange = (id, value) => setJumbledAnswers(prev => ({ ...prev, [id]: value }));
    const checkJumbledAnswer = (id) => {
        const q = jumbledWordsData.find(item => item.id === id);
        const userAnswer = jumbledAnswers[id]?.trim().replace(/\.$/, "").toLowerCase();
        const correctAnswer = q.answer.replace(/\.$/, "").toLowerCase();
        setJumbledFeedback(prev => ({ ...prev, [id]: userAnswer === correctAnswer ? 'correct' : 'incorrect' }));
    };
    const handleGameAnswer = (option) => {
        if (gameState.feedback) return;
        const isCorrect = option === mergedQuizData[gameState.currentIndex].a;
        setGameState(prev => ({
            ...prev,
            selectedAnswer: option,
            feedback: isCorrect ? 'correct' : 'incorrect',
            userAnswers: [...prev.userAnswers, { ...mergedQuizData[prev.currentIndex], userAnswer: option, isCorrect }]
        }));
    };

    const handleNextGameQuestion = () => {
        if (gameState.currentIndex < mergedQuizData.length - 1) {
            setGameState(prev => ({ ...prev, currentIndex: prev.currentIndex + 1, selectedAnswer: null, feedback: null }));
        } else {
            setGameFinished(true);
        }
    };
    const handleReviewAnswer = (option) => {
        if (reviewState.feedback) return;
        const isCorrect = option === reviewQuizData[reviewState.currentIndex].a;
        setReviewState(prev => ({
            ...prev,
            selectedAnswer: option,
            feedback: isCorrect ? 'correct' : 'incorrect',
            userAnswers: [...prev.userAnswers, { ...reviewQuizData[reviewState.currentIndex], userAnswer: option, isCorrect }]
        }));
    };
    const handleNextReviewQuestion = () => {
        if (reviewState.currentIndex < reviewQuizData.length - 1) {
            setReviewState(prev => ({ ...prev, currentIndex: prev.currentIndex + 1, selectedAnswer: null, feedback: null }));
        } else {
            setQuizFinished(true);
        }
    };

    // Copy the return JSX from Raja's lesson, adjusting title and content
    return (
        <div className="font-sans bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-12 p-4 md:p-8">
                <h1 className="text-4xl font-extrabold text-slate-800 text-center">To Be <span className="text-teal-500">for Febri</span></h1>

                <WorksheetCard>
                    <SectionHeader icon={<BookOpen size={32} className="text-white"/>} title="1. Definition & Grammar" subtitle="The verb 'to be' (am/is/are)" color="green" />
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">To Be</h3>
                            <p className="text-lg text-slate-700 leading-relaxed mb-4">
                                The verb 'to be' has three forms in the present tense:
                            </p>
                            <ul className="list-disc list-inside text-lg text-slate-700 space-y-2">
                                <li>I <strong>am</strong></li>
                                <li>He/She/It <strong>is</strong></li>
                                <li>You/We/They <strong>are</strong></li>
                            </ul>
                            <img src="https://images.pexels.com/photos/3768914/pexels-photo-3768914.jpeg" alt="Learning grammar" className="rounded-lg shadow-md mt-4"/>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Examples</h3>
                            <div className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-400 space-y-2">
                                <p className="text-slate-600">I <strong>am</strong> happy.</p>
                                <p className="text-slate-600">She <strong>is</strong> a doctor.</p>
                                <p className="text-slate-600">They <strong>are</strong> students.</p>
                            </div>
                        </div>
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<BookOpen size={32} className="text-white"/>} title="2. Reading: Sarah's Story" subtitle="Read the story and answer the questions" color="orange" />
                    <div className="md:flex md:gap-8 items-center">
                        <div className="flex-1">
                            <p className="text-lg text-slate-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: story.replace(/\b(am|is|are)\b/gi, '<strong class="text-orange-600 font-semibold">$&</strong>') }} />
                        </div>
                        <div className="flex-shrink-0 w-full md:w-56">
                            <img src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg" alt="A person reading" className="w-full h-auto rounded-lg object-cover shadow-md" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Answer the questions:</h3>
                    <div className="space-y-4">
                        {readingQuestions.map(q => (
                            <div key={q.id}>
                                <label htmlFor={q.id} className="font-semibold text-slate-700">{q.question}</label>
                                <div className="flex items-center space-x-2 mt-1">
                                    <input 
                                        type="text" 
                                        id={q.id} 
                                        value={readingAnswers[q.id]} 
                                        onChange={(e) => handleReadingAnswerChange(q.id, e.target.value)}
                                        className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
                                        placeholder="Type your answer here..."
                                        disabled={!!readingFeedback[q.id]}
                                    />
                                    <button 
                                        onClick={() => checkReadingAnswer(q.id)} 
                                        disabled={!!readingFeedback[q.id]}
                                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-slate-300"
                                    >
                                        Check
                                    </button>
                                </div>
                                {readingFeedback[q.id] && (
                                    <p className={`mt-1 text-sm font-bold ${readingFeedback[q.id] === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                                        {readingFeedback[q.id] === 'correct' ? '✓ Correct!' : '✗ Try again'}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<User size={32} className="text-white"/>} title="3. Jumbled Words" subtitle="Arrange the words to make correct sentences" color="pink"/>
                    <div className="grid md:grid-cols-2 gap-6">
                        {jumbledWordsData.map(item => (
                            <div key={item.id} className="bg-slate-50 p-4 rounded-lg border flex flex-col">
                                <img src={item.img} alt={item.answer} className="w-full h-32 object-cover rounded-lg mb-4"/>
                                <div className="flex-grow">
                                    <p className="h-12 flex items-center justify-center text-slate-600 mb-2 font-semibold text-center">{item.jumbled}</p>
                                    <input 
                                        type="text" 
                                        value={jumbledAnswers[item.id] || ''} 
                                        onChange={(e) => handleJumbledAnswerChange(item.id, e.target.value)}
                                        className={`w-full p-2 border text-center rounded-lg focus:ring-2 focus:outline-none ${
                                            !jumbledFeedback[item.id] ? 'border-pink-300 focus:ring-pink-400' : ''
                                        } ${jumbledFeedback[item.id] === 'correct' ? 'border-green-500 bg-green-50 text-green-800' : ''
                                        } ${jumbledFeedback[item.id] === 'incorrect' ? 'border-red-500 bg-red-50 text-red-800' : ''}`}
                                        placeholder="Your sentence..."
                                    />
                                </div>
                                {jumbledFeedback[item.id] && <p className="text-sm mt-1 text-center">Correct: {item.answer}</p>}
                                <button 
                                    onClick={() => checkJumbledAnswer(item.id)}
                                    className="w-full mt-2 text-sm py-1 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:bg-slate-300"
                                    disabled={!jumbledAnswers[item.id] || jumbledFeedback[item.id]}
                                >
                                    Check Answer
                                </button>
                            </div>
                        ))}
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<Mic size={32} className="text-white"/>} title="4. Speaking Practice" subtitle="Practice asking and answering questions" color="blue" />
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="text-center">
                            <img src="https://images.pexels.com/photos/3769724/pexels-photo-3769724.jpeg" alt="People talking" className="w-full h-auto rounded-lg object-cover shadow-md"/>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-2 text-slate-800">Practice these questions:</h4>
                            <ul className="list-disc list-inside space-y-2 text-slate-700 text-lg">
                                <li>Are you a student?</li>
                                <li>Is she your teacher?</li>
                                <li>Am I correct?</li>
                                <li>Are they in class?</li>
                                <li>Is it cold today?</li>
                            </ul>
                        </div>
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<CheckSquare size={32} className="text-white"/>} title="5. Quiz" subtitle="Test your knowledge" color="violet"/>
                    {quizFinished ? (
                        <div className="text-center py-4">
                            <h3 className="text-3xl font-bold text-green-600">Quiz Complete!</h3>
                            <p className="text-xl mt-2">Your Score: {gameState.userAnswers.filter(a=>a.isCorrect).length} / {mergedQuizData.length}</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="font-bold text-slate-500">Question {gameState.currentIndex + 1} of {mergedQuizData.length}</p>
                            <p className="text-3xl font-bold my-8 min-h-[4rem] flex items-center justify-center text-slate-800">
                                {mergedQuizData[gameState.currentIndex].q}
                            </p>
                            <div className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
                                {mergedQuizData[gameState.currentIndex].o.map((option, index) => {
                                    let buttonClass = 'bg-violet-500 text-white hover:bg-violet-600';
                                    if (gameState.feedback) {
                                        if (option === mergedQuizData[gameState.currentIndex].a) {
                                            buttonClass = 'bg-green-500 text-white';
                                        } else if (option === gameState.selectedAnswer) {
                                            buttonClass = 'bg-red-500 text-white';
                                        } else {
                                            buttonClass = 'bg-slate-200 text-slate-500';
                                        }
                                    }
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleGameAnswer(option)}
                                            className={`p-4 rounded-lg font-bold text-xl transition-all ${buttonClass}`}
                                            disabled={!!gameState.feedback}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>
                            {gameState.feedback && (
                                <div className="mt-6">
                                    <BigButton onClick={handleNextGameQuestion} className="bg-indigo-600 border-indigo-700">
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

export default FebriPresentLesson;