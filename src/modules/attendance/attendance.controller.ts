// attendance.controller.ts
import { Request, Response } from "express";
import Attendance from "./attendance.model";

export const markAttendance = async (req: Request, res: Response) => {
  try {
    const { date, classId, sectionId, records } = req.body;

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

    res.json({
      success: true,
      message: "Attendance saved successfully",
      data: attendance,
    });
  } catch (err: any) {
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
