// src/pages/BasketballPastSimplePage.jsx

import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import TTSButton from '../components/TTSButton'; // The new TTS component

// --- Ikon & SVG ---
const IconBasketball = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 21a9 9 0 01-4.97-17.38M15 3a9 9 0 014.97 17.38" /><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" /><path strokeLinecap="round" strokeLinejoin="round" d="M17.38 4.97A9.002 9.002 0 0121 12M3 12a9.002 9.002 0 013.62-7.03" /></svg>;
const SectionHeader = ({ icon, title, subtitle }) => ( <div className="flex items-center p-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl shadow-lg mb-6"> <div className="flex-shrink-0 bg-white bg-opacity-20 p-3 rounded-full mr-4">{icon}</div> <div> <h2 className="text-2xl font-bold text-white">{title}</h2> <p className="text-amber-100">{subtitle}</p> </div> </div> );

// --- Ilustrasi SVG Kustom untuk Tema Bola Basket ---
const SvgBasketballTimeline = () => ( <svg viewBox="0 0 200 60" className="w-full my-4 h-auto"><line x1="10" y1="30" x2="190" y2="30" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrow)" /><defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af" /></marker></defs><g transform="translate(40 30)"><circle r="5" fill="#f87171"/><path d="M-15 -20 L 0 -5 L 15 -20" stroke="#ef4444" strokeWidth="2" fill="none" strokeLinecap="round"/><text y="20" textAnchor="middle" fontSize="8" fill="#ef4444" fontWeight="bold">Yesterday</text></g><g transform="translate(170 30)"><circle r="6" fill="#22c55e" stroke="white" strokeWidth="2"/><text y="20" textAnchor="middle" fontSize="8" fill="#16a34a" fontWeight="bold">Now</text></g></svg> );
const SvgReadingIllustration = () => ( <svg viewBox="0 0 200 150" className="w-full h-auto rounded-lg mb-4 md:float-right md:w-1/3 ml-4"><rect width="200" height="150" fill="#FFF7ED"/><path d="M20 130 H 180" stroke="#FDBA74" strokeWidth="4" strokeLinecap="round"/><circle cx="50" cy="70" r="15" fill="#FBBF24"/><rect x="35" y="80" width="30" height="40" rx="5" fill="#0284C7"/><path d="M40 65 Q 50 60, 60 65" stroke="#1F2937" strokeWidth="1.5"/><circle cx="150" cy="70" r="15" fill="#FDE047"/><rect x="135" y="80" width="30" height="40" rx="5" fill="#DC2626"/><path d="M140 65 Q 150 60, 160 65" stroke="#1F2937" strokeWidth="1.5"/><circle cx="100" cy="30" r="10" fill="#F97316"/><path d="M100 40 V 60 L 80 75 M100 40 V 60 L 120 75" stroke="#F97316" strokeWidth="3" fill="none" strokeLinecap="round"/></svg> );
const SvgWritingIllustration = () => ( <svg viewBox="0 0 100 60" className="w-full h-24 mx-auto mb-4 text-slate-300"><path d="M30 50 L70 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /><path d="M65 5 L 70 10 L 60 15 Z" fill="currentColor" /><rect x="20" y="20" width="60" height="40" fill="#f1f5f9" rx="3"/><path d="M25 25h50 M25 35h50 M25 45h30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> );
const SvgListeningSpeaking = () => ( <svg viewBox="0 0 100 60" className="w-24 h-24 mx-auto mb-4 text-amber-500"><circle cx="30" cy="20" r="8" fill="currentColor"/><path d="M22 28 C 22 40 38 40 38 28" fill="currentColor"/><circle cx="70" cy="20" r="8" fill="currentColor"/><path d="M62 28 C 62 40 78 40 78 28" fill="currentColor"/><path d="M40 30 Q 50 15, 60 30" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M42 35 Q 50 45, 58 35" stroke="currentColor" strokeWidth="2" fill="none"/></svg> );
const SvgHoop = () => ( <svg viewBox="0 0 100 60" className="w-full h-auto max-w-xs mx-auto"><rect x="40" y="5" width="20" height="15" fill="white" stroke="#334155" strokeWidth="2"/><line x1="50" y1="20" x2="50" y2="25" stroke="#334155" strokeWidth="2"/><ellipse cx="50" cy="28" rx="15" ry="5" fill="none" stroke="#F97316" strokeWidth="3"/><path d="M35 30 L 40 50 L 60 50 L 65 30" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round"/></svg> );
const SvgReview = () => ( <svg viewBox="0 0 100 60" className="w-24 h-24 mx-auto text-slate-400"><rect x="20" y="10" width="60" height="45" rx="3" fill="#f1f5f9"/><path d="M30 20 l10 10 m-10 0 l10 -10" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"/><path d="M30 40 l10 10 l20 -20" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round"/><path d="M50 25 h30 M50 45 h30" stroke="currentColor" strokeWidth="2"/></svg> );


const BasketballPastSimplePage = () => {
    const navigate = useNavigate();
    const [readingAnswers, setReadingAnswers] = useState({ q1: '', q2: '', q3: '', q4: '', q5: '' });
    const [readingFeedback, setReadingFeedback] = useState({});
    const [gameInput, setGameInput] = useState('');
    const [gameFeedback, setGameFeedback] = useState('');
    const [currentGameVerbIndex, setCurrentGameVerbIndex] = useState(0);

    const story = "Last Saturday, our school basketball team played in the final match. The game started at 4 PM. In the first half, the other team scored ten points quickly. Our team did not give up. Our best player, Budi, passed the ball to Adi. Adi jumped high and scored a three-point basket! The crowd shouted with excitement. We won the game by one point in the last second. It was an amazing day.";
    const readingQuestions = [ { id: 'q1', question: "When did the team play?", keywords: ['last saturday'] }, { id: 'q2', question: "What did the other team do in the first half?", keywords: ['scored', 'ten', 'points'] }, { id: 'q3', question: "Who passed the ball to Adi?", keywords: ['budi'] }, { id: 'q4', question: "What did Adi do?", keywords: ['jumped', 'scored', 'three-point'] }, { id: 'q5', question: "How did the crowd feel?", keywords: ['shouted', 'excitement'] } ];
    const gameVerbs = [{ p: 'play', a: 'played' }, { p: 'start', a: 'started' }, { p: 'score', a: 'scored' }, { p: 'pass', a: 'passed' }, { p: 'jump', a: 'jumped' }, { p: 'shout', a: 'shouted' }, { p: 'win', a: 'won' }, { p: 'feel', a: 'felt' }];
    
    const handleReadingAnswerChange = (id, value) => setReadingAnswers(prev => ({ ...prev, [id]: value }));
    const checkReadingAnswer = (id) => { const question = readingQuestions.find(q => q.id === id); const userAnswer = readingAnswers[id].toLowerCase(); const isCorrect = question.keywords.every(keyword => userAnswer.includes(keyword)); setReadingFeedback(prev => ({ ...prev, [id]: isCorrect ? 'correct' : 'incorrect' })); };
    const checkGameAnswer = () => { const currentVerb = gameVerbs[currentGameVerbIndex]; if (gameInput.trim().toLowerCase() === currentVerb.a) { setGameFeedback('Swish! Correct!'); } else { setGameFeedback(`Miss! The correct answer is: ${currentVerb.a}`); } };
    const nextGameVerb = () => { if (currentGameVerbIndex < gameVerbs.length - 1) { setCurrentGameVerbIndex(prev => prev + 1); setGameInput(''); setGameFeedback(''); } else { setGameFeedback('Game Over! Great job!'); } };

    return (
        <div className="space-y-12">
            <section id="definition">
                <SectionHeader icon={<IconBasketball />} title="1. Past Simple: Basketball Edition" subtitle="For Danendra Marta" />
                <WorksheetCard>
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div>
                            <p className="text-lg leading-relaxed mb-4">We use the Past Simple to talk about actions that are <strong className="text-orange-600">finished</strong>. For basketball, we can describe a game that already happened.</p>
                            <div className="grid grid-cols-1 gap-4 text-center">
                                <div className="p-4 bg-green-50 rounded-lg"><h3 className="font-bold text-green-800">Affirmative (+)</h3><p>"I <strong className="bg-green-200 px-1">played</strong> basketball yesterday."</p></div>
                                <div className="p-4 bg-red-50 rounded-lg"><h3 className="font-bold text-red-800">Negative (-)</h3><p>"I <strong className="bg-red-200 px-1">did not play</strong> yesterday."</p></div>
                                <div className="p-4 bg-blue-50 rounded-lg"><h3 className="font-bold text-blue-800">Question (?)</h3><p>"<strong className="bg-blue-200 px-1">Did you play</strong> yesterday?"</p></div>
                            </div>
                        </div>
                        <div><SvgBasketballTimeline /></div>
                    </div>
                </WorksheetCard>
            </section>

            <section id="reading">
                <SectionHeader icon={<IconBasketball />} title="2. Reading: The Final Match" subtitle="Read the story and answer the questions" />
                <WorksheetCard>
                    <div className="md:flex md:gap-8 items-start">
                        <div className="flex-1">
                            <div className="flex items-start gap-4 mb-6">
                                <TTSButton text={story.replace(/<[^>]+>/g, '')} />
                                <p className="text-lg text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: story.replace(/\b(played|started|scored|did not give up|passed|jumped|shouted|won|was)\b/g, '<strong class="text-orange-600 font-semibold">$&</strong>') }} />
                            </div>
                        </div>
                        <div className="flex-shrink-0 w-full md:w-56"><SvgReadingIllustration /></div>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-800 mt-8 mb-4 clear-both pt-2">Answer the questions:</h3>
                    <div className="space-y-4">
                        {readingQuestions.map(q => (
                            <div key={q.id}>
                                <label htmlFor={q.id} className="font-semibold text-slate-700">{q.question}</label>
                                <div className="flex items-center space-x-2 mt-1">
                                    <input type="text" id={q.id} value={readingAnswers[q.id]} onChange={(e) => handleReadingAnswerChange(q.id, e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none" placeholder="Type your answer here..." disabled={!!readingFeedback[q.id]} />
                                    <button onClick={() => checkReadingAnswer(q.id)} disabled={!!readingFeedback[q.id]} className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:bg-slate-300">Check</button>
                                </div>
                                {readingFeedback[q.id] && (<p className={`mt-1 text-sm font-bold ${readingFeedback[q.id] === 'correct' ? 'text-green-600' : 'text-red-600'}`}> {readingFeedback[q.id] === 'correct' ? '✓ Correct! Good job.' : '✗ Not quite, try again or check the story.'} </p>)}
                            </div>
                        ))}
                    </div>
                </WorksheetCard>
            </section>
            
            {/* The rest of the sections remain the same */}
            <section id="writing">
                <SectionHeader icon={<IconBasketball />} title="3. Writing: Your Game Story" subtitle="Write about a game you played or watched" />
                <WorksheetCard>
                    <SvgWritingIllustration />
                    <p className="text-lg mb-4 text-center">Write a short paragraph (3-5 sentences) about a basketball game. It can be real or imaginary!</p>
                    <textarea className="w-full mt-2 p-3 border border-slate-300 rounded-lg h-32 resize-none focus:ring-2 focus:ring-amber-400" placeholder="For example: Last week, I watched a great game. The Lakers played against the Celtics..."></textarea>
                </WorksheetCard>
            </section>

            <section id="listening-speaking">
                <SectionHeader icon={<IconBasketball />} title="4 & 5. Listening & Speaking" subtitle="Practice your skills" />
                <WorksheetCard>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="text-center">
                            <SvgListeningSpeaking />
                            <h3 className="font-bold text-xl mb-2">Listening & Speaking</h3>
                            <p className="mb-4">Your teacher will play an audio clip about a player's practice last week. Listen carefully.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-xl mb-2">Speaking</h3>
                            <p className="mb-2">Answer these questions with your teacher:</p>
                            <ul className="list-disc list-inside space-y-1 text-slate-600">
                                <li>What did you do last weekend?</li>
                                <li>Did you watch any basketball games last month?</li>
                                <li>Describe one cool thing you saw in a game.</li>
                            </ul>
                        </div>
                    </div>
                </WorksheetCard>
            </section>

            <section id="game">
                <SectionHeader icon={<IconBasketball />} title="6. Interactive Game: Verb Shootout" subtitle="Change the verb to the Past Simple form to score!" />
                <WorksheetCard>
                    <div className="text-center">
                        <SvgHoop />
                        <div className="bg-slate-800 text-white p-4 rounded-lg my-4 inline-block">
                            <p className="text-sm uppercase text-slate-400">Verb (Present)</p>
                            <p className="text-4xl font-bold tracking-widest">{gameVerbs[currentGameVerbIndex].p}</p>
                        </div>
                        <div className="flex justify-center items-center space-x-2">
                            <input type="text" value={gameInput} onChange={e => setGameInput(e.target.value)} className="w-full max-w-sm p-3 text-center text-2xl border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="Type past tense..." disabled={!!gameFeedback} />
                            {!gameFeedback ? ( <BigButton onClick={checkGameAnswer} className="w-auto bg-orange-500 border-orange-700 !text-base">Shoot!</BigButton> ) : ( <BigButton onClick={nextGameVerb} className="w-auto bg-slate-500 border-slate-700 !text-base">Next →</BigButton> )}
                        </div>
                        {gameFeedback && ( <p className={`mt-4 text-xl font-bold ${gameFeedback.includes('Swish') ? 'text-green-600' : 'text-red-600'}`}>{gameFeedback}</p> )}
                    </div>
                </WorksheetCard>
            </section>
            
            <section id="review">
                <SectionHeader icon={<IconBasketball />} title="7. Review & Practice" subtitle="Final exercises" />
                <WorksheetCard>
                    <div className="text-center">
                        <SvgReview />
                        <h3 className="text-xl font-bold mt-4">Flashcard Practice</h3>
                        <p className="text-slate-600 mt-2 text-lg">Your teacher will now show you flashcards with verbs. Say the Past Simple form aloud!</p>
                        <p className="mt-2 font-mono text-xl">Example: see → <span className="font-bold">saw</span></p>
                    </div>
                </WorksheetCard>
            </section>

             <div className="pt-8">
                <BigButton onClick={() => navigate('/')} className="bg-slate-500 border-slate-600">
                    ← Back to Home
                </BigButton>
            </div>
        </div>
    );
};

export default BasketballPastSimplePage;