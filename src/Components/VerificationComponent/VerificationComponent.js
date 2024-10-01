import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { contractABI, contractAddress } from '../../ConfigData';
import './VerificationComponent.css';

const VerificationComponent = () => {
  const [certificateData, setCertificateData] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [addressInput, setAddressInput] = useState('');
  const [contract, setContract] = useState(null);
  const [inputWarning, setInputWarning] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [certificateDetails, setCertificateDetails] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWeb3(web3Instance);
          const deployedContract = new web3Instance.eth.Contract(contractABI, contractAddress);
          setContract(deployedContract);
        } catch (error) {
          console.error('User denied account access:', error);
        }
      } else if (window.web3) {
        const web3Instance = new Web3(window.web3.currentProvider);
        setWeb3(web3Instance);
        const deployedContract = new web3Instance.eth.Contract(contractABI, contractAddress);
        setContract(deployedContract);
      } else {
        console.error('No web3 detected. Please install MetaMask.');
      }
    };
    initWeb3();
  }, []);

  const handleGetCertificate = async () => {
    if (!addressInput || !web3.utils.isAddress(addressInput)) {
      setInputWarning('Please enter a valid Ethereum address');
      setCertificateData(null);
      return;
    }
  
    if (contract) {
      try {
        const cert = await contract.methods.getCertificateByAddress(addressInput).call();
        console.log('Certificate from blockchain:', cert); // Debugging line
  
        if (cert) {
          const data = JSON.parse(cert);
  
          // Fetch transaction hash from the backend using studentAddress
          const responseHash = await fetch(`${process.env.REACT_APP_API_URL}/certificate/transactionHash?studentAddress=${addressInput}`);
          
          if (responseHash.ok) {
            const { transactionHash } = await responseHash.json();
            setTransactionHash(transactionHash);
  
            // Fetch certificate details from the backend using transactionHash
            const responseCert = await fetch(`${process.env.REACT_APP_API_URL}/certificate?transactionHash=${transactionHash}`);
            
            if (responseCert.ok) {
              const certificate = await responseCert.json();
              setCertificateDetails(certificate);
              setCertificateData(data);
              setInputWarning('');
            } else {
              setCertificateData(null);
              setInputWarning('Certificate details not found in the database');
            }
          } else {
            setInputWarning('Transaction hash not found for this address');
          }
        } else {
          setCertificateData(null);
          setInputWarning('Certificate not found on the blockchain');
        }
      } catch (error) {
        setCertificateData(null);
        setInputWarning('Error fetching certificate');
        console.error('Error fetching certificate:', error);
      }
    }
  };
  
  return (
    <div className="verification-container">
      <h2>Verify Certificate</h2>
      <input
        className="verification-input"
        type="text"
        placeholder="Enter Ethereum Address"
        value={addressInput}
        onChange={(e) => {
          setAddressInput(e.target.value);
          setInputWarning('');
        }}
      />
      <button className="verification-button" onClick={handleGetCertificate}>
        Verify Certificate
      </button>
      {inputWarning && <p className="warning">{inputWarning}</p>}

      {certificateData && certificateDetails && (
        <div className="certificatedetails">
          <p><strong>UUCMS ID:</strong> {certificateData.uucmsId}</p>
          <p><strong>Name:</strong> {certificateData.name}</p>
          <p><strong>Issue Date:</strong> {new Date(certificateData.issueDate).toLocaleDateString()}</p>
          <p><strong>Department:</strong> {certificateData.department}</p>
          <p><strong>Transaction Hash:</strong>  <a 
              href={`https://sepolia.etherscan.io/tx/${transactionHash}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {transactionHash}
            </a></p> {/* Display transaction hash as text */}
          <div className="verified-symbol">&#10003; Verified</div>
          <div className="certificate-footer">
            <p>© 2024 Karnataka University, Dharwad. All rights reserved</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationComponent;
