import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, BarChart2, Zap } from 'lucide-react';

const allModules = {
    'level-1-alphabet': { name: 'The Alphabet & Pronunciation' },
    'level-1-numbers': { name: 'Numbers: Cardinals & Ordinals' },
    'level-1-greetings': { name: 'Greetings & Introductions' },
    'level-1-articles': { name: 'Articles: A / An / The' },
    'level-1-nouns': { name: 'Nouns: Singular vs. Plural' },
    'level-1-pronouns': { name: 'Subject Pronouns' },
    'level-1-tobe': { name: 'The Verb "To Be"' },
    'level-1-sentence-structure': { name: 'Basic Sentence Structure' },
    'level-1-demonstratives': { name: 'Demonstratives: This/That' },
    'level-1-prepositions': { name: 'Prepositions of Place' },
    'level-1-possessives': { name: 'Possessive Adjectives' },
    'level-1-yes-no-questions': { name: 'Yes/No Questions with "To Be"' },
    'level-1-wh-questions': { name: 'Wh- Questions (What, Where, Who)' },
    // Level 2
    'level-2-present-simple': { name: 'Present Simple' },
    'level-2-adjectives': { name: 'Basic Adjectives' },
    'level-2-adverbs-frequency': { name: 'Adverbs of Frequency' },
    'level-2-there-is-are': { name: 'There is / There are' },
    'level-2-have-got': { name: 'Have / Has Got' },
    // Level 3
    'level-3-was-were': { name: 'Past Simple "To Be": Was/Were' },
    'level-3-past-simple': { name: 'Past Simple: Regular & Irregular' },
    'level-3-past-simple-negative': { name: 'Past Simple: Negative & Questions' },
    'level-3-time-expressions': { name: 'Past Time Expressions' },
    'level-3-going-to': { name: 'Future with "Going to"' },
    'level-3-present-continuous': { name: 'Present Continuous (Now)' },
    'level-3-future-present-continuous': { name: 'Present Continuous (Future)' },
    'level-3-modals-obligation': { name: 'Modals: Must, Have to, Should' },
    'level-3-comparatives': { name: 'Comparative Adjectives' },
    'level-3-superlatives': { name: 'Superlative Adjectives' },
    'level-3-prepositions-movement': { name: 'Prepositions of Movement' },
    'level-3-phrasal-verbs': { name: 'Intro to Phrasal Verbs' },
    'level-3-conjunctions': { name: 'Coordinating Conjunctions' },
    // Level 4
    'level-4-present-perfect': { name: 'Present Perfect Simple' },
    'level-4-pp-vs-ps': { name: 'Present Perfect vs. Past Simple' },
    'level-4-for-since': { name: 'Present Perfect Time Markers' },
    'level-4-past-continuous': { name: 'Past Continuous' },
    'level-4-pc-vs-ps': { name: 'Past Continuous vs. Past Simple' },
    'level-4-will': { name: 'Future with "Will"' },
    'level-4-will-vs-going-to': { name: 'Will vs. Going To' },
    'level-4-modals-deduction': { name: 'Modals of Deduction' },
    'level-4-conditionals-0-1': { name: 'Zero & First Conditionals' },
    'level-4-conditional-2': { name: 'Second Conditional' },
    'level-4-relative-clauses': { name: 'Defining Relative Clauses' },
    'level-4-passive-voice': { name: 'Passive Voice (Simple)' },
    'level-4-reported-speech': { name: 'Reported Speech (Statements)' },
    'level-4-quantifiers': { name: 'Advanced Quantifiers' },
    'level-4-verb-patterns': { name: 'Verb Patterns (Gerund/Infinitive)' },
};

const difficultyLevels = [
    {
        name: 'Level 1: Absolute Beginner',
        icon: <BookOpen size={32} />,
        color: 'green',
        description: 'Survival English, forming basic correct sentences.',
        modules: ['level-1-alphabet', 'level-1-numbers', 'level-1-greetings', 'level-1-articles', 'level-1-nouns', 'level-1-pronouns', 'level-1-tobe', 'level-1-sentence-structure', 'level-1-demonstratives', 'level-1-prepositions', 'level-1-possessives', 'level-1-yes-no-questions', 'level-1-wh-questions']
    },
    {
        name: 'Level 2: Elementary',
        icon: <Award size={32} />,
        color: 'amber',
        description: 'Communicating in the present about daily life.',
        modules: ['level-2-present-simple', 'level-2-adjectives', 'level-2-adverbs-frequency', 'level-2-there-is-are', 'level-2-have-got']
    },
    {
        name: 'Level 3: Pre-Intermediate',
        icon: <BarChart2 size={32} />,
        color: 'blue',
        description: 'Talking about the past and future, expanding sentence complexity.',
        modules: ['level-3-was-were', 'level-3-past-simple', 'level-3-past-simple-negative', 'level-3-time-expressions', 'level-3-going-to', 'level-3-present-continuous', 'level-3-future-present-continuous', 'level-3-modals-obligation', 'level-3-comparatives', 'level-3-superlatives', 'level-3-prepositions-movement', 'level-3-phrasal-verbs', 'level-3-conjunctions']
    },
    {
        name: 'Level 4: Intermediate',
        icon: <Zap size={32} />,
        color: 'violet',
        description: 'Nuance, continuous aspects, and hypothesis.',
        modules: ['level-4-present-perfect', 'level-4-pp-vs-ps', 'level-4-for-since', 'level-4-past-continuous', 'level-4-pc-vs-ps', 'level-4-will', 'level-4-will-vs-going-to', 'level-4-modals-deduction', 'level-4-conditionals-0-1', 'level-4-conditional-2', 'level-4-relative-clauses', 'level-4-passive-voice', 'level-4-reported-speech', 'level-4-quantifiers', 'level-4-verb-patterns']
    },
];

const colorClasses = {
    green: { bg: 'bg-green-500', text: 'text-green-800', border: 'border-green-200', sectionBg: 'bg-green-50' },
    blue: { bg: 'bg-blue-500', text: 'text-blue-800', border: 'border-blue-200', sectionBg: 'bg-blue-50' },
    violet: { bg: 'bg-violet-500', text: 'text-violet-800', border: 'border-violet-200', sectionBg: 'bg-violet-50' },
    amber: { bg: 'bg-amber-500', text: 'text-amber-800', border: 'border-amber-200', sectionBg: 'bg-amber-50' },
};

const HomePage = () => {
    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
            <header className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight">
                    Choose Your Difficulty
                </h1>
                <p className="text-lg text-slate-600 mt-2">
                    Select a lesson from any level to begin.
                </p>
            </header>

            <main className="max-w-7xl mx-auto space-y-10">
                {difficultyLevels.map(level => {
                    const colors = colorClasses[level.color];
                    return (
                        <section key={level.name} className={`p-6 rounded-2xl shadow-md ${colors.sectionBg}`}>
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`flex-shrink-0 w-16 h-16 rounded-full ${colors.bg} text-white flex items-center justify-center`}>
                                    {level.icon}
                                </div>
                                <div>
                                    <h2 className={`text-3xl font-bold ${colors.text}`}>{level.name}</h2>
                                    <p className="text-slate-500">{level.description}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {level.modules.map(moduleId => (
                                    <Link
                                        key={moduleId}
                                        to={`/lesson/${moduleId}`}
                                        className={`block p-4 bg-white text-slate-700 font-bold text-center border-b-4 ${colors.border} rounded-xl hover:bg-slate-50 hover:-translate-y-1 transition-all duration-200`}
                                    >
                                        {allModules[moduleId]?.name || 'Unknown Lesson'}
                                    </Link>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </main>

            <footer className="text-center mt-12">
                <p className="text-slate-500">Looking for conversational practice? Access the <Link to="/student/dodie-patronela" className="text-rose-500 font-bold hover:underline">Travel English Module</Link>.</p>
            </footer>
        </div>
    );
};

export default HomePage;