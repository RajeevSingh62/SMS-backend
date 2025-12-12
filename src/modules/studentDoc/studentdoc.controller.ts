import { Request, Response } from "express";
import StudentDoc from "./studentdoc.model";

export const getDocsByStudent = async (req: Request, res: Response) => {
  try {
    const docs = await StudentDoc.find({ student: req.params.studentId });
    return res.json({ success: true, data: docs });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteDoc = async (req: Request, res: Response) => {
  try {
    const doc = await StudentDoc.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Doc not found" });
    // TODO: also delete file from storage if applicable
    return res.json({ success: true, message: "Document removed" });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
