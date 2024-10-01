const express = require('express');
const Certificate = require('../models/certificateModel');
const StudentLogin = require('../models/studentLoginModel');
const router = express.Router();

// Fetch all certificates
router.get('/', async (req, res) => {
  try {
    const certificates = await Certificate.find();
    if (!certificates || certificates.length === 0) {
      return res.status(404).json({ message: 'No certificates found' });
    }
    res.status(200).json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ error: 'Server error retrieving the certificates' });
  }
});

// Fetch transaction hash by student address
router.get('/transactionHash', async (req, res) => {
  const { studentAddress } = req.query;
  try {
    const certificate = await Certificate.findOne({ studentAddress });
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found for this address' });
    }
    res.status(200).json({ transactionHash: certificate.transactionHash });
  } catch (error) {
    console.error('Error fetching transaction hash:', error);
    res.status(500).json({ error: 'Server error fetching transaction hash' });
  }
});

// **POST: Student Login** - Handles student login
router.post('/studentlogin', async (req, res) => {
  const { uucmsId, dob } = req.body;

  try {
    // Step 1: Verify login credentials
    const studentLogin = await StudentLogin.findOne({ uucmsId, dob });
    if (!studentLogin) {
      return res.status(404).json({ message: 'Invalid login credentials' });
    }

    // Step 2: Fetch the certificate details for the logged-in student
    const certificate = await Certificate.findOne({ uucmsId });
    if (!certificate) {
      return res.status(404).json({ message: 'No certificate found for this UUCMS ID' });
    }

    // Step 3: Verify if certificate data is valid before sending
    if (!certificate.transactionHash || !certificate.studentAddress) {
      return res.status(500).json({ message: 'Incomplete certificate data' });
    }

    // Step 4: Return successful login response with certificate details
    res.status(200).json({ message: 'Login successful', certificate });
  } catch (error) {
    console.error('Error during student login:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Create a new certificate and student login
router.post('/', async (req, res) => {
  const { name, uucmsId, dob, department, issueDate, email, transactionHash, studentAddress } = req.body;
  
  try {
    // Step 1: Create and save the new certificate
    const newCertificate = new Certificate({
      name,
      uucmsId,
      dob,
      department,
      issueDate,
      email,
      studentAddress,
      transactionHash,
    });

    const savedCertificate = await newCertificate.save();

    // Step 2: Check if student login already exists
    const existingStudentLogin = await StudentLogin.findOne({ uucmsId });
    if (!existingStudentLogin) {
      const studentLogin = new StudentLogin({ uucmsId, dob });
      await studentLogin.save(); // Save new student login credentials
    } else {
      console.log('Student login already exists for this UUCMS ID');
    }

    // Step 3: Return the saved certificate data
    res.status(201).json(savedCertificate);
  } catch (error) {
    console.error('Error saving certificate and student login:', error);
    res.status(500).json({ error: 'Error saving certificate and student login data' });
  }
});

// Update an existing certificate
router.put('/:uucmsId', async (req, res) => {
  const { uucmsId } = req.params;
  const updates = req.body;

  try {
    const updatedCertificate = await Certificate.findOneAndUpdate({ uucmsId }, updates, { new: true });
    if (!updatedCertificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    res.status(200).json(updatedCertificate);
  } catch (error) {
    console.error('Error updating certificate:', error);
    res.status(500).json({ error: 'Error updating the certificate' });
  }
});

// Delete a certificate
router.delete('/:uucmsId', async (req, res) => {
  const { uucmsId } = req.params;
  try {
    const deletedCertificate = await Certificate.findOneAndDelete({ uucmsId });
    if (!deletedCertificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    res.status(200).json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    console.error('Error deleting the certificate:', error);
    res.status(500).json({ error: 'Error deleting the certificate' });
  }
});

module.exports = router;
