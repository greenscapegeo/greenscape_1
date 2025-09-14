import React from 'react';
import { config } from '../config';

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container grid two">
        <div>
          <h2>About Us</h2>
          <p>{config.aboutText}</p>
          <a className="btn link" href="#services" aria-label="Learn more about services">{config.ctaLearnText}</a>
        </div>
        <div className="logos">
          <img src={config.logo1Url} alt="Founding company 1 logo" />
          <img src={config.logo2Url} alt="Founding company 2 logo" />
        </div>
      </div>
    </section>
  );
}

