import React from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { BookOpen, PenSquare } from 'lucide-react';

// Re-usable SectionHeader component from Danendra's lesson
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

const RajaPresentSimpleLesson = () => {
    const navigate = useNavigate();

    return (
        <div className="font-sans bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-12 p-4 md:p-8">
                <h1 className="text-4xl font-extrabold text-slate-800 text-center">Present Simple <span className="text-blue-500">for Raja</span></h1>

                <WorksheetCard>
                    <SectionHeader icon={<BookOpen size={32} className="text-white"/>} title="1. What is Present Simple?" subtitle="For habits, facts, and routines" color="blue" />
                    <div className="text-lg text-slate-700 leading-relaxed">
                        <p className="mb-4">
                            We use the <strong>Present Simple</strong> tense to talk about things that are generally true or happen regularly. It's one of the most common tenses in English!
                        </p>
                        <p className="font-semibold text-slate-800 mb-2">Use it for:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong className="text-blue-600">Habits and Routines:</strong> Actions you do often. <br/><span className="text-sm text-slate-500 italic ml-5">"I <strong className="font-semibold">drink</strong> coffee every morning."</span></li>
                            <li><strong className="text-blue-600">General Facts:</strong> Things that are always true. <br/><span className="text-sm text-slate-500 italic ml-5">"The sun <strong className="font-semibold">rises</strong> in the east."</span></li>
                            <li><strong className="text-blue-600">Schedules:</strong> Future events on a timetable. <br/><span className="text-sm text-slate-500 italic ml-5">"The train <strong className="font-semibold">leaves</strong> at 5 PM."</span></li>
                        </ul>
                    </div>
                </WorksheetCard>

                <WorksheetCard>
                    <SectionHeader icon={<PenSquare size={32} className="text-white"/>} title="2. Sentence Structure" subtitle="How to build sentences" color="orange" />
                    <div className="space-y-6">
                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Positive (+)</h3>
                            <p className="font-mono text-slate-600 mb-2">Subject + verb (+s/es) + ...</p>
                            <p className="text-slate-700">For <code className="bg-slate-200 px-1 rounded">He</code>, <code className="bg-slate-200 px-1 rounded">She</code>, <code className="bg-slate-200 px-1 rounded">It</code>, add <strong>-s</strong> or <strong>-es</strong> to the verb.</p>
                            <p className="mt-2 text-slate-600 italic">"I <strong className="text-green-700">work</strong> from home. She <strong className="text-green-700">works</strong> in an office."</p>
                        </div>

                        <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-400">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Negative (-)</h3>
                            <p className="font-mono text-slate-600 mb-2">Subject + do/does not + verb + ...</p>
                            <p className="text-slate-700">Use <code className="bg-slate-200 px-1 rounded">don't</code> for most subjects, and <code className="bg-slate-200 px-1 rounded">doesn't</code> for He/She/It.</p>
                            <p className="mt-2 text-slate-600 italic">"You <strong className="text-red-700">don't work</strong> on weekends. He <strong className="text-red-700">doesn't like</strong> tea."</p>
                        </div>

                        <div className="p-4 bg-sky-50 rounded-lg border-l-4 border-sky-400">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Question (?)</h3>
                            <p className="font-mono text-slate-600 mb-2">Do/Does + subject + verb + ...?</p>
                            <p className="text-slate-700">Start with <code className="bg-slate-200 px-1 rounded">Do</code> or <code className="bg-slate-200 px-1 rounded">Does</code>.</p>
                            <p className="mt-2 text-slate-600 italic">"<strong className="text-sky-700">Do</strong> they live here? <strong className="text-sky-700">Does</strong> it rain a lot?"</p>
                        </div>
                    </div>
                </WorksheetCard>

                <div className="pt-8 text-center">
                    <BigButton onClick={() => navigate('/')} className="bg-gray-500 border-gray-600"> ← Back to Home </BigButton>
                </div>
            </div>
        </div>
    );
};

export default RajaPresentSimpleLesson;