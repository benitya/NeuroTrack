import { Answer, AssessmentResult, UserData } from './types';

const STORAGE_KEY = 'neurotrack_data';

// Initialize storage with default values if not existing
const initializeStorage = (): UserData => {
  const defaultData: UserData = {
    assessments: [],
    insights: []
  };
  
  try {
    const existingData = localStorage.getItem(STORAGE_KEY);
    if (!existingData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(existingData) as UserData;
  } catch (error) {
    console.error('Error initializing storage:', error);
    return defaultData;
  }
};

// Get all user data
export const getUserData = (): UserData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return initializeStorage();
    }
    return JSON.parse(data) as UserData;
  } catch (error) {
    console.error('Error getting user data:', error);
    return initializeStorage();
  }
};

// Save assessment answers
export const saveAnswers = (answers: Answer[]): void => {
  const sessionKey = 'current_assessment';
  localStorage.setItem(sessionKey, JSON.stringify(answers));
};

// Get current assessment answers
export const getCurrentAnswers = (): Answer[] => {
  const sessionKey = 'current_assessment';
  try {
    const answers = localStorage.getItem(sessionKey);
    return answers ? JSON.parse(answers) : [];
  } catch (error) {
    console.error('Error getting current answers:', error);
    return [];
  }
};

// Clear current assessment
export const clearCurrentAssessment = (): void => {
  localStorage.removeItem('current_assessment');
};

// Save assessment result
export const saveAssessmentResult = (result: AssessmentResult): void => {
  const userData = getUserData();
  userData.assessments.push(result);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  clearCurrentAssessment();
};

// Get all assessment results
export const getAssessmentResults = (): AssessmentResult[] => {
  return getUserData().assessments;
};

// Get latest assessment result
export const getLatestAssessmentResult = (): AssessmentResult | null => {
  const results = getAssessmentResults();
  return results.length > 0 ? results[results.length - 1] : null;
};

// Save an insight
export const saveInsight = (insight: string): void => {
  const userData = getUserData();
  userData.insights.push(insight);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
};

// Get all insights
export const getInsights = (): string[] => {
  return getUserData().insights;
};

// Clear all data (for testing or user reset)
export const clearAllData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem('current_assessment');
  initializeStorage();
};