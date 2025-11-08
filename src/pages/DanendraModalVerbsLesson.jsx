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

const DanendraModalVerbsLesson = () => {
    const navigate = useNavigate();
    const [readingAnswers, setReadingAnswers] = useState({ q1: '', q2: '', q3: '', q4: '' });
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

    const story = "My name is Danendra. I am planning a trip. I think I will go to the mountains. I can hike there, and I might see some wildlife. I should pack warm clothes because it could be cold. My friend said I must visit the old castle. He said we can go together next year, but I can't wait. I may also try the local food. I think it will be a great adventure.";

    const readingQuestions = [
        { id: 'q1', question: "What must Danendra visit according to his friend?", keywords: ['castle', 'old castle'] },
        { id: 'q2', question: "Why should Danendra pack warm clothes?", keywords: ['cold', 'could be cold'] },
        { id: 'q3', question: "What can Danendra do in the mountains?", keywords: ['hike'] },
        { id: 'q4', question: "What might Danendra see on his trip?", keywords: ['wildlife'] }
    ];

    const jumbledWordsData = [
        { id: 1, jumbled: "You / should / rest", answer: "You should rest.", img: "https://images.pexels.com/photos/4098778/pexels-photo-4098778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 2, jumbled: "I / can / swim", answer: "I can swim.", img: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 3, jumbled: "He / will / come / later", answer: "He will come later.", img: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 4, jumbled: "She / might / be / late", answer: "She might be late.", img: "https://images.pexels.com/photos/2897883/pexels-photo-2897883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 5, jumbled: "We / must / finish / this", answer: "We must finish this.", img: "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 6, jumbled: "May / I / help / you?", answer: "May I help you?", img: "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    ];

    const quizData = [
        { q: "You ___ finish your homework before you play.", o: ["can", "should", "might"], a: "should" },
        { q: "___ I borrow your pen, please?", o: ["Must", "May", "Will"], a: "May" },
        { q: "He ___ run very fast when he was younger.", o: ["could", "can", "must"], a: "could" },
        { q: "It ___ rain tomorrow, so take an umbrella.", o: ["will", "might", "should"], a: "might" },
        { q: "I ___ go to the party, but I'm not sure yet.", o: ["must", "may", "will"], a: "may" },
        { q: "She ___ speak three languages fluently.", o: ["can", "could", "should"], a: "can" },
        { q: "We ___ be quiet in the library.", o: ["must", "will", "may"], a: "must" },
        { q: "They ___ arrive on the next train.", o: ["can", "will", "could"], a: "will" },
        { q: "If I had more time, I ___ travel the world.", o: ["will", "would", "must"], a: "would" },
        { q: "You ___ not touch that, it's dangerous.", o: ["should", "might", "can"], a: "should" },
    ];

    // Add 20 more questions to make it 30
    quizData.push(
        { q: "___ you like a cup of tea?", o: ["Will", "Would", "Should"], a: "Would" },
        { q: "I think I ___ go to bed early tonight.", o: ["will", "must", "may"], a: "will" },
        { q: "You ___ see a doctor if you feel sick.", o: ["must", "can", "might"], a: "must" },
        { q: "He ___ be at home; his car is outside.", o: ["must", "can't", "might"], a: "must" },
        { q: "She said she ___ help us tomorrow.", o: ["would", "will", "can"], a: "would" },
        { q: "We ___ try to be on time for the meeting.", o: ["should", "can", "may"], a: "should" },
        { q: "I ___ not find my keys anywhere!", o: ["can", "must", "will"], a: "can" },
        { q: "This ___ be the right address, but I'm not sure.", o: ["must", "might", "will"], a: "might" },
        { q: "You ___ not speak loudly in the cinema.", o: ["must", "may", "can"], a: "must" },
        { q: "___ you pass the salt, please?", o: ["Could", "Should", "Must"], a: "Could" },
        { q: "I promise I ___ call you later.", o: ["will", "would", "should"], a: "will" },
        { q: "He ___ swim when he was only four years old.", o: ["can", "could", "must"], a: "could" },
        { q: "Students ___ wear a uniform to school.", o: ["must", "can", "might"], a: "must" },
        { q: "It's very cloudy. It ___ rain soon.", o: ["will", "might", "should"], a: "might" },
        { q: "___ I use your computer for a moment?", o: ["May", "Must", "Will"], a: "May" },
        { q: "If you study hard, you ___ pass the exam.", o: ["will", "would", "must"], a: "will" },
        { q: "You look tired. You ___ get some rest.", o: ["should", "can", "may"], a: "should" },
        { q: "I ___ hear the music from my room.", o: ["can", "could", "must"], a: "can" },
        { q: "She ___ be very happy if you came to her party.", o: ["will", "would", "must"], a: "would" },
        { q: "That ___ be John; he is on holiday.", o: ["must", "can't", "might"], a: "can't" }
    );

    const gravityFallsQuizData = [
        { q: "When Wax Stan was 'murdered', Dipper said, 'We ___ solve this crime!'", o: ["can", "must", "may"], a: "must", feedback: "Correct! 'Must' is used for strong obligation. Dipper felt it was necessary to solve the crime." },
        { q: "The lazy police officers said Dipper and Mabel ___ just accept it's a mystery.", o: ["should", "will", "must"], a: "should", feedback: "Correct! 'Should' is used for giving advice. The police were advising them to stop." },
        { q: "Dipper thought Toby Determined ___ be the killer because he wanted a news story.", o: ["might", "must", "can't"], a: "might", feedback: "Correct! 'Might' shows possibility. Dipper wasn't sure, it was just a guess." },
        { q: "The wax figures were cursed, so they ___ only come alive at night.", o: ["could", "should", "must"], a: "could", feedback: "Correct! 'Could' is used for ability in the past. It was their special ability from the curse." },
        { q: "Mabel asked, '___ we really fight a whole group of wax murderers?'", o: ["Can", "Should", "Must"], a: "Can", feedback: "Correct! 'Can' is used to ask about ability. Mabel was questioning if they were able to fight them." },
        { q: "Dipper realized that wax figures ___ handle the heat from the fireplace.", o: ["can't", "won't", "shouldn't"], a: "can't", feedback: "Correct! 'Can't' is used for inability. The wax figures were unable to survive the heat." },
        { q: "To defeat the wax figures, Dipper knew they ___ use heat.", o: ["must", "may", "can"], a: "must", feedback: "Correct! 'Must' shows a strong necessity. Using heat was the only way to win." },
        { q: "If you were Dipper, what ___ you do first?", o: ["will", "would", "can"], a: "would", feedback: "Correct! 'Would' is used for hypothetical (unreal) situations. The question is imagining being Dipper." },
        { q: "The wax figures thought they ___ get away with their plan.", o: ["could", "should", "must"], a: "could", feedback: "Correct! 'Could' shows they believed they had the ability or possibility to succeed." },
        { q: "At the end, Stan ___ have kept the melted head, but he did it anyway.", o: ["mustn't", "shouldn't", "couldn't"], a: "shouldn't", feedback: "Correct! 'Shouldn't' is used for advice about a bad idea. Keeping the head was not a good thing to do." },
    ];
    gravityFallsQuizData.push(
        { q: "Mabel asked Stan, '___ I make a life-sized wax figure of myself?'", o: ["Will", "May", "Must"], a: "May", feedback: "Correct! 'May' is a polite way to ask for permission." },
        { q: "Dipper thought the wax figures ___ be the culprits because of the hole in Wax Stan's shoe.", o: ["must", "can't", "may"], a: "must", feedback: "Correct! 'Must' is used for a strong conclusion based on evidence." },
        { q: "Wax Sherlock Holmes said, 'The real mystery is why anyone ___ create a wax figure of... that.'", o: ["would", "will", "can"], a: "would", feedback: "Correct! 'Would' is used here to express disbelief or a hypothetical question about a strange choice." },
        { q: "Dipper told Mabel, 'We ___ get to the roof to melt them!'", o: ["should", "can", "might"], a: "should", feedback: "Correct! 'Should' is used to say what the best plan or action is." },
        { q: "The wax figures ___ have won if Dipper hadn't noticed the clue.", o: ["might", "must", "will"], a: "might", feedback: "Correct! 'Might' is used to talk about a possibility in the past that didn't happen." }
    );


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
                <h1 className="text-4xl font-extrabold text-slate-800 text-center">Modal Verbs <span className="text-teal-500">for Danendra</span></h1>

                <WorksheetCard>
                    <SectionHeader icon={<BookOpen size={32} className="text-white"/>} title="1. What are Modal Verbs?" subtitle="Understanding ability, possibility, and obligation" color="green" />
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Modal Verbs</h3>
                            <p className="text-lg text-slate-700 leading-relaxed mb-4">
                                Modal verbs are like helper verbs! They help the main verb show different things, like what you <strong>can</strong> do, what you <strong>should</strong> do, or what <strong>might</strong> happen. They are like magic words that add special meaning.
                            </p>
                            <ul className="list-disc list-inside text-lg text-slate-700 space-y-2">
                                <li>Examples: can, could, may, might, will, would, must, should.</li>
                                <li>They don't change for he/she/it. (He can, not He cans)</li>
                                <li>They are followed by a base verb. (She should go, not She should goes)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Structure</h3>
                            <div className="p-4 bg-rose-50 rounded-lg border-l-4 border-rose-400 space-y-2">
                                <p className="text-slate-600">Subject + modal verb + base verb</p>
                                <p className="text-slate-600">I <strong>can</strong> swim.</p>
                                <p className="text-slate-600">He <strong>should</strong> study.</p>
                                <p className="text-slate-600">They <strong>will</strong> come.</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-slate-200">
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">Examples of Modal Verbs</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-lg">
                            <p><strong className="text-sky-600">Can:</strong> (ability) I <strong>can</strong> speak English.</p>
                            <p><strong className="text-sky-600">Could:</strong> (past ability) I <strong>could</strong> run fast when I was young.</p>
                            <p><strong className="text-sky-600">May:</strong> (permission) <strong>May</strong> I go to the toilet?</p>
                            <p><strong className="text-sky-600">Might:</strong> (possibility) It <strong>might</strong> rain today.</p>
                            <p><strong className="text-sky-600">Will:</strong> (future) I <strong>will</strong> travel to Japan next year.</p>
                            <p><strong className="text-sky-600">Would:</strong> (polite offer) <strong>Would</strong> you like some coffee?</p>
                            <p><strong className="text-sky-600">Should:</strong> (advice) You <strong>should</strong> see a doctor.</p>
                            <p><strong className="text-sky-600">Must:</strong> (obligation) You <strong>must</strong> wear a helmet.</p>
                        </div>
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<User size={32} className="text-white"/>} title="2. Reading" subtitle="Read the story and answer the questions" color="orange" />
                    <div className="md:flex md:gap-8 items-start">
                        <div className="flex-1">
                            <p className="text-lg text-slate-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: story.replace(/\b(can|could|may|might|will|would|must|should)\b/gi, '<strong class="text-orange-600 font-semibold">$&</strong>') }} />
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
                    <SectionHeader icon={<Film size={32} className="text-white"/>} title="4. Gravity Falls Quiz!" subtitle="Modal Verbs in 'Headhunters' (S1, E3)" color="blue"/>
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
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
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
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
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

export default DanendraModalVerbsLesson;