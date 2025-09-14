export type WhyItem = { icon: string; title: string; desc: string };
export type SocialItem = { label: string; url: string; icon?: string };

export type Config = {
  siteTitle: string;
  siteDescription: string;
  faviconUrl?: string;
  brandEmoji: string;
  brandName: string;
  brandColor: string;

  heroBgUrl: string;
  missionTitle: string;
  missionSubtitle: string;
  ctaLearnText: string;
  ctaContactText: string;

  aboutText: string;
  logo1Url: string;
  logo2Url: string;

  whyItems: WhyItem[];

  showroomBullets: string[];
  showroomMediaUrl: string;
  designText: string;
  designCtaText: string;
  designBgUrl: string;
  plantingChecklist: string[];
  plantingMediaUrl: string;

  contactAddress: string;
  contactPhones: string[];
  contactEmail: string;
  contactHours: string;
  mapsEmbedUrl: string;
  mapsLinkUrl: string;

  contactTitle: string;
  contactAddressLabel: string;
  contactInfoLabel: string;
  contactHoursLabel: string;
  socials: SocialItem[];

  enabledSections: string[]; // e.g. ["Header","Hero","About","Why","Services.Showroom","Services.Design","Services.Planting","Contact","Footer"]

  leafSvg: string; // raw path or full svg
  leafSvgs?: string[]; // optional array of paths (randomized)
  leafCount: number;
  leafColor: string;
  leafFollowStrength: number; // 0..1

  georgianFontFamily?: string;
  georgianFontUrlWoff2?: string;
  georgianFontUrl?: string;
  georgianFontWeight?: string;
  georgianFontStyle?: string;

  heroSubtitleColor: string;
};
