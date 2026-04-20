import { motion } from 'framer-motion';
import './StatCard.css';

export default function StatCard({ title, value, subtitle, icon: Icon, trend, trendLabel, variant = 'default', index = 0 }) {
  return (
    <motion.div
      className={`stat-card stat-card--${variant}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="stat-card__header">
        <span className="stat-card__title">{title}</span>
        {Icon && (
          <div className={`stat-card__icon stat-card__icon--${variant}`}>
            <Icon size={18} />
          </div>
        )}
      </div>
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__footer">
        {trend !== undefined && (
          <span className={`stat-card__trend ${trend >= 0 ? 'stat-card__trend--up' : 'stat-card__trend--down'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
        {subtitle && <span className="stat-card__subtitle">{subtitle}</span>}
        {trendLabel && <span className="stat-card__trend-label">{trendLabel}</span>}
      </div>
    </motion.div>
  );
}
