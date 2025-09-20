import React from 'react';
import { config } from '../config';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="brand-col">
          <a href="#" className="brand">
            <span className="brand-mark" aria-hidden="true">{config.brandEmoji}</span>
            <span className="brand-text">{config.brandName}</span>
          </a>
          <p>Garden Center & Landscape Design</p>
        </div>
        <div>
          <h4>Contact</h4>
          <ul className="contact-list small">
            <li>{config.contactAddress}</li>
            <li><a href={`tel:${config.contactPhones[0]}`}>{config.contactPhones[0]}</a></li>
            <li><a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a></li>
            <li>{config.contactHours}</li>
          </ul>
        </div>
        <div>
          <h4>Explore</h4>
          <nav className="footer-nav">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </div>
      <div className="container small print">© {year} {config.brandName}. All rights reserved.</div>
    </footer>
  );
}

