import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorksheetCard, BigButton } from '../components/common';
import { Plane, Hotel, UtensilsCrossed, Map, CheckSquare } from 'lucide-react';

const SectionHeader = ({ icon, title, subtitle, color = 'blue' }) => {
  const colors = {
    blue: 'border-cyan-400 text-cyan-400',
    violet: 'border-purple-400 text-purple-400',
    green: 'border-emerald-400 text-emerald-400',
    orange: 'border-orange-400 text-orange-400',
    pink: 'border-pink-400 text-pink-400',
  };
  return (
    <div className={`flex items-center p-4 border-l-4 ${colors[color]} mb-6`}>
      <div className="flex-shrink-0 mr-4">{icon}</div>
      <div>
        <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
        <p className="text-slate-400">{subtitle}</p>
        </div>
    </div>
  );
};

const Dialogue = ({ lines }) => (
    <div className="space-y-3 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
        {lines.map((line, index) => (
            <p key={index}><strong className="font-semibold">{line.speaker}:</strong> {line.text}</p>
        ))}
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

    const quizData = [
        { q: "At the airport, the agent asks: 'Are you checking any ___?'", o: ["tickets", "bags", "friends"], a: "bags" },
        { q: "What does the agent give you after checking in?", o: ["Your passport", "A map", "Your boarding pass"], a: "Your boarding pass" },
        { q: "At a hotel, you say your reservation is '___ the name' of...", o: ["on", "under", "with"], a: "under" },
        { q: "The hotel receptionist gives you a ___ to your room.", o: ["key card", "menu", "bill"], a: "key card" },
        { q: "To order food, you can say: '___ the chicken pasta, please.'", o: ["I want", "Give me", "I'd like"], a: "I'd like" },
        { q: "When ordering steak, the waiter asks: 'How would you like it ___?'", o: ["made", "cooked", "done"], a: "cooked" },
        { q: "To ask for directions, you can start with:", o: ["Hey you!", "Listen!", "Excuse me,"], a: "Excuse me," },
        { q: "A person tells you to '___ left' at the corner.", o: ["go", "turn", "walk"], a: "turn" },
        { q: "When someone helps you, you should say:", o: ["Okay.", "Whatever.", "Thank you so much!"], a: "Thank you so much!" },
        { q: "At the airport, you need to show your ___.", o: ["driver's license", "passport", "credit card"], a: "passport" }
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

    return (
        <div className="font-mono">
            <div className="max-w-4xl mx-auto space-y-12 p-4 md:p-8">
                <h1 className="text-4xl font-black text-slate-100 text-center">Conversational English for Travel <span className="text-pink-400">for Dodie & Patronela</span></h1>

                <div className="bg-slate-900/50 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm">
                    <SectionHeader icon={<Plane size={32} className="text-cyan-400"/>} title="1. At the Airport: Checking In" subtitle="Useful phrases for your flight" color="blue" />
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <Dialogue lines={airportDialogue} />
                        <img src="https://images.pexels.com/photos/388830/pexels-photo-388830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Airport check-in counter" className="rounded-lg shadow-md object-cover h-48 w-full"/>
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400">
                        <h4 className="font-bold text-slate-800">Key Phrases:</h4>
                        <ul className="list-disc list-inside text-slate-700">
                            <li>May I see your passport, please?</li>
                            <li>Are you checking any bags?</li>
                            <li>Here is your boarding pass.</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-slate-900/50 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm">
                    <SectionHeader icon={<Hotel size={32} className="text-emerald-400"/>} title="2. At the Hotel: Checking In" subtitle="Getting your room key" color="green" />
                     <div className="grid md:grid-cols-2 gap-6 items-center">
                        <Dialogue lines={hotelDialogue} />
                        <img src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Hotel reception" className="rounded-lg shadow-md object-cover h-48 w-full"/>
                    </div>
                    <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400">
                        <h4 className="font-bold text-slate-800">Key Phrases:</h4>
                        <ul className="list-disc list-inside text-slate-700">
                            <li>Do you have a reservation?</li>
                            <li>The reservation is under the name...</li>
                            <li>Here is your key card.</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-slate-900/50 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm">
                    <SectionHeader icon={<UtensilsCrossed size={32} className="text-orange-400"/>} title="3. At a Restaurant: Ordering Food" subtitle="How to order your meal" color="orange" />
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <Dialogue lines={restaurantDialogue} />
                        <img src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Waiter taking an order in a restaurant" className="rounded-lg shadow-md object-cover h-48 w-full"/>
                    </div>
                    <div className="mt-4 p-4 bg-orange-50 border-l-4 border-orange-400">
                        <h4 className="font-bold text-slate-800">Key Phrases:</h4>
                        <ul className="list-disc list-inside text-slate-700">
                            <li>Are you ready to order?</li>
                            <li>I'd like the... / I'll have the...</li>
                            <li>How would you like your steak cooked?</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-slate-900/50 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm">
                    <SectionHeader icon={<Map size={32} className="text-pink-400"/>} title="4. Asking for Directions" subtitle="Finding your way around" color="pink" />
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <Dialogue lines={directionsDialogue} />
                        <img src="https://images.pexels.com/photos/163064/play-stone-network-networked-163064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Person looking at a map" className="rounded-lg shadow-md object-cover h-48 w-full"/>
                    </div>
                    <div className="mt-4 p-4 bg-pink-50 border-l-4 border-pink-400">
                        <h4 className="font-bold text-slate-800">Key Phrases:</h4>
                        <ul className="list-disc list-inside text-slate-700">
                            <li>Excuse me, how do I get to the...?</li>
                            <li>Go straight down this street.</li>
                            <li>Turn left / Turn right.</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-slate-900/50 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm">
                    <SectionHeader icon={<CheckSquare size={32} className="text-purple-400"/>} title="5. Travel Quiz" subtitle="Test your knowledge" color="violet"/>
                    {quizFinished ? (
                        <div className="text-center py-4">
                            <h3 className="text-3xl font-bold text-green-400">MISSION COMPLETE!</h3>
                            <p className="text-xl mt-2 text-slate-300">Your Score: {quizState.userAnswers.filter(a=>a.isCorrect).length} / {quizData.length}</p>
                            <BigButton onClick={() => {
                                setQuizFinished(false);
                                setQuizState({ currentIndex: 0, selectedAnswer: null, feedback: null, userAnswers: [] });
                            }} className="mt-6 bg-purple-500 border-purple-600 hover:bg-purple-600">
                                Try Again
                            </BigButton>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="font-bold text-slate-400 tracking-widest">Question {quizState.currentIndex + 1} of {quizData.length}</p>
                            <p className="text-2xl font-semibold my-8 min-h-[4rem] flex items-center justify-center text-slate-100">
                                {quizData[quizState.currentIndex].q}
                            </p>
                            <div className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
                                {quizData[quizState.currentIndex].o.map((option, index) => {
                                    let buttonClass = 'bg-slate-800 text-purple-300 border-purple-500/50 hover:bg-purple-500 hover:text-white hover:shadow-purple-500/40';
                                    if (quizState.feedback) {
                                        if (option === quizData[quizState.currentIndex].a) {
                                            buttonClass = 'bg-green-500 text-white ring-2 ring-white';
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
                                            className={`p-4 rounded-lg font-bold text-xl border-2 transition-all duration-300 shadow-lg ${buttonClass}`}
                                            disabled={!!quizState.feedback}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>
                            {quizState.feedback && (
                                <div className="mt-6">
                                    <BigButton onClick={handleNextQuizQuestion} className="bg-cyan-500 border-cyan-600 hover:bg-cyan-600">
                                        Next →
                                    </BigButton>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="pt-8">
                    <BigButton onClick={() => navigate('/')} className="bg-slate-700 border-slate-600 hover:bg-slate-600"> ← Return to Mission Hub </BigButton>
                </div>
            </div>
        </div>
    );
};

export default DodiePatronelaTravelLesson;