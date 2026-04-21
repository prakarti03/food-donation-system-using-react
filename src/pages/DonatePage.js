import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DonatePage.css';

const FOOD_TYPES = [
  'Cooked Meals',
  'Packaged Food',
  'Raw Vegetables',
  'Fruits',
  'Bakery Items',
  'Dairy Products',
  'Grains & Pulses',
  'Other',
];

const QUANTITY_UNITS = ['plates', 'packets', 'kg', 'litres', 'boxes', 'bags', 'items'];

const INITIAL_FORM = {
  name: '',
  location: '',
  foodType: '',
  quantityNum: '',
  quantityUnit: 'plates',
  contact: '',
};

function DonatePage({ addDonation }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())       e.name      = 'Your name is required.';
    if (!form.location.trim())   e.location   = 'Location is required.';
    if (!form.foodType)          e.foodType   = 'Please select a food type.';
    if (!form.quantityNum || isNaN(form.quantityNum) || Number(form.quantityNum) <= 0)
                                 e.quantityNum = 'Enter a valid quantity.';
    if (!form.contact.trim() || !/^\d{10}$/.test(form.contact.trim()))
                                 e.contact    = 'Enter a valid 10-digit phone number.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      addDonation({
        name: form.name.trim(),
        location: form.location.trim(),
        foodType: form.foodType,
        quantity: `${form.quantityNum} ${form.quantityUnit}`,
        contact: form.contact.trim(),
      });
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="page-wrapper">
        <div className="success-screen scale-in">
          <div className="success-screen__icon">🎉</div>
          <h2 className="success-screen__title">Donation Registered!</h2>
          <p className="success-screen__text">
            Thank you, <strong>{form.name}</strong>! Your food donation has been listed.
            Someone in need will be able to find it soon.
          </p>
          <div className="success-screen__actions">
            <button className="btn btn-primary btn-lg" onClick={handleReset}>
              + Donate Again
            </button>
            <Link to="/donations" className="btn btn-outline btn-lg">
              View All Donations
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="donate-page container">

        {/* Page Header */}
        <div className="page-header fade-up">
          <span className="section-tag">Give Food</span>
          <h1 className="section-title">Register Your Donation</h1>
          <p className="section-subtitle">
            Fill out the details below. It takes less than 2 minutes!
          </p>
        </div>

        <div className="donate-layout">

          {/* ── Form ── */}
          <div className="donate-form-wrapper fade-up delay-1">
            <div className="card donate-form-card">
              <form onSubmit={handleSubmit} noValidate>

                {/* Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    name="name"
                    className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                    placeholder="e.g. Priya Sharma"
                    value={form.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                {/* Location */}
                <div className="form-group">
                  <label className="form-label" htmlFor="location">Pickup Location</label>
                  <input
                    id="location"
                    name="location"
                    className={`form-input ${errors.location ? 'form-input--error' : ''}`}
                    placeholder="e.g. Sector 22, Chandigarh"
                    value={form.location}
                    onChange={handleChange}
                  />
                  {errors.location && <span className="form-error">{errors.location}</span>}
                </div>

                {/* Food Type */}
                <div className="form-group">
                  <label className="form-label" htmlFor="foodType">Food Type</label>
                  <select
                    id="foodType"
                    name="foodType"
                    className={`form-select ${errors.foodType ? 'form-input--error' : ''}`}
                    value={form.foodType}
                    onChange={handleChange}
                  >
                    <option value="">— Select food type —</option>
                    {FOOD_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.foodType && <span className="form-error">{errors.foodType}</span>}
                </div>

                {/* Quantity */}
                <div className="form-group">
                  <label className="form-label">Quantity</label>
                  <div className="quantity-row">
                    <input
                      name="quantityNum"
                      type="number"
                      min="1"
                      className={`form-input quantity-input ${errors.quantityNum ? 'form-input--error' : ''}`}
                      placeholder="e.g. 30"
                      value={form.quantityNum}
                      onChange={handleChange}
                    />
                    <select
                      name="quantityUnit"
                      className="form-select quantity-unit"
                      value={form.quantityUnit}
                      onChange={handleChange}
                    >
                      {QUANTITY_UNITS.map((u) => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                  </div>
                  {errors.quantityNum && <span className="form-error">{errors.quantityNum}</span>}
                </div>

                {/* Contact */}
                <div className="form-group">
                  <label className="form-label" htmlFor="contact">Contact Number</label>
                  <input
                    id="contact"
                    name="contact"
                    type="tel"
                    maxLength={10}
                    className={`form-input ${errors.contact ? 'form-input--error' : ''}`}
                    placeholder="10-digit mobile number"
                    value={form.contact}
                    onChange={handleChange}
                  />
                  {errors.contact && <span className="form-error">{errors.contact}</span>}
                </div>

                <button
                  type="submit"
                  className={`btn btn-primary btn-full btn-lg donate-submit-btn ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner" /> Submitting…
                    </>
                  ) : (
                    '🤝 Submit Donation'
                  )}
                </button>

              </form>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside className="donate-sidebar fade-up delay-2">
            <div className="card tip-card">
              <h3 className="tip-card__title">📌 Tips for Donors</h3>
              <ul className="tip-list">
                {[
                  'Make sure the food is fresh and safe to eat.',
                  'Label containers with the food type and date.',
                  'Be available for pickup within 2–3 hours.',
                  'Mention any allergens or special ingredients.',
                  'Package food securely to avoid spills.',
                ].map((tip, i) => (
                  <li key={i} className="tip-item">
                    <span className="tip-dot" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card impact-card">
              <div className="impact-card__header">
                <span>🌍</span>
                <h3>Your Impact</h3>
              </div>
              <div className="impact-stat">
                <strong>12,400+</strong>
                <span>Meals Shared This Year</span>
              </div>
              <div className="impact-stat">
                <strong>340+</strong>
                <span>Active Donors Like You</span>
              </div>
              <p className="impact-note">
                Every donation you make helps fight hunger in your community.
              </p>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

export default DonatePage;
