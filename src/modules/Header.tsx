import React from 'react';
import { config } from '../config';

export default function Header() {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="site-header">
      <div className="container nav">
        <a href="#" className="brand" aria-label={`${config.brandName} home`}>
          <span className="brand-mark" aria-hidden="true">{config.brandEmoji}</span>
          <span className="brand-text">{config.brandName}</span>
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
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
          <a className="btn cta" href="#contact">{config.ctaContactText}</a>
        </nav>
      </div>
    </header>
  );
}

