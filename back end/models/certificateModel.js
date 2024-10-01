const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  uucmsId: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  department: { type: String, required: true },
  issueDate: { type: Date, required: true  },
  email: { type: String, required: true },
  studentAddress: { type: String }, 
  transactionHash: { type: String },
  blockNumber: { type: Number }, 
});

const Certificate = mongoose.model('Certificate', certificateSchema);
module.exports = Certificate;
