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
    'febri-lesson': { name: "Module: Febri's Lesson" },
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
        <WorksheetCard>
            <h2 className="text-4xl font-bold text-center mb-2">
                Welcome, <span className="text-teal-500">{currentStudent.name}!</span>
            </h2>
            <p className="text-slate-500 text-center text-lg mb-8">Please choose a module to begin.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assignedModules.map(module => (
                    <Link 
                        key={module.id} 
                        to={`/student/${studentId}/module/${module.id}`}
                        className="p-8 bg-cyan-500 text-white font-bold text-2xl text-center rounded-lg shadow-md hover:bg-cyan-600 transition-all"
                    >
                        {module.name}
                    </Link>
                ))}
            </div>
        </WorksheetCard>
    );
};

export default StudentPage;