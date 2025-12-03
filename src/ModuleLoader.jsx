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
    'level-1-possessives': lazy(() => import('./pages/Level1PossessiveAdjectivesLesson')),
    'level-1-yes-no-questions': lazy(() => import('./pages/Level1YesNoQuestionsLesson')),
    'level-1-wh-questions': lazy(() => import('./pages/Level1WhQuestionsLesson')),
    // Level 2: Elementary
    'level-2-present-simple': lazy(() => import('./pages/Level2PresentSimpleLesson')),
    'level-2-adjectives': lazy(() => import('./pages/Level2AdjectivesLesson')),
    'level-2-adverbs-frequency': lazy(() => import('./pages/Level2AdverbsFrequencyLesson')),
    'level-2-there-is-are': lazy(() => import('./pages/Level2ThereIsThereAreLesson')),
    'level-2-have-got': lazy(() => import('./pages/Level2HaveGotLesson')),
    'level-2-can-cant': lazy(() => import('./pages/Level2CanCantLesson')),
    'level-2-like-love-hate': lazy(() => import('./pages/Level2LikeLoveHateLesson')),
    'level-2-object-pronouns': lazy(() => import('./pages/Level2ObjectPronounsLesson')),
    'level-2-possessive-pronouns': lazy(() => import('./pages/Level2PossessivePronounsLesson')),
    'level-2-imperatives': lazy(() => import('./pages/Level2ImperativesLesson')),
    'level-2-countable-uncountable': lazy(() => import('./pages/Level2CountableUncountableLesson')),
    'level-2-quantifiers-basic': lazy(() => import('./pages/Level2QuantifiersBasicLesson')),
    'level-2-prepositions-time': lazy(() => import('./pages/Level2PrepositionsTimeLesson')),
    'level-2-wh-questions-present-simple': lazy(() => import('./pages/Level2WhQuestionsPresentSimpleLesson')),
    // Level 3: Pre-Intermediate
    'level-3-was-were': lazy(() => import('./pages/Level3WasWereLesson')),
    'level-3-past-simple': lazy(() => import('./pages/Level3PastSimpleLesson')),
    'level-3-past-simple-negative': lazy(() => import('./pages/Level3PastSimpleNegativeLesson')),
    'level-3-time-expressions': lazy(() => import('./pages/Level3TimeExpressionsLesson')),
    'level-3-going-to': lazy(() => import('./pages/Level3GoingToLesson')),
    'level-3-present-continuous': lazy(() => import('./pages/Level3PresentContinuousLesson')),
    'level-3-future-present-continuous': lazy(() => import('./pages/Level3FuturePresentContinuousLesson')),
    'level-3-modals-obligation': lazy(() => import('./pages/Level3ModalsObligationLesson')),
    'level-3-comparatives': lazy(() => import('./pages/Level3ComparativeAdjectivesLesson')),
    'level-3-superlatives': lazy(() => import('./pages/Level3SuperlativeAdjectivesLesson')),
    'level-3-prepositions-movement': lazy(() => import('./pages/Level3PrepositionsMovementLesson')),
    'level-3-phrasal-verbs': lazy(() => import('./pages/Level3PhrasalVerbsLesson')),
    'level-3-conjunctions': lazy(() => import('./pages/Level3ConjunctionsLesson')),
    // Level 4: Intermediate
    'level-4-present-perfect': lazy(() => import('./pages/Level4PresentPerfectLesson')),
    'level-4-pp-vs-ps': lazy(() => import('./pages/Level4PresentPerfectVsPastSimpleLesson')),
    'level-4-for-since': lazy(() => import('./pages/Level4ForSinceLesson')),
    'level-4-past-continuous': lazy(() => import('./pages/Level4PastContinuousLesson')),
    'level-4-pc-vs-ps': lazy(() => import('./pages/Level4PastContinuousVsPastSimpleLesson')),
    'level-4-will': lazy(() => import('./pages/Level4WillLesson')),
    'level-4-will-vs-going-to': lazy(() => import('./pages/Level4WillVsGoingToLesson')),
    'level-4-modals-deduction': lazy(() => import('./pages/Level4ModalsDeductionLesson')),
    'level-4-conditionals-0-1': lazy(() => import('./pages/Level4Conditionals01Lesson')),
    'level-4-conditional-2': lazy(() => import('./pages/Level4Conditional2Lesson')),
    'level-4-relative-clauses': lazy(() => import('./pages/Level4RelativeClausesLesson')),
    'level-4-passive-voice': lazy(() => import('./pages/Level4PassiveVoiceLesson')),
    'level-4-reported-speech': lazy(() => import('./pages/Level4ReportedSpeechLesson')),
    'level-4-quantifiers': lazy(() => import('./pages/Level4QuantifiersLesson')),
    'level-4-verb-patterns': lazy(() => import('./pages/Level4VerbPatternsLesson')),
    // Level 5: Upper-Intermediate
    'level-5-present-perfect-continuous': lazy(() => import('./pages/Level5PresentPerfectContinuousLesson')),
    'level-5-past-perfect-simple': lazy(() => import('./pages/Level5PastPerfectSimpleLesson')),
    'level-5-past-perfect-continuous': lazy(() => import('./pages/Level5PastPerfectContinuousLesson')),
    'level-5-future-continuous': lazy(() => import('./pages/Level5FutureContinuousLesson')),
    'level-5-future-perfect': lazy(() => import('./pages/Level5FuturePerfectLesson')),
    'level-5-conditional-3': lazy(() => import('./pages/Level5Conditional3Lesson')),
    'level-5-mixed-conditionals': lazy(() => import('./pages/Level5MixedConditionalsLesson')),
    'level-5-wish-if-only': lazy(() => import('./pages/Level5WishIfOnlyLesson')),
    'level-5-modals-deduction-past': lazy(() => import('./pages/Level5ModalsDeductionPastLesson')),
    'level-5-modals-past': lazy(() => import('./pages/Level5ModalsPastLesson')),
    'level-5-relative-clauses-non-defining': lazy(() => import('./pages/Level5RelativeClausesNonDefiningLesson')),
    'level-5-participle-clauses': lazy(() => import('./pages/Level5ParticipleClausesLesson')),
    'level-5-passive-voice-advanced': lazy(() => import('./pages/Level5PassiveVoiceAdvancedLesson')),
    'level-5-reported-speech-advanced': lazy(() => import('./pages/Level5ReportedSpeechAdvancedLesson')),
    'level-5-inversion': lazy(() => import('./pages/Level5InversionLesson')),
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