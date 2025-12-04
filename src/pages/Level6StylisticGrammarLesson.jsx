import React from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level6StylisticGrammarLesson = () => {
    const navigate = useNavigate();

    const rules = [
        {
            type: 'Passive Voice in Academic Writing',
            rule: 'Used to create an objective, impersonal tone by focusing on the action or result, not the person doing it.',
            example: 'Instead of "I conducted the experiment," write "The experiment was conducted."'
        },
        {
            type: 'Rhetorical Questions',
            rule: 'A question asked to make a point or create dramatic effect, rather than to get an answer.',
            example: 'After all, who could have predicted such an outcome?'
        },
    ];

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-sky-800 mb-8">Stylistic Grammar & Rhetoric</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">1. Beyond Correctness: Making Choices</h2>
                <p className="text-slate-600 mb-4">Advanced grammar is not just about being correct, but about making stylistic choices to achieve a certain effect, like sounding more formal, objective, or persuasive.</p>
                <div className="space-y-4">
                    {rules.map(r => (
                        <div key={r.type} className="p-4 bg-sky-50 rounded-lg">
                            <p className="font-bold text-sky-800 text-xl">{r.type}</p>
                            <p className="text-slate-600 font-semibold mt-1">{r.rule}</p>
                            <p className="text-slate-500 italic mt-2">Example: {r.example}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">2. Identifying Stylistic Choices</h2>
                <div className="p-4 bg-slate-100 rounded-lg space-y-4 text-lg">
                    <div>
                        <p className="font-semibold">Passive for Objectivity:</p>
                        <p>"The samples <strong>were analyzed</strong> using chromatography." (Focus is on the process, not the researcher).</p>
                    </div>
                    <div>
                        <p className="font-semibold">Rhetorical Question for Engagement:</p>
                        <p>"Is this the best we can do? We must strive for more." (The question engages the reader and sets up the next point).</p>
                    </div>
                </div>
            </WorksheetCard>

            <div className="mt-8 text-center">
                <p className="text-slate-600 mb-4">This is a conceptual lesson. There are no practice exercises.</p>
                <BigButton onClick={() => navigate('/')} className="bg-gray-500 border-gray-600"> ← Back to Home </BigButton>
            </div>
        </div>
    );
};

export default Level6StylisticGrammarLesson;