const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// MARK ATTENDANCE
router.post("/mark", async (req, res) => {
  try {
    const records = req.body;

    const attendanceRecords = records.map((record) => ({
      studentId: record.studentId,
      status: record.status,
      date: new Date(),
    }));

    await Attendance.insertMany(attendanceRecords);

    res.json({ message: "Attendance marked successfully" });
  } catch (error) {
    console.log("MARK ERROR:", error);
    res.status(500).json({ message: "Error marking attendance" });
  }
});
// GET RECORDS
router.get("/", async (req, res) => {
  try {
    const records = await Attendance.find().populate("studentId");
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;