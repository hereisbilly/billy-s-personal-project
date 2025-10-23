// src/components/TTSButton.jsx
import React from 'react';

const SpeakIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </svg>
);

const TTSButton = ({ text }) => {
    const handleSpeak = (e) => {
        e.stopPropagation(); // Prevents other clicks from firing

        // Check if the browser supports the API
        if ('speechSynthesis' in window) {
            // Cancel any previous speech to prevent overlap
            window.speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US'; // Set the language
            utterance.rate = 0.9; // Slightly slower for clarity
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Sorry, your browser doesn't support Text-to-Speech.");
        }
    };

    return (
        <button 
            onClick={handleSpeak} 
            className="p-3 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-200 transition-colors"
            title={`Read aloud`}
        >
            <SpeakIcon />
        </button>
    );
};

export default TTSButton;