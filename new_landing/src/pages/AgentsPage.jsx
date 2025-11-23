import { useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

function AgentsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    experience: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Agent application submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="page-shell" style={{ '--page-bg-image': 'url(/assets/background_image.png)' }}>
      <Header />
      
      <section className="agents-hero">
        <div className="agents-hero__content">
          <h1 className="agents-hero__title">
            Work as an Agent <br />
            on <span className="text-accent">DomiHive</span>
          </h1>
          <p className="agents-hero__description">
            Join hundreds of licensed agents already using DomiHive to connect with verified clients, 
            manage property inspections, and close deals faster — all in one platform.
          </p>
          <div className="agents-hero__stats">
            <div className="stat-card">
              <div className="stat-card__icon">📈</div>
              <div className="stat-card__value">3x</div>
              <div className="stat-card__label">More Leads</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon">✓</div>
              <div className="stat-card__value">100%</div>
              <div className="stat-card__label">Verified Clients</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon">⚡</div>
              <div className="stat-card__value">50%</div>
              <div className="stat-card__label">Faster Deals</div>
            </div>
          </div>
        </div>
      </section>

      <section className="agents-benefits">
        <h2 className="section-title">Why Join DomiHive?</h2>
        <p className="section-subtitle">Everything you need to grow your real estate business</p>
        
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-card__icon">🎯</div>
            <h3 className="benefit-card__title">Quality Leads</h3>
            <p className="benefit-card__description">
              Get matched with serious buyers and renters who are actively looking for properties 
              that match their criteria.
            </p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-card__icon">📱</div>
            <h3 className="benefit-card__title">All-in-One Platform</h3>
            <p className="benefit-card__description">
              Manage your listings, schedule viewings, track inspections, and close deals all 
              from one convenient dashboard.
            </p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-card__icon">🔒</div>
            <h3 className="benefit-card__title">Secure Transactions</h3>
            <p className="benefit-card__description">
              Process payments securely with built-in escrow services and automated contract 
              management for peace of mind.
            </p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-card__icon">📊</div>
            <h3 className="benefit-card__title">Analytics & Insights</h3>
            <p className="benefit-card__description">
              Track your performance with detailed analytics, market insights, and client 
              engagement metrics to optimize your business.
            </p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-card__icon">🤝</div>
            <h3 className="benefit-card__title">Client Verification</h3>
            <p className="benefit-card__description">
              Work only with verified clients who have been pre-screened and authenticated 
              for your safety and efficiency.
            </p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-card__icon">⏱️</div>
            <h3 className="benefit-card__title">Save Time</h3>
            <p className="benefit-card__description">
              Automated scheduling, instant notifications, and smart matching help you focus 
              on closing deals instead of administrative tasks.
            </p>
          </div>
        </div>
      </section>

      <section className="agents-how-it-works">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Start closing more deals in 4 simple steps</p>
        
        <div className="steps-container">
          <div className="step-item">
            <div className="step-item__number">1</div>
            <div className="step-item__content">
              <h3 className="step-item__title">Create Your Profile</h3>
              <p className="step-item__description">
                Sign up and complete your agent profile with your credentials, areas of expertise, 
                and service regions.
              </p>
            </div>
          </div>
          
          <div className="step-item">
            <div className="step-item__number">2</div>
            <div className="step-item__content">
              <h3 className="step-item__title">Get Verified</h3>
              <p className="step-item__description">
                Submit your license and credentials for verification. We ensure all agents on the 
                platform are legitimate professionals.
              </p>
            </div>
          </div>
          
          <div className="step-item">
            <div className="step-item__number">3</div>
            <div className="step-item__content">
              <h3 className="step-item__title">Receive Leads</h3>
              <p className="step-item__description">
                Our smart matching algorithm connects you with clients looking for properties in 
                your area and expertise.
              </p>
            </div>
          </div>
          
          <div className="step-item">
            <div className="step-item__number">4</div>
            <div className="step-item__content">
              <h3 className="step-item__title">Close Deals</h3>
              <p className="step-item__description">
                Schedule viewings, manage negotiations, and close deals faster with our integrated 
                transaction management system.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="agents-signup">
        <div className="signup-container">
          <div className="signup-content">
            <h2 className="signup-title">Ready to Grow Your Business?</h2>
            <p className="signup-description">
              Join DomiHive today and start connecting with verified clients who are ready to buy or rent.
            </p>
          </div>
          
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+234 XXX XXX XXXX"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="licenseNumber">License Number *</label>
                <input
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                  placeholder="Your license number"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="experience">Years of Experience *</label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              >
                <option value="">Select experience level</option>
                <option value="0-2">0-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Tell us about yourself (Optional)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Share your experience, specializations, and why you want to join DomiHive..."
              />
            </div>
            
            <button type="submit" className="cta cta--primary cta--large">
              Become An Agent
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AgentsPage;
