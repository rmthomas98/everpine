export const limits = {
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
  professional: {
    qrCodes: 20,
    links: 400,
    pages: 3,
    domains: 1,
    seats: 5,
    analytics: 90, // days
    campaigns: false,
    sso: false,
  },
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
      paths: false,
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
  enterprise: {
    qrCodes: 500,
    links: 10000,
    pages: 50,
    domains: 10,
    seats: 50,
    analytics: 1095, // days,
    campaigns: true,
    sso: true,
  },
};
