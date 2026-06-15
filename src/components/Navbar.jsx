import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const servicesList = [
  'Living Rooms',
  'Bedrooms',
  'Modular Kitchens',
  'Dining Spaces',
  'Home Offices',
  'Luxury Bathrooms',
  'Commercial Spaces',
  'Luxury Penthouses',
  'Terrace & Gardens'
];

const Navbar = ({ onOpenModal, onSelectService }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'all 0.3s ease',
      backgroundColor: scrolled ? 'rgba(5, 5, 5, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
      padding: scrolled ? '1rem 0' : '1.5rem 0'
    }}>
      <div className="container flex items-center justify-between">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--color-gold)', borderRadius: '50%' }}></div>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600 }}>Nüvo</span>
        </div>
        
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#home" style={{ fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color='var(--color-gold)'} onMouseOut={e => e.target.style.color='var(--color-white)'}>Home</a>
          <a href="#about" style={{ fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color='var(--color-gold)'} onMouseOut={e => e.target.style.color='var(--color-white)'}>About</a>
          <a href="#services" style={{ fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color='var(--color-gold)'} onMouseOut={e => e.target.style.color='var(--color-white)'}>Services</a>
          
          {/* Collections Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button 
              style={{ 
                background: 'none', border: 'none', color: isDropdownOpen ? 'var(--color-gold)' : 'var(--color-white)', 
                fontSize: '0.9rem', cursor: 'pointer', transition: 'color 0.3s', 
                display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'inherit',
                padding: '0.5rem 0', margin: 0
              }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Collections 
              <span style={{ 
                fontSize: '0.65rem', 
                transform: isDropdownOpen ? 'rotate(180deg)' : 'none', 
                transition: 'transform 0.3s',
                display: 'inline-block'
              }}>▼</span>
            </button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '240px',
                    backgroundColor: 'rgba(10, 10, 10, 0.98)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(212,175,55,0.05)',
                    padding: '0.75rem 0',
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '4px'
                  }}
                >
                  {servicesList.map((service, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onSelectService(service);
                        setIsDropdownOpen(false);
                      }}
                      style={{
                        background: 'none', border: 'none',
                        color: 'var(--color-gray-300)',
                        textAlign: 'left',
                        padding: '0.6rem 1.5rem',
                        fontSize: '0.85rem',
                        width: '100%',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        fontFamily: 'var(--font-sans)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.08)';
                        e.currentTarget.style.color = 'var(--color-gold)';
                        e.currentTarget.style.paddingLeft = '1.75rem';
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--color-gray-300)';
                        e.currentTarget.style.paddingLeft = '1.5rem';
                      }}
                    >
                      <span>{service}</span>
                      <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>→</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#testimonials" style={{ fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color='var(--color-gold)'} onMouseOut={e => e.target.style.color='var(--color-white)'}>Testimonials</a>
          <a href="#contact" style={{ fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color='var(--color-gold)'} onMouseOut={e => e.target.style.color='var(--color-white)'}>Contact</a>
        </nav>

        <button className="btn btn-primary" onClick={onOpenModal}>Make a Schedule</button>
      </div>
    </header>
  );
};

export default Navbar;
