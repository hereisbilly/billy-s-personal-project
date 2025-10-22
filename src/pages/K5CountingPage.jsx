// src/pages/K5CountingPage.jsx
import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const SectionHeader = ({ icon, title, subtitle }) => ( <div className="flex items-center p-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl shadow-lg mb-6"> <div className="flex-shrink-0 bg-white bg-opacity-20 p-3 rounded-full mr-4">{icon}</div> <div> <h2 className="text-2xl font-bold text-white">{title}</h2> <p className="text-cyan-100">{subtitle}</p> </div> </div> );
const IconNumbers = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>;
const SvgCheck = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;

// --- SVGs for Stories (NEW & IMPROVED) ---
const SvgPetCat = () => (
    <svg viewBox="0 0 100 80" className="w-full h-auto max-w-xs mx-auto">
        <rect width="100" height="80" fill="#F0FDF4" rx="10"/>
        {/* Cat */}
        <g transform="translate(50 45)">
            <path d="M-25 25 C -30 0, 30 0, 25 25 C 20 30, -20 30, -25 25 Z" fill="#FDBA74" stroke="#A16207" strokeWidth="2"/>
            <circle cx="0" cy="-5" r="18" fill="#FDBA74" stroke="#A16207" strokeWidth="2"/>
            <path d="M-15 -15 L -20 -25 L -5 -15 Z M15 -15 L 20 -25 L 5 -15 Z" fill="#FDBA74" stroke="#A16207" strokeWidth="2"/>
            <circle cx="-7" cy="-5" r="4" fill="#166534"/>
            <circle cx="7" cy="-5" r="4" fill="#166534"/>
            <path d="M-2 5 L 2 5 M0 2 V 7" stroke="#A16207" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M-10 2 Q -5 5, 0 2 M10 2 Q 5 5, 0 2" stroke="#A16207" strokeWidth="1.5" fill="none"/>
        </g>
        {/* Toy Mice */}
        <g transform="translate(15 60)"><circle r="5" fill="#9CA3AF"/><path d="M5 0 C 10 0, 10 -5, 5 -5 M5 0 C 10 0, 10 5, 5 5" stroke="#9CA3AF" strokeWidth="2" fill="none"/></g>
        <g transform="translate(50 65)"><circle r="5" fill="#9CA3AF"/><path d="M5 0 C 10 0, 10 -5, 5 -5 M5 0 C 10 0, 10 5, 5 5" stroke="#9CA3AF" strokeWidth="2" fill="none"/></g>
        <g transform="translate(85 60)"><circle r="5" fill="#9CA3AF"/><path d="M5 0 C 10 0, 10 -5, 5 -5 M5 0 C 10 0, 10 5, 5 5" stroke="#9CA3AF" strokeWidth="2" fill="none"/></g>
    </svg>
);
const SvgParkDucks = () => (
    <svg viewBox="0 0 100 80" className="w-full h-auto max-w-xs mx-auto">
        <rect width="100" height="80" fill="#EFF6FF" rx="10"/>
        {/* Water */}
        <path d="M0 80 C 20 60, 80 60, 100 80 L 100 80 L 0 80 Z" fill="#60A5FA"/>
        {/* Trees */}
        <path d="M10 30 L 20 70 L 0 70 Z" fill="#16A34A" />
        <rect x="8" y="70" width="4" height="10" fill="#78350F" />
        <path d="M80 40 L 90 70 L 70 70 Z" fill="#15803d" />
        <rect x="78" y="70" width="4" height="10" fill="#78350F" />
        {/* Ducks */}
        <g transform="translate(30 65)"><path d="M0 0 C 5 -10, 15 -10, 20 0 C 25 10, 10 15, 0 5 Z" fill="#FDE047"/><circle cx="17" cy="-2" r="2" fill="black"/></g>
        <g transform="translate(45 70)"><path d="M0 0 C 5 -10, 15 -10, 20 0 C 25 10, 10 15, 0 5 Z" fill="#FDE047"/><circle cx="17" cy="-2" r="2" fill="black"/></g>
        <g transform="translate(60 65)"><path d="M0 0 C 5 -10, 15 -10, 20 0 C 25 10, 10 15, 0 5 Z" fill="#FDE047"/><circle cx="17" cy="-2" r="2" fill="black"/></g>
        <g transform="translate(75 70)"><path d="M0 0 C 5 -10, 15 -10, 20 0 C 25 10, 10 15, 0 5 Z" fill="#FDE047"/><circle cx="17" cy="-2" r="2" fill="black"/></g>
        <g transform="translate(55 60)"><path d="M0 0 C 5 -10, 15 -10, 20 0 C 25 10, 10 15, 0 5 Z" fill="#FDE047"/><circle cx="17" cy="-2" r="2" fill="black"/></g>
    </svg>
);

const itemsToCount = [
    { id: 1, count: 5, el: <><circle cx="20" cy="20" r="10" fill="#F87171"/><circle cx="50" cy="20" r="10" fill="#FBBF24"/><circle cx="80" cy="20" r="10" fill="#60A5FA"/><circle cx="35" cy="45" r="10" fill="#84CC16"/><circle cx="65" cy="45" r="10" fill="#A78BFA"/></> },
    { id: 2, count: 3, el: <><path d="M20 20 L30 40 L10 40 Z" fill="#FBBF24"/><path d="M50 20 L60 40 L40 40 Z" fill="#FBBF24"/><path d="M80 20 L90 40 L70 40 Z" fill="#FBBF24"/></> },
    { id: 3, count: 1, el: <><rect x="25" y="15" width="50" height="50" fill="#A78BFA" rx="10"/></> },
    { id: 4, count: 2, el: <><path d="M15 45 Q 30 15, 45 45 Z" fill="#F472B6"/><path d="M55 45 Q 70 15, 85 45 Z" fill="#F472B6"/></> },
    { id: 5, count: 4, el: <><circle cx="25" cy="25" r="10" fill="#84CC16"/><circle cx="75" cy="25" r="10" fill="#84CC16"/><circle cx="25" cy="55" r="10" fill="#84CC16"/><circle cx="75" cy="55" r="10" fill="#84CC16"/></> },
];

const K5CountingPage = () => {
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState(null);
    const [correctMatches, setCorrectMatches] = useState([]);
    const [incorrectAttempt, setIncorrectAttempt] = useState(null);
    const [storyAnswers, setStoryAnswers] = useState({});

    const handleItemSelect = (item) => {
        if (correctMatches.includes(item.id)) return;
        setSelectedItem(item);
        setIncorrectAttempt(null);
    };

    const handleNumberSelect = (number) => {
        if (!selectedItem) return;
        if (selectedItem.count === number) {
            setCorrectMatches(prev => [...prev, selectedItem.id]);
            setSelectedItem(null);
        } else {
            setIncorrectAttempt(selectedItem.id);
            setTimeout(() => setIncorrectAttempt(null), 500);
            setSelectedItem(null);
        }
    };
    
    const isFinished = correctMatches.length === itemsToCount.length;
    
    const stories = [
        { id: 'cat', title: 'My Pet Cat', text: 'I have <strong>1</strong> cat.<br/>My cat has <strong>2</strong> big eyes and <strong>4</strong> fast legs.<br/>She loves to play with her <strong>3</strong> toy mice.', svg: <SvgPetCat/>, questions: [{id: 'q1', text: 'How many eyes?', options: ['1', '2', '4'], answer: '2'}, {id: 'q2', text: 'How many toy mice?', options: ['2', '3', '4'], answer: '3'}] },
        { id: 'park', title: 'At the Park', text: 'Today, I went to the park.<br/>I saw <strong>5</strong> ducks in the pond.<br/>There were <strong>2</strong> big trees.', svg: <SvgParkDucks/>, questions: [{id: 'q3', text: 'How many ducks?', options: ['2', '4', '5'], answer: '5'}, {id: 'q4', text: 'How many trees?', options: ['1', '2', '5'], answer: '2'}] },
    ];
    
    const handleStoryAnswer = (questionId, selectedOption) => {
        setStoryAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
    };

    const numbersData = [
        { num: 1, icon: '★', color: 'text-yellow-400' }, { num: 2, icon: '♥', color: 'text-red-500' }, { num: 3, icon: '●', color: 'text-blue-500' }, { num: 4, icon: '■', color: 'text-green-500' },
        { num: 5, icon: '★', color: 'text-yellow-400' }, { num: 6, icon: '♥', color: 'text-red-500' }, { num: 7, icon: '●', color: 'text-blue-500' }, { num: 8, icon: '■', color: 'text-green-500' },
        { num: 9, icon: '★', color: 'text-yellow-400' }, { num: 10, icon: '♥', color: 'text-red-500' }, { num: 11, icon: '●', color: 'text-blue-500' }, { num: 12, icon: '■', color: 'text-green-500' },
        { num: 13, icon: '★', color: 'text-yellow-400' }, { num: 14, icon: '♥', color: 'text-red-500' }, { num: 15, icon: '●', color: 'text-blue-500' }, { num: 16, icon: '■', color: 'text-green-500' },
        { num: 17, icon: '★', color: 'text-yellow-400' }, { num: 18, icon: '♥', color: 'text-red-500' }, { num: 19, icon: '●', color: 'text-blue-500' }, { num: 20, icon: '■', color: 'text-green-500' },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <h1 className="text-4xl font-extrabold text-slate-800 text-center">Counting Adventure <span className="text-teal-500">for Xie Siyan & Sili</span></h1>
            
            <WorksheetCard>
                <SectionHeader icon={<IconNumbers/>} title="1. Learning Numbers 1-20" subtitle="Count the items for each number" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {numbersData.map(({ num, icon, color }) => (
                        <div key={num} className="bg-slate-50 p-3 rounded-lg text-center border">
                            <p className="text-4xl font-extrabold text-slate-800">{num}</p>
                            {/* ✅ FIXED LOGIC HERE */}
                            <div className={`flex flex-wrap justify-center items-center gap-1 text-2xl mt-2 h-20 ${color}`}>
                                {Array.from({ length: num }).map((_, i) => <span key={i}>{icon}</span>)}
                            </div>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            <WorksheetCard>
                <SectionHeader icon={<IconNumbers/>} title="2. Number Stories" subtitle="Read the stories and answer the questions" />
                <div className="space-y-8">
                    {stories.map((story, index) => (
                        <div key={story.id} className={`grid md:grid-cols-2 gap-8 items-center ${index < stories.length - 1 ? 'border-b pb-8 mb-8' : ''}`}>
                            <div className="space-y-6">
                                <div className="bg-teal-50 p-6 rounded-lg border-l-4 border-teal-400">
                                    <h3 className="text-xl font-bold text-teal-800 mb-2">{story.title}</h3>
                                    <p className="text-2xl text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: story.text }} />
                                </div>
                                <div className="space-y-4">
                                    {story.questions.map(q => {
                                        const hasAnswered = storyAnswers[q.id];
                                        return (
                                            <div key={q.id}>
                                                <p className="text-xl text-slate-700">{q.text}</p>
                                                <div className="flex space-x-2 mt-2">
                                                    {q.options.map(option => {
                                                        let buttonClass = 'bg-slate-200 hover:bg-slate-300';
                                                        if (hasAnswered) {
                                                            if (option === q.answer) buttonClass = 'bg-green-500 text-white';
                                                            else if (option === storyAnswers[q.id]) buttonClass = 'bg-red-500 text-white';
                                                            else buttonClass = 'bg-slate-200 opacity-50';
                                                        }
                                                        return ( <button key={option} onClick={() => handleStoryAnswer(q.id, option)} className={`px-4 py-2 rounded-lg text-lg transition-colors ${buttonClass}`} disabled={hasAnswered}>{option}</button> );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="flex items-center justify-center">{story.svg}</div>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            <WorksheetCard>
                <SectionHeader icon={<IconNumbers/>} title="3. Count and Match" subtitle="Click an item, then click the correct number" />
                {isFinished && (
                    <div className="text-center py-10">
                        <h2 className="text-4xl font-bold text-green-500">Great Job! You did it!</h2>
                        <button onClick={() => { setCorrectMatches([]); setSelectedItem(null); }} className="mt-6 px-6 py-3 bg-green-500 text-white font-bold rounded-lg">Play Again</button>
                    </div>
                )}
                {!isFinished && (
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            {itemsToCount.map(item => {
                                const isCorrect = correctMatches.includes(item.id);
                                const isSelected = selectedItem?.id === item.id;
                                const isIncorrect = incorrectAttempt === item.id;
                                return ( <button key={item.id} onClick={() => handleItemSelect(item)} disabled={isCorrect} className={`w-full p-4 rounded-lg border-4 transition-all duration-200 ${isCorrect ? 'border-green-500 bg-green-50' : ''} ${isSelected ? 'border-blue-500 scale-105' : 'border-slate-200'} ${isIncorrect ? 'border-red-500 animate-shake' : ''} ${!isCorrect && 'hover:border-blue-400'}`}> <svg viewBox="0 0 100 80" className="w-full h-16">{item.el}</svg> </button> );
                            })}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[5,3,1,2,4].sort((a,b)=>a-b).map(number => {
                                const isMatched = correctMatches.some(id => itemsToCount.find(item => item.id === id).count === number);
                                return ( <button key={number} onClick={() => handleNumberSelect(number)} disabled={isMatched} className={`p-4 rounded-lg flex items-center justify-center text-5xl font-extrabold transition-all ${isMatched ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'}`}> {isMatched ? <SvgCheck/> : number} </button> );
                            })}
                        </div>
                    </div>
                )}
            </WorksheetCard>

            <div className="pt-8"><BigButton onClick={() => navigate('/')} className="bg-slate-500 border-slate-600">← Back to Home</BigButton></div>
        </div>
    );
};

export default K5CountingPage;