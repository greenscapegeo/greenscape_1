import React from 'react';
import { config } from './config';
import Header from './modules/Header';
import Hero from './modules/Hero';
import About from './modules/About';
import Why from './modules/Why';
import Services from './modules/Services';
import Contact from './modules/Contact';
import Footer from './modules/Footer';
import LeavesBackground from './modules/LeavesBackground';

const registry: Record<string, React.FC> = {
  Header,
  Hero,
  About,
  Why,
  'Services.Showroom': () => <Services variant="showroom" />,
  'Services.Design': () => <Services variant="design" />,
  'Services.Planting': () => <Services variant="planting" />,
  Contact,
  Footer
};

export default function App() {
  return (
    <div className="app" style={{ ['--brand' as any]: config.brandColor }}>
      <LeavesBackground />
      {config.enabledSections.map((key) => {
        const Cmp = registry[key];
        return Cmp ? <Cmp key={key} /> : null;
      })}
    </div>
  );
}

