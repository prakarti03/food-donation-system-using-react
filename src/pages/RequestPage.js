import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DonationCard from '../components/DonationCard';
import './RequestPage.css';
import './DonatePage.css'; // reuse page-wrapper, page-header

const FOOD_TYPES = ['All', 'Cooked Meals', 'Packaged Food', 'Raw Vegetables', 'Fruits', 'Bakery Items', 'Dairy Products', 'Grains & Pulses', 'Other'];

function RequestPage({ donations, updateDonationStatus }) {
  const [filter, setFilter] = useState('All');
  const [requested, setRequested] = useState(null); // id of last requested item
  const [showConfirm, setShowConfirm] = useState(null); // id pending confirmation

  const available = donations.filter((d) => d.status === 'Available');
  const filtered  = filter === 'All'
    ? available
    : available.filter((d) => d.foodType === filter);

  const handleRequestClick = (id) => {
    setShowConfirm(id);
  };

  const confirmRequest = () => {
    updateDonationStatus(showConfirm, 'Requested');
    setRequested(showConfirm);
    setShowConfirm(null);
  };

  return (
    <div className="page-wrapper">
      <div className="container">

        {/* Header */}
        <div className="page-header fade-up">
          <span className="section-tag">Need Food?</span>
          <h1 className="section-title">Request Available Food</h1>
          <p className="section-subtitle">
            Browse donations near you and request what you need. It's free and simple.
          </p>
        </div>

        {/* Success Toast */}
        {requested && (
          <div className="alert alert-success fade-up" style={{ maxWidth: 560, margin: '0 auto 32px' }}>
            ✅ Your request has been submitted! The donor will be in touch shortly.
            <button
              onClick={() => setRequested(null)}
              style={{ marginLeft: 12, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, color: 'var(--green-700)' }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Filter Bar */}
        <div className="filter-bar fade-up delay-1">
          <span className="filter-bar__label">Filter by:</span>
          <div className="filter-chips">
            {FOOD_TYPES.map((type) => (
              <button
                key={type}
                className={`filter-chip ${filter === type ? 'filter-chip--active' : ''}`}
                onClick={() => setFilter(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="results-count fade-up delay-2">
          <strong>{filtered.length}</strong> donation{filtered.length !== 1 ? 's' : ''} available
          {filter !== 'All' && <span> in <em>{filter}</em></span>}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid-3 donations-grid">
            {filtered.map((donation, i) => (
              <div
                key={donation.id}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <DonationCard
                  donation={donation}
                  showActions
                  onRequest={handleRequestClick}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state fade-up">
            <div className="icon">🔍</div>
            <h3>No donations available right now</h3>
            <p>
              {filter !== 'All'
                ? `No "${filter}" available. Try a different category.`
                : 'Check back soon — donors are always adding new listings.'}
            </p>
            {filter !== 'All' && (
              <button
                className="btn btn-outline"
                style={{ marginTop: 20 }}
                onClick={() => setFilter('All')}
              >
                Show All
              </button>
            )}
          </div>
        )}

        {/* No available at all */}
        {available.length === 0 && (
          <div className="empty-callout card fade-up">
            <span>🌱</span>
            <div>
              <h3>Want to help?</h3>
              <p>If you have surplus food, consider donating it so others can request it.</p>
            </div>
            <Link to="/donate" className="btn btn-primary">
              Donate Food
            </Link>
          </div>
        )}

      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(null)}>
          <div className="modal-box scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-box__icon">🙏</div>
            <h2 className="modal-box__title">Confirm Request</h2>
            <p className="modal-box__text">
              Are you sure you want to request this food donation? The donor will be notified.
            </p>
            <div className="modal-box__actions">
              <button className="btn btn-primary btn-lg" onClick={confirmRequest}>
                Yes, Request It
              </button>
              <button className="btn btn-outline btn-lg" onClick={() => setShowConfirm(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RequestPage;
