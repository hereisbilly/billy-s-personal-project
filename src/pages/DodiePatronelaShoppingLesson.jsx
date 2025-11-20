import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorksheetCard, BigButton } from '../components/common';
import { ShoppingCart, Shirt, Gift, CreditCard, CheckSquare, Volume2 } from 'lucide-react';

const SectionHeader = ({ icon, title, subtitle, color = 'blue' }) => {
    const colors = {
        blue: 'from-blue-500 to-sky-500',
        violet: 'from-violet-500 to-purple-500',
        green: 'from-emerald-500 to-teal-500',
        orange: 'from-amber-500 to-orange-500',
        pink: 'from-pink-500 to-rose-500',
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
        window.speechSynthesis.cancel();
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

const DodiePatronelaShoppingLesson = () => {
    const navigate = useNavigate();
    const [quizState, setQuizState] = useState({
        currentIndex: 0,
        selectedAnswer: null,
        feedback: null,
        userAnswers: []
    });
    const [quizFinished, setQuizFinished] = useState(false);

    // --- Lesson Data ---
    const clothingDialogue = [
        { speaker: "Assistant", text: "Can I help you?" },
        { speaker: "You", text: "Yes, I'm looking for a t-shirt." },
        { speaker: "Assistant", text: "What size are you?" },
        { speaker: "You", text: "I'm a medium. Can I try this on?" },
        { speaker: "Assistant", text: "Of course. The fitting rooms are over there." },
    ];

    const priceDialogue = [
        { speaker: "You", text: "Excuse me, how much is this?" },
        { speaker: "Assistant", text: "It's twenty-five dollars." },
        { speaker: "You", text: "Okay, I'll take it." },
    ];

    const payingDialogue = [
        { speaker: "Cashier", text: "That will be twenty-five dollars, please." },
        { speaker: "You", text: "Do you take credit card?" },
        { speaker: "Cashier", text: "Yes, we do." },
        { speaker: "You", text: "Here you are." },
        { speaker: "Cashier", text: "Thank you. Would you like a bag?" },
        { speaker: "You", text: "Yes, please." },
    ];

    const quizData = [
        { q: "A shop assistant might ask: '___ I help you?'", o: ["Do", "Can", "Are"], a: "Can" },
        { q: "If you want to find a specific item, you say: 'I'm ___ for a jacket.'", o: ["seeing", "wanting", "looking"], a: "looking" },
        { q: "To ask about your size, someone might ask: 'What ___ are you?'", o: ["size", "number", "long"], a: "size" },
        { q: "To ask to wear something before buying, you say: 'Can I ___ it on?'", o: ["put", "wear", "try"], a: "try" },
        { q: "The place to try on clothes is the '___ room'.", o: ["changing", "fitting", "test"], a: "fitting" },
        { q: "To ask for the price, you say: 'How ___ is this?'", o: ["many", "cost", "much"], a: "much" },
        { q: "If you decide to buy something, you say: 'I'll ___ it.'", o: ["take", "buy", "want"], a: "take" },
        { q: "To ask if you can pay with a card, you say: 'Do you take ___?'", o: ["money", "credit card", "cash"], a: "credit card" },
        { q: "The person who takes your money is the ___.", o: ["assistant", "cashier", "boss"], a: "cashier" },
        { q: "A cashier might ask if you need something to carry your items: 'Would you like a ___?'", o: ["box", "bag", "receipt"], a: "bag" },
        { q: "If you don't need help, you can say: 'I'm just ___ , thank you.'", o: ["seeing", "watching", "looking"], a: "looking" },
        { q: "To ask for a different size, you say: 'Do you have this in a ___?'", o: ["large", "big", "more"], a: "large" },
        { q: "To ask for a different color, you say: 'Does this come in ___?'", o: ["blue", "other", "different"], a: "blue" },
        { q: "The paper you get after paying is called a ___.", o: ["ticket", "receipt", "note"], a: "receipt" },
        { q: "To ask about paying with paper money, you say: 'Can I pay with ___?'", o: ["cash", "money", "dollars"], a: "cash" },
        { q: "If an item is cheaper than usual, it is 'on ___'.", o: ["discount", "sale", "offer"], a: "sale" },
        { q: "To ask about the price of multiple items, you say: 'How much are ___?'", o: ["that", "it", "these"], a: "these" },
        { q: "Another word for a shop worker is a sales ___.", o: ["person", "man", "staff"], a: "person" },
        { q: "If you are ready to pay, you can go to the ___.", o: ["counter", "exit", "desk"], a: "counter" },
        { q: "When you try on clothes, you check if they ___.", o: ["fit", "look", "are"], a: "fit" }
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
                <h1 className="text-4xl font-extrabold text-slate-800 text-center">Conversational English for Shopping <span className="text-pink-500">for Dodie & Petronela</span></h1>

                <WorksheetCard>
                    <SectionHeader icon={<Shirt size={32} className="text-white"/>} title="1. In a Clothing Store" subtitle="Finding what you want" color="blue" />
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <Dialogue lines={clothingDialogue} />
                        <img src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Clothing store" className="rounded-lg shadow-md object-cover h-48 w-full"/>
                    </div>
                    <KeyPhrases
                        color="blue"
                        phrases={[
                            "I'm looking for a...",
                            "What size are you?",
                            "Can I try this on?",
                            "The fitting rooms are over there."
                        ]}
                    />
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<Gift size={32} className="text-white"/>} title="2. Asking for the Price" subtitle="How much does it cost?" color="green" />
                     <div className="grid md:grid-cols-2 gap-6 items-center">
                        <Dialogue lines={priceDialogue} />
                        <img src="https://images.pexels.com/photos/7249183/pexels-photo-7249183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Price tag on an item" className="rounded-lg shadow-md object-cover h-48 w-full"/>
                    </div>
                    <KeyPhrases
                        color="green"
                        phrases={[
                            "How much is this? / How much are these?",
                            "It's [price]. (e.g., It's ten dollars.)",
                            "I'll take it."
                        ]}
                    />
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<CreditCard size={32} className="text-white"/>} title="3. Paying for Your Items" subtitle="At the checkout counter" color="orange" />
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <Dialogue lines={payingDialogue} />
                        <img src="https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Person paying with a credit card" className="rounded-lg shadow-md object-cover h-48 w-full"/>
                    </div>
                    <KeyPhrases
                        color="orange"
                        phrases={[
                            "Do you take credit card?",
                            "Can I pay with cash?",
                            "Would you like a bag?",
                            "Here is your receipt."
                        ]}
                    />
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<CheckSquare size={32} className="text-white"/>} title="4. Shopping Quiz" subtitle="Test your knowledge" color="violet"/>
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

export default DodiePatronelaShoppingLesson;