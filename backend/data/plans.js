const plans = {
  professional: {
    name: "professional",
    price: {
      month: process.env.PRO_MONTHLY_PRICE_ID,
      annual: process.env.PRO_YEARLY_PRICE_ID,
    },
  },
  business: {
    name: "business",
    price: {
      month: process.env.BUSINESS_MONTHLY_PRICE_ID,
      annual: process.env.BUSINESS_YEARLY_PRICE_ID,
    },
  },
  enterprise: {
    name: "enterprise",
    price: {
      month: process.env.ENTERPRISE_MONTHLY_PRICE_ID,
      annual: process.env.ENTERPRISE_YEARLY_PRICE_ID,
    },
  },
};

module.exports = plans;
