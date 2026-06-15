"use client";
import { useState, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';
import BackToTop from './BackToTop';
import VisaCalculator from './VisaCalculator';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  
  const closeCalculator = useCallback(() => setCalculatorOpen(false), []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[72px]">
        {children}
      </main>
      <Footer />
      <BackToTop />
      <VisaCalculator isOpen={calculatorOpen} onClose={closeCalculator} />
    </div>
  );
}
