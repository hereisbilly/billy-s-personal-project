import React from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level6ExceptionsIdiomsLesson = () => {
    const navigate = useNavigate();

    const idioms = [
        { idiom: 'The devil is in the details.', meaning: 'It looks good from a distance, but when you look closer, there are problems.' },
        { idiom: 'Bite the bullet.', meaning: 'Decide to do something difficult or unpleasant that one has been putting off.' },
        { idiom: 'Break a leg.', meaning: 'A way to wish someone good luck, especially before a performance.' },
    ];

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-sky-800 mb-8">Mastering Exceptions & Idiomatic Structures</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">1. When the Rules Don't Apply</h2>
                <p className="text-slate-600 mb-4">True mastery of a language comes from understanding not just the rules, but also the vast number of exceptions and idiomatic expressions where the literal meaning is different from the intended meaning.</p>
                <div className="p-4 bg-sky-50 rounded-lg">
                    <h3 className="font-bold text-sky-800 text-xl">Key Idea</h3>
                    <p className="text-slate-700 mt-1">Idioms and exceptions cannot be figured out from grammar rules alone. They must be learned and memorized through exposure and practice.</p>
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-sky-700 mb-4">2. Common Idioms</h2>
                <p className="text-slate-600 mb-4">The meaning of these phrases cannot be understood by looking at the individual words.</p>
                <div className="space-y-4">
                    {idioms.map(i => (
                        <div key={i.idiom} className="p-4 bg-sky-50 rounded-lg">
                            <p className="font-bold text-sky-800 text-xl">"{i.idiom}"</p>
                            <p className="text-slate-600 font-semibold mt-1">Meaning: {i.meaning}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            <div className="mt-8 text-center">
                <p className="text-slate-600 mb-4">This is a conceptual lesson. The best practice is to read widely and notice these structures in the wild!</p>
                <BigButton onClick={() => navigate('/')} className="bg-gray-500 border-gray-600"> ← Back to Home </BigButton>
            </div>
        </div>
    );
};

export default Level6ExceptionsIdiomsLesson;