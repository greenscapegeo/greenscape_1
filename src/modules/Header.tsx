import React from 'react';
import { config } from '../config';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const { t } = useLanguage();

  return (
    <header className="site-header">
      <div className="container nav">
        <a href="#" className="brand" aria-label={`${t('brand.name')} home`}>
          <span className="brand-mark" aria-hidden="true">{config.brandEmoji}</span>
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
          <a href="#contact">{t('nav.contact')}</a>
          <a className="btn cta" href="#contact">{t('hero.cta.contact')}</a>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}

