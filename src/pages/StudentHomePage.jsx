import React from 'react';
import { Link } from 'react-router-dom';
import { loadStudentData } from '../studentData';
import { User } from 'lucide-react';

const StudentHomePage = () => {
    const studentData = loadStudentData();
    const students = Object.keys(studentData).map(key => ({
        id: key,
        ...studentData[key]
    }));

    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full">
            <h1 className="text-3xl sm:text-4xl font-black text-center mb-2 text-slate-700">
                Welcome to ESL Lessons
            </h1>
            <p className="text-slate-500 text-center text-lg mb-8 font-sans tracking-wider">
                Please select a student to view their lessons.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {students.map(student => (
                    <Link key={student.id} to={`/student/${student.id}`} className="group flex items-center p-4 bg-slate-50 text-slate-700 font-bold text-lg text-left border-2 border-slate-200 rounded-xl hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300">
                        <User className="mr-3 h-6 w-6 text-slate-400 group-hover:text-white transition-colors" />
                        <span>{student.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default StudentHomePage;