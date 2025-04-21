import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, ArrowRight, BarChart, Shield, Clock } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-light to-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center md:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-foreground">
                AI-Powered <span className="text-primary">Mental Health</span> Assessment
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                Take a comprehensive mental health assessment and receive personalized insights powered by advanced machine learning algorithms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/assessment" className="btn btn-primary text-base px-6 py-3 rounded-md h-auto">
                  Start Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/dashboard" className="btn btn-outline text-base px-6 py-3 rounded-md h-auto">
                  View Dashboard
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-full opacity-10 blur-3xl"></div>
                <Brain size={300} className="text-primary relative z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How NeuroTrack Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines clinical expertise with advanced machine learning to provide accurate mental health insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Clock className="h-10 w-10 text-primary" />}
              title="Quick Assessment"
              description="Complete a comprehensive mental health assessment in just 10-15 minutes."
            />
            <FeatureCard 
              icon={<Brain className="h-10 w-10 text-primary" />}
              title="AI Analysis"
              description="Our advanced algorithms analyze your responses with high accuracy using machine learning."
            />
            <FeatureCard 
              icon={<BarChart className="h-10 w-10 text-primary" />}
              title="Detailed Insights"
              description="Receive personalized dashboard with comprehensive insights and recommendations."
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Science Behind NeuroTrack</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform uses state-of-the-art machine learning algorithms like Random Forest and Support Vector Machines to provide accurate predictions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="mb-4 pb-4 border-b border-border">
                  <div className="font-medium">Model Accuracy</div>
                  <div className="text-2xl font-bold text-success">94.8%</div>
                </div>
                <div className="mb-4 pb-4 border-b border-border">
                  <div className="font-medium">Precision</div>
                  <div className="text-2xl font-bold text-primary">92.3%</div>
                </div>
                <div className="mb-4 pb-4 border-b border-border">
                  <div className="font-medium">Recall</div>
                  <div className="text-2xl font-bold text-secondary">91.7%</div>
                </div>
                <div>
                  <div className="font-medium">F1 Score</div>
                  <div className="text-2xl font-bold text-accent">92.0%</div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h3 className="text-xl font-bold mb-4">High-Performance Predictive Models</h3>
              <p className="mb-4 text-muted-foreground">
                We've trained our models on extensive datasets of mental health assessments to ensure high accuracy and reliability. Our Random Forest and SVM algorithms have been optimized for:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-success mt-0.5" />
                  <span>Early detection of potential mental health concerns</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-success mt-0.5" />
                  <span>Personalized insights based on your unique responses</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-success mt-0.5" />
                  <span>Continuous learning and improvement over time</span>
                </li>
              </ul>
              <Link to="/assessment" className="btn btn-primary">
                Take Assessment Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-8 max-w-2xl mx-auto opacity-90">
            Begin your mental health journey today with our advanced assessment tool and receive personalized insights.
          </p>
          <Link 
            to="/assessment"
            className="btn bg-white text-primary hover:bg-white/90 text-base px-6 py-3 rounded-md h-auto"
          >
            Start Your Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-background p-6 rounded-lg border border-border transition-shadow hover:shadow-md"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default Home;