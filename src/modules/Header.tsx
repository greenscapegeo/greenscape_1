import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const { t } = useLanguage();

  return (
    <header className="site-header">
      <div className="container nav">
        <a href="#" className="brand" aria-label={`${t('brand.name')} home`}>
          <img
            className="brand-logo"
            src="/images/logos/greenscape_logo_1.png"
            alt={`${t('brand.name')} logo`}
          />
          <span className="brand-text">{t('brand.name')}</span>
        </a>
        <button
          className="nav-toggle"
          aria-controls="primary-nav"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((s) => !s)}
        >
          ☰
        </button>
        <nav id="primary-nav" className={"primary-nav" + (open ? " open" : "")} aria-label="Primary">
          <a href="#about">{t('nav.about')}</a>
          <a href="#services">{t('nav.services')}</a>
          <a href="#gallery">{t('nav.projects')}</a>
          <a href="#contact">{t('nav.contact')}</a>
          <a className="btn cta" href="#contact">{t('hero.cta.contact')}</a>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}

