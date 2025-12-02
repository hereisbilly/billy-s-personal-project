// src/studentData.js

const studentData = {
    'dodie-patronela': {
      name: 'Dodie Petronela',
      modules: [
        'dodie-patronela-problems-lesson',
        'dodie-patronela-shopping-lesson',
        'dodie-patronela-directions',
      ],
    },
  };
  
  // This function returns the entire student data object.
  export const loadStudentData = () => {
    return studentData;
  };