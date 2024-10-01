import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeComponent from './Components/HomeComponent/HomeComponent';
import IssuerLoginComponent from './Components/LoginComponent/IssuerLoginComponent';
import ReceiverLoginComponent from './Components/LoginComponent/ReceiverLoginComponent';
import IssuerComponent from './Components/IssuerComponent/IssuerComponent';
import ReceiverComponent from './Components/ReceiverComponent/ReceiverComponent';
import VerificationComponent from './Components/VerificationComponent/VerificationComponent';
import IssueMainComponent from './Components/IssueMainComponent/IssueMainComponent';
import ReceiveMainComponent from './Components/ReceiveMainComponent/ReveiveMainComponent'; // Corrected import path
import IssuedCertificates from './Components/IssuedCertificates/IssuedCertificates'; // New component for viewing issued certificates
import CertificateDetails from './Components/CertificateDetails/CertificateDetails';
import { ToastContainer } from 'react-toastify';
import EmailSender from './emailSender'; // Adjust the import path as necessary


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/issuer-login" element={<IssuerLoginComponent />} />
        <Route path="/receiver-login" element={<ReceiverLoginComponent />} />
        <Route path="/issuer" element={<IssueMainComponent />} />
        <Route path="/receiver" element={<ReceiveMainComponent />} />
        <Route path="/issue" element={<IssuerComponent />} />
        <Route path="/receive" element={<ReceiverComponent />} />
        <Route path="/verify" element={<VerificationComponent />} />
        <Route path="/issued-certificates" element={<IssuedCertificates />} /> {/* New route for issued certificates */}
        <Route path="/certificates/:uucmsId" element={<CertificateDetails />} />
        <Route path="/email-sender" element={<EmailSender />}/>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
