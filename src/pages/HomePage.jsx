import React from 'react';
import { Link } from 'react-router-dom';
import { WorksheetCard } from '../components/common';

const lessons = [
    { id: 'danendra-past-perfect-simple', title: 'Danendra - Past Perfect Simple' },
    { id: 'danendra-passive-voice', title: 'Danendra - Passive Voice' },
    { id: 'diagnostic-quiz', title: 'Diagnostic Quiz' },
    { id: 'danendra-past-continuous', title: 'Danendra - Past Continuous' },
    { id: 'danendra-present-perfect-simple', title: 'Danendra - Present Perfect Simple' },
    { id: 'danendra-future-will-going-to', title: 'Danendra - Future (Will vs Going to)' },
    { id: 'danendra-modal-verbs', title: 'Danendra - Modal Verbs' },
    { id: 'danendra-present-perfect-continuous', title: 'Danendra - Present Perfect Continuous' },
    { id: 'sulthan-refreshment', title: "Sulthan's Refreshment Quiz" },
    { id: 'sulthan-future-simple', title: 'Sulthan - Future Simple' },
    { id: 'sulthan-present-perfect-simple', title: 'Sulthan - Present Perfect Simple' },
    { id: 'basketball-past-simple', title: 'Basketball - Past Simple' },
    { id: 'raja-present-simple', title: 'Raja - Present Simple' },
    { id: 'dodie-patronela-travel-lesson', title: 'Dodie & Patronela - Travel' },
    { id: 'dodie-patronela-problems-lesson', title: 'Dodie & Patronela - Problems' },
    { id: 'dodie-patronela-shopping-lesson', title: 'Dodie & Patronela - Shopping' },
    { id: 'k5-reading-writing', title: 'K5 - Reading & Writing' },
    { id: 'k5-counting', title: 'K5 - Counting' },
    { id: 'k5-reading-game', title: 'K5 - Reading Game' },
];

const HomePage = () => {
    return (
        <div className="bg-slate-100 min-h-screen p-8">
            <div className="max-w-2xl mx-auto">
                <WorksheetCard>
                    <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">ESL Lessons</h1>
                    <ul className="space-y-3">
                        {lessons.map(lesson => (
                            <li key={lesson.id}><Link to={`/lesson/${lesson.id}`} className="block p-3 bg-slate-50 hover:bg-blue-100 rounded-lg text-blue-600 font-semibold transition-colors">{lesson.title}</Link></li>
                        ))}
                    </ul>
                </WorksheetCard>
            </div>
        </div>
    );
};

export default HomePage;