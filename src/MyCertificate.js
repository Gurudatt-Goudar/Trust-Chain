import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const MyCertificateApp = () => {
  const [web3, setWeb3] = useState(null);
  const [certificate, setCertificate] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [contract, setContract] = useState(null);
  const contractAddress = '0x622f06febb8250fa6174cba0263dafdc77cd9e51'; // Replace with your deployed contract address
 
 const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "hash",
				"type": "string"
			}
		],
		"name": "CertificateStored",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "certificates",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCertificate",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getCertificateByAddress",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "hash",
				"type": "string"
			}
		],
		"name": "storeCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

  useEffect(() => {
    async function initWeb3() {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3Instance);
          const deployedContract = new web3Instance.eth.Contract(contractABI, contractAddress);
          setContract(deployedContract);

          const accounts = await web3Instance.eth.getAccounts();
          if (accounts.length > 0) {
            web3Instance.eth.defaultAccount = accounts[0];
          } else {
            console.error('No accounts found in MetaMask.');
          }
        } catch (error) {
          console.error('User denied account access or something went wrong.');
        }
      } else if (window.web3) {
        const web3Instance = new Web3(window.web3.currentProvider);
        setWeb3(web3Instance);
        const deployedContract = new web3Instance.eth.Contract(contractABI, contractAddress);
        setContract(deployedContract);
      } else {
        console.error('No web3 detected. Please install MetaMask or use a web3-enabled browser.');
      }
    }
    initWeb3();
  }, []);

  const handleStoreCertificate = async () => {
    if (contract && certificate !== '') {
      try {
        await contract.methods.storeCertificate(certificate).send({ from: web3.eth.defaultAccount });
        alert('Certificate stored successfully!');
      } catch (error) {
        console.error('Error storing certificate:', error);
      }
    }
  };

  const handleGetCertificate = async () => {
    if (contract && addressInput !== '') {
      try {
        const cert = await contract.methods.getCertificateByAddress(addressInput).call();
        alert(`Certificate for ${addressInput}: ${cert}`);
      } catch (error) {
        console.error('Error fetching certificate:', error);
      }
    }
  };

  const handleGetOwnCertificate = async () => {
    if (contract) {
      try {
        const cert = await contract.methods.getCertificate().call({ from: web3.eth.defaultAccount });
        if (cert !== '') {
          alert(`Your certificate: ${cert}`);
          // Update state or UI to display the fetched certificate
        } else {
          alert('No certificate found for your address');
        }
      } catch (error) {
        console.error('Error fetching certificate:', error);
      }
    }
  };

  return (
    <div>
      <h1>Certificate Management</h1>
      <input
        type="text"
        placeholder="Enter certificate hash"
        value={certificate}
        onChange={(e) => setCertificate(e.target.value)}
      />
      <button onClick={handleStoreCertificate}>Store Certificate</button>

      <br />

      <input
        type="text"
        placeholder="Enter address to fetch certificate"
        value={addressInput}
        onChange={(e) => setAddressInput(e.target.value)}
      />
      <button onClick={handleGetCertificate}>Get Certificate</button>
      <button onClick={handleGetOwnCertificate}>Get My Certificate</button>
    </div>
  );
};

export default MyCertificateApp;
