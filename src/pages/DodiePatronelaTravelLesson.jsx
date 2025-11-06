import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorksheetCard, BigButton } from '../components/common';
import { Plane, Hotel, UtensilsCrossed, Map, CheckSquare, Volume2, User, Users, Video } from 'lucide-react';

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

const YouTubePlayer = ({ videoId, title }) => (
    <div className="space-y-2">
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-md">
            <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
        <h4 className="font-semibold text-slate-700 text-center">{title}</h4>
    </div>
);


const DodiePatronelaTravelLesson = () => {
    const navigate = useNavigate();
    const [quizState, setQuizState] = useState({
        currentIndex: 0,
        selectedAnswer: null,
        feedback: null,
        userAnswers: []
    });
    const [quizFinished, setQuizFinished] = useState(false);

    // --- Lesson Data ---
    const airportDialogue = [
        { speaker: "Agent", text: "Hello! Where are you flying to today?" },
        { speaker: "You", text: "I'm flying to London." },
        { speaker: "Agent", text: "May I see your passport, please?" },
        { speaker: "You", text: "Here you go." },
        { speaker: "Agent", text: "Are you checking any bags?" },
        { speaker: "You", text: "Just this one." },
        { speaker: "Agent", text: "Okay, here is your boarding pass. Your flight leaves from gate 15A." }
    ];

    const hotelDialogue = [
        { speaker: "Receptionist", text: "Good evening! Do you have a reservation?" },
        { speaker: "You", text: "Yes, the reservation is under the name Patronela." },
        { speaker: "Receptionist", text: "Ah, yes. A double room for two nights. Could I have your ID and a credit card, please?" },
        { speaker: "You", text: "Sure, here they are." },
        { speaker: "Receptionist", text: "Thank you. Here is your key card. Your room is 305 on the third floor. Enjoy your stay!" }
    ];

    const restaurantDialogue = [
        { speaker: "Waiter", text: "Welcome! Are you ready to order?" },
        { speaker: "You", text: "Yes, I'd like the chicken pasta, please." },
        { speaker: "Waiter", text: "Excellent choice. And for you?" },
        { speaker: "Friend", text: "I'll have the steak." },
        { speaker: "Waiter", text: "How would you like your steak cooked?" },
        { speaker: "Friend", text: "Medium rare, please." },
        { speaker: "Waiter", text: "Great. Anything to drink?" },
        { speaker: "You", text: "Just water for me." }
    ];

    const directionsDialogue = [
        { speaker: "You", text: "Excuse me, how do I get to the nearest train station?" },
        { speaker: "Local", text: "Go straight down this street for two blocks, then turn left. You'll see it on your right." },
        { speaker: "You", text: "Is it far to walk?" },
        { speaker: "Local", text: "No, it's only about a 10-minute walk from here." },
        { speaker: "You", text: "Thank you so much!" }
    ];

    const dodieQuizData = [
        { q: "At the airport, you need to show your ___.", o: ["driver's license", "passport", "credit card"], a: "passport" },
        { q: "The agent gives you a ___ for your flight.", o: ["ticket", "boarding pass", "receipt"], a: "boarding pass" },
        { q: "'Are you checking any ___?' the agent asks.", o: ["bags", "friends", "food"], a: "bags" },
        { q: "Your flight leaves from ___ 15A.", o: ["platform", "gate", "door"], a: "gate" },
        { q: "To find your flight, you look at the ___ board.", o: ["arrivals", "information", "departures"], a: "departures" },
        { q: "At the hotel, you say: 'I have a ___ under the name Dodie.'", o: ["booking", "reservation", "request"], a: "reservation" },
        { q: "The receptionist will ask for your ID and a ___.", o: ["phone number", "credit card", "key"], a: "credit card" },
        { q: "The hotel room number is 305, on the ___ floor.", o: ["three", "third", "thirteen"], a: "third" },
        { q: "To open your hotel room, you use a ___.", o: ["key card", "metal key", "password"], a: "key card" },
        { q: "When you leave the hotel, you need to ___.", o: ["check in", "check out", "go out"], a: "check out" }
    ];

    const patronelaQuizData = [
        { q: "In a restaurant, you ask the waiter for the ___.", o: ["book", "list", "menu"], a: "menu" },
        { q: "To order food, you can say: '___ the chicken pasta, please.'", o: ["I want", "Give me", "I'd like"], a: "I'd like" },
        { q: "For a steak, the waiter asks: 'How would you like it ___?'", o: ["made", "cooked", "done"], a: "cooked" },
        { q: "After the meal, you ask for the ___.", o: ["bill", "price", "money"], a: "bill" },
        { q: "If the service is good, you can leave a ___.", o: ["gift", "tip", "note"], a: "tip" },
        { q: "To ask for directions, you start with: '___, can you help me?'", o: ["Hello", "Listen", "Excuse me"], a: "Excuse me" },
        { q: "'Go ___ down this street for two blocks.'", o: ["straight", "forward", "fast"], a: "straight" },
        { q: "'Then, ___ right at the traffic lights.'", o: ["go", "turn", "walk"], a: "turn" },
        { q: "'Is it ___ to walk from here?'", o: ["long", "hard", "far"], a: "far" },
        { q: "When someone helps you, you should say: '___ so much!'", o: ["Okay", "Thank you", "Alright"], a: "Thank you" }
    ];

    const [activeQuiz, setActiveQuiz] = useState(null);
    const quizData = activeQuiz === 'dodie' ? dodieQuizData : patronelaQuizData;

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

    return (
        <div className="font-sans bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-12 p-4 md:p-8">
                <h1 className="text-4xl font-extrabold text-slate-800 text-center">Conversational English for Travel <span className="text-teal-500">for Dodie & Patronela</span></h1>

                <WorksheetCard>
                    <SectionHeader icon={<Video size={32} className="text-white"/>} title="Video Lessons" subtitle="Watch and learn from real conversations" color="red" />
                    <div className="grid md:grid-cols-2 gap-8">
                        <YouTubePlayer videoId="wyqfYJX23lg" title="Real English Conversation for Travel" />
                        <YouTubePlayer videoId="GEvSUrPpftw" title="Checking in at the Airport" />
                        <YouTubePlayer videoId="bgfdqVmVjfk" title="Ordering Food in a Restaurant" />
                        <YouTubePlayer videoId="Lms1qBpfYIM" title="Asking for Directions" />
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<Plane size={32} className="text-white"/>} title="1. At the Airport: Checking In" subtitle="Useful phrases for your flight" color="blue" />
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <Dialogue lines={airportDialogue} />
                        <img src="https://images.pexels.com/photos/388830/pexels-photo-388830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Airport check-in counter" className="rounded-lg shadow-md object-cover h-48 w-full"/>
                    </div>
                    <KeyPhrases
                        color="blue"
                        phrases={[
                            "May I see your passport, please?",
                            "Are you checking any bags?",
                            "Here is your boarding pass."
                        ]}
                    />
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<Hotel size={32} className="text-white"/>} title="2. At the Hotel: Checking In" subtitle="Getting your room key" color="green" />
                     <div className="grid md:grid-cols-2 gap-6 items-center">
                        <Dialogue lines={hotelDialogue} />
                        <img src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Hotel reception" className="rounded-lg shadow-md object-cover h-48 w-full"/>
                    </div>
                    <KeyPhrases
                        color="green"
                        phrases={[
                            "Do you have a reservation?",
                            "The reservation is under the name...",
                            "Here is your key card."
                        ]}
                    />
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<UtensilsCrossed size={32} className="text-white"/>} title="3. At a Restaurant: Ordering Food" subtitle="How to order your meal" color="orange" />
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <Dialogue lines={restaurantDialogue} />
                        <img src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Waiter taking an order in a restaurant" className="rounded-lg shadow-md object-cover h-48 w-full"/>
                    </div>
                    <KeyPhrases
                        color="orange"
                        phrases={[
                            "Are you ready to order?",
                            "I'd like the... / I'll have the...",
                            "How would you like your steak cooked?"
                        ]}
                    />
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<Map size={32} className="text-white"/>} title="4. Asking for Directions" subtitle="Finding your way around" color="pink" />
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <Dialogue lines={directionsDialogue} />
                        <img src="https://images.pexels.com/photos/590599/pexels-photo-590599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Person looking at a map" className="rounded-lg shadow-md object-cover h-48 w-full"/>
                    </div>
                    <KeyPhrases
                        color="pink"
                        phrases={[
                            "Excuse me, how do I get to the...?",
                            "Go straight down this street.",
                            "Turn left / Turn right."
                        ]}
                    />
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<CheckSquare size={32} className="text-white"/>} title="5. Travel Quiz" subtitle="Test your knowledge" color="violet"/>
                    {!activeQuiz ? (
                        <div className="text-center py-4">
                            <h3 className="text-2xl font-bold text-slate-700 mb-6">Who is taking the quiz?</h3>
                            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                                <BigButton onClick={() => setActiveQuiz('dodie')} className="bg-blue-500 border-blue-600 w-full md:w-auto">
                                    <User className="inline-block mr-2" /> Dodie's Quiz
                                </BigButton>
                                <BigButton onClick={() => setActiveQuiz('patronela')} className="bg-pink-500 border-pink-600 w-full md:w-auto">
                                    <User className="inline-block mr-2" /> Patronela's Quiz
                                </BigButton>
                            </div>
                        </div>
                    ) : (
                        quizFinished ? (
                            <div className="text-center py-4">
                                <h3 className="text-3xl font-bold text-green-600">Quiz Complete!</h3>
                                <p className="text-xl mt-2">Your Score: {quizState.userAnswers.filter(a=>a.isCorrect).length} / {quizData.length}</p>
                                <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
                                    <BigButton onClick={() => {
                                        setQuizFinished(false);
                                        setQuizState({ currentIndex: 0, selectedAnswer: null, feedback: null, userAnswers: [] });
                                    }} className="bg-violet-500 border-violet-600 w-full md:w-auto">
                                        Try Again
                                    </BigButton>
                                    <BigButton onClick={() => setActiveQuiz(null)} className="bg-gray-500 border-gray-600 w-full md:w-auto">
                                        <Users className="inline-block mr-2" /> Change Quiz
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
                        )
                    )}
                </WorksheetCard>

                <div className="pt-8">
                    <BigButton onClick={() => navigate('/')} className="bg-gray-500 border-gray-600"> ← Back to Home </BigButton>
                </div>
            </div>
        </div>
    );
};

export default DodiePatronelaTravelLesson;
