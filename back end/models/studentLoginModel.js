const mongoose = require('mongoose');

const studentLoginSchema = new mongoose.Schema({
  uucmsId: { type: String, required: true },
  dob: { type: Date, required: true },
});

const StudentLogin = mongoose.model('StudentLogin', studentLoginSchema);
module.exports = StudentLogin;
