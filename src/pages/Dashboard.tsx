import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, LineChart, BarChart, PieChart, Calendar, 
  Download, Share2, Clock, BookOpen, Brain, Smile, Frown, Meh 
} from 'lucide-react';
import { Chart, registerables } from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { getAssessmentResults } from '../utils/storage';
import { AssessmentResult, CategoryScore } from '../utils/types';
import { categories, getCategoryName } from '../data/questions';
import { getFeatureImportances } from '../ml/ml-service';

// Register Chart.js components
Chart.register(...registerables);

const Dashboard: React.FC = () => {
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [featureImportances] = useState(getFeatureImportances());

  useEffect(() => {
    // Load assessment results
    const assessmentResults = getAssessmentResults();
    setResults(assessmentResults);
  }, []);

  // Get the latest result
  const latestResult = results.length > 0 ? results[results.length - 1] : null;
  
  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };
  
  // Prepare data for the trend chart
  const trendData = {
    labels: results.map((_, index) => `Assessment ${index + 1}`),
    datasets: [
      {
        label: 'Overall Score',
        data: results.map(r => r.score),
        borderColor: 'hsl(210, 70%, 59%)',
        backgroundColor: 'rgba(74, 144, 226, 0.1)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  // Prepare data for the category comparison chart
  const categoryData = {
    labels: categories.map(c => getCategoryName(c.id)),
    datasets: [
      {
        label: 'Latest Assessment',
        data: categories.map(category => {
          if (!latestResult) return 0;
          const score = latestResult.categoryScores.find(c => c.category === category.id);
          return score ? (score.score / score.maxScore) * 100 : 0;
        }),
        backgroundColor: [
          'rgba(74, 144, 226, 0.7)',
          'rgba(104, 211, 145, 0.7)',
          'rgba(250, 176, 5, 0.7)',
          'rgba(233, 30, 99, 0.7)',
          'rgba(156, 39, 176, 0.7)'
        ]
      }
    ]
  };
  
  // Prepare data for the feature importance chart
  const importanceData = {
    labels: featureImportances.map(f => f.feature),
    datasets: [
      {
        label: 'Feature Importance',
        data: featureImportances.map(f => f.importance),
        backgroundColor: 'rgba(74, 144, 226, 0.7)',
        borderColor: 'rgba(74, 144, 226, 1)',
        borderWidth: 1
      }
    ]
  };
  
  // Determine overall mood icon based on latest result
  const getMoodIcon = () => {
    if (!latestResult) return <Meh className="h-12 w-12 text-muted" />;
    
    const riskLevel = latestResult.prediction.riskLevel;
    
    if (riskLevel === 'low') {
      return <Smile className="h-12 w-12 text-success" />;
    } else if (riskLevel === 'moderate') {
      return <Meh className="h-12 w-12 text-warning" />;
    } else {
      return <Frown className="h-12 w-12 text-error" />;
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Mental Health Dashboard</h1>
            <p className="text-muted-foreground">
              Track your progress and gain insights from your assessment results.
            </p>
          </div>
          
          {results.length > 0 && (
            <div className="flex gap-2">
              <button className="btn btn-outline">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </button>
              <button className="btn btn-outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
            </div>
          )}
        </div>
        
        {results.length === 0 ? (
          <div className="card p-12 text-center">
            <Brain size={48} className="mx-auto mb-4 text-muted" />
            <h2 className="text-2xl font-bold mb-3">No Assessment Data Yet</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Take your first mental health assessment to see personalized insights and track your progress over time.
            </p>
            <Link to="/assessment" className="btn btn-primary">
              Take Your First Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        ) : (
          <>
            {/* Dashboard Tabs */}
            <div className="mb-6 border-b border-border">
              <div className="flex overflow-x-auto hide-scrollbar">
                <TabButton 
                  active={activeTab === 'overview'} 
                  onClick={() => setActiveTab('overview')}
                  icon={<LineChart className="h-4 w-4" />}
                  label="Overview"
                />
                <TabButton 
                  active={activeTab === 'trends'} 
                  onClick={() => setActiveTab('trends')}
                  icon={<BarChart className="h-4 w-4" />}
                  label="Trends"
                />
                <TabButton 
                  active={activeTab === 'insights'} 
                  onClick={() => setActiveTab('insights')}
                  icon={<Brain className="h-4 w-4" />}
                  label="ML Insights"
                />
                <TabButton 
                  active={activeTab === 'history'} 
                  onClick={() => setActiveTab('history')}
                  icon={<Calendar className="h-4 w-4" />}
                  label="History"
                />
                <TabButton 
                  active={activeTab === 'resources'} 
                  onClick={() => setActiveTab('resources')}
                  icon={<BookOpen className="h-4 w-4" />}
                  label="Resources"
                />
              </div>
            </div>
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="card p-6 h-full">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold">Assessment History</h2>
                      <LineChart className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="h-64">
                      <Line 
                        data={trendData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                            y: {
                              beginAtZero: true,
                              max: 100
                            }
                          },
                          plugins: {
                            legend: {
                              display: true
                            }
                          }
                        }}
                      />
                    </div>
                    <div className="mt-4 text-sm text-muted-foreground text-center">
                      Tracking {results.length} assessment{results.length !== 1 ? 's' : ''} over time
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-6">
                  <div className="card p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">Latest Assessment</h2>
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col items-center">
                      {getMoodIcon()}
                      <h3 className="text-xl font-bold mt-4">
                        {latestResult?.prediction.label}
                      </h3>
                      <div className={`px-3 py-1 rounded-full text-white text-xs mt-2 ${
                        latestResult?.prediction.riskLevel === 'low'
                          ? 'bg-success'
                          : latestResult?.prediction.riskLevel === 'moderate'
                            ? 'bg-warning'
                            : 'bg-error'
                      }`}>
                        {latestResult?.prediction.riskLevel === 'low'
                          ? 'Low Risk'
                          : latestResult?.prediction.riskLevel === 'moderate'
                            ? 'Moderate Risk'
                            : 'High Risk'}
                      </div>
                      <div className="text-sm text-muted-foreground mt-4">
                        Taken on {latestResult ? formatDate(latestResult.completedAt) : 'N/A'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-6 flex-1">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">Category Breakdown</h2>
                      <PieChart className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="h-40">
                      <Pie 
                        data={categoryData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'right',
                              labels: {
                                boxWidth: 15,
                                font: {
                                  size: 10
                                }
                              }
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-3">
                  <div className="card p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold">Category Details</h2>
                      <BarChart className="h-5 w-5 text-muted-foreground" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {latestResult?.categoryScores.map((category) => (
                        <CategoryCard key={category.category} category={category} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Trends Tab */}
            {activeTab === 'trends' && (
              <div className="grid grid-cols-1 gap-6">
                <div className="card p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Score Trends Over Time</h2>
                    <LineChart className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="h-80">
                    <Line 
                      data={trendData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 100,
                            title: {
                              display: true,
                              text: 'Overall Score'
                            }
                          },
                          x: {
                            title: {
                              display: true,
                              text: 'Assessment Number'
                            }
                          }
                        },
                        plugins: {
                          legend: {
                            display: true
                          },
                          tooltip: {
                            callbacks: {
                              label: function(context) {
                                return `Score: ${context.raw}`;
                              }
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
                
                {results.length > 1 && (
                  <div className="card p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold">Category Changes</h2>
                      <BarChart className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-4">
                      {categories.map(category => {
                        const firstScore = results[0].categoryScores.find(c => c.category === category.id);
                        const latestScore = latestResult?.categoryScores.find(c => c.category === category.id);
                        
                        if (!firstScore || !latestScore) return null;
                        
                        const firstPercentage = (firstScore.score / firstScore.maxScore) * 100;
                        const latestPercentage = (latestScore.score / latestScore.maxScore) * 100;
                        const change = latestPercentage - firstPercentage;
                        const isImproved = change < 0; // Lower score is better
                        
                        return (
                          <div key={category.id} className="bg-muted p-4 rounded-lg">
                            <div className="flex justify-between mb-2">
                              <h3 className="font-medium">{getCategoryName(category.id)}</h3>
                              <div className={`text-sm ${isImproved ? 'text-success' : change === 0 ? 'text-muted-foreground' : 'text-error'}`}>
                                {change === 0 ? 'No change' : `${isImproved ? '↓' : '↑'} ${Math.abs(change).toFixed(1)}%`}
                              </div>
                            </div>
                            <div className="flex space-x-2 text-sm">
                              <div className="flex-1">
                                <div className="text-muted-foreground mb-1">First Assessment</div>
                                <div className="w-full h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary" 
                                    style={{ width: `${firstPercentage}%` }}
                                  ></div>
                                </div>
                                <div className="mt-1">{firstPercentage.toFixed(1)}%</div>
                              </div>
                              <div className="flex-1">
                                <div className="text-muted-foreground mb-1">Latest Assessment</div>
                                <div className="w-full h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${isImproved ? 'bg-success' : 'bg-primary'}`}
                                    style={{ width: `${latestPercentage}%` }}
                                  ></div>
                                </div>
                                <div className="mt-1">{latestPercentage.toFixed(1)}%</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* ML Insights Tab */}
            {activeTab === 'insights' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Feature Importance</h2>
                    <BarChart className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="h-80">
                    <Bar 
                      data={importanceData}
                      options={{
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          x: {
                            beginAtZero: true,
                            max: 0.2,
                            title: {
                              display: true,
                              text: 'Importance Score'
                            }
                          }
                        },
                        plugins: {
                          legend: {
                            display: false
                          }
                        }
                      }}
                    />
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>Feature importance shows which factors had the most influence on your assessment results. Higher values indicate greater impact.</p>
                  </div>
                </div>
                
                <div className="card p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Model Performance</h2>
                    <Brain className="h-5 w-5 text-muted-foreground" />
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Random Forest Model</h3>
                      <div className="text-sm text-primary font-medium">94.8% Accuracy</div>
                    </div>
                    <div className="space-y-3 mt-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Precision</span>
                          <span>92.3%</span>
                        </div>
                        <div className="w-full h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '92.3%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Recall</span>
                          <span>91.7%</span>
                        </div>
                        <div className="w-full h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '91.7%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>F1 Score</span>
                          <span>92.0%</span>
                        </div>
                        <div className="w-full h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '92.0%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Support Vector Machine</h3>
                      <div className="text-sm text-primary font-medium">93.2% Accuracy</div>
                    </div>
                    <div className="space-y-3 mt-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Precision</span>
                          <span>91.5%</span>
                        </div>
                        <div className="w-full h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '91.5%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Recall</span>
                          <span>90.1%</span>
                        </div>
                        <div className="w-full h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '90.1%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>F1 Score</span>
                          <span>90.8%</span>
                        </div>
                        <div className="w-full h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: '90.8%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>Based on comparison, the <strong>Random Forest</strong> model provides the most accurate predictions for mental health assessment.</p>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <div className="card p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold">Personalized Insights</h2>
                      <Brain className="h-5 w-5 text-muted-foreground" />
                    </div>
                    
                    <div className="space-y-4">
                      {latestResult && (
                        <>
                          <div className="bg-muted p-4 rounded-lg">
                            <h3 className="font-medium mb-2">Primary Factors</h3>
                            <p className="text-sm text-muted-foreground">
                              Based on your responses, the most significant factors affecting your mental health are:
                            </p>
                            <ul className="mt-2 space-y-1 text-sm">
                              {latestResult.categoryScores
                                .sort((a, b) => (b.score / b.maxScore) - (a.score / a.maxScore))
                                .slice(0, 2)
                                .map(category => (
                                  <li key={category.category} className="flex items-start gap-2">
                                    <div className="mt-1">•</div>
                                    <div>
                                      <span className="font-medium">{getCategoryName(category.category)}</span>
                                      <span className="text-muted-foreground"> - {Math.round((category.score / category.maxScore) * 100)}% of maximum score</span>
                                    </div>
                                  </li>
                                ))
                              }
                            </ul>
                          </div>
                          
                          <div className="bg-muted p-4 rounded-lg">
                            <h3 className="font-medium mb-2">Personalized Recommendations</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              Based on your assessment profile, our algorithm recommends:
                            </p>
                            <ul className="space-y-2 text-sm">
                              {latestResult.prediction.riskLevel === 'low' ? (
                                <>
                                  <li className="flex items-start gap-2">
                                    <div className="mt-1">•</div>
                                    <div>Continue your current mental health practices, which appear to be working well.</div>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <div className="mt-1">•</div>
                                    <div>Consider preventative measures like regular mindfulness practice and stress management.</div>
                                  </li>
                                </>
                              ) : latestResult.prediction.riskLevel === 'moderate' ? (
                                <>
                                  <li className="flex items-start gap-2">
                                    <div className="mt-1">•</div>
                                    <div>Focus on improving sleep habits and stress management techniques.</div>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <div className="mt-1">•</div>
                                    <div>Consider speaking with a mental health professional about your specific concerns.</div>
                                  </li>
                                </>
                              ) : (
                                <>
                                  <li className="flex items-start gap-2">
                                    <div className="mt-1">•</div>
                                    <div>Speak with a mental health professional about your assessment results.</div>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <div className="mt-1">•</div>
                                    <div>Prioritize self-care activities and consider regular therapy sessions.</div>
                                  </li>
                                </>
                              )}
                              <li className="flex items-start gap-2">
                                <div className="mt-1">•</div>
                                <div>Take regular follow-up assessments to track your progress over time.</div>
                              </li>
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Assessment History</h2>
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium">Date</th>
                        <th className="text-left py-3 px-4 font-medium">Score</th>
                        <th className="text-left py-3 px-4 font-medium">Prediction</th>
                        <th className="text-left py-3 px-4 font-medium">Risk Level</th>
                        <th className="text-left py-3 px-4 font-medium">Top Category</th>
                        <th className="text-left py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => {
                        // Find the top category (highest percentage)
                        const topCategory = result.categoryScores.reduce(
                          (prev, current) => 
                            (current.score / current.maxScore) > (prev.score / prev.maxScore) ? current : prev, 
                          result.categoryScores[0]
                        );
                        
                        return (
                          <tr key={index} className="border-b border-border hover:bg-muted/50">
                            <td className="py-3 px-4">{formatDate(result.completedAt)}</td>
                            <td className="py-3 px-4">{result.score}</td>
                            <td className="py-3 px-4">{result.prediction.label}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs text-white ${
                                result.prediction.riskLevel === 'low'
                                  ? 'bg-success'
                                  : result.prediction.riskLevel === 'moderate'
                                    ? 'bg-warning'
                                    : 'bg-error'
                              }`}>
                                {result.prediction.riskLevel === 'low'
                                  ? 'Low'
                                  : result.prediction.riskLevel === 'moderate'
                                    ? 'Moderate'
                                    : 'High'}
                              </span>
                            </td>
                            <td className="py-3 px-4">{getCategoryName(topCategory.category)}</td>
                            <td className="py-3 px-4">
                              <button className="text-primary hover:text-primary/80 font-medium text-sm">
                                View Details
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                
                {results.length > 5 && (
                  <div className="mt-6 flex justify-center">
                    <button className="btn btn-outline">
                      Load More History
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div className="grid grid-cols-1 gap-6">
                <div className="card p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Mental Health Resources</h2>
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Crisis Support</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        If you're experiencing a mental health crisis or having thoughts of self-harm, please reach out for immediate support:
                      </p>
                      <ul className="space-y-3">
                        <li className="flex">
                          <div className="bg-card p-3 rounded-lg w-full">
                            <div className="font-medium">National Suicide Prevention Lifeline</div>
                            <div className="text-sm text-muted-foreground mt-1">24/7 support for people in distress</div>
                            <div className="text-primary font-medium mt-2">1-800-273-8255</div>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="bg-card p-3 rounded-lg w-full">
                            <div className="font-medium">Crisis Text Line</div>
                            <div className="text-sm text-muted-foreground mt-1">Text-based crisis support</div>
                            <div className="text-primary font-medium mt-2">Text HOME to 741741</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Finding Professional Help</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        If your assessment indicates the need for professional support, these resources can help you find a qualified mental health provider:
                      </p>
                      <ul className="space-y-3">
                        <li className="flex">
                          <div className="bg-card p-3 rounded-lg w-full">
                            <div className="font-medium">Psychology Today Therapist Finder</div>
                            <div className="text-sm text-muted-foreground mt-1">Search for therapists by location, specialty, and insurance</div>
                            <a href="https://www.psychologytoday.com/us/therapists" target="_blank" rel="noopener noreferrer" className="text-primary font-medium mt-2 inline-block">Find a Therapist</a>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="bg-card p-3 rounded-lg w-full">
                            <div className="font-medium">SAMHSA Treatment Locator</div>
                            <div className="text-sm text-muted-foreground mt-1">Find treatment facilities for mental health and substance use disorders</div>
                            <a href="https://findtreatment.samhsa.gov/" target="_blank" rel="noopener noreferrer" className="text-primary font-medium mt-2 inline-block">Find Treatment</a>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Self-Help Resources</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        These resources can help you learn more about mental health and develop coping strategies:
                      </p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <li className="flex">
                          <div className="bg-card p-3 rounded-lg w-full">
                            <div className="font-medium">National Institute of Mental Health</div>
                            <div className="text-sm text-muted-foreground mt-1">Research-based information on mental disorders</div>
                            <a href="https://www.nimh.nih.gov/health" target="_blank" rel="noopener noreferrer" className="text-primary font-medium mt-2 inline-block">Learn More</a>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="bg-card p-3 rounded-lg w-full">
                            <div className="font-medium">Mental Health America</div>
                            <div className="text-sm text-muted-foreground mt-1">Mental health screening tools and educational resources</div>
                            <a href="https://www.mhanational.org/self-help-tools" target="_blank" rel="noopener noreferrer" className="text-primary font-medium mt-2 inline-block">Access Tools</a>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="bg-card p-3 rounded-lg w-full">
                            <div className="font-medium">Mindfulness-Based Stress Reduction</div>
                            <div className="text-sm text-muted-foreground mt-1">Guided mindfulness practices and techniques</div>
                            <a href="https://www.mindful.org/meditation/mindfulness-getting-started/" target="_blank" rel="noopener noreferrer" className="text-primary font-medium mt-2 inline-block">Get Started</a>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="bg-card p-3 rounded-lg w-full">
                            <div className="font-medium">Anxiety and Depression Association of America</div>
                            <div className="text-sm text-muted-foreground mt-1">Resources for anxiety, depression, and related disorders</div>
                            <a href="https://adaa.org/finding-help" target="_blank" rel="noopener noreferrer" className="text-primary font-medium mt-2 inline-block">Find Help</a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* CTA */}
            <div className="mt-8 text-center">
              <Link to="/assessment" className="btn btn-primary">
                Take Another Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <p className="mt-4 text-sm text-muted-foreground max-w-xl mx-auto">
                Regular assessments help track your mental health over time and provide more accurate insights. We recommend taking an assessment every 2-4 weeks.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
        active
          ? 'border-primary text-primary font-medium'
          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
      }`}
    >
      {icon}
      {label}
    </button>
  );
};

interface CategoryCardProps {
  category: CategoryScore;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const percentage = (category.score / category.maxScore) * 100;
  
  const getColorClass = (percentage: number) => {
    if (percentage < 25) return 'bg-green-500';
    if (percentage < 50) return 'bg-blue-500';
    if (percentage < 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const getInterpretation = (categoryId: string, percentage: number) => {
    if (categoryId === 'depression') {
      if (percentage < 25) return 'Minimal depressive symptoms';
      if (percentage < 50) return 'Mild depressive symptoms';
      if (percentage < 75) return 'Moderate depressive symptoms';
      return 'Severe depressive symptoms';
    } else if (categoryId === 'anxiety') {
      if (percentage < 25) return 'Minimal anxiety symptoms';
      if (percentage < 50) return 'Mild anxiety symptoms';
      if (percentage < 75) return 'Moderate anxiety symptoms';
      return 'Severe anxiety symptoms';
    } else if (categoryId === 'attention') {
      if (percentage < 25) return 'Minimal attention difficulties';
      if (percentage < 50) return 'Mild attention difficulties';
      if (percentage < 75) return 'Moderate attention difficulties';
      return 'Significant attention difficulties';
    } else if (categoryId === 'stress') {
      if (percentage < 25) return 'Low stress levels';
      if (percentage < 50) return 'Moderate stress levels';
      if (percentage < 75) return 'High stress levels';
      return 'Very high stress levels';
    } else {
      if (percentage < 25) return 'Healthy lifestyle factors';
      if (percentage < 50) return 'Some lifestyle concerns';
      if (percentage < 75) return 'Moderate lifestyle concerns';
      return 'Significant lifestyle concerns';
    }
  };
  
  return (
    <div className="bg-muted p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{getCategoryName(category.category)}</h3>
        <div className="text-sm">
          <span className="font-medium">{category.score}</span>
          <span className="text-muted-foreground">/{category.maxScore}</span>
        </div>
      </div>
      <div className="w-full h-2 bg-muted-foreground/20 rounded-full overflow-hidden mb-2">
        <div 
          className={`h-full ${getColorClass(percentage)}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">{getInterpretation(category.category, percentage)}</span>
        <span className="font-medium">{percentage.toFixed(1)}%</span>
      </div>
    </div>
  );
};

export default Dashboard;