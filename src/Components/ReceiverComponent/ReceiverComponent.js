import React from 'react';
import { useLocation } from 'react-router-dom';
import './ReceiverComponent.css'; // Make sure this CSS file is present
import KUDNAME from '../../assets/logo.png';
import SealOfExcellence from '../../assets/sealOfEx.png';


const ReceiverComponent = () => {
  const location = useLocation();
  const { certificate } = location.state || {};

  if (!certificate) {
    return <div>No certificate data available. Please log in again.</div>;
  }


  return (
    <div className="certificate">
      <div className="certificate-header">
        <img
          src={KUDNAME}
          alt="Karnataka University, Dharwad logo"
          style={{ maxWidth: '80%', height: 'auto', width: '500px', marginTop: '0px' }} // Fixed width without breaking the layout
        />
      </div>

      <div className="certificate-body">
        <p>Awarded Certificate</p>
        <h2>{certificate.name}</h2>
        <p>UUCMS ID: {certificate.uucmsId}</p>
        <p>Has Successfully Completed the Course in</p>
        <h3>{certificate.department}</h3>
        <p>Date of Issue: {certificate.issueDate}</p>
        <img src={SealOfExcellence} alt="Seal of Excellence" className="seal" />
      </div>
      <div className="certificate-footer">
        Verified By Blockchain:
        <p><strong>Transaction Hash:</strong>  <p style={{ color: 'white' }}>
                  <a href={`https://sepolia.etherscan.io/tx/${certificate.transactionHash}`} target="_blank" rel="noopener noreferrer">{certificate.transactionHash}</a>
                </p></p>
        <p><strong>Address:</strong> {certificate.studentAddress}</p>
        <p>© 2024 Karnataka University, Dharwad. All rights reserved</p>
      </div>
    </div>
  );
};

export default ReceiverComponent;
