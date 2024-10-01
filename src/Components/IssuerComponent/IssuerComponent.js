import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Certificate from '../CertificateComponent/Certificate';
import CertificateForm from '../CertificateForm/CertificateForm';
import { contractABI, contractAddress } from '../../ConfigData';
import { dataset } from '../../ConfigData';

function IssuerComponent() {
  const [certificateData, setCertificateData] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);
          setWeb3(web3Instance);

          const deployedContract = new web3Instance.eth.Contract(contractABI, contractAddress);
          setContract(deployedContract);
        } else if (window.web3) {
          const web3Instance = new Web3(window.web3.currentProvider);
          setWeb3(web3Instance);

          const accounts = await web3Instance.eth.getAccounts();
          if (accounts.length > 0) setAccount(accounts[0]);

          const deployedContract = new web3Instance.eth.Contract(contractABI, contractAddress);
          setContract(deployedContract);
        } else {
          setError('No web3 detected. Please install MetaMask.');
        }
      } catch (err) {
        setError('Ensure MetaMask Wallet is connected, Refresh.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    initWeb3();
  }, []);

  const handleStoreCertificate = async (address, cert) => {
    try {
      if (contract && web3 && account) { 
        setLoadingMessage(<span style={{ color: 'white' }}> Storing certificate on blockchain...</span>);
        setShowPopup(false);

        const confirmAction = window.confirm('Are you sure you want to store this certificate on the blockchain?');
        if (confirmAction) {
          const tx = await contract.methods.storeCertificate(address, cert).send({ from: account });
          setTransactionHash(tx.transactionHash);
          setLoadingMessage('');
          setShowPopup(true);
        } else {
          setLoadingMessage('');
          alert('Transaction cancelled.');
        }
      } else {
        setError('Blockchain connection or contract not initialized.');
      }
    } catch (err) {
      setLoadingMessage('');
      setError('Error storing certificate on blockchain. Check console for details.');
      console.error(err);
    }
  };

  const handleStoreToDatabase = async () => {
    try {
      const certificateDataToSend = {
        name: certificateData.name,
        uucmsId: certificateData.uucmsId,
        dob: certificateData.dob,
        department: certificateData.department,
        email: certificateData.email, // Use certificateData.email directly
        issueDate: certificateData.issueDate,
        studentAddress: dataset[certificateData.uucmsId] || 'Address not found', 
        transactionHash, 
      };

      // Store certificate data in the certificate collection
      const certificateResponse = await fetch(`${process.env.REACT_APP_API_URL}/certificate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(certificateDataToSend),
      });

      if (certificateResponse.ok) {
        alert('Certificate data stored successfully in the database!');

        // Now store student login data in the studentLogin collection
        const studentLoginDataToSend = {
          uucmsId: certificateData.uucmsId,
          dob: certificateData.dob,
        };

        const studentLoginResponse = await fetch('http://localhost:5000/api/certificate/studentlogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(studentLoginDataToSend),
        });

        if (studentLoginResponse.ok) {
          alert('Student login data stored successfully in the database!');

          // Step 3: Send email with certificate link
          const subject = 'Graduation Certificate';
          const text = `Dear ${certificateData.name},

Congratulations from the CS Department at Karnataka University! 🎉

You’ve successfully completed your ${certificateData.department} course, and we are delighted to present your graduation certificate.

✨ Your Certificate is Tamper-Proof! ✨
Your certificate is secured by blockchain technology, ensuring its authenticity and integrity for years to come. This means you can confidently share it with employers and third-party verifiers, knowing it is protected against any alterations.

Here are your certificate details:

Public Key: ${dataset[certificateData.uucmsId] || 'Address is available in your login'} (You can share it with third-party verifiers)

Login Credentials:

UUCMS ID: ${certificateData.uucmsId}

Password: ${certificateData.dob}

Transaction Hash: ${transactionHash}

You can verify your transaction by clicking here: https://sepolia.etherscan.io/tx/${transactionHash}.

We wish you all the best for your future! Good luck!

Best Regards,
TrustChain
By Gurudatt
MCA IV
Karnataka University, Dharwad`;

          await fetch('http://localhost:5000/api/email/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ to: certificateData.email, subject, text }), // Use certificateData.email
          });

          alert('Email sent successfully with the certificate link!');
        } else {
          const errorResult = await studentLoginResponse.text();
          alert(`Error storing student login in database: ${errorResult}`);
        }
      } else {
        const errorResult = await certificateResponse.text(); 
        alert(`Error storing certificate in database: ${errorResult}`);
      }
    } catch (error) {
      console.error('Error storing data in database:', error);
      alert('An error occurred while storing data in the database.');
    }
    
  };

  const handleCertificateSubmit = (data) => {
    setCertificateData(data);
    const uucmsId = data.uucmsId; 
    const address = dataset[uucmsId];

    if (address) {
      const dataString = JSON.stringify(data);
      handleStoreCertificate(address, dataString);
    } else {
      setError('Invalid UUCMS ID. Please check and try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="App">
      <div>
        {loadingMessage && <div className="loading-message">{loadingMessage}</div>}
        {showPopup && (
          <div className="popup">
            <p style={{ color: 'white' }}>Certificate stored successfully on the blockchain!</p>
            <button style={{ cursor: 'pointer' }} onClick={handleStoreToDatabase}>Store in Database</button>
          </div>
        )}
        {!certificateData ? (
          <CertificateForm onSubmit={handleCertificateSubmit} />
        ) : (
          <>
            <Certificate {...certificateData} transactionLink={`https://sepolia.etherscan.io/tx/${transactionHash}`} />
            {transactionHash && (
              <div>
                <p style={{ color: 'white' }}>
                  Transaction Hash: <a href={`https://sepolia.etherscan.io/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">{transactionHash}</a>
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default IssuerComponent;
