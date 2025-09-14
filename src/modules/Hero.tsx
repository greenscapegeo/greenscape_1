import React from 'react';
import { config } from '../config';

export default function Hero() {
  const bg = config.heroBgUrl;
  return (
    <section id="mission" className="section hero" aria-label="Mission">
      <div className="hero-bg" style={{ backgroundImage: `url('${bg}')` }} aria-hidden="true" />
      <div className="container hero-content">
        <h1>{config.missionTitle}</h1>
        <p style={{ color: config.heroSubtitleColor }}>{config.missionSubtitle}</p>
        <div className="actions">
          <a className="btn primary" href="#about">{config.ctaLearnText}</a>
          <a className="btn ghost" href="#contact">{config.ctaContactText}</a>
        </div>
      </div>
    </section>
  );
}
