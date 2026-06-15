import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  'All', 'Living Rooms', 'Bedrooms', 'Modular Kitchens', 'Dining Spaces',
  'Home Offices', 'Luxury Bathrooms', 'Commercial Spaces', 'Luxury Penthouses',
  'Terrace & Gardens'
];

const projects = [
  { id: 1, title: 'Modern Luxury Living Room', category: 'Living Rooms', img: '/hero.png', height: '400px', desc: 'A stunning modern living room featuring dramatic dark tones and gold accents.' },
  { id: 2, title: 'Executive Home Office', category: 'Home Offices', img: '/about.png', height: '500px', desc: 'An inspiring home office designed for peak productivity with a premium aesthetic.' },
  { id: 3, title: 'Minimalist Master Bedroom', category: 'Bedrooms', img: '/residential.png', height: '350px', desc: 'A serene and lavish master bedroom with soft textures and cinematic lighting.' },
  { id: 4, title: 'Corporate Headquarters', category: 'Commercial Spaces', img: '/office.png', height: '600px', desc: 'Professional and premium office interior with sleek black desks and white chairs.' },
  { id: 5, title: 'Ultra Luxury Bathroom', category: 'Luxury Bathrooms', img: '/bathroom.png', height: '550px', desc: 'A lavish modern bathroom featuring black marble walls and gold fixtures.' },
  { id: 6, title: 'High-End Culinary Haven', category: 'Modular Kitchens', img: '/kitchen.png', height: '450px', desc: 'State-of-the-art modular kitchen featuring custom cabinetry, gold hardware, and premium marble countertops.' },
  { id: 7, title: 'Aesthetic Dining Lounge', category: 'Dining Spaces', img: '/dining.png', height: '500px', desc: 'An exquisite dining room combining dark marble elements, gold fixtures, and custom-designed seating for intimate gatherings.' },
  { id: 8, title: 'Elite Skyline Penthouse', category: 'Luxury Penthouses', img: '/penthouse.png', height: '400px', desc: 'Double-height ceiling luxury penthouse with breathtaking skyline views, opulent furnishings, and ambient fireplace lighting.' },
  { id: 9, title: 'Zen Rooftop Lounge', category: 'Terrace & Gardens', img: '/terrace.png', height: '480px', desc: 'Sleek rooftop terrace featuring a modern fire pit, integrated LED ambient lighting, and lush greenery under the starry sky.' }
];

const Collections = ({ onOpenModal, onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="collections" className="section" style={{ backgroundColor: 'var(--color-black)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="heading-lg">Our <span className="text-gold">Collections</span></h2>
          <p style={{ color: 'var(--color-gray-400)', fontSize: '1.2rem', maxWidth: '700px', margin: '1rem auto 0' }}>
            Explore curated interior spaces crafted to inspire, elevate lifestyles, and showcase exceptional design excellence.
          </p>
        </div>

        {/* Category Filters */}
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

        {/* Masonry Grid */}
        <div className="masonry-grid">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.5,
                  delay: (idx % 3) * 0.08,
                }}
                onClick={() => {
                  requestAnimationFrame(() => {
                    onSelectService(project.category);
                  });
                }}
                className="gallery-item"
                style={{
                  position: 'relative',
                  marginBottom: '2rem',
                  breakInside: 'avoid',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transform: 'translateZ(0)',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  contain: 'layout paint',
                }}
              >
                <motion.img
                  src={project.img}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: project.height,
                    objectFit: 'cover',
                    display: 'block',
                    transform: 'translateZ(0)',
                    willChange: 'transform',
                  }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.35 }}
                />

                <div
                  className="overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.72)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '2rem',
                  }}
                >
                  <div
                    className="overlay-content"
                    style={{
                      transform: 'translateY(15px)',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <div
                      className="category-label"
                      style={{
                        color: 'var(--color-gold)',
                        fontSize: '0.85rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: '0.5rem',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      }}
                    >
                      {project.category}
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.5rem',
                        color: 'var(--color-white)',
                        marginBottom: '1rem',
                      }}
                    >
                      {project.title}
                    </h3>

                    <div
                      className="cta-link"
                      style={{
                        color: 'var(--color-gold)',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        opacity: 0,
                        transform: 'translateY(8px)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      View Service Details <span>→</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .masonry-grid {
                column-count: 3;
                column-gap: 2rem;
              }

              @media (max-width: 1024px) {
                .masonry-grid {
                  column-count: 2;
                }
              }

              @media (max-width: 768px) {
                .masonry-grid {
                  column-count: 1;
                }
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
            `,
          }}
        />

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
    </section>
  );
};

export default Collections;
