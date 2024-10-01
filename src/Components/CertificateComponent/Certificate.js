import React from 'react';
import './Certificate.css';  // Ensure this CSS file exists
import SealOfExcellence from '../../assets/sealOfEx.png';
import KUDNAME from '../../assets/logo.png';

const Certificate = ({ name, uucmsId, dob, issueDate, department, transactionHash, studentAddress }) => {
  // Ensure that the issueDate is in the correct format (DD-MM-YYYY)
  const [day, month, year] = issueDate.split('-'); // Make sure issueDate follows the 'DD-MM-YYYY' format

  // URL for transaction verification
  const transactionLink = transactionHash ? `https://sepolia.etherscan.io/tx/${transactionHash}` : '';

  return (
    <div className="certificate">
      <div className="certificate-header">
        <img 
          src={KUDNAME} 
          alt="Karnataka University, Dharwad logo" 
          style={{ maxWidth: '80%', height: 'auto', width: '500px', marginTop:'0px' }} // Fixed width without breaking the layout
        />
      </div>
      <div className="certificate-body">
        <p>Awarded Certificate</p>
        <h2>{name}</h2>
        <p>UUCMS ID: {uucmsId}</p>
        <p>Has Successfully Completed the Course in</p>
        <h3>{department}</h3>
        <p>Date of Issue: {`${day}-${month}-${year}`}</p>
        <img src={SealOfExcellence} alt="Seal of Excellence" className="seal" />
      </div>
      <div>
        Verified By Blockchain: <br/>
        {transactionHash && (
          <a href={transactionLink} target="_blank" rel="noopener noreferrer" className="transaction-link">
            {transactionHash}
          </a>
        )}
      </div>
      <div className="certificate-footer">
        <p>© 2024 Karnataka University, Dharwad. All rights reserved</p>
        <br />
        {studentAddress && (
          <p><strong>Address:</strong> {studentAddress}</p>
        )}
      </div>
    </div>
  );
};

export default Certificate;
