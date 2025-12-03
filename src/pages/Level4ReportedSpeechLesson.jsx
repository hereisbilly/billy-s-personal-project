import React, { useState } from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const Level4ReportedSpeechLesson = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    const tenseShifts = [
        { direct: 'Present Simple ("I work")', reported: 'Past Simple ("...she worked")' },
        { direct: 'Present Continuous ("I am working")', reported: 'Past Continuous ("...she was working")' },
        { direct: 'Past Simple ("I worked")', reported: 'Past Perfect ("...she had worked")' },
    ];

    const quizQuestions = [
        { direct: '"I am tired."', reported: "She said she was tired." },
        { direct: '"He is studying."', reported: "She said he was studying." },
        { direct: '"They went to the cinema."', reported: "She said they had gone to the cinema." },
    ];

    const handleAnswerChange = (index, value) => {
        setAnswers(prev => ({ ...prev, [index]: value }));
    };

    const checkAnswer = (index) => {
        const userAnswer = answers[index]?.trim().replace(/\.$/, '').toLowerCase();
        const correctAnswer = quizQuestions[index].reported.replace(/\.$/, '').toLowerCase();
        setFeedback(prev => ({ ...prev, [index]: userAnswer === correctAnswer }));
    };

    return (
        <div className="p-4 sm:p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-violet-800 mb-8">The Gossip Column: Reported Speech</h1>

            {/* 1. The Rule Zone */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">1. Reporting What Someone Said</h2>
                <p className="text-slate-600 mb-4">When we report what someone said, we usually move the tense one step back into the past. This is called "backshift".</p>
                <div className="space-y-2">
                    {tenseShifts.map(t => (
                        <div key={t.direct} className="p-3 bg-violet-50 rounded-lg">
                            <p className="font-semibold text-violet-800">{t.direct} → {t.reported}</p>
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            {/* 2. The Example Arena */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">2. Direct vs. Reported</h2>
                <div className="p-4 bg-slate-100 rounded-lg space-y-2 text-lg">
                    <p><strong>Direct:</strong> John said, "I <strong>am</strong> very busy."</p>
                    <p><strong>Reported:</strong> John said that he <strong>was</strong> very busy.</p>
                </div>
            </WorksheetCard>

            {/* 3. The Practice Circuit */}
            <WorksheetCard>
                <h2 className="text-2xl font-bold text-violet-700 mb-4">3. Report the Statement</h2>
                <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                        <div key={index} className="p-4 bg-violet-50 rounded-lg">
                            <p className="font-semibold text-slate-700">Direct: {q.direct}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <input type="text" value={answers[index] || ''} onChange={(e) => handleAnswerChange(index, e.target.value)} className="w-full h-12 px-4 text-lg border-2 border-violet-300 rounded-lg" placeholder="She said..." disabled={feedback[index] !== undefined} />
                                <button onClick={() => checkAnswer(index)} className="px-4 py-2 bg-violet-500 text-white rounded-lg" disabled={feedback[index] !== undefined}>Check</button>
                            </div>
                            {feedback[index] === true && <p className="text-green-600 font-bold mt-2">Correct!</p>}
                        </div>
                    ))}
                </div>
            </WorksheetCard>

            <div className="mt-8 text-center">
                <BigButton onClick={() => navigate('/')} className="bg-gray-500 border-gray-600"> ← Back to Home </BigButton>
            </div>
        </div>
    );
};

export default Level4ReportedSpeechLesson;