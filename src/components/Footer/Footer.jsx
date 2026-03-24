import './Footer.css';
import logo from '../../assets/images/vector.png';
import { FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-brand">
        <div className="footer-logo" aria-hidden="true">
          <img src={logo} alt="Madison Energy Infrastructure Logo" />
        </div>
        <div className="footer-brand__info">
          <p className="footer-brand__title">MADISON <span className="brand-highlight">ENERGY</span></p>
          <p className="footer-brand__subtitle">Infrastructure</p>
          <div className="footer-brand__contact">
            <a href="tel:+13156214820">+1 (315) 621 4820</a>
            <a href="mailto:contact@madisonmei.com">contact@madisonmei.com</a>
          </div>
        </div>
      </div>

      <div className="footer-center-stack">
        <nav className="footer-links" aria-label="Footer">
          <a href="/">About MEI</a>
          <a href="/">Terms of Use</a>
          <a href="/">Privacy Policy</a>
        </nav>

        <div className="footer-base">
          <span>©2024 Madison Energy Infrastructure. All rights reserved.</span>
        </div>
      </div>

      <div className="footer-meta">
        <div className="social-links" aria-label="Madison Energy on social media">
          <a href="/" aria-label="LinkedIn" className="social-icon"><FaLinkedin aria-hidden="true" /></a>
          <a href="/" aria-label="Instagram" className="social-icon"><FaInstagram aria-hidden="true" /></a>
          <a href="/" aria-label="Twitter" className="social-icon"><FaTwitter aria-hidden="true" /></a>
        </div>
        <div className="emergency-card">
          <span className="emergency-card__label">Emergency Contact</span>
          <span className="emergency-card__value">1 800 000 0000</span>
        </div>
      </div>

      
    </footer>
  );
};

export default Footer;
