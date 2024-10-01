import React from 'react';
import { Link } from 'react-router-dom';
import './PortalComponent.css';

const PortalComponent = ({ value }) => {
  return (
    <div>
      <nav>
        {/* For Admin Panel */}
        {value === 'issue' && (
          <>
            <Link to="/issuer" className="active">Issue Certificate</Link>
            <Link to="/issued-certificates" className="active">View Issued certificates</Link>
          </>
        )}
        {/* For Receiver Panel */}
        {value === 'receive' && (
          <Link to="/receiver" className="active">My Certificate</Link>
        )}
        <Link to="/" className="logout">Logout</Link>
      </nav>
    </div>
  );
}

export default PortalComponent;
