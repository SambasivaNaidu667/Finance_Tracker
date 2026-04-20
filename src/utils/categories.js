import {
  FiCoffee,
  FiMapPin,
  FiHome,
  FiShoppingBag,
  FiFilm,
  FiHeart,
  FiZap,
  FiRepeat,
  FiBriefcase,
  FiCode,
  FiTrendingUp,
  FiGift,
  FiCornerDownLeft,
  FiMoreHorizontal,
} from 'react-icons/fi';

import { CATEGORY_COLORS } from './constants';

export const CATEGORY_CONFIG = {
  Food: { icon: FiCoffee, color: CATEGORY_COLORS.Food, gradient: 'linear-gradient(135deg, #f97316, #fb923c)' },
  Travel: { icon: FiMapPin, color: CATEGORY_COLORS.Travel, gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)' },
  Rent: { icon: FiHome, color: CATEGORY_COLORS.Rent, gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' },
  Shopping: { icon: FiShoppingBag, color: CATEGORY_COLORS.Shopping, gradient: 'linear-gradient(135deg, #ec4899, #f472b6)' },
  Entertainment: { icon: FiFilm, color: CATEGORY_COLORS.Entertainment, gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
  Health: { icon: FiHeart, color: CATEGORY_COLORS.Health, gradient: 'linear-gradient(135deg, #10b981, #34d399)' },
  Utilities: { icon: FiZap, color: CATEGORY_COLORS.Utilities, gradient: 'linear-gradient(135deg, #6366f1, #818cf8)' },
  Subscriptions: { icon: FiRepeat, color: CATEGORY_COLORS.Subscriptions, gradient: 'linear-gradient(135deg, #ef4444, #f87171)' },
  Salary: { icon: FiBriefcase, color: CATEGORY_COLORS.Salary, gradient: 'linear-gradient(135deg, #22c55e, #4ade80)' },
  Freelance: { icon: FiCode, color: CATEGORY_COLORS.Freelance, gradient: 'linear-gradient(135deg, #14b8a6, #2dd4bf)' },
  Investment: { icon: FiTrendingUp, color: CATEGORY_COLORS.Investment, gradient: 'linear-gradient(135deg, #0ea5e9, #38bdf8)' },
  Gift: { icon: FiGift, color: CATEGORY_COLORS.Gift, gradient: 'linear-gradient(135deg, #d946ef, #e879f9)' },
  Refund: { icon: FiCornerDownLeft, color: CATEGORY_COLORS.Refund, gradient: 'linear-gradient(135deg, #64748b, #94a3b8)' },
  Other: { icon: FiMoreHorizontal, color: CATEGORY_COLORS.Other, gradient: 'linear-gradient(135deg, #78716c, #a8a29e)' },
};

export const getCategoryIcon = (category) => {
  return CATEGORY_CONFIG[category]?.icon || FiMoreHorizontal;
};

export const getCategoryColor = (category) => {
  return CATEGORY_CONFIG[category]?.color || '#78716c';
};

export const getCategoryGradient = (category) => {
  return CATEGORY_CONFIG[category]?.gradient || 'linear-gradient(135deg, #78716c, #a8a29e)';
};
