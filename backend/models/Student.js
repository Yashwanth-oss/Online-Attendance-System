const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  usn: {
    type: String,
    required: true,
    unique: true   // prevents duplicate USN
  },
  branch: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Student", studentSchema);