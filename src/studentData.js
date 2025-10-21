// src/studentData.js

const initialStudentData = {
    'danendra': {
        name: 'Danendra Marta',
        // Danendra has his assigned lessons
        modules: ['basketball-past-simple', 'diagnostic-quiz']
    },
    'raja': {
        name: 'Raja Lespe',
        // This student has no lessons assigned yet
        modules: []
    },
    'sulthan': {
        name: 'Sulthan Keenan',
        // This student has no lessons assigned yet
        modules: []
    },
    'resfathi': {
        name: 'Resfathi',
        // This student has no lessons assigned yet
        modules: []
    },
    'dodie-petronela': {
        name: 'Dodie & Petronela',
        // This student has no lessons assigned yet
        modules: []
    },
    'xie-couple': {
        name: 'Xie Siyan & Xie Sili',
        // Their module list is empty for now
        modules: ['k5-reading-writing', 'k5-counting']
    }
};

// --- Helper Functions (No changes needed below) ---

export const loadStudentData = () => {
    const data = localStorage.getItem('eslStudentData');
    if (data) {
        const loadedData = JSON.parse(data);
        const initialKeys = Object.keys(initialStudentData);
        const loadedKeys = Object.keys(loadedData);
        if (initialKeys.length !== loadedKeys.length) {
             const newData = {...initialStudentData, ...loadedData};
             saveStudentData(newData);
             return newData;
        }
        return loadedData;
    }
    localStorage.setItem('eslStudentData', JSON.stringify(initialStudentData));
    return initialStudentData;
};

export const saveStudentData = (data) => {
    localStorage.setItem('eslStudentData', JSON.stringify(data));
};