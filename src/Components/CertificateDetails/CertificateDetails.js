import React from 'react';

import SealOfExcellence from '../../assets/sealOfEx.png';
import KUDNAME from '../../assets/logo.png';
import { dataset } from '../../ConfigData'; // Adjust the path if necessary

const CertificateDetails = ({ certificate }) => {
  const { name, uucmsId, issueDate, department, transactionHash } = certificate;
  const [day, month, year] = issueDate.split('-');

  // Retrieve address from dataset based on uucmsId
  const studentAddress = dataset[uucmsId] || 'Address not found';

  return (
    <div className="certificate">
      <div className="certificate-header">
        <img 
          src={KUDNAME} 
          alt="Karnataka University, Dharwad logo" 
          style={{ maxWidth: '80%', height: 'auto', width: '500px', marginTop:'0px'}} 
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
      <div >
        Transaction Hash: <br/>
        {transactionHash && (
          <p>{transactionHash}</p>
        )}
      </div>
      <div className="certificate-footer">
        <p>© 2024 Karnataka University, Dharwad. All rights reserved</p>
        <p>Address: {studentAddress}</p>
      </div>
    </div>
  );
};

export default CertificateDetails;
