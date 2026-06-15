import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';

import ServiceDetailModal from './components/ServiceDetailModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    if (isModalOpen || selectedService) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isModalOpen, selectedService]);

  return (
    <>
      <Navbar onOpenModal={() => setIsModalOpen(true)} onSelectService={setSelectedService} />
      <main>
        <Hero onOpenModal={() => setIsModalOpen(true)} />
        <About />
        <WhyChooseUs />
        <Services onOpenModal={() => setIsModalOpen(true)} />
        <Process />

        <Testimonials />
        <Contact onOpenModal={() => setIsModalOpen(true)} />
      </main>
      <Footer />
      {isModalOpen && <ConsultationModal onClose={() => setIsModalOpen(false)} />}
      
      <AnimatePresence>
        {selectedService && (
          <ServiceDetailModal 
            category={selectedService} 
            onClose={() => setSelectedService(null)} 
            onOpenConsultation={() => {
              setSelectedService(null);
              setIsModalOpen(true);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
