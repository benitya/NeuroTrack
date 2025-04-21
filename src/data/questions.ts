import { Question } from '../utils/types';

export const questions: Question[] = [
  {
    id: 'q1',
    text: 'Over the past 2 weeks, how often have you felt little interest or pleasure in doing things?',
    category: 'depression',
    options: [
      { id: 'q1_a1', text: 'Not at all', value: 0 },
      { id: 'q1_a2', text: 'Several days', value: 1 },
      { id: 'q1_a3', text: 'More than half the days', value: 2 },
      { id: 'q1_a4', text: 'Nearly every day', value: 3 }
    ]
  },
  {
    id: 'q2',
    text: 'Over the past 2 weeks, how often have you felt down, depressed, or hopeless?',
    category: 'depression',
    options: [
      { id: 'q2_a1', text: 'Not at all', value: 0 },
      { id: 'q2_a2', text: 'Several days', value: 1 },
      { id: 'q2_a3', text: 'More than half the days', value: 2 },
      { id: 'q2_a4', text: 'Nearly every day', value: 3 }
    ]
  },
  {
    id: 'q3',
    text: 'Over the past 2 weeks, how often have you had trouble falling or staying asleep, or sleeping too much?',
    category: 'depression',
    options: [
      { id: 'q3_a1', text: 'Not at all', value: 0 },
      { id: 'q3_a2', text: 'Several days', value: 1 },
      { id: 'q3_a3', text: 'More than half the days', value: 2 },
      { id: 'q3_a4', text: 'Nearly every day', value: 3 }
    ]
  },
  {
    id: 'q4',
    text: 'Over the past 2 weeks, how often have you felt tired or had little energy?',
    category: 'depression',
    options: [
      { id: 'q4_a1', text: 'Not at all', value: 0 },
      { id: 'q4_a2', text: 'Several days', value: 1 },
      { id: 'q4_a3', text: 'More than half the days', value: 2 },
      { id: 'q4_a4', text: 'Nearly every day', value: 3 }
    ]
  },
  {
    id: 'q5',
    text: 'Over the past 2 weeks, how often have you had poor appetite or been overeating?',
    category: 'depression',
    options: [
      { id: 'q5_a1', text: 'Not at all', value: 0 },
      { id: 'q5_a2', text: 'Several days', value: 1 },
      { id: 'q5_a3', text: 'More than half the days', value: 2 },
      { id: 'q5_a4', text: 'Nearly every day', value: 3 }
    ]
  },
  {
    id: 'q6',
    text: 'Over the past 2 weeks, how often have you felt bad about yourself — or that you are a failure or have let yourself or your family down?',
    category: 'depression',
    options: [
      { id: 'q6_a1', text: 'Not at all', value: 0 },
      { id: 'q6_a2', text: 'Several days', value: 1 },
      { id: 'q6_a3', text: 'More than half the days', value: 2 },
      { id: 'q6_a4', text: 'Nearly every day', value: 3 }
    ]
  },
  {
    id: 'q7',
    text: 'Over the past 2 weeks, how often have you had trouble concentrating on things, such as reading the newspaper or watching television?',
    category: 'depression',
    options: [
      { id: 'q7_a1', text: 'Not at all', value: 0 },
      { id: 'q7_a2', text: 'Several days', value: 1 },
      { id: 'q7_a3', text: 'More than half the days', value: 2 },
      { id: 'q7_a4', text: 'Nearly every day', value: 3 }
    ]
  },
  {
    id: 'q8',
    text: 'Over the past 2 weeks, how often have you felt nervous, anxious, or on edge?',
    category: 'anxiety',
    options: [
      { id: 'q8_a1', text: 'Not at all', value: 0 },
      { id: 'q8_a2', text: 'Several days', value: 1 },
      { id: 'q8_a3', text: 'More than half the days', value: 2 },
      { id: 'q8_a4', text: 'Nearly every day', value: 3 }
    ]
  },
  {
    id: 'q9',
    text: 'Over the past 2 weeks, how often have you been unable to stop or control worrying?',
    category: 'anxiety',
    options: [
      { id: 'q9_a1', text: 'Not at all', value: 0 },
      { id: 'q9_a2', text: 'Several days', value: 1 },
      { id: 'q9_a3', text: 'More than half the days', value: 2 },
      { id: 'q9_a4', text: 'Nearly every day', value: 3 }
    ]
  },
  {
    id: 'q10',
    text: 'Over the past 2 weeks, how often have you worried too much about different things?',
    category: 'anxiety',
    options: [
      { id: 'q10_a1', text: 'Not at all', value: 0 },
      { id: 'q10_a2', text: 'Several days', value: 1 },
      { id: 'q10_a3', text: 'More than half the days', value: 2 },
      { id: 'q10_a4', text: 'Nearly every day', value: 3 }
    ]
  },
  {
    id: 'q11',
    text: 'Over the past 2 weeks, how often have you had trouble relaxing?',
    category: 'anxiety',
    options: [
      { id: 'q11_a1', text: 'Not at all', value: 0 },
      { id: 'q11_a2', text: 'Several days', value: 1 },
      { id: 'q11_a3', text: 'More than half the days', value: 2 },
      { id: 'q11_a4', text: 'Nearly every day', value: 3 }
    ]
  },
  {
    id: 'q12',
    text: 'Over the past 2 weeks, how often have you been so restless that it is hard to sit still?',
    category: 'anxiety',
    options: [
      { id: 'q12_a1', text: 'Not at all', value: 0 },
      { id: 'q12_a2', text: 'Several days', value: 1 },
      { id: 'q12_a3', text: 'More than half the days', value: 2 },
      { id: 'q12_a4', text: 'Nearly every day', value: 3 }
    ]
  },
  {
    id: 'q13',
    text: 'Over the past 2 weeks, how often have you become easily annoyed or irritable?',
    category: 'anxiety',
    options: [
      { id: 'q13_a1', text: 'Not at all', value: 0 },
      { id: 'q13_a2', text: 'Several days', value: 1 },
      { id: 'q13_a3', text: 'More than half the days', value: 2 },
      { id: 'q13_a4', text: 'Nearly every day', value: 3 }
    ]
  },
  {
    id: 'q14',
    text: 'Over the past 2 weeks, how often have you felt afraid as if something awful might happen?',
    category: 'anxiety',
    options: [
      { id: 'q14_a1', text: 'Not at all', value: 0 },
      { id: 'q14_a2', text: 'Several days', value: 1 },
      { id: 'q14_a3', text: 'More than half the days', value: 2 },
      { id: 'q14_a4', text: 'Nearly every day', value: 3 }
    ]
  },
  {
    id: 'q15',
    text: 'Over the past month, how often have you had difficulty focusing on tasks?',
    category: 'attention',
    options: [
      { id: 'q15_a1', text: 'Never', value: 0 },
      { id: 'q15_a2', text: 'Rarely', value: 1 },
      { id: 'q15_a3', text: 'Sometimes', value: 2 },
      { id: 'q15_a4', text: 'Often', value: 3 },
      { id: 'q15_a5', text: 'Very Often', value: 4 }
    ]
  },
  {
    id: 'q16',
    text: 'Over the past month, how often have you felt restless or fidgety when required to sit for long periods?',
    category: 'attention',
    options: [
      { id: 'q16_a1', text: 'Never', value: 0 },
      { id: 'q16_a2', text: 'Rarely', value: 1 },
      { id: 'q16_a3', text: 'Sometimes', value: 2 },
      { id: 'q16_a4', text: 'Often', value: 3 },
      { id: 'q16_a5', text: 'Very Often', value: 4 }
    ]
  },
  {
    id: 'q17',
    text: 'Over the past month, how often have you had difficulty organizing tasks and activities?',
    category: 'attention',
    options: [
      { id: 'q17_a1', text: 'Never', value: 0 },
      { id: 'q17_a2', text: 'Rarely', value: 1 },
      { id: 'q17_a3', text: 'Sometimes', value: 2 },
      { id: 'q17_a4', text: 'Often', value: 3 },
      { id: 'q17_a5', text: 'Very Often', value: 4 }
    ]
  },
  {
    id: 'q18',
    text: 'Over the past month, how often have you found yourself frequently forgetting daily tasks or appointments?',
    category: 'attention',
    options: [
      { id: 'q18_a1', text: 'Never', value: 0 },
      { id: 'q18_a2', text: 'Rarely', value: 1 },
      { id: 'q18_a3', text: 'Sometimes', value: 2 },
      { id: 'q18_a4', text: 'Often', value: 3 },
      { id: 'q18_a5', text: 'Very Often', value: 4 }
    ]
  },
  {
    id: 'q19',
    text: 'How often do you feel that your stress level is higher than you can handle?',
    category: 'stress',
    options: [
      { id: 'q19_a1', text: 'Never', value: 0 },
      { id: 'q19_a2', text: 'Rarely', value: 1 },
      { id: 'q19_a3', text: 'Sometimes', value: 2 },
      { id: 'q19_a4', text: 'Often', value: 3 },
      { id: 'q19_a5', text: 'Very Often', value: 4 }
    ]
  },
  {
    id: 'q20',
    text: 'How would you rate your overall sleep quality over the past month?',
    category: 'lifestyle',
    options: [
      { id: 'q20_a1', text: 'Very Good', value: 0 },
      { id: 'q20_a2', text: 'Good', value: 1 },
      { id: 'q20_a3', text: 'Fair', value: 2 },
      { id: 'q20_a4', text: 'Poor', value: 3 },
      { id: 'q20_a5', text: 'Very Poor', value: 4 }
    ]
  }
];

export const categories = [
  { id: 'depression', name: 'Depression', maxScore: 21 },
  { id: 'anxiety', name: 'Anxiety', maxScore: 21 },
  { id: 'attention', name: 'Attention/Focus', maxScore: 16 },
  { id: 'stress', name: 'Stress', maxScore: 4 },
  { id: 'lifestyle', name: 'Lifestyle', maxScore: 4 }
];

export const getQuestionsForCategory = (categoryId: string): Question[] => {
  return questions.filter(q => q.category === categoryId);
};

export const getCategoryName = (categoryId: string): string => {
  const category = categories.find(c => c.id === categoryId);
  return category ? category.name : categoryId;
};

export const getCategoryMaxScore = (categoryId: string): number => {
  const category = categories.find(c => c.id === categoryId);
  return category ? category.maxScore : 0;
};