export const PRICING_PLANS = {
  starter: {
    id: 'starter',
    name: 'Starter',
    price: 49,
    amount: 4900,
    credits: 10,
    features: [
      '10 High-Quality Downloads',
      'Access to Basic Templates',
      'No Watermark',
      '24/7 Support',
    ]
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 199,
    amount: 19900,
    credits: 50,
    popular: true,
    features: [
      '50 High-Quality Downloads',
      'Access to All Templates',
      'Priority Processing',
      'No Watermark',
      'Email Support',
    ]
  },
  ultimate: {
    id: 'ultimate',
    name: 'Ultimate',
    price: 399,
    amount: 39900,
    credits: 120,
    features: [
      '120 High-Quality Downloads',
      'Bulk Export Options',
      'Early Access to New Features',
      'No Watermark',
      'Priority Support',
    ]
  }
} as const;

export type PlanId = keyof typeof PRICING_PLANS;

export const COUPONS = {
  'WELCOME50': { type: 'percentage', value: 50 }, // 50% off
  'SAVE20': { type: 'percentage', value: 20 },    // 20% off
  'OFF99': { type: 'percentage', value: 99 },
} as const;

export function getPlan(id: string) {
  return PRICING_PLANS[id as PlanId] || PRICING_PLANS.starter;
}

export function calculateDiscountedAmount(amount: number, couponCode?: string) {
    if (!couponCode || !COUPONS[couponCode as keyof typeof COUPONS]) {
        return amount;
    }
    const coupon = COUPONS[couponCode as keyof typeof COUPONS];
    if (coupon.type === 'percentage') {
        return Math.round(amount * (1 - coupon.value / 100));
    }
    return amount;
}
