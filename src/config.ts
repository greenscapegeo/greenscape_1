import type { Config } from './types';

function must<T extends string>(value: T | undefined, key: string): T {
  if (!value) throw new Error(`Missing required env: ${key}`);
  return value;
}

function parseJSON<T>(raw: string, key: string): T {
  try {
    return JSON.parse(raw) as T;
  } catch (e) {
    throw new Error(`Invalid JSON in env ${key}`);
  }
}

const env = import.meta.env;

export const config: Config = {
  siteTitle: must(env.VITE_SITE_TITLE, 'VITE_SITE_TITLE'),
  siteDescription: must(env.VITE_SITE_DESCRIPTION, 'VITE_SITE_DESCRIPTION'),
  faviconUrl: env.VITE_FAVICON_URL as string | undefined,
  brandEmoji: must(env.VITE_BRAND_EMOJI, 'VITE_BRAND_EMOJI'),
  brandName: must(env.VITE_BRAND_NAME, 'VITE_BRAND_NAME'),
  brandColor: must(env.VITE_BRAND_COLOR, 'VITE_BRAND_COLOR'),

  heroBgUrl: must(env.VITE_HERO_BG_URL, 'VITE_HERO_BG_URL'),
  missionTitle: must(env.VITE_MISSION_TITLE, 'VITE_MISSION_TITLE'),
  missionSubtitle: must(env.VITE_MISSION_SUBTITLE, 'VITE_MISSION_SUBTITLE'),
  heroSubtitleColor: must(env.VITE_HERO_SUBTITLE_COLOR, 'VITE_HERO_SUBTITLE_COLOR'),
  ctaLearnText: must(env.VITE_CTA_LEARN_TEXT, 'VITE_CTA_LEARN_TEXT'),
  ctaContactText: must(env.VITE_CTA_CONTACT_TEXT, 'VITE_CTA_CONTACT_TEXT'),

  aboutText: must(env.VITE_ABOUT_TEXT, 'VITE_ABOUT_TEXT'),
  logo1Url: must(env.VITE_LOGO1_URL, 'VITE_LOGO1_URL'),
  logo2Url: must(env.VITE_LOGO2_URL, 'VITE_LOGO2_URL'),

  whyItems: parseJSON(must(env.VITE_WHY_ITEMS, 'VITE_WHY_ITEMS'), 'VITE_WHY_ITEMS'),

  showroomBullets: parseJSON(must(env.VITE_SHOWROOM_BULLETS, 'VITE_SHOWROOM_BULLETS'), 'VITE_SHOWROOM_BULLETS'),
  showroomMediaUrl: must(env.VITE_SHOWROOM_MEDIA_URL, 'VITE_SHOWROOM_MEDIA_URL'),
  designText: must(env.VITE_DESIGN_TEXT, 'VITE_DESIGN_TEXT'),
  designCtaText: must(env.VITE_DESIGN_CTA_TEXT, 'VITE_DESIGN_CTA_TEXT'),
  designBgUrl: must(env.VITE_DESIGN_BG_URL, 'VITE_DESIGN_BG_URL'),
  plantingChecklist: parseJSON(must(env.VITE_PLANTING_CHECKLIST, 'VITE_PLANTING_CHECKLIST'), 'VITE_PLANTING_CHECKLIST'),
  plantingMediaUrl: must(env.VITE_PLANTING_MEDIA_URL, 'VITE_PLANTING_MEDIA_URL'),

  contactAddress: must(env.VITE_CONTACT_ADDRESS, 'VITE_CONTACT_ADDRESS'),
  contactPhones: parseJSON(must(env.VITE_CONTACT_PHONES, 'VITE_CONTACT_PHONES'), 'VITE_CONTACT_PHONES'),
  contactEmail: must(env.VITE_CONTACT_EMAIL, 'VITE_CONTACT_EMAIL'),
  contactHours: must(env.VITE_CONTACT_HOURS, 'VITE_CONTACT_HOURS'),
  mapsEmbedUrl: must(env.VITE_MAPS_EMBED_URL, 'VITE_MAPS_EMBED_URL'),
  mapsLinkUrl: must(env.VITE_MAPS_LINK_URL, 'VITE_MAPS_LINK_URL'),

  contactTitle: must(env.VITE_CONTACT_TITLE, 'VITE_CONTACT_TITLE'),
  contactAddressLabel: must(env.VITE_CONTACT_ADDRESS_LABEL, 'VITE_CONTACT_ADDRESS_LABEL'),
  contactInfoLabel: must(env.VITE_CONTACT_INFO_LABEL, 'VITE_CONTACT_INFO_LABEL'),
  contactHoursLabel: must(env.VITE_CONTACT_HOURS_LABEL, 'VITE_CONTACT_HOURS_LABEL'),
  socials: parseJSON(must(env.VITE_SOCIALS, 'VITE_SOCIALS'), 'VITE_SOCIALS'),

  enabledSections: parseJSON(must(env.VITE_ENABLED_SECTIONS, 'VITE_ENABLED_SECTIONS'), 'VITE_ENABLED_SECTIONS'),

  leafSvg: must(env.VITE_LEAF_SVG, 'VITE_LEAF_SVG'),
  leafSvgs: env.VITE_LEAF_SVGS ? parseJSON<string[]>(env.VITE_LEAF_SVGS as string, 'VITE_LEAF_SVGS') : undefined,
  leafCount: Number(must(env.VITE_LEAF_COUNT, 'VITE_LEAF_COUNT')),
  leafColor: must(env.VITE_LEAF_COLOR, 'VITE_LEAF_COLOR'),
  leafFollowStrength: Number(must(env.VITE_LEAF_FOLLOW_STRENGTH, 'VITE_LEAF_FOLLOW_STRENGTH')),

  georgianFontFamily: env.VITE_FONT_GEORGIAN_FAMILY as string | undefined,
  georgianFontUrlWoff2: env.VITE_FONT_GEORGIAN_URL_WOFF2 as string | undefined,
  georgianFontUrl: env.VITE_FONT_GEORGIAN_URL as string | undefined,
  georgianFontWeight: (env.VITE_FONT_GEORGIAN_WEIGHT as string | undefined) ?? '400',
  georgianFontStyle: (env.VITE_FONT_GEORGIAN_STYLE as string | undefined) ?? 'normal'
};
