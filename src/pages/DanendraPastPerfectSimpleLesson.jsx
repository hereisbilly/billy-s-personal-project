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

const DanendraPastPerfectSimpleLesson = () => {
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

    const story = "Yesterday, I presented my final design project. It was a success! Before the presentation, I had worked on it for two weeks. I had created three different versions. My friend Leo also helped. He had found some great inspiration images before we started. By the time I presented, I had practiced my speech many times. I was nervous, but I felt prepared because I had done so much work.";

    const readingQuestions = [
        { id: 'q1', question: "How long had Danendra worked on the project before the presentation?", keywords: ['two weeks'] },
        { id: 'q2', question: "What had Leo done before they started?", keywords: ['found inspiration images', 'found images'] },
        { id: 'q3', question: "How many different versions had he created?", keywords: ['three', '3'] },
        { id: 'q4', question: "What had he practiced many times?", keywords: ['speech', 'his speech'] },
        { id: 'q5', question: "Why did he feel prepared?", keywords: ['done so much work', 'done a lot of work'] }
    ];

    const jumbledWordsData = [
        { id: 1, jumbled: "I / had / finished / my work", answer: "I had finished my work.", img: "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 2, jumbled: "She / had / already / left", answer: "She had already left.", img: "https://images.pexels.com/photos/2897883/pexels-photo-2897883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 3, jumbled: "They / had / never / seen / snow", answer: "They had never seen snow.", img: "https://images.pexels.com/photos/34620/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 4, jumbled: "He / had / eaten / before he came", answer: "He had eaten before he came.", img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 5, jumbled: "We / had / studied / for the test", answer: "We had studied for the test.", img: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 6, jumbled: "The train / had / gone / when I arrived", answer: "The train had gone when I arrived.", img: "https://images.pexels.com/photos/2885320/pexels-photo-2885320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    ];

    const quizData = [
        { q: "When I arrived, the party ___ (start).", o: ["started", "had started"], a: "had started" },
        { q: "She ___ (live) in Jakarta before she moved to Bali.", o: ["lived", "had lived"], a: "had lived" },
        { q: "He told me he ___ (finish) his homework.", o: ["finished", "had finished"], a: "had finished" },
        { q: "By the time we got to the cinema, the movie ___ (begin).", o: ["began", "had begun"], a: "had begun" },
        { q: "I ___ (never/see) such a beautiful sunset before that day.", o: ["never saw", "had never seen"], a: "had never seen" },
        { q: "They ___ (eat) dinner when their friends called.", o: ["ate", "had eaten"], a: "had eaten" },
        { q: "After she ___ (do) her chores, she went outside.", o: ["did", "had done"], a: "had done" },
        { q: "The team was happy because they ___ (win) the game.", o: ["won", "had won"], a: "had won" },
        { q: "I didn't go to the party because I ___ (not/be) invited.", o: ["wasn't", "hadn't been"], a: "hadn't been" },
        { q: "He knew the city well because he ___ (visit) it many times.", o: ["visited", "had visited"], a: "had visited" },
        { q: "The film ___ (already start) when we arrived at the cinema.", o: ["already started", "had already started"], a: "had already started" },
        { q: "I couldn't open the door because I ___ (forget) my keys.", o: ["forgot", "had forgotten"], a: "had forgotten" },
        { q: "She told me she ___ (visit) Bali before.", o: ["visited", "had visited"], a: "had visited" },
        { q: "He was tired because he ___ (not sleep) well.", o: ["didn't sleep", "hadn't slept"], a: "hadn't slept" },
        { q: "By the time I was 10, I ___ (learn) to swim.", o: ["learned", "had learned"], a: "had learned" },
    ];

    const gravityFallsQuizData = [
        { q: "Before Dipper found Journal 3, someone else ___ it.", o: ["had written", "wrote"], a: "had written", feedback: "Correct! The writing of the journal happened before Dipper found it." },
        { q: "By the time Mabel met Gideon, he ___ a reputation as a psychic.", o: ["already built", "had already built"], a: "had already built", feedback: "Correct! Building his reputation happened before Mabel met him." },
        { q: "The police didn't believe Dipper because they ___ so many fake monster reports before.", o: ["heard", "had heard"], a: "had heard", feedback: "Correct! Hearing fake reports happened before Dipper's real report." },
        { q: "Stan was sad because the Wax Stan statue, which he ___, was 'murdered'.", o: ["had loved", "loved"], a: "had loved", feedback: "Correct! His love for the statue existed before it was 'murdered'." },
        { q: "After the gnomes ___ to capture Mabel, she defeated them.", o: ["had tried", "tried"], a: "had tried", feedback: "Correct! The attempt to capture her happened before she defeated them." },
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
                <h1 className="text-4xl font-extrabold text-slate-800 text-center">Past Perfect Simple <span className="text-teal-500">for Danendra</span></h1>

                <WorksheetCard>
                    <SectionHeader icon={<BookOpen size={32} className="text-white"/>} title="1. What is Past Perfect Simple?" subtitle="An action before another past action" color="green" />
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Past Perfect Simple</h3>
                            <p className="text-lg text-slate-700 leading-relaxed mb-4">
                                We use this tense to show that an action happened <strong>before</strong> another action in the past. It helps to make the order of events clear.
                            </p>
                            <ul className="list-disc list-inside text-lg text-slate-700 space-y-2">
                                <li>Event 1 (Past Perfect): I <strong>had finished</strong> my work.</li>
                                <li>Event 2 (Past Simple): My friend <strong>called</strong>.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Structure</h3>
                            <div className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-400 space-y-2">
                                <p className="text-slate-600">Subject + had + past participle</p>
                                <p className="text-slate-600">I <strong>had finished</strong>.</p>
                                <p className="text-slate-600">She <strong>had left</strong>.</p>
                                <p className="text-slate-600">They <strong>had eaten</strong>.</p>
                            </div>
                        </div>
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<User size={32} className="text-white"/>} title="2. Reading" subtitle="Read the story and answer the questions" color="orange" />
                    <div className="md:flex md:gap-8 items-start">
                        <div className="flex-1">
                            <p className="text-lg text-slate-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: story.replace(/\b(had worked|had created|had found|had practiced|had done)\b/gi, '<strong class="text-orange-600 font-semibold">$&</strong>') }} />
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
                                <img src={item.img} crossOrigin="anonymous" alt="Jumbled words context" className="w-full h-48 object-cover rounded mb-4"/>
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
                    <SectionHeader icon={<Film size={32} className="text-white"/>} title="4. Gravity Falls Quiz!" subtitle="Past Perfect in Gravity Falls" color="blue"/>
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

export default DanendraPastPerfectSimpleLesson;