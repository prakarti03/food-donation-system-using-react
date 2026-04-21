import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DonatePage from './pages/DonatePage';
import RequestPage from './pages/RequestPage';
import ViewDonations from './pages/ViewDonations';

// ─── Seed data used only when localStorage is empty ───────────────────────────
const SEED_DONATIONS = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Sector 22, Chandigarh',
    foodType: 'Cooked Meals',
    quantity: '30 plates',
    contact: '9876543210',
    date: '2025-04-15',
    status: 'Available',
  },
  {
    id: 2,
    name: 'Rajan Mehta',
    location: 'Panchkula, Haryana',
    foodType: 'Packaged Food',
    quantity: '50 packets',
    contact: '9812345678',
    date: '2025-04-16',
    status: 'Available',
  },
  {
    id: 3,
    name: 'Sunita NGO',
    location: 'Phase 7, Mohali',
    foodType: 'Raw Vegetables',
    quantity: '15 kg',
    contact: '9988776655',
    date: '2025-04-17',
    status: 'Available',
  },
];

// ─── Read from localStorage, fall back to seed data ───────────────────────────
function getInitialDonations() {
  try {
    const stored = localStorage.getItem('foodshare_donations');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // corrupted storage — fall through to seed
  }
  return SEED_DONATIONS;
}

function App() {
  const [donations, setDonations] = useState(getInitialDonations);

  // ── Persist every change to localStorage immediately ─────────────────────
  useEffect(() => {
    try {
      localStorage.setItem('foodshare_donations', JSON.stringify(donations));
    } catch {
      // storage unavailable — fail silently
    }
  }, [donations]);

  // ── Add a new donation (always starts as "Available") ────────────────────
  const addDonation = (donation) => {
    const newDonation = {
      ...donation,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'Available',
    };
    setDonations((prev) => [newDonation, ...prev]);
    return newDonation;
  };

  // ── Update a single donation's status by id ───────────────────────────────
  // Uses functional update so it always works off latest state,
  // maps by id so only the correct item changes, never all items.
  const updateDonationStatus = (id, status) => {
    setDonations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
  };

  return (
    <Router>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 72px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/donate"
            element={<DonatePage addDonation={addDonation} />}
          />
          <Route
            path="/request"
            element={
              <RequestPage
                donations={donations}
                updateDonationStatus={updateDonationStatus}
              />
            }
          />
          <Route
            path="/donations"
            element={
              <ViewDonations
                donations={donations}
                updateDonationStatus={updateDonationStatus}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
