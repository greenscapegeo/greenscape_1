import React from 'react';
import { config } from '../config';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const bg = config.heroBgUrl;

  return (
    <section id="mission" className="section hero" aria-label="Mission">
      <div className="hero-bg" style={{ backgroundImage: `url('${bg}')` }} aria-hidden="true" />
      <div className="container hero-content">
        <h1>{t('hero.mission.title')}</h1>
        <div className="actions">
          <a className="btn primary" href="#about">{t('hero.cta.learn')}</a>
          <a className="btn ghost" href="#contact">{t('hero.cta.contact')}</a>
        </div>
      </div>
    </section>
  );
}
