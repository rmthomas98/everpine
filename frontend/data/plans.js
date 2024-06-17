export const plans = {
  free: {
    name: "Free",
    description: "For personal use",
    price: { month: 0, annual: 0 },
    stripePriceId: "price_xxx",
    features: [
      "3 QR codes per month",
      "15 links per month",
      "1 landing page",
      "AI-generative QR art",
      "Unlimited scans and clicks",
      "Limited QR customization",
      "1 platform seat",
    ],
  },
  professional: {
    name: "professional",
    price: { month: 15, annual: 12 },
    features: [
      "20 QR codes per month",
      "400 links per month",
      "3 landing pages",
      "AI-generative QR art",
      "Unlimited scans and clicks",
      "Full QR customization",
      "5 platform seats",
      "Real time analytics",
      "3 months historical data",
      "1 custom domain",
      "Smart rules",
    ],
    planDetails: [
      "20 QR codes per month",
      "400 links per month",
      "3 landing pages",
      "5 platform seats",
      "3 months historical data",
      "1 custom domain",
    ],
  },
  business: {
    name: "business",
    price: { month: 40, annual: 32 },
    features: [
      "100 QR codes per month",
      "2,000 links per month",
      "10 landing pages",
      "AI-generative QR art",
      "Unlimited scans and clicks",
      "Full QR customization",
      "15 platform seats",
      "Real time analytics",
      "1 year historical data",
      "3 custom domains",
      "Smart rules",
      "Campaigns",
      "Priority support",
    ],
    planDetails: [
      "20 QR codes per month",
      "400 links per month",
      "3 landing pages",
      "5 platform seats",
      "3 months historical data",
      "1 custom domain",
    ],
  },
  enterprise: {
    name: "enterprise",
    price: { month: 120, annual: 96 },
    features: [
      "500 QR codes per month",
      "10,000 links per month",
      "50 landing pages",
      "AI-generative QR art",
      "Unlimited scans and clicks",
      "Full QR customization",
      "50 platform seats",
      "Real time analytics",
      "3 years historical data",
      "10 custom domains",
      "Smart rules",
      "Campaigns",
      "Dedicated support",
      "Single sign-on (SSO)",
    ],
    planDetails: [
      "20 QR codes per month",
      "400 links per month",
      "3 landing pages",
      "5 platform seats",
      "3 months historical data",
      "1 custom domain",
    ],
  },
  custom: { name: "custom" },
};
