import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location]);

  const navLinks = [
    { to: '/',          label: 'Home',           icon: '🏠' },
    { to: '/donate',    label: 'Donate Food',     icon: '🤝' },
    { to: '/request',   label: 'Request Food',    icon: '🙏' },
    { to: '/donations', label: 'View Donations',  icon: '📋' },
  ];

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        {/* Logo */}
        <NavLink to="/" className="navbar__logo">
          <span className="navbar__logo-icon">🌱</span>
          <span className="navbar__logo-text">FoodShare</span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="navbar__links">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <div className="navbar__cta">
          <NavLink to="/donate" className="btn btn-primary btn-sm">
            + Donate Now
          </NavLink>
        </div>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`}>
        {navLinks.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
            }
          >
            <span>{icon}</span>
            {label}
          </NavLink>
        ))}
        <NavLink to="/donate" className="btn btn-primary btn-full" style={{ marginTop: 8 }}>
          + Donate Now
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;
