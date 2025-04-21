import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, LineChart, AlertTriangle, ArrowRight, Brain, ShieldCheck, Info } from 'lucide-react';
import { getLatestAssessmentResult } from '../utils/storage';
import { AssessmentResult, CategoryScore } from '../utils/types';
import { getCategoryName } from '../data/questions';
import { getModelMetrics, getBestModel } from '../ml/ml-service';

const Results: React.FC = () => {
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [modelType, setModelType] = useState(getBestModel());
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get the latest assessment result
    const latestResult = getLatestAssessmentResult();
    
    // If no result, redirect to assessment page
    if (!latestResult) {
      navigate('/assessment');
      return;
    }
    
    setResult(latestResult);
    setLoading(false);
  }, [navigate]);
  
  // Get model metrics
  const metrics = getModelMetrics(modelType);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-center">
          <Brain size={48} className="text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Processing your results...</p>
        </div>
      </div>
    );
  }
  
  if (!result) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container text-center">
          <h1 className="text-2xl font-bold mb-4">No Assessment Results Found</h1>
          <p className="text-muted-foreground mb-6">
            Please complete an assessment to view your results.
          </p>
          <Link to="/assessment" className="btn btn-primary">
            Take Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Your Assessment Results
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Our advanced machine learning algorithm has analyzed your responses. Here's what we found.
            </motion.p>
          </div>
          
          {/* Overview Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6 md:p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">Overall Assessment</h2>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm font-medium mb-4 ${
                  result.prediction.riskLevel === 'low' 
                    ? 'bg-success' 
                    : result.prediction.riskLevel === 'moderate'
                      ? 'bg-warning'
                      : 'bg-error'
                }`}>
                  {result.prediction.riskLevel === 'low' && <ShieldCheck className="h-4 w-4" />}
                  {result.prediction.riskLevel === 'moderate' && <Info className="h-4 w-4" />}
                  {result.prediction.riskLevel === 'high' && <AlertTriangle className="h-4 w-4" />}
                  <span>
                    {result.prediction.riskLevel === 'low' 
                      ? 'Low Risk' 
                      : result.prediction.riskLevel === 'moderate'
                        ? 'Moderate Risk'
                        : 'High Risk'}
                  </span>
                </div>
                <p className="text-3xl font-bold text-foreground mb-2">
                  {result.prediction.label}
                </p>
                <p className="text-muted-foreground mb-4">
                  {result.prediction.riskLevel === 'low' 
                    ? 'Your responses suggest minimal mental health concerns at this time.' 
                    : result.prediction.riskLevel === 'moderate'
                      ? 'Your responses suggest some potential mental health concerns that may benefit from attention.'
                      : 'Your responses suggest significant mental health concerns that should be addressed.'}
                </p>
                <div className="text-sm text-muted-foreground">
                  <div className="flex justify-between mb-1">
                    <span>Prediction confidence:</span>
                    <span className="font-medium">{(result.prediction.probability * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        result.prediction.riskLevel === 'low' 
                          ? 'bg-success' 
                          : result.prediction.riskLevel === 'moderate'
                            ? 'bg-warning'
                            : 'bg-error'
                      }`}
                      style={{ width: `${result.prediction.probability * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg w-full md:w-auto md:min-w-[240px]">
                <h3 className="text-sm font-medium mb-3">Model Performance</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Accuracy</span>
                      <span className="font-medium">{(metrics.accuracy * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted-foreground/20 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${metrics.accuracy * 100}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Precision</span>
                      <span className="font-medium">{(metrics.precision * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted-foreground/20 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${metrics.precision * 100}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Recall</span>
                      <span className="font-medium">{(metrics.recall * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted-foreground/20 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${metrics.recall * 100}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>F1 Score</span>
                      <span className="font-medium">{(metrics.f1Score * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted-foreground/20 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${metrics.f1Score * 100}%` }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Algorithm: {modelType === 'randomForest' ? 'Random Forest' : 'Support Vector Machine'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Category Scores */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card p-6 md:p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Category Breakdown</h2>
              <LineChart className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-6">
              {result.categoryScores.map((category) => (
                <CategoryScoreCard key={category.category} category={category} />
              ))}
            </div>
          </motion.div>
          
          {/* Next Steps and Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="card p-6 md:p-8 mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
            
            <div className="space-y-4">
              {result.prediction.riskLevel === 'low' ? (
                <>
                  <RecommendationItem 
                    title="Maintain Your Well-being"
                    description="Continue your healthy habits and self-care routines. Regular exercise, proper sleep, and social connections are key to maintaining good mental health."
                  />
                  <RecommendationItem 
                    title="Practice Mindfulness"
                    description="Consider incorporating mindfulness or meditation into your routine to further enhance your mental well-being."
                  />
                  <RecommendationItem 
                    title="Regular Check-ins"
                    description="Take this assessment periodically to monitor your mental health status."
                  />
                </>
              ) : result.prediction.riskLevel === 'moderate' ? (
                <>
                  <RecommendationItem 
                    title="Consider Professional Support"
                    description="Your results indicate that you might benefit from speaking with a mental health professional. They can provide personalized guidance and support."
                  />
                  <RecommendationItem 
                    title="Develop Coping Strategies"
                    description="Learning stress management techniques, such as deep breathing, progressive muscle relaxation, or mindfulness can be helpful."
                  />
                  <RecommendationItem 
                    title="Focus on Self-Care"
                    description="Prioritize sleep, exercise, and nutrition. Reduce alcohol and caffeine intake, which can worsen anxiety and mood."
                  />
                </>
              ) : (
                <>
                  <RecommendationItem 
                    title="Seek Professional Help"
                    description="Your results suggest significant concerns that should be addressed by a mental health professional. Please consider reaching out to a therapist, psychologist, or psychiatrist."
                  />
                  <RecommendationItem 
                    title="Immediate Support Resources"
                    description="If you're experiencing a crisis, please contact a mental health helpline or emergency services. Help is available 24/7."
                  />
                  <RecommendationItem 
                    title="Regular Follow-up"
                    description="Once you've connected with a professional, regular follow-up appointments are important for monitoring your progress."
                  />
                </>
              )}
            </div>
          </motion.div>
          
          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <Link to="/dashboard" className="btn btn-primary">
              View Full Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/assessment" className="btn btn-outline">
              Take Another Assessment
            </Link>
          </motion.div>
          
          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-12 p-4 bg-muted rounded-md text-sm text-muted-foreground"
          >
            <p className="font-medium text-foreground mb-1">Important Disclaimer</p>
            <p>
              This assessment is not a diagnostic tool and does not replace professional medical advice. Always consult with a healthcare professional for proper diagnosis and treatment. If you're experiencing a crisis, please contact emergency services or a mental health crisis line immediately.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

interface CategoryScoreCardProps {
  category: CategoryScore;
}

const CategoryScoreCard: React.FC<CategoryScoreCardProps> = ({ category }) => {
  const getColorClass = (percentage: number) => {
    if (percentage < 25) return 'bg-green-500';
    if (percentage < 50) return 'bg-blue-500';
    if (percentage < 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const getDescription = (categoryId: string, percentage: number) => {
    if (categoryId === 'depression') {
      if (percentage < 25) return 'Minimal depressive symptoms.';
      if (percentage < 50) return 'Mild depressive symptoms.';
      if (percentage < 75) return 'Moderate depressive symptoms.';
      return 'Severe depressive symptoms.';
    } else if (categoryId === 'anxiety') {
      if (percentage < 25) return 'Minimal anxiety symptoms.';
      if (percentage < 50) return 'Mild anxiety symptoms.';
      if (percentage < 75) return 'Moderate anxiety symptoms.';
      return 'Severe anxiety symptoms.';
    } else if (categoryId === 'attention') {
      if (percentage < 25) return 'Minimal attention difficulties.';
      if (percentage < 50) return 'Mild attention difficulties.';
      if (percentage < 75) return 'Moderate attention difficulties.';
      return 'Significant attention difficulties.';
    } else if (categoryId === 'stress') {
      if (percentage < 25) return 'Low stress levels.';
      if (percentage < 50) return 'Moderate stress levels.';
      if (percentage < 75) return 'High stress levels.';
      return 'Very high stress levels.';
    } else {
      if (percentage < 25) return 'Healthy lifestyle factors.';
      if (percentage < 50) return 'Some lifestyle concerns.';
      if (percentage < 75) return 'Moderate lifestyle concerns.';
      return 'Significant lifestyle concerns.';
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{getCategoryName(category.category)}</h3>
        <div className="text-sm">
          <span className="font-medium">{category.score}</span>
          <span className="text-muted-foreground">/{category.maxScore}</span>
        </div>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
        <div 
          className={`h-full ${getColorClass(category.percentage)}`}
          style={{ width: `${category.percentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-muted-foreground">{getDescription(category.category, category.percentage)}</p>
    </div>
  );
};

interface RecommendationItemProps {
  title: string;
  description: string;
}

const RecommendationItem: React.FC<RecommendationItemProps> = ({ title, description }) => {
  return (
    <div className="flex gap-3">
      <div className="mt-1">
        <ChevronRight className="h-4 w-4 text-primary" />
      </div>
      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Results;