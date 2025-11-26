// src/studentData.js

const studentData = {
    danendra: {
      name: 'Danendra',
      modules: [
        'diagnostic-quiz',
        'danendra-past-continuous',
        'danendra-present-perfect-simple',
        'danendra-future-will-going-to',
        'danendra-modal-verbs',
        'danendra-present-perfect-continuous',
        'danendra-past-perfect-simple',
        'danendra-passive-voice',
        'danendra-conditionals',
        'danendra-relative-clauses',
      ],
    },
    sulthan: {
      name: 'Sulthan',
      modules: [
        'sulthan-refreshment',
        'sulthan-future-simple',
        'sulthan-present-perfect-simple',
        'basketball-past-simple',
      ],
    },
    raja: {
      name: 'Raja',
      modules: ['raja-present-simple'],
    },
    'dodie-patronela': {
      name: 'Dodie Petronela',
      modules: [
        'dodie-patronela-travel-lesson',
        'dodie-patronela-problems-lesson',
        'dodie-patronela-shopping-lesson',
        'dodie-patronela-directions',
      ],
    },
    k5: {
      name: 'K5 Students',
      modules: ['k5-reading-writing', 'k5-counting', 'k5-reading-game'],
    },
  };
  
  // This function returns the entire student data object.
  export const loadStudentData = () => {
    return studentData;
  };