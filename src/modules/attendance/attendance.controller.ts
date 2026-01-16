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




export const getDailyAttendance = async (req: Request, res: Response) => {
  try {
    const {
      page = "1",
      limit = "10",
      date,
      classId,
      sectionId,
    } = req.query;

    const filter: any = {};

    if (date) filter.date = date;
    if (classId) filter.classId = classId;
    if (sectionId) filter.sectionId = sectionId;

    const skip = (Number(page) - 1) * Number(limit);

    const [data, total] = await Promise.all([
      Attendance.find(filter)
        .populate("classId", "name")
        .populate("sectionId", "name")
      .populate({
  path: "records.studentId",
  select: "rollNumber user",
  populate: {
    path: "user",
    select: "name email",
  },
})

        .sort({ date: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Attendance.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

