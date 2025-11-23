function Features() {
  return (
    <section className="features">
      <div className="features__container">
        <h2 className="features__heading">Key Features</h2>
        
        <div className="features__grid">
          {/* Left column - Tall vertical card */}
          <div className="features__card features__card--tall-left">
            <h3 className="features__card-title">Verified Agents</h3>
            <p className="features__card-description">
              Connect with licensed, verified real estate professionals.
            </p>
          </div>

          {/* Top right - Horizontal card */}
          <div className="features__card features__card--horizontal-top">
            <h3 className="features__card-title">Smart Matching</h3>
            <p className="features__card-description">
              AI algorithm matches you with perfect properties
            </p>
          </div>

          {/* Bottom middle */}
          <div className="features__card features__card--bottom-middle">
            <h3 className="features__card-title">Live Inspections Tracking</h3>
            <p className="features__card-description">
              Track inspections in real-time for safety.
            </p>
          </div>

          {/* Bottom right */}
          <div className="features__card features__card--bottom-right">
            <h3 className="features__card-title">Secure Payment Processing</h3>
            <p className="features__card-description">
              Rest easy with safe and reliable transactions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
