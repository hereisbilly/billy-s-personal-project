// src/pages/StudentDashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { loadStudentData } from '../studentData';

// ✅ Base64 Encoded SVG for a clean, internal illustration
// This is a simple, elegant SVG representing learning, encoded as Base64.
// It will scale perfectly without pixelation and is embedded directly into the code.
const Base64LearningSVG = () => (
    <img
        src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzUwIDMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzUwIiBoZWlnaHQ9IjMwMCIgZmlsbD0ibm9uZSIvPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwMCwxMzApIj4KICAgIDxwYXRoIGQ9Ik0wIDAgQy0zMCAtMjAsIC01MCAyMCwgLTUwIDQwIEw1MCA0MCBDNTAgMjAsIDMwIC0yMCwgMCAwIFoiIGZpbGw9IiNDNEU3REQiLz4KICAgIDxjaXJjbGUgY3g9Ii0xNSIgY3k9IjE1IiByPSI4IiBmaWxsPSIjRjBGNEY0Ii8+CiAgICA8Y2lyY2xlIGN4PSIxNSIgY3k9IjE1IiByPSI4IiBmaWxsPSIjRjBGNEY0Ii8+CiAgICA8Y2lyY2xlIGN4PSItMTUiIGN5PSIxNSIgcj0iNCIgZmlsbD0iIzM0MzQzNCIvPgogICAgPGNpcmNsZSBjeD0iMTUiIGN5PSIxNSIgcj0iNCIgZmlsbD0iIzM0MzQzNCIvPgogICAgPHBhdGggZD0iTS0xMCAyNSBRIDAgMzUsIDEwIDI1IiBzdHJva2U9IiMzNDM0MzQiIHN0cm9rZVdpZHRoPSIzIiBmaWxsPSJub25lIiBzdHJva2VMaW5lY2FwPSJyb3VuZCIvPgogIDwvZz4KCiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzAsMjIwKSI+CiAgICA8cmVjdCB4PSItMTUiIHk9Ii0xNSIgd2lkdGg9IjcwIiBoZWlnaHQ9IjcwIiByeD0iMTAiIGZpbGw9IiNFMEYwRjQiIHN0cm9rZT0iI0QxRDVEOyIgc3Ryb2tlV2lkdGg9IjIiLz4KICAgIDx0ZXh0IHg9IjIwIiB5PSI0MCUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMzQzNDM0Ij5BPC90ZXh0PgogIDwvZz4KCiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjUwLDE0MCkiPgogICAgPGNpcmNsZSBjeD0iMCIgY3k9IjAiIHI9IjMwIiBmaWxsPSIjRjJGNEY0IiBzdHJva2U9IiNEQkRFRTUiIHN0cm9rZVdpZHRoPSIxLjUiLz4KICAgIDxwYXRoIGQ9Ik0wIC0xOCBWIDE4IE0gLTE4IDAgSDE4IiBzdHJva2U9IiMzRDc5QkIiIHN0cm9rZVdpZHRoPSIzIi8+CiAgPC9nPgogIAo8L3N2Zz4="
        alt="Stylized illustration of learning elements: a friendly face, a book, and a plus sign icon."
        className="w-full max-w-sm h-auto mx-auto lg:mx-0"
        style={{ filter: 'drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.08))' }}
    />
);

const StudentDashboard = () => {
    const studentData = loadStudentData();
    const students = Object.keys(studentData).map(id => ({
        id: id,
        name: studentData[id].name
    }));

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800 font-sans antialiased">
            <header className="text-center mb-16 max-w-3xl">
                <h1 className="text-6xl font-extrabold leading-tight tracking-tight text-gray-900 drop-shadow-sm">
                    Elevate Your English
                </h1>
                <p className="mt-4 text-2xl text-gray-600">
                    Interactive modules designed for engaging and effective learning.
                </p>
                <p className="mt-2 text-md text-gray-500">
                    by Billy Dwi Nugroho
                </p>
            </header>

            <section className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl w-full">
                {/* Left Section: Illustration */}
                <div className="flex justify-center lg:justify-end">
                    <Base64LearningSVG />
                </div>

                {/* Right Section: Student Selection */}
                <div className="text-center lg:text-left">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-6">
                        Select a Student Profile
                    </h2>
                    <p className="text-lg text-gray-500 mb-8 max-w-md lg:max-w-none">
                        Choose a student from the list to continue their personalized learning journey.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg lg:max-w-none mx-auto lg:mx-0">
                        {students.map(student => (
                            <Link
                                key={student.id}
                                to={`/student/${student.id}`}
                                className="block p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold text-lg text-center rounded-xl shadow-lg
                                           hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105
                                           focus:outline-none focus:ring-4 focus:ring-indigo-300 active:scale-98"
                                aria-label={`Go to ${student.name}'s profile`}
                            >
                                {student.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StudentDashboard;