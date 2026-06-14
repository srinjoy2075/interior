import React, { useState, useEffect } from 'react';
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

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isModalOpen]);

  return (
    <>
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
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
    </>
  );
}

export default App;
