import { Request, Response } from "express";
import StudentAttendance from "./studentAttendance.model";
import StaffAttendance from "./staffAttendance.model";

export default {
  // Mark student attendance
  markStudent: async (req: Request, res: Response) => {
    try {
      const data = await StudentAttendance.create(req.body);
      return res.status(201).json({ success: true, data });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // Mark staff attendance
  markStaff: async (req: Request, res: Response) => {
    try {
      const data = await StaffAttendance.create(req.body);
      return res.status(201).json({ success: true, data });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // Get student attendance
  getStudentAttendance: async (req: Request, res: Response) => {
    try {
      const { studentId } = req.params;
      const data = await StudentAttendance.find({ studentId }).sort({
        date: -1,
      });
      return res.status(200).json({ success: true, data });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // Get staff attendance
  getStaffAttendance: async (req: Request, res: Response) => {
    try {
      const { staffId } = req.params;
      const data = await StaffAttendance.find({ staffId }).sort({ date: -1 });
      return res.status(200).json({ success: true, data });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },
};
