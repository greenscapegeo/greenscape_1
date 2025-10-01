import React from 'react';
import { config } from '../config';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="brand-col">
          <a href="#" className="brand">
            <img src="/images/logos/greenscape_logo_1.png" alt="" className="brand-mark" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            <span className="brand-text">{t('brand.name')}</span>
          </a>
          <p>{t('footer.tagline')}</p>
        </div>
        <div>
          <h4>{t('contact.title')}</h4>
          <ul className="contact-list small">
            <li>{t('contact.address')}</li>
            <li><a href={`tel:${config.contactPhones[0]}`}>{config.contactPhones[0]}</a></li>
            <li><a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a></li>
            <li>{t('contact.hours')}</li>
          </ul>
        </div>
        <div>
          <h4>{t('footer.explore')}</h4>
          <nav className="footer-nav">
            <a href="#about">{t('nav.about')}</a>
            <a href="#services">{t('nav.services')}</a>
            <a href="#contact">{t('nav.contact')}</a>
          </nav>
        </div>
      </div>
      <div className="container small print">© {year} {t('brand.name')}. {t('footer.rights')}</div>
    </footer>
  );
}

