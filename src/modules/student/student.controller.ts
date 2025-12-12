import { Request, Response } from "express";
import  Student  from "./student.model";
import Parent from "../parent/parent.model";

import StudentDoc from './../studentDoc/studentdoc.model';


// ------------------------
// CREATE STUDENT (Admission)
// ------------------------
export const admissionStudent = async (req: Request, res: Response) => {
  try {
    /**
     * Expected body:
     * {
     *   name, classId, sectionId,
     *   parents: [parentId1, parentId2],
     *   dateOfBirth, gender,
     *   admissionDate, previousSchool,
     *   address, photoUrl, rollNumber
     * }
     */

    const {
      user,
      classId,
      sectionId,
      parents = [],
      dateOfBirth,
      gender,
      admissionDate,
      previousSchool,
      address,
      photoUrl,
      rollNumber
    } = req.body;

    if (!user || !classId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "name, classId, sectionId are required",
      });
    }

    // Validate parents
    if (parents.length > 0) {
      const validParents = await Parent.find({ _id: { $in: parents } });

      if (validParents.length !== parents.length) {
        return res.status(400).json({
          success: false,
          message: "One or more parents not found",
        });
      }
    }

    // Create student directly (NO AUTH USER)
    const student = await Student.create({
      user,
      classId,
      sectionId,
      parents,
      dateOfBirth,
      gender,
      admissionDate,
      previousSchool,
      address,
      photoUrl,
      rollNumber,
    });

    return res.status(201).json({
      success: true,
      message: "Student admitted successfully",
      data: student,
    });

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};


// ------------------------
// ATTACH DOCUMENT
// ------------------------
export const attachDocument = async (req: Request, res: Response) => {
  try {
    const { studentId, fileUrl, fileName, fileType, size, tag } = req.body;

    if (!studentId || !fileUrl) {
      return res.status(400).json({
        success: false,
        message: "studentId and fileUrl are required",
      });
    }

    const student = await Student.findById(studentId);
    if (!student)
      return res.status(404).json({ success: false, message: "Student not found" });

    const document = await StudentDoc.create({
      student: studentId,
      fileUrl,
      fileName,
      fileType,
      size,
      tag,
    });

    student.documents = [...(student.documents || []), document._id];
    await student.save();

    return res.status(201).json({
      success: true,
      data: document,
    });

  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


// ------------------------
// GET ALL STUDENTS
// ------------------------
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const { classId, sectionId, status } = req.query;
    const filter: any = {};

    if (classId) filter.classId = classId;
    if (sectionId) filter.sectionId = sectionId;
    if (status) filter.status = status;

    const students = await Student.find(filter)
      .populate("parents")
      .populate("documents");

    return res.json({
      success: true,
      count: students.length,
      data: students,
    });

  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


// ------------------------
// GET STUDENT BY ID
// ------------------------
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("parents")
      .populate("documents");

    if (!student)
      return res.status(404).json({ success: false, message: "Student not found" });

    return res.json({ success: true, data: student });

  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


// ------------------------
// UPDATE STUDENT
// ------------------------
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const updates = req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    )
      .populate("parents")
      .populate("documents");

    if (!student)
      return res.status(404).json({ success: false, message: "Student not found" });

    return res.json({ success: true, data: student });

  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


// ------------------------
// DEACTIVATE STUDENT (soft delete)
// ------------------------
export const deactivateStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { status: "inactive" },
      { new: true }
    );

    if (!student)
      return res.status(404).json({ success: false, message: "Student not found" });

    return res.json({
      success: true,
      message: "Student deactivated",
      data: student,
    });

  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
