// attendance.controller.ts
import { Request, Response } from "express";
import Attendance from "./attendance.model";
import studentModel from "../student/student.model";

export const markAttendance = async (req: Request, res: Response) => {
  try {
    const { date, classId, sectionId, records } = req.body;
    console.log("req body",req.body)

    const attendance = await Attendance.findOneAndUpdate(
      { date, classId, sectionId },
      {
        date,
        classId,
        sectionId,
        records,
        markedBy: req.user!.id,
      },
      { upsert: true, new: true }
    );
console.log(attendance)
    res.json({
      success: true,
      message: "Attendance saved successfully",
      data: attendance,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
export const getAttendanceByClass = async (req: Request, res: Response) => {
  const { date, classId, sectionId } = req.query;

  const attendance = await Attendance.findOne({
    date,
    classId,
    sectionId,
  }).populate("records.studentId", "user");

  res.json({
    success: true,
    data: attendance,
  });
};
export const getMyAttendance = async (req: Request, res: Response) => {
  // const studentId = req.studentId; // mapping later explain karunga

  // const attendance = await Attendance.find({
  //   "records.studentId": studentId,
  // });

  // res.json({
  //   success: true,
  //   data: attendance,
  // });
};
// student.controller.ts
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const { classId, sectionId, status } = req.query;

    const filter: any = {};
    if (classId) filter.classId = classId;
    if (sectionId) filter.sectionId = sectionId;
    if (status) filter.status = status;

    const students = await studentModel.find(filter)
      .populate("user", "name email")
      .populate("classId", "name")
      .populate("sectionId", "name");

    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
