const express = require("express");
const router = express.Router();   // ✅ THIS WAS MISSING
const Student = require("../models/Student");
const Attendance = require("../models/Attendance");


// ================= ADD STUDENT =================
router.post("/add", async (req, res) => {
  try {
    const { name, usn, branch } = req.body;

    if (!name || !usn || !branch) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingStudent = await Student.findOne({ usn });
    if (existingStudent) {
      return res.status(400).json({ message: "USN already exists" });
    }

    const newStudent = new Student({
      name,
      usn,
      branch
    });

    await newStudent.save();

    res.status(201).json({
      message: "Student Added Successfully",
      student: newStudent
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});


// ================= GET ALL STUDENTS =================
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE STUDENT + ATTENDANCE
router.delete("/:id", async (req, res) => {
  try {
    const studentId = req.params.id;

    console.log("Deleting :", studentId);

    // Delete attendance records first
    await Attendance.deleteMany({ studentId: studentId });

    // Then delete student
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });

  } catch (err) {
    console.log("Delete error:", err); // IMPORTANT
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

// UPDATE STUDENT
router.put("/:id", async (req, res) => {
  try {
    console.log("Update ID:", req.params.id);
    console.log("Update Data:", req.body);

    const { name, usn, branch } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, usn, branch },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student updated successfully" });

  } catch (err) {
    console.log("UPDATE ERROR:", err);   // 👈 IMPORTANT
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});



module.exports = router;   // ✅ VERY IMPORTANT