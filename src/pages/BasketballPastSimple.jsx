import React from 'react';
import { WorksheetCard, BigButton } from '../components/common';
import { useNavigate } from 'react-router-dom';

const BasketballPastSimple = () => {
    const navigate = useNavigate();

    return (
        <WorksheetCard>
            <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-800 mb-4">Past Simple (Basketball) Lesson</h1>
                <p className="text-slate-600 mb-8">
                    This lesson is not yet implemented.
                </p>
                <div className="pt-4">
                    <BigButton onClick={() => navigate(-1)} className="bg-gray-500 border-gray-600"> ← Go Back </BigButton>
                </div>
            </div>
        </WorksheetCard>
    );
};

export default BasketballPastSimple;