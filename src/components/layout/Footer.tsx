import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Brain size={24} className="text-primary" />
              <span className="font-bold text-lg">NeuroTrack</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Advanced mental health assessment and prediction using machine learning technologies.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/assessment" className="text-sm hover:text-primary transition-colors">Start Assessment</Link></li>
              <li><Link to="/dashboard" className="text-sm hover:text-primary transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Mental Health FAQs</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Symptoms Guide</a></li>
              <li><a href="#" className="text-sm hover:text-primary transition-colors">Support Resources</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} NeuroTrack. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart size={14} className="text-accent" /> for better mental health
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;