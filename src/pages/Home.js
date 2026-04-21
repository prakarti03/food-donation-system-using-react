import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const stats = [
  { value: '12,400+', label: 'Meals Shared',    icon: '🍽️' },
  { value: '340+',    label: 'Active Donors',    icon: '🤝' },
  { value: '85+',     label: 'NGO Partners',     icon: '🏥' },
  { value: '98%',     label: 'Satisfaction Rate', icon: '⭐' },
];

const steps = [
  {
    num: '01',
    icon: '📝',
    title: 'Register Your Donation',
    desc: 'Fill out a simple form with the food details — type, quantity, and your location.',
  },
  {
    num: '02',
    icon: '🔍',
    title: 'We Match You',
    desc: 'Our platform connects donors with nearby NGOs, shelters, or individuals in need.',
  },
  {
    num: '03',
    icon: '🚚',
    title: 'Food Gets Collected',
    desc: 'Volunteers or partner NGOs pick up the donation from your doorstep.',
  },
  {
    num: '04',
    icon: '🎉',
    title: 'Lives Are Nourished',
    desc: 'Your food reaches those who need it most. Every bite makes a difference.',
  },
];

const features = [
  { icon: '⚡', title: 'Fast & Easy',        desc: 'Register a donation in under 2 minutes.' },
  { icon: '🔒', title: 'Safe & Trusted',     desc: 'All donors and recipients are verified.' },
  { icon: '🌍', title: 'Community Driven',   desc: 'Built on the belief that no food should go to waste.' },
  { icon: '📱', title: 'Mobile Friendly',    desc: 'Works seamlessly on any device, anywhere.' },
  { icon: '📊', title: 'Track Impact',       desc: 'See exactly how many meals you\'ve helped provide.' },
  { icon: '💚', title: 'Zero Commission',    desc: 'Every rupee of value goes to those who need it.' },
];

function Home() {
  return (
    <div className="home">

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__bg-shapes">
          <div className="hero__shape hero__shape-1" />
          <div className="hero__shape hero__shape-2" />
          <div className="hero__shape hero__shape-3" />
        </div>

        <div className="container hero__content">
          <div className="hero__text fade-up">
            <span className="hero__tag">🌱 Fighting Hunger Together</span>
            <h1 className="hero__title">
              Share a Meal,<br />
              <span className="hero__title-green">Change a Life</span>
            </h1>
            <p className="hero__subtitle">
              FoodShare connects generous donors with communities in need. 
              Surplus food finds a purpose. Hunger becomes a thing of the past.
            </p>
            <div className="hero__actions">
              <Link to="/donate" className="btn btn-primary btn-lg">
                🤝 Donate Food
              </Link>
              <Link to="/request" className="btn btn-outline btn-lg">
                🙏 Request Food
              </Link>
            </div>
          </div>

          <div className="hero__visual fade-up delay-2">
            <div className="hero__card-stack">
              <div className="hero__float-card hero__float-card-1">
                <span>🍱</span>
                <div>
                  <strong>Cooked Meals</strong>
                  <span>30 plates available</span>
                </div>
              </div>
              <div className="hero__float-card hero__float-card-2">
                <span>📦</span>
                <div>
                  <strong>Packaged Food</strong>
                  <span>50 packets available</span>
                </div>
              </div>
              <div className="hero__main-card">
                <div className="hero__main-card-icon">🌾</div>
                <p>12,400+ meals shared this year</p>
                <div className="hero__main-card-bar">
                  <div className="hero__main-card-bar-fill" />
                </div>
                <small>Goal: 15,000 meals</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={s.label} className={`stat-card card fade-up delay-${i + 1}`}>
                <span className="stat-icon">{s.icon}</span>
                <strong className="stat-value">{s.value}</strong>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="how-section">
        <div className="container">
          <div className="section-header fade-up">
            <span className="section-tag">Simple Process</span>
            <h2 className="section-title">How FoodShare Works</h2>
            <p className="section-subtitle">
              From your kitchen to someone's table in four simple steps.
            </p>
          </div>

          <div className="steps-grid">
            {steps.map((step, i) => (
              <div key={step.num} className={`step-card card fade-up delay-${i + 1}`}>
                <div className="step-num">{step.num}</div>
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features-section">
        <div className="container">
          <div className="section-header fade-up">
            <span className="section-tag">Why FoodShare</span>
            <h2 className="section-title">Built for Impact</h2>
            <p className="section-subtitle">
              Every feature is designed to make food sharing easier and more effective.
            </p>
          </div>

          <div className="grid-3">
            {features.map((f, i) => (
              <div key={f.title} className={`feature-card card card-hover fade-up delay-${(i % 3) + 1}`}>
                <span className="feature-icon">{f.icon}</span>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-banner fade-up">
            <div className="cta-banner__left">
              <span className="cta-emoji">🍽️</span>
              <div>
                <h2 className="cta-title">Have Surplus Food?</h2>
                <p className="cta-subtitle">Don't let it go to waste. Someone nearby is waiting.</p>
              </div>
            </div>
            <div className="cta-banner__actions">
              <Link to="/donate" className="btn btn-primary btn-lg">
                Start Donating
              </Link>
              <Link to="/donations" className="btn btn-ghost btn-lg">
                View Donations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <span>🌱</span>
            <strong>FoodShare</strong>
          </div>
          <p className="footer__copy">
            © {new Date().getFullYear()} FoodShare. Made with 💚 to fight hunger.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default Home;
