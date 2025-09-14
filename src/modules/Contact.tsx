import React from 'react';
import { config } from '../config';

export default function Contact() {
  const [msg, setMsg] = React.useState('');
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg('Thanks! We will contact you shortly.');
  }
  return (
    <section id="contact" className="section contact">
      <div className="container grid two">
        <div>
          <h2>{config.contactTitle}</h2>
          <ul className="contact-list">
            <li><strong>{config.contactAddressLabel}:</strong> {config.contactAddress} {" "}
              <a href={config.mapsLinkUrl} target="_blank" rel="noreferrer">(Google Maps)</a>
            </li>
            <li>
              <strong>{config.contactInfoLabel}:</strong>
              <div>
                {config.contactPhones.map((p, i) => (
                  <div key={i}><a href={`tel:${p}`}>{p}</a></div>
                ))}
                <div><a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a></div>
                <div>
                  {config.socials.map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noreferrer" style={{ marginRight: 8 }}>
                      <span aria-hidden>{s.icon ?? '🔗'}</span> {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </li>
            <li><strong>{config.contactHoursLabel}:</strong> {config.contactHours}</li>
          </ul>
          <div className="map-embed">
            <iframe title="Google Maps location" loading="lazy" src={config.mapsEmbedUrl}></iframe>
          </div>
        </div>
        <div>
          <form className="form" onSubmit={onSubmit} noValidate>
            <h3>{config.ctaContactText}</h3>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Your name" required />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" placeholder="Your phone number" required />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={4} placeholder="How can we help?"></textarea>
            </div>
            <button className="btn primary" type="submit">Send</button>
            <p className="form-status" role="status" aria-live="polite">{msg}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
