// src/studentData.js

export const initialStudentData = {
    'danendra': {
        name: 'Danendra Marta',
        modules: [
            'basketball-past-simple',
            'diagnostic-quiz',
            'danendra-past-continuous',
            'danendra-present-perfect-simple',
            'danendra-future-will-going-to'
        ]
    },
    'raja': {
        name: 'Raja Lespe',
        modules: ['raja-present-simple']
    },
    'sulthan': {
        name: 'Sulthan Keenan',
        modules: ['sulthan-refreshment', 'sulthan-future-simple', 'sulthan-present-perfect-simple']
    },
    'resfathi': {
        name: 'Resfathi',
        modules: []
    },
    'dodie-petronela': {
        name: 'Dodie & Petronela',
        modules: []
    },
    'xie-couple': {
        name: 'Xie Siyan & Xie Sili',
        modules: ['k5-reading-writing', 'k5-counting', 'k5-reading-game']
    },
    'febri': {
        name: 'Febri',
        modules: ['febri-lesson']
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