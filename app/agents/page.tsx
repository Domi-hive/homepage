import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';

export default function AgentsPage() {
    return (
        <div className="page-shell">
            <Header />
            <main>
                <section className="agents-hero">
                    <div className="agents-hero__content">
                        <h1 className="agents-hero__title">
                            Grow Your Real Estate Business with <span className="text-accent">DomiHive</span>
                        </h1>
                        <p className="agents-hero__description">
                            Join the fastest-growing network of verified real estate agents. Get qualified leads,
                            manage inspections efficiently, and close deals faster with our all-in-one platform.
                        </p>

                        <div className="agents-hero__stats">
                            <div className="stat-card">
                                <div className="stat-card__icon">🚀</div>
                                <div className="stat-card__value">3x</div>
                                <div className="stat-card__label">More Qualified Leads</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-card__icon">⚡</div>
                                <div className="stat-card__value">50%</div>
                                <div className="stat-card__label">Faster Deal Closing</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-card__icon">🛡️</div>
                                <div className="stat-card__value">100%</div>
                                <div className="stat-card__label">Verified Transactions</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="agents-benefits">
                    <h2 className="section-title">Why Agents Choose DomiHive</h2>
                    <p className="section-subtitle">Everything you need to succeed in the modern real estate market</p>

                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <span className="benefit-card__icon">🎯</span>
                            <h3 className="benefit-card__title">Quality Leads</h3>
                            <p className="benefit-card__description">
                                Stop chasing dead ends. Our AI matching system connects you with serious clients
                                who are ready to buy or rent properties that match your portfolio.
                            </p>
                        </div>

                        <div className="benefit-card">
                            <span className="benefit-card__icon">📱</span>
                            <h3 className="benefit-card__title">Smart Management</h3>
                            <p className="benefit-card__description">
                                Manage all your listings, inspections, and client communications from a single
                                dashboard. Stay organized and never miss an opportunity.
                            </p>
                        </div>

                        <div className="benefit-card">
                            <span className="benefit-card__icon">🔒</span>
                            <h3 className="benefit-card__title">Secure Payments</h3>
                            <p className="benefit-card__description">
                                Get paid securely and on time. Our escrow system protects both you and your
                                clients, ensuring smooth and transparent financial transactions.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="agents-how-it-works">
                    <h2 className="section-title">How It Works</h2>
                    <p className="section-subtitle">Start growing your business in 3 simple steps</p>

                    <div className="steps-container">
                        <div className="step-item">
                            <div className="step-item__number">1</div>
                            <div className="step-item__content">
                                <h3 className="step-item__title">Create Your Profile</h3>
                                <p className="step-item__description">
                                    Sign up and verify your credentials. Build a professional profile that showcases
                                    your experience and expertise to potential clients.
                                </p>
                            </div>
                        </div>

                        <div className="step-item">
                            <div className="step-item__number">2</div>
                            <div className="step-item__content">
                                <h3 className="step-item__title">List Properties</h3>
                                <p className="step-item__description">
                                    Upload your property listings with high-quality photos and details. Our system
                                    will automatically match them with interested clients.
                                </p>
                            </div>
                        </div>

                        <div className="step-item">
                            <div className="step-item__number">3</div>
                            <div className="step-item__content">
                                <h3 className="step-item__title">Close Deals</h3>
                                <p className="step-item__description">
                                    Schedule inspections, manage offers, and close deals securely through our platform.
                                    Build your reputation and grow your business.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="agents-signup">
                    <div className="signup-container">
                        <div className="signup-content">
                            <h2 className="signup-title">Ready to Get Started?</h2>
                            <p className="signup-description">
                                Join thousands of successful agents on DomiHive today.
                            </p>
                        </div>

                        <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" id="firstName" placeholder="Enter your first name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" id="lastName" placeholder="Enter your last name" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" id="email" placeholder="Enter your email address" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="tel" id="phone" placeholder="Enter your phone number" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="license">License Number (Optional)</label>
                                <input type="text" id="license" placeholder="Enter your license number" />
                            </div>

                            <button type="submit" className="cta cta--primary cta--large">
                                Create Agent Account
                            </button>
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
