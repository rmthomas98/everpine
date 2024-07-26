export const limits = {
  ////////////// FREE PLAN //////////////////
  free: {
    qrCodes: {
      qrCodes: 3,
      redirects: 0,
      logos: false,
      colors: false,
      patterns: false,
    },
    links: {
      links: 15,
      redirects: 0,
      bulk: false,
      branding: false,
      paths: false,
    },
    pages: {
      pages: 1,
      branding: false,
      templates: false,
    },
    campaigns: {
      campaigns: false,
      utmBuilder: false,
      utmPresets: false,
    },
    domains: 0,
    seats: 1,
    analytics: 0, // days
    smartRules: false,
    sso: false,
  },
  ////////////// PROFESSIONAL PLAN //////////////////
  professional: {
    qrCodes: {
      qrCodes: 20,
      redirects: 5,
      logos: true,
      colors: true,
      patterns: true,
    },
    links: {
      links: 400,
      redirects: 100,
      bulk: 400,
      branding: true,
      paths: true,
    },
    pages: {
      pages: 3,
      branding: true,
      templates: true,
    },
    campaigns: {
      campaigns: false,
      utmBuilder: true,
      utmPresets: true,
    },
    domains: 1,
    seats: 5,
    analytics: 90, // days
    smartRules: true,
    sso: false,
  },
  ////////////// BUSINESS PLAN //////////////////
  business: {
    qrCodes: {
      qrCodes: 100,
      redirects: 25,
      logos: true,
      colors: true,
      patterns: true,
    },
    links: {
      links: 2000,
      redirects: 500,
      bulk: 2000,
      branding: true,
      paths: true,
    },
    pages: {
      pages: 10,
      branding: true,
      templates: true,
    },
    campaigns: {
      campaigns: true,
      utmBuilder: true,
      utmPresets: true,
    },
    domains: 3,
    seats: 15,
    analytics: 365, // days
    smartRules: true,
    sso: false,
  },
  ////////////// ENTERPRISE PLAN //////////////////
  enterprise: {
    qrCodes: {
      qrCodes: 500,
      redirects: 125,
      logos: true,
      colors: true,
      patterns: true,
    },
    links: {
      links: 10000,
      redirects: 2500,
      bulk: 10000,
      branding: true,
      paths: true,
    },
    pages: {
      pages: 25,
      branding: true,
      templates: true,
    },
    campaigns: {
      campaigns: true,
      utmBuilder: true,
      utmPresets: true,
    },
    domains: 10,
    seats: 50,
    analytics: 1095, // days
    smartRules: true,
    sso: true,
  },
};
