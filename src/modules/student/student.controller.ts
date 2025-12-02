import { Request, Response } from "express";
import { User } from "../auth/auth.model";
import Student from "./student.model";

// Create student
export const createStudent = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      rollNumber,
      class: className,
      section,
      dateOfBirth,
      admissionDate,
      parentName,
      parentPhone,
      address,
    } = req.body;

    // 1️⃣ Create user with role = student
    const user = await User.create({
      name,
      email,
      password,
      role: "student",
    });

    // 2️⃣ Create student profile linked to user
    const student = await Student.create({
      user: user._id,
      rollNumber,
      class: className,
      section,
      dateOfBirth,
      admissionDate,
      parentName,
      parentPhone,
      address,
    });

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: {
        user,
        student,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// Get all students
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find().populate("user", "name email role");

    return res.json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// Get single student
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id).populate("user");

    if (!student)
      return res.status(404).json({ success: false, message: "Student not found" });

    return res.json({ success: true, data: student });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// Delete student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student)
      return res.status(404).json({ success: false, message: "Student not found" });

    await User.findByIdAndDelete(student.user);
    await student.deleteOne();

    return res.json({ success: true, message: "Student removed" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
