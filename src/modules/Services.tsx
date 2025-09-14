import React from 'react';
import { config } from '../config';

export default function Services({ variant }: { variant: 'showroom' | 'design' | 'planting' }) {
  if (variant === 'showroom') {
    return (
      <section id="services" className="section services">
        <div className="container">
          <h2>What We Offer</h2>
          <div className="service split">
            <div className="service-text">
              <h3>{config.brandName} Nursery Showroom</h3>
              <ul className="bullets">
                {config.showroomBullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
              <a className="btn link" href="#catalog" aria-label="View all plants">View All Plants</a>
            </div>
            <div className="service-media">
              <img src={config.showroomMediaUrl} alt="Nursery showroom" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'design') {
    return (
      <section className="section services">
        <div className="container">
          <div className="service overlay">
            <div className="overlay-bg" style={{ backgroundImage: `linear-gradient(rgba(45,122,50,0.15), rgba(45,122,50,0.15)), url('${config.designBgUrl}')` }} aria-hidden="true" />
            <div className="overlay-content">
              <h3>Landscape Design & 3D Visualization</h3>
              <p>{config.designText}</p>
              <a className="btn primary" href="#contact">{config.designCtaText}</a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // planting
  return (
    <section className="section services">
      <div className="container">
        <div className="service split reverse">
          <div className="service-media">
            <img src={config.plantingMediaUrl} alt="Planting process and finished garden" />
          </div>
          <div className="service-text">
            <h3>Planting & Garden Arrangement</h3>
            <ul className="checklist">
              {config.plantingChecklist.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

