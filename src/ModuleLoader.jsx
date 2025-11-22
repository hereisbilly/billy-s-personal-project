import React, { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { WorksheetCard } from './components/common';

// Create a map of module IDs to their dynamic import paths.
const moduleMap = {
    'danendra-past-perfect-simple': lazy(() => import('./pages/DanendraPastPerfectSimpleLesson')),
    'danendra-passive-voice': lazy(() => import('./pages/DanendraPassiveVoiceLesson')),
    // Add other existing and future modules here...
    'diagnostic-quiz': lazy(() => import('./pages/DiagnosticQuiz')),
    'danendra-past-continuous': lazy(() => import('./pages/DanendraPastContinuousLesson')),
    'danendra-present-perfect-simple': lazy(() => import('./pages/DanendraPresentPerfectSimpleLesson')),
    'danendra-future-will-going-to': lazy(() => import('./pages/DanendraFutureWillGoingToLesson')),
    'danendra-modal-verbs': lazy(() => import('./pages/DanendraModalVerbsLesson')),
    'danendra-present-perfect-continuous': lazy(() => import('./pages/DanendraPresentPerfectContinuousLesson')),
    'sulthan-refreshment': lazy(() => import('./pages/SulthanRefreshment')),
    'sulthan-future-simple': lazy(() => import('./pages/SulthanFutureSimpleLesson')),
    'sulthan-present-perfect-simple': lazy(() => import('./pages/SulthanPresentPerfectSimpleLesson')),
    'basketball-past-simple': lazy(() => import('./pages/BasketballPastSimple')),
    'raja-present-simple': lazy(() => import('./pages/RajaPresentSimpleLesson')),
    'dodie-patronela-travel-lesson': lazy(() => import('./pages/DodiePatronelaTravelLesson')),
    'dodie-patronela-problems-lesson': lazy(() => import('./pages/DodiePatronelaProblemsLesson')),
    'dodie-patronela-shopping-lesson': lazy(() => import('./pages/DodiePatronelaShoppingLesson')),
    'k5-reading-writing': lazy(() => import('./pages/K5ReadingWriting')),
    'k5-counting': lazy(() => import('./pages/K5Counting')),
    'k5-reading-game': lazy(() => import('./pages/K5ReadingGame')),
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