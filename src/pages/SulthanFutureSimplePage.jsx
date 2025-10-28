// src/pages/SulthanFutureSimplePage.jsx

import React from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const SectionHeader = ({ icon, title, subtitle }) => ( <div className="flex items-center p-4 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl shadow-lg mb-6"> <div className="flex-shrink-0 bg-white bg-opacity-20 p-3 rounded-full mr-4">{icon}</div> <div> <h2 className="text-2xl font-bold text-white">{title}</h2> <p className="text-sky-100">{subtitle}</p> </div> </div> );
const IconFuture = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>;

const SvgFuturePlans = () => ( <svg viewBox="0 0 100 60" className="w-full h-auto max-w-xs mx-auto"><rect width="100" height="60" fill="#F0FDF4" rx="10"/><rect x="20" y="10" width="60" height="45" rx="3" fill="white" stroke="#A3A3A3"/><path d="M20 20h60M25 25h50M25 35h50M25 45h30" stroke="#D1FAE5" strokeWidth="2"/><circle cx="85" cy="15" r="8" fill="#FDE047"/></svg> );
const SvgSpontaneous = () => ( <svg viewBox="0 0 100 60" className="w-full h-auto max-w-xs mx-auto"><rect width="100" height="60" fill="#EFF6FF" rx="10"/><path d="M50,10 a20,20 0 1,1 0,40 a20,20 0 1,1 0,-40" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="2"/><path d="M45 20 L 55 30 L 45 40 Z" fill="#3B82F6"/><path d="M70,30 L80,20 L90,30 L80,40 Z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2"/></svg> );

const SulthanFutureSimplePage = () => {
    const navigate = useNavigate();
    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <h1 className="text-4xl font-extrabold text-slate-800 text-center">Module: Future Simple <span className="text-sky-500">for Sulthan</span></h1>
            
            <WorksheetCard>
                <SectionHeader icon={<IconFuture/>} title="1. Definition: Talking about the Future" subtitle="Will vs. Be Going To" />
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                        <h3 className="text-xl font-bold text-green-800 mb-2">Be Going To</h3>
                        <SvgFuturePlans />
                        <p className="text-green-700 mt-4">Use for <strong className="font-semibold">PLANS</strong> you made <strong className="font-semibold">BEFORE</strong> speaking.</p>
                        <p className="mt-2 font-mono text-slate-600">"I <strong className="text-green-600">am going to watch</strong> a movie tonight." (This is my plan.)</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                        <h3 className="text-xl font-bold text-blue-800 mb-2">Will</h3>
                        <SvgSpontaneous />
                        <p className="text-blue-700 mt-4">Use for <strong className="font-semibold">SPONTANEOUS</strong> decisions you make <strong className="font-semibold">NOW</strong>.</p>
                        <p className="mt-2 font-mono text-slate-600">"The phone is ringing. I <strong className="text-blue-600">will answer</strong> it!" (I just decided.)</p>
                    </div>
                </div>
            </WorksheetCard>
            
            <WorksheetCard>
                <SectionHeader icon={<IconFuture/>} title="2. Practice" subtitle="Choose the correct form" />
                 <div className="space-y-6">
                    <div>
                        <h4 className="font-bold text-lg mb-2">1. A: "It's cold in here."</h4>
                        <p className="text-xl text-slate-700">B: "You are right. I ___ close the window."</p>
                        <div className="flex space-x-2 mt-2"><button className="px-4 py-2 bg-blue-200 rounded-lg border-2 border-blue-500">will</button><button className="px-4 py-2 bg-slate-200 rounded-lg">am going to</button></div>
                    </div>
                     <div>
                        <h4 className="font-bold text-lg mb-2">2. A: "Do you have plans for the holiday?"</h4>
                        <p className="text-xl text-slate-700">B: "Yes, my family and I ___ visit our grandmother."</p>
                        <div className="flex space-x-2 mt-2"><button className="px-4 py-2 bg-slate-200 rounded-lg">will</button><button className="px-4 py-2 bg-green-200 rounded-lg border-2 border-green-500">are going to</button></div>
                    </div>
                </div>
            </WorksheetCard>
            
            <WorksheetCard>
                <SectionHeader icon={<IconFuture/>} title="3. Writing: Your Plans" subtitle="Write about what you will do" />
                <div className="space-y-6">
                    <div><label className="font-bold text-lg">1. What are you going to do this weekend? (Your plan)</label><textarea className="w-full mt-2 p-3 border border-slate-300 rounded-lg h-24 resize-none focus:ring-2 focus:ring-sky-400" placeholder="This weekend, I am going to..."></textarea></div>
                    <div><label className="font-bold text-lg">2. Imagine you win the lottery. What is the first thing you will buy? (Spontaneous decision)</label><textarea className="w-full mt-2 p-3 border border-slate-300 rounded-lg h-24 resize-none focus:ring-2 focus:ring-sky-400" placeholder="Wow! I think I will buy..."></textarea></div>
                </div>
            </WorksheetCard>

            <div className="pt-8"><BigButton onClick={() => navigate('/')} className="bg-slate-500 border-slate-600">← Back to Home</BigButton></div>
        </div>
    );
};
export default SulthanFutureSimplePage;