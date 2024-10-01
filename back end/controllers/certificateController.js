const Certificate = require('../models/certificateModel');
const StudentLogin = require('../models/studentLoginModel');

exports.createCertificate = async (req, res) => {
  try {
    const { name, uucmsId, dob, department, email } = req.body;

    // Create new certificate
    const newCertificate = new Certificate({
      name,
      uucmsId,
      dob,
      department,
      email
    });

    // Save the certificate
    await newCertificate.save();

    // Create login credentials for the student
    const studentLogin = new StudentLogin({ uucmsId, dob });
    await studentLogin.save();

    res.status(201).json({
      success: true,
      message: 'Certificate and login details saved successfully!',
      data: newCertificate
    });
  } catch (error) {
    console.error('Error saving certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving certificate data',
      error: error.message
    });
  }
};
