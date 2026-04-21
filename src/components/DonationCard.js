import React from 'react';
import './DonationCard.css';

const foodTypeIcons = {
  'Cooked Meals':   '🍱',
  'Packaged Food':  '📦',
  'Raw Vegetables': '🥦',
  'Fruits':         '🍎',
  'Bakery Items':   '🥐',
  'Dairy Products': '🥛',
  'Grains & Pulses':'🌾',
  'Other':          '🍽️',
};

const statusColors = {
  Available: 'badge-green',
  Requested: 'badge-amber',
  Fulfilled: 'badge-gray',
};

// ─── FIX: Added `extraAction` prop so ViewDonations can inject
//         the "Mark Fulfilled" button into the card's action area.
//         Previously this prop was passed but never rendered,
//         so the button was completely invisible / non-functional.
function DonationCard({ donation, onRequest, showActions = false, extraAction = null }) {
  const { name, location, foodType, quantity, contact, date, status } = donation;
  const icon = foodTypeIcons[foodType] || '🍽️';
  const badgeClass = statusColors[status] || 'badge-gray';
  const isAvailable = status === 'Available';

  return (
    <div className={`donation-card card card-hover fade-up ${!isAvailable ? 'donation-card--dimmed' : ''}`}>

      {/* Header */}
      <div className="donation-card__header">
        <span className="donation-card__icon">{icon}</span>
        <span className={`badge ${badgeClass}`}>{status}</span>
      </div>

      {/* Content */}
      <div className="donation-card__body">
        <h3 className="donation-card__food-type">{foodType}</h3>
        <p className="donation-card__quantity">
          <span className="donation-card__qty-label">Qty:</span>
          <strong>{quantity}</strong>
        </p>
      </div>

      {/* Details */}
      <div className="donation-card__details">
        <div className="donation-card__detail">
          <span>👤</span>
          <span>{name}</span>
        </div>
        <div className="donation-card__detail">
          <span>📍</span>
          <span>{location}</span>
        </div>
        <div className="donation-card__detail">
          <span>📞</span>
          <span>{contact}</span>
        </div>
        <div className="donation-card__detail">
          <span>📅</span>
          <span>{date}</span>
        </div>
      </div>

      {/* Request action — shown on RequestPage (showActions=true, Available only) */}
      {showActions && isAvailable && onRequest && (
        <button
          className="btn btn-primary btn-full donation-card__btn"
          onClick={() => onRequest(donation.id)}
        >
          🙏 Request This Food
        </button>
      )}

      {/* Already-claimed label — shown on RequestPage for non-available */}
      {showActions && !isAvailable && (
        <div className="donation-card__claimed">
          ✅ {status === 'Requested' ? 'Already Requested' : 'Fulfilled'}
        </div>
      )}

      {/* FIX: Render extraAction here — this is how ViewDonations injects
               the "Mark Fulfilled" button. Previously this was never rendered. */}
      {extraAction && (
        <div className="donation-card__extra-action">
          {extraAction}
        </div>
      )}

    </div>
  );
}

export default DonationCard;


