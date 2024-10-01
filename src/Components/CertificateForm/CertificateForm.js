import React, { useState } from 'react';
import './CertificateForm.css';
import { dataset } from '../../ConfigData'; // Import the dataset

const CertificateForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    uucmsId: '',
    dob: '',
    issueDate: '',
    department: '',
    email:'',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const formErrors = {};
    if (!formData.name) formErrors.name = 'Student Name is required';
    if (!formData.uucmsId) formErrors.uucmsId = 'UUCMS ID is required';
    if (!formData.dob) formErrors.dob = 'Date of Birth is required';
    if (!formData.issueDate) formErrors.issueDate = 'Issue Date is required';
    if (!formData.department) formErrors.department = 'Department is required';
    if (!formData.email) formErrors.email = 'email is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const address = dataset[formData.uucmsId];
        if (!address) {
          setErrors({ uucmsId: 'Invalid UUCMS ID. Please check and try again.' });
          return;
        }
        const dataWithAddress = { ...formData, address }; // Add address to the form data
        await onSubmit(dataWithAddress);
      } catch (error) {
        console.error('Submission error:', error);
      }
    }
  };

  return (
    <form className="certificate-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Student Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter student name"
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="uucmsId">UUCMS ID:</label>
        <input
          type="text"
          id="uucmsId"
          name="uucmsId"
          value={formData.uucmsId}
          onChange={handleChange}
          placeholder="Enter UUCMS ID"
        />
        {errors.uucmsId && <p className="error-message">{errors.uucmsId}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
        {errors.dob && <p className="error-message">{errors.dob}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="issueDate">Issue Date:</label>
        <input
          type="date"
          id="issueDate"
          name="issueDate"
          value={formData.issueDate}
          onChange={handleChange}
        />
        {errors.issueDate && <p className="error-message">{errors.issueDate}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="department">Department:</label>
        <select
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          <option value="MCA">MCA</option>
          <option value="MSC (CS)">MSC (CS)</option>
        </select>
        {errors.department && <p className="error-message">{errors.department}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>

      <button type="submit" className="submit-button">Issue Certificate</button>
    </form>
  );
};

export default CertificateForm;
