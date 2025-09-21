import React from 'react';
import { config } from '../config';
import { useLanguage } from '../contexts/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [msg, setMsg] = React.useState('');

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(t('contact.form.thanks'));
  }
  return (
    <section id="contact" className="section contact">
      <div className="container grid two">
        <div>
          <h2>{t('contact.title')}</h2>
          <ul className="contact-list">
            <li><strong>{t('contact.address.label')}:</strong> {t('contact.address')} {" "}
              <a href={config.mapsLinkUrl} target="_blank" rel="noreferrer">(Google Maps)</a>
            </li>
            <li>
              <strong>{t('contact.info.label')}:</strong>
              <div>
                {config.contactPhones.map((p, i) => (
                  <div key={i}><a href={`tel:${p}`}>{p}</a></div>
                ))}
                <div><a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a></div>
                <div>
                  {config.socials.map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noreferrer" style={{ marginRight: 8 }}>
                      <span aria-hidden>{s.icon ?? '🔗'}</span> {t(`social.${s.label.toLowerCase()}`) || s.label}
                    </a>
                  ))}
                </div>
              </div>
            </li>
            <li><strong>{t('contact.hours.label')}:</strong> {t('contact.hours')}</li>
          </ul>
          <div className="map-embed">
            <iframe title="Google Maps location" loading="lazy" src={config.mapsEmbedUrl}></iframe>
          </div>
        </div>
        <div>
          <form className="form" onSubmit={onSubmit} noValidate>
            <h3>{t('hero.cta.contact')}</h3>
            <div className="field">
              <label htmlFor="name">{t('contact.form.name')}</label>
              <input id="name" name="name" type="text" placeholder={t('contact.form.name.placeholder')} required />
            </div>
            <div className="field">
              <label htmlFor="phone">{t('contact.form.phone')}</label>
              <input id="phone" name="phone" type="tel" placeholder={t('contact.form.phone.placeholder')} required />
            </div>
            <div className="field">
              <label htmlFor="message">{t('contact.form.message')}</label>
              <textarea id="message" name="message" rows={4} placeholder={t('contact.form.message.placeholder')}></textarea>
            </div>
            <button className="btn primary" type="submit">{t('contact.form.send')}</button>
            <p className="form-status" role="status" aria-live="polite">{msg}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
