// src/pages/K5ReadingWritingPage.jsx
import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const SectionHeader = ({ icon, title, subtitle }) => ( <div className="flex items-center p-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl shadow-lg mb-6"> <div className="flex-shrink-0 bg-white bg-opacity-20 p-3 rounded-full mr-4">{icon}</div> <div> <h2 className="text-2xl font-bold text-white">{title}</h2> <p className="text-rose-100">{subtitle}</p> </div> </div> );
const IconPencil = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;

// --- SVG Illustrations for Letters A-J ---
const SvgApple = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><path d="M49,8 C55,8 60,13 60,13 C60,13 62,7 67,7 C72,7 77,12 77,17 C77,22 72,27 67,27 C62,27 60,22 60,22 C60,22 58,28 53,28 C48,28 43,23 43,18 C43,13 44,8 49,8Z" fill="#84CC16"/><path d="M80,40 C85,55 80,75 70,85 C60,95 40,95 30,85 C20,75 15,55 20,40 C25,25 35,25 40,30 C45,35 55,35 60,30 C65,25 75,25 80,40Z" fill="#DC2626"/></svg>;
const SvgAnt = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><ellipse cx="50" cy="70" rx="20" ry="12" fill="#78350F"/><ellipse cx="50" cy="50" rx="15" ry="10" fill="#A16207"/><circle cx="50" cy="30" r="10" fill="#78350F"/><path d="M40 25 L 30 15 M60 25 L 70 15" stroke="#78350F" strokeWidth="4" strokeLinecap="round"/><path d="M38 55 L 20 60 M62 55 L 80 60 M35 75 L 20 85 M65 75 L 80 85 M40 80 L 30 90 M60 80 L 70 90" stroke="#78350F" strokeWidth="4" strokeLinecap="round"/></svg>;
const SvgAlligator = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><path d="M10 50 C 30 40, 70 40, 90 50 L 85 60 C 65 50, 35 50, 15 60 Z" fill="#84CC16"/><path d="M15 50 C 20 45, 25 45, 30 50 L 25 60 Z M35 50 C 40 45, 45 45, 50 50 L 45 60 Z M55 50 C 60 45, 65 45, 70 50 L 65 60 Z M75 50 C 80 45, 85 45, 90 50 L 85 60 Z" fill="white"/><circle cx="75" cy="45" r="5" fill="white"/><circle cx="75" cy="45" r="2" fill="black"/></svg>;
const SvgBall = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><circle cx="50" cy="50" r="40" fill="#3B82F6"/><path d="M50 10 C 70 30, 70 70, 50 90 M50 10 C 30 30, 30 70, 50 90 M10 50 C 30 70, 70 70, 90 50 M10 50 C 30 30, 70 30, 90 50" stroke="white" strokeWidth="4" fill="none"/></svg>;
const SvgBee = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><ellipse cx="50" cy="60" rx="30" ry="20" fill="#FBBF24"/><rect x="30" y="50" width="40" height="5" fill="black"/><rect x="35" y="60" width="30" height="5" fill="black"/><circle cx="70" cy="50" r="8" fill="#FBBF24"/><path d="M30 40 C 20 30, 30 20, 40 25 M70 40 C 80 30, 70 20, 60 25" fill="white" stroke="black" strokeWidth="2" opacity="0.8"/></svg>;
const SvgBanana = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><path d="M30 70 C 40 30, 80 40, 70 80 Q 50 90, 30 70" fill="#FDE047"/><path d="M30 70 C 25 75, 25 80, 32 72 M70 80 C 75 85, 80 85, 72 78" stroke="#A16207" strokeWidth="2" fill="#FDE047"/></svg>;
const SvgCat = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><circle cx="50" cy="60" r="30" fill="#FDBA74"/><path d="M40 50 Q 50 60, 60 50 M40 50 L 30 60 M60 50 L 70 60" stroke="black" strokeWidth="2" fill="none"/><path d="M40 25 L 30 15 L 45 30 Z M60 25 L 70 15 L 55 30 Z" fill="#FDBA74"/></svg>;
const SvgCake = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><path d="M15 80 H 85 L 80 50 H 20 Z" fill="#A16207"/><rect x="20" y="40" width="60" height="10" fill="#F472B6"/><path d="M48 30 L 52 30 L 50 40 Z" fill="#FBBF24"/><circle cx="50" cy="25" r="5" fill="red"/></svg>;
const SvgDog = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><path d="M50 30 C 20 30, 20 70, 40 80 C 40 80, 60 80, 60 80 C 80 70, 80 30, 50 30" fill="#A16207"/><circle cx="50" cy="60" r="10" fill="#FDBA74"/><path d="M45 50 L 55 50" stroke="black" strokeWidth="2"/><path d="M50 55 L 50 65" stroke="black" strokeWidth="2"/><path d="M25 40 C 15 50, 15 70, 25 75 M75 40 C 85 50, 85 70, 75 75" fill="#A16207"/></svg>;
const SvgDuck = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><path d="M20 60 C 30 40, 60 40, 70 55 C 80 70, 50 85, 30 75 C 10 65, 20 60, 20 60" fill="#FDE047"/><circle cx="65" cy="45" r="15" fill="#FDE047"/><circle cx="70" cy="40" r="3" fill="black"/><path d="M75 45 L 85 45" stroke="orange" strokeWidth="4" strokeLinecap="round"/></svg>;
const SvgDoor = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><rect x="25" y="10" width="50" height="80" fill="#A16207" rx="5"/><rect x="30" y="15" width="40" height="70" fill="#78350F" rx="3"/><circle cx="65" cy="50" r="4" fill="#FBBF24"/></svg>;
const SvgElephant = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><circle cx="50" cy="50" r="30" fill="#9CA3AF"/><path d="M80 40 C 95 30, 95 60, 80 60 M20 40 C 5 30, 5 60, 20 60" fill="#9CA3AF"/><path d="M70 50 C 70 80, 50 80, 50 70" stroke="black" strokeWidth="4" fill="none"/></svg>;
const SvgEgg = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><ellipse cx="50" cy="55" rx="25" ry="35" fill="white" stroke="#FDBA74" strokeWidth="4"/></svg>;
const SvgEye = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><path d="M10 50 C 30 30, 70 30, 90 50 C 70 70, 30 70, 10 50" fill="white" stroke="black" strokeWidth="4"/><circle cx="50" cy="50" r="15" fill="#3B82F6"/><circle cx="50" cy="50" r="5" fill="black"/></svg>;
const SvgFish = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><path d="M20 50 C 60 30, 60 70, 20 50" fill="#F97316"/><path d="M80 30 L 20 50 L 80 70 Z" fill="#F97316"/><circle cx="30" cy="45" r="3" fill="white"/></svg>;
const SvgFrog = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><path d="M20 70 C 30 40, 70 40, 80 70 Z" fill="#84CC16"/><circle cx="35" cy="40" r="10" fill="white"/><circle cx="65" cy="40" r="10" fill="white"/><circle cx="35" cy="40" r="5" fill="black"/><circle cx="65" cy="40" r="5" fill="black"/><path d="M30 65 Q 50 75, 70 65" stroke="black" strokeWidth="3" fill="none"/></svg>;
const SvgFlower = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><circle cx="50" cy="50" r="15" fill="#FDE047"/><circle cx="50" cy="25" r="12" fill="#F472B6"/><circle cx="50" cy="75" r="12" fill="#F472B6"/><circle cx="25" cy="50" r="12" fill="#F472B6"/><circle cx="75" cy="50" r="12" fill="#F472B6"/><line x1="50" y1="75" x2="50" y2="90" stroke="#84CC16" strokeWidth="4"/></svg>;
const SvgGrapes = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><circle cx="50" cy="40" r="10" fill="#A78BFA"/><circle cx="40" cy="55" r="10" fill="#A78BFA"/><circle cx="60" cy="55" r="10" fill="#A78BFA"/><circle cx="30" cy="70" r="10" fill="#A78BFA"/><circle cx="50" cy="70" r="10" fill="#A78BFA"/><circle cx="70" cy="70" r="10" fill="#A78BFA"/><path d="M50 40 L 50 20 L 60 20" stroke="#84CC16" strokeWidth="4" fill="none"/></svg>;
const SvgGoat = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><rect x="30" y="40" width="40" height="40" fill="white" rx="10"/><circle cx="50" cy="30" r="15" fill="white"/><path d="M40 20 L 30 10 M60 20 L 70 10" stroke="black" strokeWidth="3"/><path d="M45 50 L 55 50" stroke="black" strokeWidth="2"/><path d="M30 80 L 30 90 M60 80 L 60 90" stroke="black" strokeWidth="3"/></svg>;
const SvgGuitar = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><path d="M50 10 L 40 40 C 20 60, 20 80, 40 90 C 60 100, 80 80, 60 60 L 50 10" fill="#A16207"/><circle cx="50" cy="75" r="10" fill="#FDBA74"/><path d="M45 20 L 55 30 M45 30 L 55 40 M45 40 L 55 50" stroke="white" strokeWidth="1"/></svg>;
const SvgHouse = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><path d="M15 85 H 85 V 45 L 50 15 L 15 45 Z" fill="#FDBA74" stroke="black" strokeWidth="2"/><rect x="40" y="55" width="20" height="30" fill="#A16207"/><rect x="25" y="55" width="10" height="10" fill="#60A5FA"/><rect x="65" y="55" width="10" height="10" fill="#60A5FA"/></svg>;
const SvgHat = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><rect x="15" y="60" width="70" height="10" fill="#334155" rx="5"/><path d="M30 60 C 30 30, 70 30, 70 60" fill="#334155"/><rect x="25" y="55" width="50" height="5" fill="#F87171"/></svg>;
const SvgHeart = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><path d="M50 30 C 30 10, 10 30, 30 50 L 50 70 L 70 50 C 90 30, 70 10, 50 30 Z" fill="#F472B6"/></svg>;
const SvgIceCream = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><path d="M30 80 L 50 20 L 70 80 Z" fill="#FDBA74"/><circle cx="50" cy="20" r="20" fill="#F472B6"/></svg>;
const SvgIgloo = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><path d="M10 80 C 10 40, 90 40, 90 80" fill="white" stroke="black" strokeWidth="2"/><rect x="40" y="60" width="20" height="20" fill="#60A5FA"/><path d="M10 80 H 90 M15 70 H 85 M25 60 H 75" stroke="black" strokeWidth="2"/></svg>;
const SvgIsland = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><rect y="60" width="100" height="40" fill="#60A5FA"/><ellipse cx="50" cy="65" rx="30" ry="10" fill="#FDE047"/><path d="M45 30 L 55 30 L 50 60 Z" fill="#A16207"/><path d="M50 30 C 30 20, 70 20, 50 30" fill="#84CC16"/></svg>;
const SvgJar = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><rect x="30" y="20" width="40" height="10" fill="#78350F"/><rect x="25" y="30" width="50" height="50" fill="#60A5FA" rx="5"/><rect x="30" y="35" width="40" height="40" fill="#3B82F6" rx="3"/></svg>;
const SvgJellyfish = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><path d="M20 50 C 20 20, 80 20, 80 50" fill="#A78BFA"/><path d="M30 50 C 30 60, 25 70, 30 80 M40 50 C 40 60, 35 70, 40 80 M50 50 C 50 60, 45 70, 50 80 M60 50 C 60 60, 55 70, 60 80 M70 50 C 70 60, 65 70, 70 80" stroke="#C4B5FD" strokeWidth="4" fill="none"/></svg>;
const SvgJuice = () => <svg viewBox="0 0 100 100" className="w-24 h-24"><rect x="30" y="30" width="40" height="50" fill="#F97316"/><rect x="25" y="20" width="50" height="10" fill="#FDBA74"/><rect x="65" y="35" width="10" height="20" fill="#FDBA74" rx="5"/><line x1="20" y1="25" x2="30" y2="15" stroke="red" strokeWidth="3"/></svg>;
const SvgBlueCar = () => <svg viewBox="0 0 100 60" className="w-48 h-auto"><rect x="10" y="20" width="80" height="30" rx="10" fill="#3B82F6"/><path d="M20 20 L 30 5 H 70 L 80 20 Z" fill="#60A5FA"/><circle cx="30" cy="50" r="8" fill="#1E293B"/><circle cx="70" cy="50" r="8" fill="#1E293B"/></svg>;
// ✅ NEW, RELEVANT SVG for "Cat and Jar" story
const SvgCatAndJar = () => <svg viewBox="0 0 100 60" className="w-48 h-auto"><rect x="20" y="40" width="60" height="20" fill="#A16207" rx="5"/><rect x="40" y="25" width="20" height="15" fill="#60A5FA" rx="3"/><path d="M65 30 L 80 15 C 85 20, 85 30, 80 35 Z" fill="#FDBA74"/><circle cx="85" cy="25" r="5" fill="#FDBA74"/><path d="M82 23 L 88 23 M82 27 L 88 27" stroke="black" strokeWidth="1"/><path d="M80 15 Q 70 30, 65 40" stroke="#FDBA74" strokeWidth="2" fill="none" strokeDasharray="2 3"/></svg>;
const SvgFrogWithHat = () => <svg viewBox="0 0 100 60" className="w-48 h-auto"><path d="M20 60 C 30 30, 70 30, 80 60 Z" fill="#84CC16"/><circle cx="35" cy="30" r="10" fill="white"/><circle cx="65" cy="30" r="10" fill="white"/><circle cx="35" cy="30" r="5" fill="black"/><circle cx="65" cy="30" r="5" fill="black"/><path d="M30 55 Q 50 65, 70 55" stroke="black" strokeWidth="3" fill="none"/><rect x="30" y="10" width="40" height="5" fill="#166534" rx="2"/><path d="M35 10 C 35 0, 65 0, 65 10" fill="#166534"/></svg>;

// ✅ NEW, RELIABLE component for tracing letters
const TraceableLetter = ({ letter, colorClass }) => (
    <div className="p-2 rounded-lg bg-slate-100 flex items-center justify-center aspect-square">
        <svg viewBox="0 0 32 32" className="w-full h-full">
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
                className={`font-extrabold ${colorClass}`} 
                fontSize="28" 
                strokeWidth="1.5"
                stroke="currentColor" 
                fill="transparent"
            >
                {letter}
            </text>
        </svg>
    </div>
);

const K5ReadingWritingPage = () => {
    const navigate = useNavigate();
    const [storyAnswers, setStoryAnswers] = useState({});

    const stories = [
        { id: 'car', title: 'The Car', text: 'The car is blue.<br/>It has 4 wheels.<br/>Look at it go!', svg: <SvgBlueCar/>, questions: [{id: 'q1', text: 'The car is ___.', options: ['blue', 'red'], answer: 'blue'}, {id: 'q2', text: 'It has ___ wheels.', options: ['2', '4'], answer: '4'}] },
        { id: 'cat', title: 'The Cat and the Jar', text: 'A jar is on a box.<br/>A cat jumps on the box.', svg: <SvgCatAndJar/>, questions: [{id: 'q3', text: 'A ___ is on a box.', options: ['jar', 'jug'], answer: 'jar'}, {id: 'q4', text: 'A cat ___ on the box.', options: ['sits', 'jumps'], answer: 'jumps'}] },
        { id: 'frog', title: 'The Frog', text: 'A frog has a hat.<br/>The hat is green.<br/>The frog is happy.', svg: <SvgFrogWithHat/>, questions: [{id: 'q5', text: 'The hat is ___.', options: ['green', 'grey'], answer: 'green'}, {id: 'q6', text: 'The frog is ___.', options: ['hungry', 'happy'], answer: 'happy'}] },
    ];

    const handleStoryAnswer = (questionId, selectedOption) => {
        setStoryAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
    };

    const letterData = [
        { letter: 'A', examples: [{ word: 'Apple', svg: <SvgApple/> }, { word: 'Ant', svg: <SvgAnt/> }, { word: 'Alligator', svg: <SvgAlligator/> }] },
        { letter: 'B', examples: [{ word: 'Ball', svg: <SvgBall/> }, { word: 'Bee', svg: <SvgBee/> }, { word: 'Banana', svg: <SvgBanana/> }] },
        { letter: 'C', examples: [{ word: 'Cat', svg: <SvgCat/> }, { word: 'Cake', svg: <SvgCake/> }, { word: 'Car', svg: <SvgBlueCar/> }] },
        { letter: 'D', examples: [{ word: 'Dog', svg: <SvgDog/> }, { word: 'Duck', svg: <SvgDuck/> }, { word: 'Door', svg: <SvgDoor/> }] },
        { letter: 'E', examples: [{ word: 'Elephant', svg: <SvgElephant/> }, { word: 'Egg', svg: <SvgEgg/> }, { word: 'Eye', svg: <SvgEye/> }] },
        { letter: 'F', examples: [{ word: 'Fish', svg: <SvgFish/> }, { word: 'Frog', svg: <SvgFrog/> }, { word: 'Flower', svg: <SvgFlower/> }] },
        { letter: 'G', examples: [{ word: 'Grapes', svg: <SvgGrapes/> }, { word: 'Goat', svg: <SvgGoat/> }, { word: 'Guitar', svg: <SvgGuitar/> }] },
        { letter: 'H', examples: [{ word: 'House', svg: <SvgHouse/> }, { word: 'Hat', svg: <SvgHat/> }, { word: 'Heart', svg: <SvgHeart/> }] },
        { letter: 'I', examples: [{ word: 'Ice Cream', svg: <SvgIceCream/> }, { word: 'Igloo', svg: <SvgIgloo/> }, { word: 'Island', svg: <SvgIsland/> }] },
        { letter: 'J', examples: [{ word: 'Jar', svg: <SvgJar/> }, { word: 'Jellyfish', svg: <SvgJellyfish/> }, { word: 'Juice', svg: <SvgJuice/> }] },
    ];

    const uppercaseAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const lowercaseAlphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const colors = ['text-red-500', 'text-orange-500', 'text-yellow-500', 'text-lime-500', 'text-green-500', 'text-teal-500', 'text-cyan-500', 'text-sky-500', 'text-blue-500', 'text-indigo-500', 'text-violet-500', 'text-purple-500', 'text-fuchsia-500', 'text-pink-500', 'text-rose-500'];

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <h1 className="text-4xl font-extrabold text-slate-800 text-center">Reading & Writing</h1>

            <WorksheetCard>
                <SectionHeader icon={<IconPencil/>} title="1. Let's Learn the Alphabet" subtitle="From A to J" />
                <div className="space-y-8">
                    {letterData.map(item => (
                        <div key={item.letter} className="flex flex-col sm:flex-row items-center gap-6 p-4 border-b last:border-b-0">
                            <div className="text-9xl font-extrabold text-rose-300 flex-shrink-0">{item.letter}</div>
                            <div className="grid grid-cols-3 gap-4 w-full">
                                {item.examples.map(ex => (
                                    <div key={ex.word} className="p-2 bg-slate-50 rounded-xl text-center">
                                        {ex.svg}
                                        <p className="text-2xl font-bold mt-1 text-slate-800">{ex.word}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            <WorksheetCard>
                <SectionHeader icon={<IconPencil/>} title="2. Let's Trace Letters" subtitle="Practice writing A to Z" />
                <h3 className="text-2xl font-bold text-slate-700 mb-4">Uppercase Letters</h3>
                <div className="grid grid-cols-6 md:grid-cols-9 gap-2 text-center">
                    {uppercaseAlphabet.map((letter, i) => (
                        <TraceableLetter key={letter} letter={letter} colorClass={colors[i % colors.length]} />
                    ))}
                </div>
                 <h3 className="text-2xl font-bold text-slate-700 mt-8 mb-4">Lowercase Letters</h3>
                <div className="grid grid-cols-6 md:grid-cols-9 gap-2 text-center">
                    {lowercaseAlphabet.map((letter, i) => (
                        <TraceableLetter key={letter} letter={letter} colorClass={colors[i % colors.length]} />
                    ))}
                </div>
                <p className="text-center mt-6 text-slate-500">Your teacher will guide you to trace the letters on screen or on paper!</p>
            </WorksheetCard>

            <WorksheetCard>
                <SectionHeader icon={<IconPencil/>} title="3. Let's Read Stories" subtitle="Read the passages and choose the correct word" />
                <div className="space-y-8">
                {stories.map((story, index) => (
                    <div key={story.id} className={`grid md:grid-cols-2 gap-8 items-center ${index < stories.length - 1 ? 'border-b pb-8 mb-8' : ''}`}>
                        <div className="space-y-6">
                            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                                <h3 className="text-xl font-bold text-blue-800 mb-2">{story.title}</h3>
                                <p className="text-2xl text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: story.text }} />
                            </div>
                            <div className="space-y-4">
                                {story.questions.map(q => {
                                    const hasAnswered = storyAnswers[q.id];
                                    return (
                                        <div key={q.id}>
                                            <p className="text-xl text-slate-700">{q.text.replace('___', '___')}</p>
                                            <div className="flex space-x-2 mt-2">
                                                {q.options.map(option => {
                                                    let buttonClass = 'bg-slate-200 hover:bg-slate-300';
                                                    if (hasAnswered) {
                                                        if (option === q.answer) {
                                                            buttonClass = 'bg-green-500 text-white';
                                                        } else if (option === storyAnswers[q.id]) {
                                                            buttonClass = 'bg-red-500 text-white';
                                                        } else {
                                                            buttonClass = 'bg-slate-200 opacity-50';
                                                        }
                                                    }
                                                    return (
                                                        <button key={option} onClick={() => handleStoryAnswer(q.id, option)} 
                                                            className={`px-4 py-2 rounded-lg text-lg transition-colors ${buttonClass}`}
                                                            disabled={hasAnswered}>
                                                            {option}
                                                        </button>
                                                    );
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

            <div className="pt-8"><BigButton onClick={() => navigate('/')} className="bg-slate-500 border-slate-600">← Back to Home</BigButton></div>
        </div>
    );
};

export default K5ReadingWritingPage;