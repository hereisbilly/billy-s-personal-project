// src/components/common.jsx
import React from 'react';

export const WorksheetCard = ({ children, className='' }) => (
    <div className={`bg-white p-6 rounded-xl shadow-md border border-slate-200 ${className}`}>
        {children}
    </div>
);

export const BigButton = ({ onClick, children, className = '' }) => (
    <button onClick={onClick} className={`w-full py-4 px-6 rounded-2xl font-bold text-lg text-white transition-all duration-200 shadow-lg active:shadow-md active:translate-y-0.5 border-b-4 ${className}`}>
        {children}
    </button>
);

// ✅ ADDING THE MISSING COMPONENT HERE
export const SectionHeader = ({ icon, title, subtitle }) => (
    <div className="flex items-center p-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl shadow-lg mb-6">
        <div className="flex-shrink-0 bg-white bg-opacity-20 p-3 rounded-full mr-4">
            {icon}
        </div>
        <div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="text-cyan-100">{subtitle}</p>
        </div>
    </div>
);