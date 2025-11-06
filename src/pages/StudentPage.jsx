// src/pages/StudentPage.jsx

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { WorksheetCard } from '../components/common';
import { loadStudentData } from '../studentData'; // ✅ Impor data kita

// Daftar semua modul yang mungkin ada, dengan nama yang bagus
// src/pages/StudentPage.jsx

// ... (imports remain the same)

// ✅ Corrected code block with all necessary commas
const allModules = {
    'diagnostic-quiz': { name: 'Refreshment Quiz (All Topics)' },
    'basketball-past-simple': { name: 'Module: Past Simple (Basketball)' },
    'k5-reading-writing': { name: 'Reading & Writing Fun (K5)' },
    'k5-counting': { name: 'Counting Adventure (K5)' },
    'k5-reading-game': { name: 'Picture Word Match Game (K5)' },
    'sulthan-refreshment': { name: 'Refreshment Quiz (Sulthan)' },
    'sulthan-future-simple': { name: 'Module: Future Simple' },
    'danendra-past-continuous': { name: 'Module: Past Continuous (Storytelling)' },
    'raja-present-simple': { name: 'Module: Present Simple (Daily Life)' },
    'danendra-present-perfect-simple': { name: 'Module: Present Perfect Simple (Experiences)' },
    'sulthan-present-perfect-simple': { name: 'Module: Present Perfect Simple (Experiences)' },
    'danendra-future-will-going-to': { name: 'Module: Future Tenses (Will vs Going To)' },
    'dodie-patronela-travel-lesson': { name: 'Module: Conversational English for Travel' },
};

// ... (The rest of the file stays exactly the same)

const StudentPage = () => {
    const { studentId } = useParams();
    const studentData = loadStudentData();
    
    // ✅ Ambil data siswa spesifik yang sedang dilihat
    const currentStudent = studentData[studentId];

    if (!currentStudent) {
        return <WorksheetCard><h2>Student not found!</h2></WorksheetCard>;
    }

    // ✅ Filter untuk hanya menampilkan modul yang dimiliki siswa ini
    const assignedModules = currentStudent.modules.map(moduleId => ({
        id: moduleId,
        name: allModules[moduleId]?.name || 'Unknown Module'
    }));

    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
            <h2 className="text-3xl sm:text-4xl font-black text-center mb-2 text-slate-700">
                Student Page: <span className="text-emerald-500">{currentStudent.name}</span>
            </h2>
            <p className="text-slate-500 text-center text-lg mb-8 font-sans tracking-wider">Select a lesson to begin.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assignedModules.map(module => (
                    <Link 
                        key={module.id} 
                        to={`/student/${studentId}/module/${module.id}`}
                        className="block p-4 bg-slate-50 text-slate-700 font-bold text-lg text-left border-2 border-slate-200 rounded-xl hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300"
                    >
                        {module.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default StudentPage;