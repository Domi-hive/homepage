import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const navLinks = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'agents', label: 'Agents', path: '/agents' },
  { id: 'services', label: 'Services', path: '#services' },
  { id: 'support', label: 'Support', path: '#support' },
];

function Header() {
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState(false);
  const [isSolid, setIsSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (path) => {
    setMenuOpen(false);
    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsSolid(currentY > 10);

      if (currentY > lastY && currentY > 120) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      if (menuOpen && currentY !== lastY) {
        setMenuOpen(false);
      }

      lastY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`site-header ${isSolid ? 'site-header--solid' : ''} ${
          isHidden ? 'site-header--hidden' : ''
        } ${menuOpen ? 'site-header--open' : ''}`}
      >
        <div className="site-header__content">
          <Link to="/" className="site-header__brand">
            <img src={logo} alt="DomiHive logo" width="36" height="36" />
            <span>DomiHive</span>
          </Link>

          <nav aria-label="Primary">
            <ul>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button type="button" onClick={() => handleNavClick(link.path)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <button type="button" className="cta cta--primary site-header__cta">
            Login / Signup
          </button>

          <button
            type="button"
            className="site-header__menu"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      <div
        className={`site-header__overlay ${menuOpen ? 'site-header__overlay--visible' : ''}`}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />
      <div className={`site-header__drawer ${menuOpen ? 'site-header__drawer--visible' : ''}`}>
        <div className="site-header__drawer-content">
          <nav aria-label="Mobile Primary">
            <ul>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button type="button" onClick={() => handleNavClick(link.path)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <button type="button" className="cta cta--primary site-header__drawer-cta">
            Login / Signup
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;

