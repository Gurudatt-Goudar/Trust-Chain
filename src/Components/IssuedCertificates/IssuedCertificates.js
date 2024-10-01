import React, { useState, useEffect } from 'react';
import Certificate from '../CertificateComponent/Certificate'; // Import the Certificate component
 import './IssuedCertificates.css'; // Import the CSS for dark theme

function IssuedCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true); // Set loading to true when starting fetch
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/certificate`);
        if (response.ok) {
          const data = await response.json();
          setCertificates(data);
        } else {
          setError('There are no certificates');
        }
      } catch (err) {
        setError('Error fetching certificates');
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchCertificates();
  }, []);

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate); // Correctly set the selected certificate
  };

  return (
    <div className="issued-certificates-container"> {/* Apply main container class */}
      <h1 className="title">Issued Certificates</h1>
      {loading && <p className="loading-text">Loading...</p>} {/* Display loading state */}
      {error && <p className="error-text">{error}</p>}
      {!selectedCertificate ? (
        <ul className="certificate-list">
          {certificates.map(certificate => (
            <li 
              key={certificate._id} 
              className="certificate-item"
              onClick={() => handleCertificateClick(certificate)} // Handle click to show certificate details
            >
              <p><strong>UUCMS ID:</strong> {certificate.uucmsId}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="certificate-details">
          <Certificate
            name={selectedCertificate.name}
            uucmsId={selectedCertificate.uucmsId}
            dob={selectedCertificate.dob}
            issueDate={selectedCertificate.issueDate}
            department={selectedCertificate.department}
            transactionHash={selectedCertificate.transactionHash} // Assuming full hash is displayed in the Certificate component
            studentAddress={selectedCertificate.studentAddress} // Added student address prop
          />
          <button className="back-button" onClick={() => setSelectedCertificate(null)}>
            Back to List
          </button>
        </div>
      )}
    </div>
  );
}

export default IssuedCertificates;