import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { questions } from '../data/questions';
import { Answer } from '../utils/types';
import { saveAnswers, getCurrentAnswers, clearCurrentAssessment } from '../utils/storage';
import { processAssessment } from '../ml/ml-service';
import { saveAssessmentResult } from '../utils/storage';

const Assessment: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  
  // Load existing answers when component mounts
  useEffect(() => {
    const savedAnswers = getCurrentAnswers();
    if (savedAnswers.length > 0) {
      setAnswers(savedAnswers);
      // If there are saved answers, navigate to the last answered question
      const lastAnsweredIndex = Math.min(savedAnswers.length, questions.length - 1);
      setCurrentQuestionIndex(lastAnsweredIndex);
    }
  }, []);

  // Get the current question
  const currentQuestion = questions[currentQuestionIndex];
  
  // Calculate progress
  const progress = Math.round(((currentQuestionIndex) / questions.length) * 100);
  
  // Handle option selection
  const handleOptionSelect = (optionId: string, value: number) => {
    const questionId = currentQuestion.id;
    
    // Create or update the answer
    const newAnswers = [...answers];
    const existingAnswerIndex = newAnswers.findIndex(a => a.questionId === questionId);
    
    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex] = { 
        questionId, 
        selectedOptionId: optionId,
        value
      };
    } else {
      newAnswers.push({ 
        questionId, 
        selectedOptionId: optionId,
        value
      });
    }
    
    setAnswers(newAnswers);
    saveAnswers(newAnswers);
    
    // Move to next question if not at the end
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    } else {
      // Show confirmation when all questions are answered
      setShowConfirmation(true);
    }
  };
  
  // Check if an option is selected
  const isOptionSelected = (optionId: string) => {
    return answers.some(a => 
      a.questionId === currentQuestion.id && a.selectedOptionId === optionId
    );
  };
  
  // Handle back button
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Handle next button
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  // Check if we can navigate to the next question
  const canNavigateNext = () => {
    return currentQuestionIndex < questions.length - 1 && 
           answers.some(a => a.questionId === currentQuestion.id);
  };
  
  // Handle submission of the assessment
  const handleSubmit = () => {
    // Process the answers with ML model
    const result = processAssessment(answers);
    
    // Save the result
    saveAssessmentResult(result);
    
    // Navigate to results page
    navigate('/results');
  };
  
  // Handle cancel
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel the assessment? Your progress will be saved.')) {
      navigate('/');
    }
  };
  
  // Handle clear
  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all your answers and start over?')) {
      clearCurrentAssessment();
      setAnswers([]);
      setCurrentQuestionIndex(0);
      setShowConfirmation(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-3xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm text-muted-foreground">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{progress}% Complete</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Confirmation modal */}
        {showConfirmation ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-6 md:p-8"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Assessment Complete</h2>
              <p className="text-muted-foreground">
                Thank you for completing the assessment. Our machine learning algorithm will analyze your responses and provide personalized insights.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <button onClick={handleSubmit} className="btn btn-primary">
                View Your Results
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button onClick={() => setShowConfirmation(false)} className="btn btn-outline">
                Review My Answers
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="card p-6 md:p-8"
          >
            <h2 className="text-xl font-semibold mb-6">{currentQuestion.text}</h2>
            
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id, option.value)}
                  className={`w-full text-left p-4 rounded-md border transition-all ${
                    isOptionSelected(option.id) 
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                      : 'border-border hover:border-primary/30 hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                      isOptionSelected(option.id) 
                        ? 'bg-primary' 
                        : 'border border-muted-foreground'
                    }`}>
                      {isOptionSelected(option.id) && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span>{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="flex justify-between">
              <div>
                <button 
                  onClick={handleBack}
                  disabled={currentQuestionIndex === 0}
                  className="btn btn-outline mr-2 disabled:opacity-50"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </button>
                
                <button onClick={handleClear} className="btn btn-outline">
                  Reset
                </button>
              </div>
              
              <div className="flex gap-2">
                <button onClick={handleCancel} className="btn btn-outline">
                  Cancel
                </button>
                
                {currentQuestionIndex < questions.length - 1 ? (
                  <button 
                    onClick={handleNext}
                    disabled={!canNavigateNext()}
                    className="btn btn-primary disabled:opacity-50"
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                ) : (
                  <button 
                    onClick={() => setShowConfirmation(true)}
                    disabled={!answers.some(a => a.questionId === currentQuestion.id)}
                    className="btn btn-primary disabled:opacity-50"
                  >
                    Complete
                    <Check className="ml-2 h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Help note */}
        <div className="mt-6 flex items-start gap-3 p-4 bg-muted rounded-md text-sm text-muted-foreground">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-foreground mb-1">Important Note</p>
            <p>
              This assessment is designed to help identify potential mental health concerns, but is not a diagnostic tool. 
              Always consult with a healthcare professional for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;