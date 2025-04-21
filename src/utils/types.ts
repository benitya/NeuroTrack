// Assessment Types
export interface Question {
  id: string;
  text: string;
  options: Option[];
  category: string;
}

export interface Option {
  id: string;
  text: string;
  value: number;
}

export interface Answer {
  questionId: string;
  selectedOptionId: string;
  value: number;
}

export interface AssessmentResult {
  score: number;
  prediction: Prediction;
  categoryScores: CategoryScore[];
  completedAt: Date;
}

export interface CategoryScore {
  category: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface Prediction {
  label: string;
  probability: number;
  riskLevel: 'low' | 'moderate' | 'high';
}

// ML Model Types
export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
}

// User Types
export interface UserData {
  assessments: AssessmentResult[];
  insights: string[];
}

// Model Type
export type ModelType = 'randomForest' | 'svm';