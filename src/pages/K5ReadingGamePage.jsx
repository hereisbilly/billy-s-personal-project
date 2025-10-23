// src/pages/K5ReadingGamePage.jsx

import React, { useState, useEffect } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

// --- Sound Effects ---
const correctSoundUrl = 'https://actions.google.com/sounds/v1/positive/bell_chime.ogg';
const incorrectSoundUrl = 'https://actions.google.com/sounds/v1/negative/beep_buzzer.ogg';
const winSoundUrl = 'https://actions.google.com/sounds/v1/crowd/battle_crowd_celebrate_stern_01.ogg';
const playSound = (url) => { new Audio(url).play().catch(e => console.error("Error playing sound:", e)); };

const SectionHeader = ({ icon, title, subtitle }) => ( <div className="flex items-center p-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl shadow-lg mb-6"> <div className="flex-shrink-0 bg-white bg-opacity-20 p-3 rounded-full mr-4">{icon}</div> <div> <h2 className="text-2xl font-bold text-white">{title}</h2> <p className="text-rose-100">{subtitle}</p> </div> </div> );
const IconPencil = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;
const SvgCheck = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;

// --- SVG Illustrations for the Game ---
const SvgCat = () => <svg viewBox="0 0 100 80"><rect width="100" height="80" fill="#FFF7ED" rx="10"/><g transform="translate(50 45)"><path d="M-25 25C-30 0 30 0 25 25-20 35 -25 25-25 25Z" fill="#FDBA74"/><circle cx="0" cy="-5" r="18" fill="#FDBA74"/><path d="M-15-15L-20-25-5-15ZM15-15L20-25 5-15Z" fill="#FDBA74"/><circle cx="-7" cy="-5" r="3" fill="#1F2937"/><circle cx="7" cy="-5" r="3" fill="#1F2937"/><path d="M-2 5L2 5M0 2V7" stroke="#A16207" strokeWidth="1.5" strokeLinecap="round"/></g></svg>;
const SvgDog = () => <svg viewBox="0 0 100 80"><rect width="100" height="80" fill="#FEF3C7" rx="10"/><g transform="translate(50 40)"><path d="M-20 30C-20 10 20 10 20 30Z" fill="#A16207"/><circle cx="0" cy="0" r="20" fill="#FBBF24"/><path d="M-30 0C-40-10 -40 20 -30 20ZM30 0C40-10 40 20 30 20Z" fill="#A16207"/><circle cx="-8" cy="-5" r="3" fill="#1F2937"/><circle cx="8" cy="-5" r="3" fill="#1F2937"/><circle cx="0" cy="5" r="5" fill="#A16207"/></g></svg>;
const SvgSun = () => <svg viewBox="0 0 100 80"><rect width="100" height="80" fill="#FEFCE8" rx="10"/><g transform="translate(50 40)"><circle cx="0" cy="0" r="25" fill="#FDE047"/><path d="M0-35V-25M0 35V25M35 0H25M-35 0H-25M25-25L18-18M-25 25L-18 18M-25-25L-18-18M25 25L18 18" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round"/></g></svg>;
const SvgBed = () => <svg viewBox="0 0 100 80"><rect width="100" height="80" fill="#F1F5F9" rx="10"/><g transform="translate(10 20)"><rect width="80" height="40" fill="#94A3B8" rx="5"/><rect y="10" width="80" height="20" fill="white"/><rect y="25" width="80" height="5" fill="#E2E8F0"/><rect x="-5" y="5" width="10" height="30" fill="#64748B" rx="3"/><rect x="5" y="40" width="10" height="10" fill="#475569"/><rect x="65" y="40" width="10" height="10" fill="#475569"/></g></svg>;
const SvgCar = () => <svg viewBox="0 0 100 80"><rect width="100" height="80" fill="#EFF6FF" rx="10"/><g transform="translate(5 20)"><rect x="10" y="20" width="70" height="25" fill="#EF4444" rx="8"/><path d="M20 20L30 5H60L70 20Z" fill="#F87171"/><circle cx="25" cy="45" r="8" fill="#1E293B"/><circle cx="65" cy="45" r="8" fill="#1E293B"/></g></svg>;
const SvgPen = () => <svg viewBox="0 0 100 80"><rect width="100" height="80" fill="#FEF2F2" rx="10"/><g transform="translate(50 40) rotate(45)"><rect x="-40" y="-8" width="80" height="16" fill="#3B82F6" rx="5"/><rect x="-10" y="-8" width="60" height="16" fill="#60A5FA"/><path d="M40 -8L50 0L40 8Z" fill="#1E293B"/></g></svg>;

const gameData = [
    { id: 1, word: 'Cat', Svg: SvgCat },
    { id: 2, word: 'Dog', Svg: SvgDog },
    { id: 3, word: 'Sun', Svg: SvgSun },
    { id: 4, word: 'Bed', Svg: SvgBed },
    { id: 5, word: 'Car', Svg: SvgCar },
    { id: 6, word: 'Pen', Svg: SvgPen },
];

const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

const K5ReadingGamePage = () => {
    const navigate = useNavigate();
    const [pictures, setPictures] = useState([]);
    const [words, setWords] = useState([]);
    // ✅ RENAMED a state variable to fix a major bug
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [correctMatches, setCorrectMatches] = useState([]);
    const [incorrectAttempt, setIncorrectAttempt] = useState(null);

    const initializeGame = () => {
        const shuffledData = shuffle([...gameData]);
        setPictures(shuffledData);
        setWords(shuffle([...shuffledData]));
        setCorrectMatches([]);
        setSelectedPicture(null);
        setIncorrectAttempt(null);
    };

    useEffect(() => {
        initializeGame();
    }, []);

    const handlePictureSelect = (picture) => {
        if (correctMatches.includes(picture.id) || selectedPicture?.id === picture.id) return;
        setSelectedPicture(picture);
        setIncorrectAttempt(null);
    };

    const handleWordSelect = (word) => {
        if (!selectedPicture || correctMatches.includes(word.id)) return;

        if (selectedPicture.id === word.id) {
            setCorrectMatches(prev => [...prev, selectedPicture.id]);
            playSound(correctSoundUrl);
            setSelectedPicture(null);
        } else {
            setIncorrectAttempt(selectedPicture.id);
            playSound(incorrectSoundUrl);
            setTimeout(() => setIncorrectAttempt(null), 500); // Shake animation duration
            setSelectedPicture(null);
        }
    };

    const isFinished = correctMatches.length === gameData.length;
    
    useEffect(() => {
        if (isFinished) {
            playSound(winSoundUrl);
        }
    }, [isFinished]);

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <h1 className="text-4xl font-extrabold text-slate-800 text-center">Picture Word Match <span className="text-pink-500">for Xie Siyan & Sili</span></h1>
            
            <WorksheetCard>
                <SectionHeader icon={<IconPencil/>} title="Let's Play!" subtitle="Click an image, then click the correct word" />
                
                {isFinished && (
                    <div className="text-center py-10">
                        <h2 className="text-5xl font-bold text-green-500">You Win! Excellent!</h2>
                        <BigButton onClick={initializeGame} className="mt-8 bg-green-500 border-green-700 max-w-sm mx-auto">Play Again</BigButton>
                    </div>
                )}

                {!isFinished && (
                    <div className="grid grid-cols-2 gap-6">
                        {/* Pictures to Match */}
                        <div className="space-y-4">
                            {pictures.map(pic => {
                                const isCorrect = correctMatches.includes(pic.id);
                                const isSelected = selectedPicture?.id === pic.id;
                                const isIncorrect = incorrectAttempt === pic.id;
                                return (
                                    <button key={pic.id} onClick={() => handlePictureSelect(pic)} disabled={isCorrect}
                                        className={`w-full p-4 rounded-lg border-4 transition-all duration-200 
                                        ${isCorrect ? 'border-green-500 bg-green-50' : ''}
                                        ${isSelected ? 'border-blue-500 scale-105 shadow-lg' : 'border-slate-200'}
                                        ${isIncorrect ? 'border-red-500 animate-shake' : ''}
                                        ${!isCorrect && 'hover:border-blue-300'}
                                    `}>
                                        <pic.Svg />
                                    </button>
                                );
                            })}
                        </div>

                        {/* Words to Match */}
                        <div className="grid grid-cols-2 gap-4">
                            {words.map(word => {
                                const isMatched = correctMatches.includes(word.id);
                                return (
                                    <button key={word.id} onClick={() => handleWordSelect(word)} disabled={isMatched}
                                        className={`p-4 rounded-lg flex items-center justify-center text-3xl font-extrabold transition-all 
                                        ${isMatched ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-800'}
                                        ${selectedPicture && !isMatched ? 'cursor-pointer hover:bg-slate-200' : ''}
                                    `}>
                                        {isMatched ? <SvgCheck/> : word.word}
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

export default K5ReadingGamePage;