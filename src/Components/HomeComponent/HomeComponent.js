import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SealOfExcellence from '../../assets/sealOfEx.png';
import './HomeComponent.css';

const HomeComponent = () => {
  const navigate = useNavigate();

  // Define states
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isHovered, setIsHovered] = useState({ issuer: false, receiver: false });
  const [hoveredMenuItem, setHoveredMenuItem] = useState(null);

  // Handle certificate verification navigation
  const handleVerifyCertificate = () => {
    navigate('/verify');
  };

  return (
    <div className="home-container">
      {/* Header Section */}
      <div className="header-container">
        <div className="logo-title-container">
          <img src={SealOfExcellence} alt="Seal of Excellence" className="seal" />
          <div className="header-title-container">
            <h1 className="header-title">Karnataka University, Dharwad</h1>
            <h2 className="header-subtitle">TrustChain: Securing Identities with Blockchain</h2>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="menu">
          <a
            href="#about"
            className={`menu-link ${hoveredMenuItem === 'about' ? 'menu-link-hover' : ''}`}
            onMouseEnter={() => setHoveredMenuItem('about')}
            onMouseLeave={() => setHoveredMenuItem(null)}
          >
            About
          </a>
          <a 
            href="https://www.kud.ac.in/"
            className={`menu-link ${hoveredMenuItem === 'university' ? 'menu-link-hover' : ''}`}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredMenuItem('university')}
            onMouseLeave={() => setHoveredMenuItem(null)}
          >
            University Website
          </a>
          <a
            href="https://www.kud.ac.in/dep-contact.php?nid=26"
            className={`menu-link ${hoveredMenuItem === 'contact' ? 'menu-link-hover' : ''}`}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredMenuItem('contact')}
            onMouseLeave={() => setHoveredMenuItem(null)}
          >
            Contact
          </a>
        </nav>
      </div>

      {/* Main Content Section */}
      <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
        <Link
          to="/issuer-login"
          className={`card ${isHovered.issuer ? 'card-hover' : ''}`}
          onMouseEnter={() => setIsHovered({ ...isHovered, issuer: true })}
          onMouseLeave={() => setIsHovered({ ...isHovered, issuer: false })}
        >
          <div className="card-icon"><i style={{ color: 'blue' }} className="fas fa-university"></i></div>
          <div className="card-text">Issuer Login</div>
        </Link>

        <Link
          to="/receiver-login"
          className={`card ${isHovered.receiver ? 'card-hover' : ''}`}
          onMouseEnter={() => setIsHovered({ ...isHovered, receiver: true })}
          onMouseLeave={() => setIsHovered({ ...isHovered, receiver: false })}
        >
          <div className="card-icon"><i style={{ color: 'blue' }} className="fas fa-graduation-cap"></i></div>
          <div className="card-text">Receiver Login</div>
        </Link>
      </div>

      {/* Verify Certificate Button */}
      <div className="button-container">
        <button
          className={`verify-button ${isButtonHovered ? 'button-hover' : ''}`}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          onClick={handleVerifyCertificate}
        >
          Verify Certificate
        </button>
      </div>

      {/* About Section */}
      <div id="about" className="about-section">
        <h2 className="about-title">About TrustChain</h2>
        <p className="about-text">
          Our platform uses blockchain technology to ensure the integrity and authenticity of certificates issued by Karnataka University, Dharwad.
        </p>
        <p className="about-text">
          You can verify a certificate by scanning its transaction on the Ethereum blockchain via Etherscan. Simply enter the certificate's transaction hash in the search bar on Etherscan to view its authenticity. 
          <a href="https://etherscan.io/" target="_blank" rel="noopener noreferrer" className="about-link"> Visit Etherscan</a>
        </p>
        <h2 className="about-title">About Karnataka University</h2>
        <p className="about-text">
          Karnataka University, Dharwad (KUD) is one of the premier educational institutions in India, known for its excellence in research and education. Established in 1949, KUD offers a wide range of undergraduate, postgraduate, and doctoral programs.
          <br />
          <a href="https://www.kud.ac.in/" target="_blank" rel="noopener noreferrer" className="about-link"> Learn More About Karnataka University</a>
        </p>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div>TrustChain <br /> Project By Gurudatt Goudar <br />MCA IV</div>
        <div>© Copyright reserved by Karnataka University, Dharwad</div>
        <div>Contact us: <br />email: trustchainblock@gmail.com <br /> mob: +91959118461 <br /> CS department, Karnataka University, Dharwad</div>
      </footer>
    </div>
  );
};

export default HomeComponent;
