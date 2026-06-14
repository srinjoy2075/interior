import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  'All', 'Living Rooms', 'Bedrooms', 'Modular Kitchens', 'Dining Spaces', 
  'Home Offices', 'Kids Rooms', 'Luxury Bathrooms', 'Commercial Spaces', 
  'Restaurants & Cafes', 'Luxury Villas'
];

const projects = [
  { id: 1, title: 'Modern Luxury Living Room', category: 'Living Rooms', img: '/hero.png', height: '400px', desc: 'A stunning modern living room featuring dramatic dark tones and gold accents.' },
  { id: 2, title: 'Executive Home Office', category: 'Home Offices', img: '/about.png', height: '500px', desc: 'An inspiring home office designed for peak productivity with a premium aesthetic.' },
  { id: 3, title: 'Minimalist Master Bedroom', category: 'Bedrooms', img: '/residential.png', height: '350px', desc: 'A serene and lavish master bedroom with soft textures and cinematic lighting.' },
  { id: 4, title: 'Corporate Headquarters', category: 'Commercial Spaces', img: '/office.png', height: '600px', desc: 'Professional and premium office interior with sleek black desks and white chairs.' },
  { id: 5, title: 'Boutique Restaurant', category: 'Restaurants & Cafes', img: '/commercial.png', height: '450px', desc: 'Sophisticated restaurant interior with elegant seating and gold detailing.' },
  { id: 6, title: 'Ultra Luxury Bathroom', category: 'Luxury Bathrooms', img: '/bathroom.png', height: '550px', desc: 'A lavish modern bathroom featuring black marble walls and gold fixtures.' }
];

const Collections = ({ onOpenModal }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const handleNext = (e) => {
    e.stopPropagation();
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setSelectedProject(filteredProjects[nextIndex]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedProject(filteredProjects[prevIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <section id="collections" className="section" style={{ backgroundColor: 'var(--color-black)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="heading-lg">Our <span className="text-gold">Collections</span></h2>
          <p style={{ color: 'var(--color-gray-400)', fontSize: '1.2rem', maxWidth: '700px', margin: '1rem auto 0' }}>
            Explore curated interior spaces crafted to inspire, elevate lifestyles, and showcase exceptional design excellence.
          </p>
        </div>

        <div style={{ 
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginBottom: '4rem'
        }}>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: 'transparent',
                border: 'none',
                color: activeCategory === cat ? 'var(--color-gold)' : 'var(--color-gray-400)',
                fontSize: '1rem',
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
                padding: '0.5rem 1rem',
                position: 'relative',
                transition: 'color 0.3s'
              }}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategory"
                  style={{
                    position: 'absolute', bottom: 0, left: '1rem', right: '1rem',
                    height: '2px', backgroundColor: 'var(--color-gold)'
                  }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="masonry-grid">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: (idx % 3) * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className="gallery-item"
                style={{
                  position: 'relative',
                  marginBottom: '2rem',
                  breakInside: 'avoid',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  border: '1px solid transparent',
                  transition: 'border-color 0.3s ease'
                }}
              >
                <motion.img
                  src={project.img}
                  alt={project.title}
                  style={{ width: '100%', height: project.height, objectFit: 'cover', display: 'block' }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="overlay" style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.75)',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  padding: '2rem'
                }}>
                  <div className="overlay-content" style={{ transform: 'translateY(20px)', transition: 'transform 0.4s ease' }}>
                    <div className="category-label" style={{ color: 'var(--color-gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', opacity: 0, transition: 'opacity 0.4s ease 0.1s' }}>
                      {project.category}
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-white)', marginBottom: '1rem' }}>
                      {project.title}
                    </h3>
                    <div className="cta-link" style={{ color: 'var(--color-gold)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0, transform: 'translateY(10px)', transition: 'all 0.4s ease 0.2s' }}>
                      View Design <span>→</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .masonry-grid {
            column-count: 3;
            column-gap: 2rem;
          }
          @media (max-width: 1024px) {
            .masonry-grid { column-count: 2; }
          }
          @media (max-width: 768px) {
            .masonry-grid { column-count: 1; }
          }
          .gallery-item:hover {
            border-color: var(--color-gold) !important;
          }
          .gallery-item:hover .overlay {
            opacity: 1 !important;
          }
          .gallery-item:hover .overlay-content {
            transform: translateY(0) !important;
          }
          .gallery-item:hover .category-label,
          .gallery-item:hover .cta-link {
            opacity: 1 !important;
          }
          .gallery-item:hover .cta-link {
            transform: translateY(0) !important;
          }
        `}} />

        <div style={{
          marginTop: '6rem',
          padding: '5rem 2rem',
          backgroundColor: 'rgba(26, 26, 26, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          textAlign: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 className="heading-md" style={{ marginBottom: '1rem' }}>Inspired by What You See?</h2>
          <p style={{ color: 'var(--color-gray-200)', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Let's create a space that reflects your vision, lifestyle, and personality.
          </p>
          <button className="btn btn-primary" onClick={onOpenModal}>Make a Schedule</button>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(10px)',
              zIndex: 2000,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem'
            }}
            onClick={() => setSelectedProject(null)}
          >
            <button onClick={() => setSelectedProject(null)} style={{
              position: 'absolute', top: '2rem', right: '2rem',
              background: 'none', border: 'none', color: 'var(--color-white)',
              cursor: 'pointer', zIndex: 2010
            }}>
              <X size={32} />
            </button>

            {filteredProjects.length > 1 && (
              <>
                <button onClick={handlePrev} style={{
                  position: 'absolute', left: '2rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.1)', border: 'none', color: 'var(--color-white)',
                  width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', zIndex: 2010, backdropFilter: 'blur(4px)'
                }}>
                  <ChevronLeft size={24} />
                </button>
                <button onClick={handleNext} style={{
                  position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.1)', border: 'none', color: 'var(--color-white)',
                  width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', zIndex: 2010, backdropFilter: 'blur(4px)'
                }}>
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{
                width: '100%', maxWidth: '1200px', maxHeight: '90vh',
                display: 'flex', flexDirection: 'column',
                backgroundColor: 'var(--color-black)', border: '1px solid var(--color-gray-800)',
                overflow: 'hidden'
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                <img src={selectedProject.img} alt={selectedProject.title} style={{ width: '100%', height: '60vh', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '2rem', backgroundColor: 'var(--color-black)' }}>
                <div style={{ color: 'var(--color-gold)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                  {selectedProject.category}
                </div>
                <h3 className="heading-md" style={{ marginBottom: '1rem' }}>{selectedProject.title}</h3>
                <p style={{ color: 'var(--color-gray-400)', fontSize: '1.1rem', maxWidth: '800px' }}>
                  {selectedProject.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Collections;
