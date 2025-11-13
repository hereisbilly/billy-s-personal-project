import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorksheetCard, BigButton } from '../components/common';
import { Hotel, Pill, Search, HelpCircle, CheckSquare, Volume2, User, Users } from 'lucide-react';

const SectionHeader = ({ icon, title, subtitle, color = 'blue' }) => {
    const colors = {
        blue: 'from-blue-500 to-sky-500',
        violet: 'from-violet-500 to-purple-500',
        green: 'from-emerald-500 to-teal-500',
        orange: 'from-amber-500 to-orange-500',
        pink: 'from-pink-500 to-rose-500',
        red: 'from-red-500 to-rose-500',
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

const speak = (text) => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Stop any previous speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Sorry, your browser does not support text-to-speech.");
    }
};

const Dialogue = ({ lines }) => (
    <div className="space-y-2 p-4 bg-slate-100 rounded-lg">
        <button onClick={() => speak(lines.map(line => `${line.speaker}. ${line.text}`).join('\n'))} className="w-full flex items-center justify-center gap-2 p-2 mb-2 rounded-md bg-slate-200 hover:bg-blue-500 text-slate-600 hover:text-white transition-colors">
            <Volume2 size={16} /> Read Aloud
        </button>
        {lines.map((line, index) => (
            <p key={index}><strong className="font-semibold text-slate-800">{line.speaker}:</strong> <span className="text-slate-700">{line.text}</span></p>
        ))}
    </div>
);

const KeyPhrases = ({ phrases, color }) => (
    <div className={`mt-4 p-4 bg-${color}-50 border-l-4 border-${color}-400`}>
        <h4 className="font-bold text-slate-800 mb-2">Key Phrases:</h4>
        <button onClick={() => speak(phrases.join('. '))} className={`w-full flex items-center justify-center gap-2 p-2 mb-3 rounded-md bg-${color}-100 hover:bg-${color}-400 text-${color}-700 hover:text-white transition-colors`}>
            <Volume2 size={16} /> Read All Phrases
        </button>
        <ul className="list-disc list-inside text-slate-700 space-y-1">{phrases.map((phrase, i) => <li key={i}>{phrase}</li>)}</ul>
    </div>
);

const DodiePatronelaProblemsLesson = () => {
    const navigate = useNavigate();
    const [quizState, setQuizState] = useState({
        currentIndex: 0,
        selectedAnswer: null,
        feedback: null,
        userAnswers: []
    });
    const [quizFinished, setQuizFinished] = useState(false);

    // --- Lesson Data ---
    const hotelDialogue = [
        { speaker: "You", text: "Excuse me, I have a problem." },
        { speaker: "Receptionist", text: "Yes, how can I help?" },
        { speaker: "You", text: "The air conditioning is not working. My room is very hot." },
        { speaker: "Receptionist", text: "I'm sorry. I will send someone to look at it." },
    ];

    const pharmacyDialogue = [
        { speaker: "Pharmacist", text: "Good morning. How can I help you?" },
        { speaker: "You", text: "I have a headache." },
        { speaker: "Pharmacist", text: "For how long?" },
        { speaker: "You", text: "Since yesterday." },
        { speaker: "Pharmacist", text: "I see. You can take these pills. What do you recommend?" },
        { speaker: "You", text: "Thank you." }
    ];

    const lostItemDialogue = [
        { speaker: "You", text: "Excuse me, can you help me, please?" },
        { speaker: "Staff", text: "Of course. What is the problem?" },
        { speaker: "You", text: "I lost my jacket. It is a blue jacket." },
        { speaker: "Staff", text: "Okay, let me check for you." },
    ];

    const quizData = [
        { q: "If your room is too hot, you can say: 'The ___ is not working.'", o: ["heating", "air conditioning", "hot water"], a: "air conditioning" },
        { q: "If you need more toilet paper, you can say: 'I need more ___.'", o: ["towels", "soap", "toilet paper"], a: "toilet paper" },
        { q: "If your room key doesn't open the door, you say: 'The key ___.'", o: ["is not good", "doesn't work", "is broken"], a: "doesn't work" },
        { q: "At the pharmacy, if you have pain in your head, you say: 'I have a ___.'", o: ["stomach ache", "cough", "headache"], a: "headache" },
        { q: "To ask the pharmacist for advice, you say: 'What do you ___?'", o: ["recommend", "have", "give"], a: "recommend" },
        { q: "If you have a problem with your throat, you say: 'I have a ___.'", o: ["sore throat", "headache", "cough"], a: "sore throat" },
        { q: "If you lose your bag, you say: 'I lost my ___.'", o: ["thing", "bag", "stuff"], a: "bag" },
        { q: "To describe a lost item, you can say: 'It is a ___ jacket.'", o: ["big", "nice", "blue"], a: "blue" },
        { q: "A good way to ask for help is:", o: ["'Help me now!'", "'Can you help me, please?'", "'What is this?'"], a: "'Can you help me, please?'" },
        { q: "If you don't understand someone, you can say:", o: ["'What?'", "'I don't understand.'", "'Speak English.'"], a: "'I don't understand.'" }
    ];

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

    return (
        <div className="font-sans bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-12 p-4 md:p-8">
                <h1 className="text-4xl font-extrabold text-slate-800 text-center">Travel English: Handling Problems <span className="text-red-500">for Dodie & Patronela</span></h1>

                <WorksheetCard>
                    <SectionHeader icon={<Hotel size={32} className="text-white"/>} title="1. Problems at the Hotel" subtitle="What to say when something is wrong" color="blue" />
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <Dialogue lines={hotelDialogue} />
                        <img src="https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Hotel reception desk" className="rounded-lg shadow-md object-cover h-48 w-full"/>
                    </div>
                    <KeyPhrases
                        color="blue"
                        phrases={[
                            "The air conditioning / heating is not working.",
                            "There is no hot water.",
                            "The key doesn't work.",
                            "I need more towels / toilet paper / soap."
                        ]}
                    />
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<Pill size={32} className="text-white"/>} title="2. At the Pharmacy" subtitle="How to talk about health issues" color="green" />
                     <div className="grid md:grid-cols-2 gap-6 items-center">
                        <Dialogue lines={pharmacyDialogue} />
                        <img src="https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Inside a pharmacy" className="rounded-lg shadow-md object-cover h-48 w-full"/>
                    </div>
                    <KeyPhrases
                        color="green"
                        phrases={[
                            "I have a headache / stomach ache / cough / sore throat.",
                            "What do you recommend?",
                            "For how long? ... Since yesterday. / For two days."
                        ]}
                    />
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<Search size={32} className="text-white"/>} title="3. Lost Items & Asking for Help" subtitle="How to report a lost item" color="orange" />
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <Dialogue lines={lostItemDialogue} />
                        <img src="https://images.pexels.com/photos/571192/pexels-photo-571192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Lost and found sign" className="rounded-lg shadow-md object-cover h-48 w-full"/>
                    </div>
                    <KeyPhrases
                        color="orange"
                        phrases={[
                            "I lost my [item]. It is a [color] [item]. (e.g., I lost my bag. It is a black bag.)",
                            "Can you help me, please?",
                            "I don't understand.",
                            "Can you please speak slowly?"
                        ]}
                    />
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<CheckSquare size={32} className="text-white"/>} title="4. Review Quiz" subtitle="Test your knowledge" color="violet"/>
                    {quizFinished ? (
                        <div className="text-center py-4">
                            <h3 className="text-3xl font-bold text-green-600">Quiz Complete!</h3>
                            <p className="text-xl mt-2">Your Score: {quizState.userAnswers.filter(a=>a.isCorrect).length} / {quizData.length}</p>
                            <div className="mt-6">
                                <BigButton onClick={resetQuiz} className="bg-violet-500 border-violet-600 w-full md:w-auto">
                                    Try Again
                                </BigButton>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="font-bold text-slate-500">Question {quizState.currentIndex + 1} of {quizData.length}</p>
                            <p className="text-2xl font-bold my-8 min-h-[4rem] flex items-center justify-center text-slate-800">
                                {quizData[quizState.currentIndex].q}
                            </p>
                            <div className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
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

export default DodiePatronelaProblemsLesson;