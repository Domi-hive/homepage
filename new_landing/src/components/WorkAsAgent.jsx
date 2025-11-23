import { useNavigate } from 'react-router-dom';

const stats = [
  {
    id: 'more-leads',
    value: '3x',
    label: 'More Leads',
    color: '#2f6fc0',
    borderColor: '#5380c5',
    valueColor: '#c8d4eb',
    labelColor: '#95b2df',
  },
  {
    id: 'verified-clients',
    value: '100%',
    label: 'Verified Clients',
    color: '#3072c2',
    borderColor: '#5282c8',
    valueColor: '#c6d3eb',
    labelColor: '#91b0df',
  },
  {
    id: 'faster-deals',
    value: '50%',
    label: 'Faster Deals',
    color: '#3375c6',
    borderColor: '#5485cc',
    valueColor: '#c6d4ec',
    labelColor: '#97b5e2',
  },
];

function WorkAsAgent() {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate('/agents');
  };

  return (
    <section className="work-as-agent">
      <div className="work-as-agent__container">
        <div className="work-as-agent__content">
          <h2 className="work-as-agent__heading">
            Work as an Agent <br />
            on DomiHive
          </h2>
          <p className="work-as-agent__description">
            Join hundreds of licensed agents already using <br />
            DomiHive to connect with verified clients, manage <br />
            property inspections, and close deals faster — all <br />
            in one platform.
          </p>
          <div className="work-as-agent__stats">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="work-as-agent__stat-card"
                style={{
                  backgroundColor: stat.color,
                  borderColor: stat.borderColor,
                }}
              >
                <div className="work-as-agent__stat-value" style={{ color: stat.valueColor }}>
                  {stat.value}
                </div>
                <div className="work-as-agent__stat-label" style={{ color: stat.labelColor }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <div className="work-as-agent__actions">
            <button type="button" className="work-as-agent__cta">
              Become An Agent
            </button>
            <button type="button" className="work-as-agent__cta-secondary" onClick={handleLearnMore}>
              Learn More
            </button>
          </div>
        </div>
        <div className="work-as-agent__visual">
          <div className="work-as-agent__placeholder">
            <svg
              width="41"
              height="41"
              viewBox="0 0 41 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="41" height="41" fill="#fafafa" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkAsAgent;
