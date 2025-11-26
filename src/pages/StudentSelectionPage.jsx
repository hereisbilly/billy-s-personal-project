import React from 'react';
import { Link } from 'react-router-dom';
import { WorksheetCard } from '../components/common';
import { loadStudentData } from '../studentData';

const FunIllustration = () => (
    <div className="flex justify-center items-center mb-6">
        <svg width="150" height="100" viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: 'rgb(59, 130, 246)', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: 'rgb(34, 197, 94)', stopOpacity: 1}} />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: 'rgb(239, 68, 68)', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: 'rgb(249, 115, 22)', stopOpacity: 1}} />
                </linearGradient>
            </defs>
            <path d="M10 80 Q 40 20, 70 50 T 130 20" stroke="url(#grad1)" fill="transparent" strokeWidth="8" strokeLinecap="round" />
            <path d="M20 70 Q 50 90, 80 60 T 140 80" stroke="url(#grad2)" fill="transparent" strokeWidth="8" strokeLinecap="round" />
        </svg>
    </div>
);

const StudentSelectionPage = () => {
    const studentData = loadStudentData();
    const students = Object.keys(studentData).map(id => ({
        id: id, ...studentData[id]
    }));

    return (
        <div className="bg-slate-100 min-h-screen p-8">
            <div className="max-w-2xl mx-auto">
                <WorksheetCard>                    
                    <FunIllustration />
                    <h1 className="text-3xl font-extrabold text-slate-800 mb-2 text-center">Learning English, <br/>but <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">even more fun!</span></h1>
                    <p className="text-slate-500 text-center text-lg mb-10">Please select a student to begin.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {students.map(student => (
                            <Link
                                key={student.id}
                                to={`/student/${student.id}`}
                                className="block p-4 bg-slate-50 text-slate-700 font-bold text-lg text-center border-2 border-slate-200 rounded-xl hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300"
                            >
                                {student.name}
                            </Link>
                        ))}
                    </div>
                </WorksheetCard>
            </div>
        </div>
    );
};

export default StudentSelectionPage;