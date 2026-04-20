import './LoadingSpinner.css';

export default function LoadingSpinner({ size = 'md', text }) {
  return (
    <div className={`loading-spinner loading-spinner--${size}`}>
      <div className="loading-spinner__ring">
        <div className="loading-spinner__circle" />
      </div>
      {text && <p className="loading-spinner__text">{text}</p>}
    </div>
  );
}

export function SkeletonCard({ count = 3 }) {
  return (
    <div className="skeleton-list">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-card__icon skeleton-shimmer" />
          <div className="skeleton-card__content">
            <div className="skeleton-card__line skeleton-card__line--title skeleton-shimmer" />
            <div className="skeleton-card__line skeleton-card__line--sub skeleton-shimmer" />
          </div>
          <div className="skeleton-card__amount skeleton-shimmer" />
        </div>
      ))}
    </div>
  );
}
