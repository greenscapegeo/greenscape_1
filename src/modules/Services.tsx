import React from 'react';
import { config } from '../config';
import { useLanguage } from '../contexts/LanguageContext';

export default function Services({ variant }: { variant: 'showroom' | 'design' | 'planting' }) {
  const { t } = useLanguage();

  if (variant === 'showroom') {
    const showroomBullets = [
      t('services.showroom.bullets.1'),
      t('services.showroom.bullets.2'),
      t('services.showroom.bullets.3'),
      t('services.showroom.bullets.4'),
      t('services.showroom.bullets.5')
    ];

    return (
      <section id="services" className="section services">
        <div className="container">
          <h2>{t('nav.services')}</h2>
          <div className="service split">
            <div className="service-text">
              <h3>{t('brand.name')} {t('services.showroom.title')}</h3>
              <ul className="bullets">
                {showroomBullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
              <a className="btn link" href="/images/catalogue/კატალოგი.pdf" download aria-label={t('services.showroom.catalogue')}>{t('services.showroom.catalogue')}</a>
            </div>
            <div className="service-media">
              <img src={config.showroomMediaUrl} alt="Nursery showroom" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'design') {
    return (
      <section className="section services">
        <div className="container">
          <div className="service overlay">
            <div className="overlay-bg" style={{ backgroundImage: `linear-gradient(rgba(45,122,50,0.15), rgba(45,122,50,0.15)), url('${config.designBgUrl}')` }} aria-hidden="true" />
            <div className="overlay-content">
              <h3>{t('services.design.title')}</h3>
              <p>{t('services.design.text')}</p>
              <a className="btn primary" href="#contact">{t('services.design.cta')}</a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const plantingChecklist = [
    t('services.planting.checklist.1'),
    t('services.planting.checklist.2'),
    t('services.planting.checklist.3'),
    t('services.planting.checklist.4'),
    t('services.planting.checklist.5'),
    t('services.planting.checklist.6')
  ];

  return (
    <section className="section services">
      <div className="container">
        <div className="service split reverse">
          <div className="service-media">
            <img src={config.plantingMediaUrl} alt="Planting process and finished garden" />
          </div>
          <div className="service-text">
            <h3>{t('services.planting.title')}</h3>
            <ul className="checklist">
              {plantingChecklist.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

