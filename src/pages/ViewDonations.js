import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DonationCard from '../components/DonationCard';
import './ViewDonations.css';
import './DonatePage.css';
import './RequestPage.css';

const STATUS_TABS = ['All', 'Available', 'Requested', 'Fulfilled'];
const FOOD_TYPES  = ['All Types', 'Cooked Meals', 'Packaged Food', 'Raw Vegetables', 'Fruits', 'Bakery Items', 'Dairy Products', 'Grains & Pulses', 'Other'];

const statusEmoji = { All: '📋', Available: '✅', Requested: '🕐', Fulfilled: '🎉' };

function ViewDonations({ donations, updateDonationStatus }) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [foodFilter,   setFoodFilter]   = useState('All Types');
  const [search,       setSearch]       = useState('');
  const [sortBy,       setSortBy]       = useState('newest');

  // Live stats — recalculate whenever donations change
  const stats = useMemo(() => ({
    total:     donations.length,
    available: donations.filter(d => d.status === 'Available').length,
    requested: donations.filter(d => d.status === 'Requested').length,
    fulfilled: donations.filter(d => d.status === 'Fulfilled').length,
  }), [donations]);

  // Filter + sort pipeline
  const displayed = useMemo(() => {
    let list = [...donations];

    if (statusFilter !== 'All')
      list = list.filter(d => d.status === statusFilter);

    if (foodFilter !== 'All Types')
      list = list.filter(d => d.foodType === foodFilter);

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q) ||
        d.foodType.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'newest')  list.sort((a, b) => b.id - a.id);
    if (sortBy === 'oldest')  list.sort((a, b) => a.id - b.id);
    if (sortBy === 'food-az') list.sort((a, b) => a.foodType.localeCompare(b.foodType));
    if (sortBy === 'name-az') list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [donations, statusFilter, foodFilter, search, sortBy]);

  // Marks a Requested donation as Fulfilled.
  // updateDonationStatus (from App.js) updates state + localStorage instantly.
  const markFulfilled = (id) => {
    updateDonationStatus(id, 'Fulfilled');
  };

  return (
    <div className="page-wrapper">
      <div className="container">

        {/* Header */}
        <div className="page-header fade-up">
          <span className="section-tag">All Listings</span>
          <h1 className="section-title">View All Donations</h1>
          <p className="section-subtitle">
            A full overview of every food donation on FoodShare — filter, search, and track status.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="vd-stats fade-up delay-1">
          {[
            { label: 'Total',     value: stats.total,     icon: '📋' },
            { label: 'Available', value: stats.available, icon: '✅' },
            { label: 'Requested', value: stats.requested, icon: '🕐' },
            { label: 'Fulfilled', value: stats.fulfilled, icon: '🎉' },
          ].map((s) => (
            <button
              key={s.label}
              className={`vd-stat-pill ${statusFilter === (s.label === 'Total' ? 'All' : s.label) ? 'vd-stat-pill--active' : ''}`}
              onClick={() => setStatusFilter(s.label === 'Total' ? 'All' : s.label)}
            >
              <span className="vd-stat-pill__icon">{s.icon}</span>
              <strong className="vd-stat-pill__value">{s.value}</strong>
              <span className="vd-stat-pill__label">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="vd-controls card fade-up delay-2">
          <div className="vd-search">
            <span className="vd-search__icon">🔍</span>
            <input
              type="text"
              className="form-input vd-search__input"
              placeholder="Search by name, location or food type…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="vd-search__clear" onClick={() => setSearch('')}>✕</button>
            )}
          </div>

          <select
            className="form-select vd-filter-select"
            value={foodFilter}
            onChange={(e) => setFoodFilter(e.target.value)}
          >
            {FOOD_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>

          <select
            className="form-select vd-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="food-az">Food Type A–Z</option>
            <option value="name-az">Donor Name A–Z</option>
          </select>
        </div>

        {/* Status Tabs */}
        <div className="vd-tabs fade-up delay-3">
          {STATUS_TABS.map(tab => (
            <button
              key={tab}
              className={`vd-tab ${statusFilter === tab ? 'vd-tab--active' : ''}`}
              onClick={() => setStatusFilter(tab)}
            >
              {statusEmoji[tab]} {tab}
              <span className="vd-tab__count">
                {tab === 'All'       ? stats.total     :
                 tab === 'Available' ? stats.available :
                 tab === 'Requested' ? stats.requested :
                                      stats.fulfilled}
              </span>
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="results-count fade-up">
          Showing <strong>{displayed.length}</strong> donation{displayed.length !== 1 ? 's' : ''}
          {(statusFilter !== 'All' || foodFilter !== 'All Types' || search) && (
            <button
              className="vd-clear-filters"
              onClick={() => { setStatusFilter('All'); setFoodFilter('All Types'); setSearch(''); }}
            >
              Clear filters ✕
            </button>
          )}
        </p>

        {/* Donation Grid */}
        {displayed.length > 0 ? (
          <div className="grid-3 donations-grid">
            {displayed.map((donation, i) => (
              <div key={donation.id} style={{ animationDelay: `${i * 0.06}s` }}>
                <DonationCard
                  donation={donation}
                  showActions={false}
                  extraAction={
                    donation.status === 'Requested'
                      ? (
                        <button
                          className="btn btn-outline btn-sm btn-full vd-fulfill-btn"
                          onClick={() => markFulfilled(donation.id)}
                        >
                          ✅ Mark Fulfilled
                        </button>
                      )
                      : null
                  }
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state fade-up">
            <div className="icon">📭</div>
            <h3>No donations match your filters</h3>
            <p>Try adjusting the search term, food type, or status filter.</p>
            <button
              className="btn btn-outline"
              style={{ marginTop: 20 }}
              onClick={() => { setStatusFilter('All'); setFoodFilter('All Types'); setSearch(''); }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Donate CTA */}
        {donations.length === 0 && (
          <div className="vd-no-donations card fade-up">
            <span className="vd-no-donations__emoji">🌱</span>
            <h2>No donations yet</h2>
            <p>Be the first to donate! It only takes a couple of minutes.</p>
            <Link to="/donate" className="btn btn-primary btn-lg">
              🤝 Donate Food Now
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

export default ViewDonations;
