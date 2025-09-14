import React from 'react';
import { config } from '../config';

export default function Why() {
  return (
    <div className="container why">
      <h3>Why {config.brandName}?</h3>
      <div className="grid four cards">
        {config.whyItems.map((w, i) => (
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

