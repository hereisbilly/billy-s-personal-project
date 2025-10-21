// src/pages/K5CountingPage.jsx
import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const SectionHeader = ({ icon, title, subtitle }) => ( <div className="flex items-center p-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl shadow-lg mb-6"> <div className="flex-shrink-0 bg-white bg-opacity-20 p-3 rounded-full mr-4">{icon}</div> <div> <h2 className="text-2xl font-bold text-white">{title}</h2> <p className="text-cyan-100">{subtitle}</p> </div> </div> );
const IconNumbers = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>;
const SvgCheck = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;

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

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <h1 className="text-4xl font-extrabold text-slate-800 text-center">Counting Adventure <span className="text-teal-500">for Xie Siyan & Sili</span></h1>
            
            <WorksheetCard>
                <SectionHeader icon={<IconNumbers/>} title="Count and Match" subtitle="Click an item, then click the correct number" />
                
                {isFinished && (
                    <div className="text-center py-10">
                        <h2 className="text-4xl font-bold text-green-500">Great Job! You did it!</h2>
                        <button onClick={() => setCorrectMatches([])} className="mt-6 px-6 py-3 bg-green-500 text-white font-bold rounded-lg">Play Again</button>
                    </div>
                )}

                {!isFinished && (
                    <div className="grid grid-cols-2 gap-6">
                        {/* Items to Count */}
                        <div className="space-y-4">
                            {itemsToCount.map(item => {
                                const isCorrect = correctMatches.includes(item.id);
                                const isSelected = selectedItem?.id === item.id;
                                const isIncorrect = incorrectAttempt === item.id;
                                return (
                                    <button key={item.id} onClick={() => handleItemSelect(item)} disabled={isCorrect}
                                        className={`w-full p-4 rounded-lg border-4 transition-all duration-200 
                                        ${isCorrect ? 'border-green-500 bg-green-50' : ''}
                                        ${isSelected ? 'border-blue-500 scale-105' : 'border-slate-200'}
                                        ${isIncorrect ? 'border-red-500 animate-shake' : ''}
                                        ${!isCorrect && 'hover:border-blue-400'}
                                    `}>
                                        <svg viewBox="0 0 100 80" className="w-full h-16">{item.el}</svg>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Numbers to Match */}
                        <div className="grid grid-cols-2 gap-4">
                            {[5,3,1,2,4].sort((a,b)=>a-b).map(number => {
                                const isMatched = correctMatches.some(id => itemsToCount.find(item => item.id === id).count === number);
                                return (
                                    <button key={number} onClick={() => handleNumberSelect(number)} disabled={isMatched}
                                        className={`p-4 rounded-lg flex items-center justify-center text-5xl font-extrabold transition-all 
                                        ${isMatched ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'}
                                    `}>
                                        {isMatched ? <SvgCheck/> : number}
                                    </button>
                                );
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