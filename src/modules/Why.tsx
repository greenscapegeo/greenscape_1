import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Why() {
  const { t } = useLanguage();

  const whyItems = [
    {
      icon: '🏆',
      title: t('why.experience.title'),
      desc: t('why.experience.desc')
    },
    {
      icon: '🌱',
      title: t('why.plants.title'),
      desc: t('why.plants.desc')
    },
    {
      icon: '🧰',
      title: t('why.service.title'),
      desc: t('why.service.desc')
    },
    {
      icon: '💬',
      title: t('why.affordable.title'),
      desc: t('why.affordable.desc')
    }
  ];

  return (
    <div className="container why">
      <h3>{t('why.title')} {t('brand.name')}?</h3>
      <div className="grid four cards">
        {whyItems.map((w, i) => (
          <article className="card" key={i}>
            <div className="icon" aria-hidden="true">{w.icon}</div>
            <h4>{w.title}</h4>
            <p>{w.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

