import React, { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { WorksheetCard } from './components/common';

const moduleMap = {
    'dodie-patronela-problems-lesson': lazy(() => import('./pages/DodiePatronelaProblemsLesson')),
    'dodie-patronela-shopping-lesson': lazy(() => import('./pages/DodiePatronelaShoppingLesson')),
    'dodie-patronela-directions': lazy(() => import('./pages/DodiePetronelaDirectionsLesson')),
    // Level 1: Absolute Beginner
    'level-1-alphabet': lazy(() => import('./pages/Level1AlphabetLesson')),
    'level-1-numbers': lazy(() => import('./pages/Level1NumbersLesson')),
    'level-1-greetings': lazy(() => import('./pages/Level1GreetingsLesson')),
    'level-1-articles': lazy(() => import('./pages/Level1ArticlesLesson')),
    'level-1-nouns': lazy(() => import('./pages/Level1NounsLesson')),
    'level-1-pronouns': lazy(() => import('./pages/Level1PronounsLesson')),
    'level-1-tobe': lazy(() => import('./pages/Level1ToBeLesson')),
    'level-1-sentence-structure': lazy(() => import('./pages/Level1SentenceStructureLesson')),
    'level-1-demonstratives': lazy(() => import('./pages/Level1DemonstrativesLesson')),
    'level-1-prepositions': lazy(() => import('./pages/Level1PrepositionsLesson')),
    // Level 3: Pre-Intermediate
    'level-3-was-were': lazy(() => import('./pages/Level3WasWereLesson')),
    'level-3-past-simple': lazy(() => import('./pages/Level3PastSimpleLesson')),
    'level-3-past-simple-negative': lazy(() => import('./pages/Level3PastSimpleNegativeLesson')),
    'level-3-time-expressions': lazy(() => import('./pages/Level3TimeExpressionsLesson')),
};

const ModuleLoader = () => {
    const { moduleId } = useParams();
    const ModuleComponent = moduleMap[moduleId];

    if (!ModuleComponent) {
        return <WorksheetCard><h2>Module not found!</h2></WorksheetCard>;
    }

    return (
        <Suspense fallback={<WorksheetCard><h2>Loading lesson...</h2></WorksheetCard>}>
            <ModuleComponent />
        </Suspense>
    );
};

export default ModuleLoader;