import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import { config } from './config';

// Set title and meta from env-driven config only
if (config.siteTitle) document.title = config.siteTitle;
const meta = document.querySelector('meta[name="description"]');
if (meta && config.siteDescription) meta.setAttribute('content', config.siteDescription);

// Optional favicon from env
if (config.faviconUrl) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = config.faviconUrl;
}

// Optional Georgian font via env (auto-applies for Georgian Unicode range)
if (config.georgianFontFamily && (config.georgianFontUrlWoff2 || config.georgianFontUrl)) {
  const style = document.createElement('style');
  style.setAttribute('data-font', 'georgian');
  const family = config.georgianFontFamily;
  const url = (config.georgianFontUrlWoff2 || config.georgianFontUrl)!;
  const weight = config.georgianFontWeight ?? '400';
  const fontStyle = config.georgianFontStyle ?? 'normal';
  const ext = url.split('?')[0].split('#')[0].split('.').pop()?.toLowerCase();
  const fmt = ext === 'woff2' ? 'woff2' : ext === 'woff' ? 'woff' : ext === 'otf' ? 'opentype' : 'truetype';
  style.textContent = `@font-face{font-family:'${family}';src:url('${url}') format('${fmt}');font-weight:${weight};font-style:${fontStyle};font-display:swap;unicode-range: U+10A0-10FF, U+2D00-2D2F;} body,button,input,textarea{font-family:'${family}', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, Noto Sans, 'Apple Color Emoji', 'Segoe UI Emoji';}`;
  document.head.appendChild(style);
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
