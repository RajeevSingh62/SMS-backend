import { Request, Response } from "express";
import Student from "./student.model";
import Parent from "../parent/parent.model";
import User from "../auth/auth.model";
import bcrypt from "bcryptjs";
import StudentDoc from './../studentDoc/studentdoc.model';
import { createMonthlyFeeOnAdmission } from "../fee/fee-service";
import { StudentMonthlyFee } from "../fee/student-monthly-fee.model";
import { FeeTemplate } from "../fee/fee-template.model";


// ------------------------
// CREATE STUDENT (Admission)
// ------------------------


export const admissionStudent = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      classId,
      sectionId,
      parents = [],
      dateOfBirth,
      gender,
      address,
      documentUrl,
      status,
    } = req.body;

    // if (!name || !email || !password || !classId || !sectionId) {
    //   return res.status(400).json({ message: "Required fields missing" });
    // }

    // 1️⃣ Create User
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "student",
    });

    // 2️⃣ Create Student
    const student = await Student.create({
      user: user._id,
      classId,
      sectionId,
      parents,
      dateOfBirth,
      gender,
      address,
      documentUrl,
      status,
    });
// After student is created
const feeTemplate = await FeeTemplate.findOne({
  classId: student.classId,
});

if (feeTemplate) {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

 await StudentMonthlyFee.create({
  studentId: student._id,
  classId: student.classId,
  month,
  year,

  baseFee: feeTemplate.monthlyFee,
  examFee: 0,
  miscFee: 0,

  totalAmount: feeTemplate.monthlyFee,
  paidAmount: 0,
  dueAmount: feeTemplate.monthlyFee,

  status: "PENDING",
});

}

    return res.status(201).json({
      success: true,
      message: "Student admitted successfully",
      data: student,
    });

  } catch (err: any) {
    return res.status(500).json({ message: err.message });
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
      .populate({
        path: "classId",
        select: "name", 
      })
      .populate({
        path: "user",
        select: "name email", 
      })
          .populate({
        path: "user",
        select: "name ", 
      })
      .populate({
        path: "parents",
        select: "name phone", 
      });
 

    return res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



// ------------------------
// GET STUDENT BY ID
// ------------------------
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate({
        path: "classId",
        select: "name", 
      })
      .populate({
        path: "user",
        select: "name email", 
      })
    .populate({
        path: "parents",
        populate: {
          path: "user",
          select: "name phone email",
        },
      })
       .populate({
        path: "sectionId",
        select: "name ", 
      });
 

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
    const updates: any = { ...req.body };


    if (req.file) {
      updates.avatar = req.file.path;
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    )
      .populate("parents")
      .populate("documents");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.json({
      success: true,
      data: student,
    });
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
