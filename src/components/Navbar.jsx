import React, { useState, useEffect } from 'react';

const Navbar = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);

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
        
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <a href="#home" style={{ fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color='var(--color-gold)'} onMouseOut={e => e.target.style.color='var(--color-white)'}>Home</a>
          <a href="#about" style={{ fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color='var(--color-gold)'} onMouseOut={e => e.target.style.color='var(--color-white)'}>About</a>
          <a href="#services" style={{ fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color='var(--color-gold)'} onMouseOut={e => e.target.style.color='var(--color-white)'}>Services</a>
          <a href="#testimonials" style={{ fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color='var(--color-gold)'} onMouseOut={e => e.target.style.color='var(--color-white)'}>Testimonials</a>
          <a href="#contact" style={{ fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color='var(--color-gold)'} onMouseOut={e => e.target.style.color='var(--color-white)'}>Contact</a>
        </nav>

        <button className="btn btn-primary" onClick={onOpenModal}>Make a Schedule</button>
      </div>
    </header>
  );
};

export default Navbar;
