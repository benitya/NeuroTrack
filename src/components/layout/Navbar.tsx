import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-50 bg-card shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Brain size={28} className="text-primary" />
          <span className="font-bold text-xl">NeuroTrack</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" active={isActive('/')}>Home</NavLink>
          <NavLink to="/assessment" active={isActive('/assessment')}>Assessment</NavLink>
          <NavLink to="/dashboard" active={isActive('/dashboard')}>Dashboard</NavLink>
          <NavLink to="/resources" active={isActive('/resources')}>Resources</NavLink>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 text-foreground"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-card pb-4 shadow-md"
        >
          <nav className="flex flex-col px-4 gap-3">
            <MobileNavLink to="/" active={isActive('/')} onClick={toggleMenu}>Home</MobileNavLink>
            <MobileNavLink to="/assessment" active={isActive('/assessment')} onClick={toggleMenu}>Assessment</MobileNavLink>
            <MobileNavLink to="/dashboard" active={isActive('/dashboard')} onClick={toggleMenu}>Dashboard</MobileNavLink>
            <MobileNavLink to="/resources" active={isActive('/resources')} onClick={toggleMenu}>Resources</MobileNavLink>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => (
  <Link 
    to={to} 
    className={`relative py-2 font-medium transition-colors ${
      active 
        ? 'text-primary font-semibold' 
        : 'text-foreground hover:text-primary'
    }`}
  >
    {children}
    {active && (
      <motion.div 
        layoutId="navbar-underline"
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
        initial={false}
      />
    )}
  </Link>
);

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, active, onClick, children }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className={`py-3 px-2 font-medium transition-colors ${
      active 
        ? 'bg-primary-light text-primary rounded-md' 
        : 'text-foreground hover:bg-muted rounded-md'
    }`}
  >
    {children}
  </Link>
);

export default Navbar;