// src/pages/StudentDashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

// Ilustrasi SVG (tetap sama)
const SvgLearningIsFun = () => (
    <svg viewBox="0 0 400 300" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="none"/>
        <g transform="translate(180, 130)"><path d="M0 0 C-30 -20, -50 20, -50 40 L50 40 C50 20, 30 -20, 0 0 Z" fill="#86EFAC"/><circle cx="-15" cy="15" r="8" fill="white"/><circle cx="15" cy="15" r="8" fill="white"/><circle cx="-15" cy="15" r="4" fill="#334155"/><circle cx="15" cy="15" r="4" fill="#334155"/><path d="M-10 25 Q 0 35, 10 25" stroke="#334155" strokeWidth="3" fill="none" strokeLinecap="round"/></g>
        <g transform="translate(90, 180)"><circle cx="0" cy="0" r="20" fill="#F472B6"/><circle cx="-5" cy="-2" r="3" fill="white"/><circle cx="5" cy="-2" r="3" fill="white"/><circle cx="-5" cy="-2" r="1.5" fill="#334155"/><circle cx="5" cy="-2" r="1.5" fill="#334155"/><path d="M-3 5 Q 0 8, 3 5" stroke="#334155" strokeWidth="1.5" fill="none" strokeLinecap="round"/></g>
        <g transform="translate(280, 190)"><rect x="-20" y="-20" width="40" height="40" rx="10" fill="#60A5FA"/><rect x="-10" y="-8" width="8" height="8" fill="white" rx="2"/><rect x="2" y="-8" width="8" height="8" fill="white" rx="2"/><path d="M-5 5 Q 0 8, 5 5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/></g>
        <g transform="translate(120, 80)"><rect width="50" height="60" rx="5" fill="#FDE047" stroke="#334155" strokeWidth="2"/><text x="25" y="40" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#334155">A</text></g>
        <g transform="translate(250, 70)"><circle cx="0" cy="0" r="25" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="2"/><path d="M0 -15 V 15 M -15 0 H 15" stroke="#3B82F6" strokeWidth="3"/></g>
        <circle cx="70" cy="120" r="5" fill="#FBBF24"/><path d="M320 120 L 330 130 M 320 130 L 330 120" stroke="#F87171" strokeWidth="3" strokeLinecap="round"/><path d="M150 250 Q 160 240, 170 250" stroke="#86EFAC" strokeWidth="2" fill="none"/><path d="M155 255 Q 160 248, 165 255" stroke="#86EFAC" strokeWidth="2" fill="none"/>
    </svg>
);


const students = [
    { id: 'danendra', name: 'Danendra Marta' },
    { id: 'raja', name: 'Raja Lespe' },
    { id: 'sulthan', name: 'Sulthan Keenan' },
    { id: 'resfathi', name: 'Resfathi' },
    { id: 'dodie-petronela', name: 'Dodie & Petronela' },
    { id: 'xie-couple', name: 'Xie Siyan & Xie Sili' },
    { id: 'febri', name: 'Febri' },
];

const StudentDashboard = () => {
    return (
        <div className="grid md:grid-cols-2 gap-8 items-center min-h-[80vh] px-4">
            {/* Kolom Kiri: Ilustrasi */}
            <div className="flex items-center justify-center">
                <SvgLearningIsFun />
            </div>

            {/* Kolom Kanan: Teks Judul dan Pemilihan Siswa */}
            <div className="text-center md:text-left">
                <h1 className="text-5xl lg:text-6xl font-extrabold text-teal-600 leading-tight">
                    Learn English, but way more fun!
                </h1>
                <h2 className="text-2xl font-semibold text-slate-500 mt-3">
                    by Billy Dwi Nugroho
                </h2>

                <p className="text-xl text-slate-500 mt-8 mb-10">
                    Choose a student profile to begin their learning journey.
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {students.map(student => (
                        <Link 
                            key={student.id} 
                            to={`/student/${student.id}`}
                            className="p-5 bg-green-500 text-white font-bold text-xl text-center rounded-xl shadow-lg border-b-4 border-green-700 hover:bg-green-600 transition-all transform hover:-translate-y-1"
                        >
                            {student.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;