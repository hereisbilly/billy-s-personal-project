import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { BookOpen, MessageSquare, Users, Map, Compass, Volume2 } from 'lucide-react';

// Re-usable SectionHeader component
const SectionHeader = ({ icon, title, subtitle, color = "blue" }) => {
    const colors = {
        blue: "from-blue-500 to-sky-500",
        violet: "from-violet-500 to-purple-500",
        green: "from-emerald-500 to-teal-500",
        rose: "from-rose-500 to-pink-500",
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

const DodiePetronelaDirectionsLesson = () => {
    const navigate = useNavigate();
    const [rolePlayState, setRolePlayState] = useState({ currentIndex: 0, feedback: null });
    const [rolePlayFinished, setRolePlayFinished] = useState(false);

    const vocabulary = [
        { term: "Turn left / right", definition: "Change direction to the left or right." },
        { term: "Go straight ahead", definition: "Continue in the same direction." },
        { term: "Opposite", definition: "On the other side of something." },
        { term: "Next to / Beside", definition: "Very close to something." },
        { term: "Intersection / Crossroads", definition: "A place where two or more roads cross." },
        { term: "Traffic lights", definition: "A signal that controls traffic." },
    ];

    const phrases = {
        "Asking for Directions": ["Excuse me, how do I get to the museum?", "Could you tell me the way to the train station?", "Is there a pharmacy near here?", "Where is the nearest ATM?"],
        "Understanding Directions": ["Go straight on for about 5 minutes.", "Turn left at the next corner.", "It's on your right.", "You can't miss it."],
    };

    const rolePlayQuizData = [
        // Dodie's Questions
        { character: "Dodie", situation: "You are lost and want to find the nearest bank.", question: "What do you ask a stranger?", options: ["Where is money?", "Excuse me, where is the nearest bank?", "I need a bank."], answer: "Excuse me, where is the nearest bank?" },
        { character: "Dodie", situation: "You are looking for a famous landmark, the 'Crystal Tower'.", question: "How do you ask for it?", options: ["Where is the tower?", "Excuse me, how do I get to the Crystal Tower?", "I want to see the Crystal Tower."], answer: "Excuse me, how do I get to the Crystal Tower?" },
        { character: "Dodie", situation: "You need to find a souvenir shop to buy gifts.", question: "What do you ask?", options: ["Is there a souvenir shop near here?", "Where are gifts?", "I need souvenirs."], answer: "Is there a souvenir shop near here?" },
        { character: "Dodie", situation: "You are at a bus stop and want to know if a bus goes to the city center.", question: "How do you ask?", options: ["Does this bus go to the city center?", "City center bus?", "Is this the right bus?"], answer: "Does this bus go to the city center?" },
        { character: "Dodie", situation: "Someone gives you directions with 'Go past the library'.", question: "What does this mean?", options: ["Stop at the library.", "Go inside the library.", "Continue walking after you see the library."], answer: "Continue walking after you see the library." },
        { character: "Dodie", situation: "You are looking for a specific restaurant called 'The Golden Spoon'.", question: "What do you ask?", options: ["Where is The Golden Spoon?", "I'm looking for a restaurant.", "Can you tell me where The Golden Spoon is?"], answer: "Can you tell me where The Golden Spoon is?" },
        { character: "Dodie", situation: "You want to confirm if you are going in the right direction.", question: "How do you ask?", options: ["Is this the right way to the station?", "Am I correct?", "Where am I going?"], answer: "Is this the right way to the station?" },
        { character: "Dodie", situation: "Someone says 'It's just around the corner.'", question: "What does this imply?", options: ["It's very far away.", "It's very close.", "It's on a corner."], answer: "It's very close." },
        { character: "Dodie", situation: "You need to find the subway station.", question: "What is a good way to ask?", options: ["Where is the underground train?", "Could you direct me to the subway station?", "Subway now?"], answer: "Could you direct me to the subway station?" },
        { character: "Dodie", situation: "You want to ask how long it will take to walk to the beach.", question: "What do you ask?", options: ["How long is the beach walk?", "How many minutes to the beach?", "How far is the beach on foot?"], answer: "How far is the beach on foot?" },
        // Petronela's Questions
        { character: "Petronela", situation: "You want to know if the post office is far away.", question: "What do you ask?", options: ["Is it a long walk?", "How many steps?", "Is post office far?"], answer: "Is it a long walk?" },
        { character: "Petronela", situation: "You need to find a restroom.", question: "What is a polite way to ask?", options: ["Where is the toilet?", "Excuse me, could you tell me where the restroom is?", "I need to go."], answer: "Excuse me, could you tell me where the restroom is?" },
        { character: "Petronela", situation: "You are looking for a quiet place, like a park or a garden.", question: "How can you ask?", options: ["Where is a quiet place?", "Is there a park near here?", "I need quiet."], answer: "Is there a park near here?" },
        { character: "Petronela", situation: "Someone tells you to 'take the first left'.", question: "What do you do?", options: ["Turn left at the first possible street.", "Turn left after one minute.", "Ignore the direction."], answer: "Turn left at the first possible street." },
        { character: "Petronela", situation: "You are looking for a pharmacy because you have a headache.", question: "What do you ask?", options: ["Where is medicine?", "Excuse me, I'm looking for a pharmacy.", "I need a doctor."], answer: "Excuse me, I'm looking for a pharmacy." },
        { character: "Petronela", situation: "You want to ask for directions to the nearest hotel.", question: "How do you ask?", options: ["Where can I sleep?", "Could you tell me how to get to the nearest hotel?", "Hotel please."], answer: "Could you tell me how to get to the nearest hotel?" },
        { character: "Petronela", situation: "Someone says 'It's on your right.'", question: "Where should you look?", options: ["To the right side.", "Straight ahead.", "Behind you."], answer: "To the right side." },
        { character: "Petronela", situation: "You are at an intersection and don't know which way to go.", question: "What do you ask?", options: ["Which way is the museum?", "What is this place?", "Help me, I'm at an intersection."], answer: "Which way is the museum?" },
        { character: "Petronela", situation: "You want to find an ATM to get some cash.", question: "How do you ask?", options: ["Where is the money machine?", "Is there an ATM around here?", "I need cash now."], answer: "Is there an ATM around here?" },
        { character: "Petronela", situation: "Someone says, 'The cafe is opposite the park.'", question: "Where is the cafe?", options: ["Next to the park.", "Inside the park.", "Across the street from the park."], answer: "Across the street from the park." },
    ];

    const handleRolePlayAnswer = (option) => {
        if (rolePlayState.feedback) return;
        const isCorrect = option === rolePlayQuizData[rolePlayState.currentIndex].answer;
        setRolePlayState(prev => ({ ...prev, feedback: isCorrect ? 'correct' : 'incorrect'  }));
    };

    const handleNextRolePlayQuestion = () => {
        if (rolePlayState.currentIndex < rolePlayQuizData.length - 1) {
            setRolePlayState(prev => ({ ...prev, currentIndex: prev.currentIndex + 1, feedback: null  }));
        } else {
            setRolePlayFinished(true);
        }
    };

    const resetRolePlayQuiz = () => {
        setRolePlayFinished(false);
        setRolePlayState({ currentIndex: 0, feedback: null  });
    };

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="font-sans bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-12 p-4 md:p-8">
                <h1 className="text-4xl font-extrabold text-slate-800 text-center">Travel English: Asking for Directions <span className="text-rose-500">for Dodie & Petronela</span></h1>

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
                    <SectionHeader icon={<Users size={32} className="text-white"/>} title="3. Dialogue Practice" subtitle="A sample conversation" color="rose" />
                    <div className="space-y-2 p-4 bg-slate-50 rounded-lg">
                        {[
                            { speaker: "Dodie", line: "Excuse me, we're a little lost. Could you help us?" },
                            { speaker: "Local", line: "Of course! Where are you trying to go?" },
                            { speaker: "Petronela", line: "We're looking for the City Museum." },
                            { speaker: "Local", line: "Ah, you're close! Go straight down this street for two blocks, then turn left at the traffic lights." },
                            { speaker: "Dodie", line: "So, straight for two blocks, then left?" },
                            { speaker: "Local", line: "That's right. You'll see a big park on your right. The museum is opposite the park. You can't miss it!" },
                            { speaker: "Petronela", line: "Thank you so much!" },
                            { speaker: "Local", line: "You're welcome. Enjoy the museum!" },
                        ].map((dialogue, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <button onClick={() => speak(dialogue.line)} className="text-slate-400 hover:text-rose-500 transition-colors"><Volume2 size={18} /></button>
                                <p><strong>{dialogue.speaker}:</strong> {dialogue.line}</p>
                            </div>
                        ))}
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<Compass size={32} className="text-white"/>} title="4. Role-Playing Quiz" subtitle="What would you say?" color="violet" />
                    {rolePlayFinished ? (
                        <div className="text-center py-4">
                            <h3 className="text-3xl font-bold text-green-600">Great Job!</h3>
                            <p className="text-xl mt-2">You've completed the role-play!</p>
                            <div className="mt-6"><BigButton onClick={resetRolePlayQuiz} className="bg-violet-500 border-violet-600">Practice Again</BigButton></div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="font-bold text-slate-500">Situation {rolePlayState.currentIndex + 1} of {rolePlayQuizData.length}</p>
                            <div className="flex justify-center items-center gap-2 mt-4 mb-2">
                                <div className={`w-6 h-6 rounded-full ${rolePlayQuizData[rolePlayState.currentIndex].character === 'Dodie' ? 'bg-rose-500' : 'bg-slate-300'}`}></div>
                                <span className={`font-bold ${rolePlayQuizData[rolePlayState.currentIndex].character === 'Dodie' ? 'text-rose-500' : 'text-slate-400'}`}>Dodie's Turn</span>
                                <div className={`w-6 h-6 rounded-full ${rolePlayQuizData[rolePlayState.currentIndex].character === 'Petronela' ? 'bg-violet-500' : 'bg-slate-300'}`}></div>
                                <span className={`font-bold ${rolePlayQuizData[rolePlayState.currentIndex].character === 'Petronela' ? 'text-violet-500' : 'text-slate-400'}`}>Petronela's Turn</span>
                            </div>
                            <div className="my-4 p-4 bg-violet-50 rounded-lg border border-violet-200">
                                <p className="text-lg font-semibold text-slate-700">{rolePlayQuizData[rolePlayState.currentIndex].situation}</p>
                            </div>
                            <p className="text-xl font-bold my-4 text-slate-800">{rolePlayQuizData[rolePlayState.currentIndex].question}</p>
                            <div className="flex flex-col space-y-3 max-w-md mx-auto">
                                {rolePlayQuizData[rolePlayState.currentIndex].options.map((option, index) => {
                                    let buttonClass = 'bg-violet-500 text-white hover:bg-violet-600';
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

export default DodiePetronelaDirectionsLesson;