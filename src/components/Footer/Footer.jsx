import './Footer.css';
import logo from '../../assets/images/vector.png';
import { FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-column footer-column--brand">
        <div className="footer-brand-row">
          <div className="footer-logo" aria-hidden="true">
            <img src={logo} alt="Madison Energy Infrastructure Logo" />
          </div>
          <div className="footer-brand__info">
            <p className="footer-brand__title">MADISON <span className="brand-highlight">ENERGY</span></p>
            <p className="footer-brand__subtitle">Infrastructure</p>
          </div>
        </div>

        <div className="footer-contact-row1">
          <a href="tel:+13156214820">+1 (315) 621 4820</a>
        </div>
        <div className="footer-contact-row2">
          <a href="mailto:contact@madisonei.com">contact@madisonei.com</a>
        </div>
      </div>

      <div className="footer-column footer-column--center">
        <nav className="footer-links" aria-label="Footer">
          <a href="/">About MEI</a>
          <a href="/">Terms of Use</a>
          <a href="/">Privacy Policy</a>
        </nav>

        <div className="footer-base">
          <span>©2024 Madison Energy Infrastructure. All rights reserved.</span>
        </div>
      </div>

      <div className="footer-column footer-column--meta">
        <div className="social-links" aria-label="Madison Energy on social media">
          <a href="/" aria-label="LinkedIn" className="social-icon"><FaLinkedin aria-hidden="true" /></a>
          <a href="/" aria-label="Instagram" className="social-icon"><FaInstagram aria-hidden="true" /></a>
          <a href="/" aria-label="Twitter" className="social-icon"><FaTwitter aria-hidden="true" /></a>
        </div>
        <div className="emergency-card">
          <span className="emergency-card__label">Emergency contact</span>
          <span className="emergency-card__value">1 800 000 0000</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
