import React from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ka' ? 'en' : 'ka');
  };

  const currentLanguageLabel = language === 'ka' ? t('language.georgian') : t('language.english');
  const nextLanguageLabel = language === 'ka' ? t('language.english') : t('language.georgian');

  return (
    <div className="language-switcher">
      <button
        onClick={toggleLanguage}
        className="language-toggle"
        aria-label={`Switch to ${nextLanguageLabel}`}
        title={`Switch to ${nextLanguageLabel}`}
      >
        <span className="current-lang">{language === 'ka' ? 'ქარ' : 'ENG'}</span>
        <span className="switch-icon">⇄</span>
      </button>
    </div>
  );
}