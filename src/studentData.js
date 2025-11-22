// src/studentData.js

// This function returns the student data object.
// It's structured this way to be easily expandable in the future.
export const loadStudentData = () => ({
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
      name: 'Dodie Patronela',
      modules: [
        'dodie-patronela-travel-lesson',
        'dodie-patronela-problems-lesson',
        'dodie-patronela-shopping-lesson',
      ],
    },
    k5: {
      name: 'K5 Students',
      modules: ['k5-reading-writing', 'k5-counting', 'k5-reading-game'],
    },
  });
  