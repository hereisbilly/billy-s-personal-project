import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { BookOpen, MessageSquare, Users, Volume2, UtensilsCrossed } from 'lucide-react';

// Re-usable SectionHeader component
const SectionHeader = ({ icon, title, subtitle, color = "blue" }) => {
    const colors = {
        blue: "from-blue-500 to-sky-500",
        violet: "from-violet-500 to-purple-500",
        green: "from-emerald-500 to-teal-500",
        orange: "from-amber-500 to-orange-500",
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

const DodiePatronelaOrderingFoodLesson = () => {
    const navigate = useNavigate();
    const [rolePlayState, setRolePlayState] = useState({ currentIndex: 0, feedback: null });
    const [rolePlayFinished, setRolePlayFinished] = useState(false);

    const vocabulary = [
        { term: "Menu", definition: "A list of food and drinks available." },
        { term: "Appetizer / Starter", definition: "A small dish served before the main course." },
        { term: "Main Course / Entrée", definition: "The main dish of a meal." },
        { term: "Dessert", definition: "A sweet dish eaten at the end of a meal." },
        { term: "Bill / Check", definition: "A statement of money owed for food." },
        { term: "Reservation", definition: "An arrangement to have a table saved for you." },
    ];

    const phrases = {
        "Getting a Table": ["A table for two, please.", "Do you have a reservation?", "We have a reservation under the name Patronela."],
        "Ordering": ["Are you ready to order?", "What do you recommend?", "I'd like the chicken pasta, please.", "Can I get the steak?"],
        "During the Meal": ["Could we have some more water, please?", "Everything is delicious, thank you.", "Excuse me, this isn't what I ordered."],
        "Paying": ["Could we have the bill, please?", "Can I pay by credit card?", "Keep the change."],
    };

    const rolePlayQuizData = [
        { situation: "You walk into a restaurant. You need a table for you and your friend.", question: "What do you say?", options: ["I want food.", "A table for two, please.", "Where is the food?"], answer: "A table for two, please." },
        { situation: "The waiter comes to your table and is ready to take your order.", question: "What might the waiter ask?", options: ["What do you want?", "Are you ready to order?", "Do you have money?"], answer: "Are you ready to order?" },
        { situation: "You don't know what to eat. You want a suggestion from the waiter.", question: "What do you ask?", options: ["What is good?", "What do you recommend?", "Tell me what to eat."], answer: "What do you recommend?" },
        { situation: "You have finished your meal and you are ready to pay.", question: "What do you say?", options: ["I'm finished.", "Give me the numbers.", "Could we have the bill, please?"], answer: "Could we have the bill, please?" },
        { situation: "You want to pay with your bank card, not cash.", question: "What do you ask?", options: ["Do you take plastic?", "Can I pay by credit card?", "Is card okay?"], answer: "Can I pay by credit card?" },
    ];

    const handleRolePlayAnswer = (option) => {
        if (rolePlayState.feedback) return;
        const isCorrect = option === rolePlayQuizData[rolePlayState.currentIndex].answer;
        setRolePlayState(prev => ({ ...prev, feedback: isCorrect ? 'correct' : 'incorrect' }));
    };

    const handleNextRolePlayQuestion = () => {
        if (rolePlayState.currentIndex < rolePlayQuizData.length - 1) {
            setRolePlayState(prev => ({ ...prev, currentIndex: prev.currentIndex + 1, feedback: null }));
        } else {
            setRolePlayFinished(true);
        }
    };

    const resetRolePlayQuiz = () => {
        setRolePlayFinished(false);
        setRolePlayState({ currentIndex: 0, feedback: null });
    };

    return (
        <div className="font-sans bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-12 p-4 md:p-8">
                <h1 className="text-4xl font-extrabold text-slate-800 text-center">Travel English: Ordering Food <span className="text-orange-500">for Dodie & Patronela</span></h1>

                <WorksheetCard>
                    <SectionHeader icon={<BookOpen size={32} className="text-white"/>} title="1. Key Vocabulary" subtitle="Important words for the restaurant" color="blue" />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {vocabulary.map(item => (
                            <div key={item.term} className="p-3 bg-slate-100 rounded-lg">
                                <h3 className="font-bold text-blue-700">{item.term}</h3>
                                <p className="text-sm text-slate-600">{item.definition}</p>
                            </div>
                        ))}
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<MessageSquare size={32} className="text-white"/>} title="2. Useful Phrases" subtitle="What to say at each step" color="green" />
                    <div className="space-y-6">
                        {Object.entries(phrases).map(([category, phraseList]) => (
                            <div key={category}>
                                <h3 className="text-xl font-bold text-green-800 mb-2">{category}</h3>
                                <ul className="list-disc list-inside space-y-1 text-slate-700">
                                    {phraseList.map((phrase, index) => <li key={index}>{phrase}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<Users size={32} className="text-white"/>} title="3. Dialogue Practice" subtitle="A sample conversation" color="violet" />
                    <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
                        <p><strong>Waiter:</strong> Hello, welcome! A table for two?</p>
                        <p><strong>Dodie:</strong> Yes, please.</p>
                        <p><strong>Waiter:</strong> Right this way. Here are your menus. Are you ready to order drinks?</p>
                        <p><strong>Patronela:</strong> I'll have a lemonade, please.</p>
                        <p><strong>Dodie:</strong> Just water for me, thank you.</p>
                        <p><em>(A few minutes later...)</em></p>
                        <p><strong>Waiter:</strong> Are you ready to order your food?</p>
                        <p><strong>Dodie:</strong> Yes, I'd like the grilled fish.</p>
                        <p><strong>Patronela:</strong> And I'll have the spaghetti bolognese, please.</p>
                        <p><em>(After the meal...)</em></p>
                        <p><strong>Dodie:</strong> That was delicious! Could we have the bill, please?</p>
                        <p><strong>Waiter:</strong> Of course, here you are.</p>
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<UtensilsCrossed size={32} className="text-white"/>} title="4. Role-Playing Quiz" subtitle="What would you say?" color="orange" />
                    {rolePlayFinished ? (
                        <div className="text-center py-4">
                            <h3 className="text-3xl font-bold text-green-600">Great Job!</h3>
                            <p className="text-xl mt-2">You've completed the role-play!</p>
                            <div className="mt-6"><BigButton onClick={resetRolePlayQuiz} className="bg-orange-500 border-orange-600">Practice Again</BigButton></div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="font-bold text-slate-500">Situation {rolePlayState.currentIndex + 1} of {rolePlayQuizData.length}</p>
                            <div className="my-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                                <p className="text-lg font-semibold text-slate-700">{rolePlayQuizData[rolePlayState.currentIndex].situation}</p>
                            </div>
                            <p className="text-xl font-bold my-4 text-slate-800">{rolePlayQuizData[rolePlayState.currentIndex].question}</p>
                            <div className="flex flex-col space-y-3 max-w-md mx-auto">
                                {rolePlayQuizData[rolePlayState.currentIndex].options.map((option, index) => {
                                    let buttonClass = 'bg-orange-500 text-white hover:bg-orange-600';
                                    if (rolePlayState.feedback) {
                                        if (option === rolePlayQuizData[rolePlayState.currentIndex].answer) buttonClass = 'bg-green-500 text-white';
                                        else buttonClass = 'bg-slate-200 text-slate-500';
                                    }
                                    return (<button key={index} onClick={() => handleRolePlayAnswer(option)} className={`p-3 rounded-lg font-semibold text-lg transition-all ${buttonClass}`} disabled={!!rolePlayState.feedback}>{option}</button>);
                                })}
                            </div>
                            {rolePlayState.feedback && (
                                <div className="mt-6">
                                    <p className={`font-bold text-xl ${rolePlayState.feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                                        {rolePlayState.feedback === 'correct' ? 'Correct!' : 'Not quite.'}
                                    </p>
                                    <BigButton onClick={handleNextRolePlayQuestion} className="bg-indigo-600 border-indigo-700 mt-4">Next →</BigButton>
                                </div>
                            )}
                        </div>
                    )}
                </WorksheetCard>

                <div className="pt-8">
                    <BigButton onClick={() => navigate(-1)} className="bg-gray-500 border-gray-600"> ← Go Back </BigButton>
                </div>
            </div>
        </div>
    );
};

export default DodiePatronelaOrderingFoodLesson;