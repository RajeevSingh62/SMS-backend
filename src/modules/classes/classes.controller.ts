import { Request, Response } from "express";


import Class from "./classes.model";

// ------------------------
// CREATE CLASS
// ------------------------
export const createClass = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Class name is required",
      });
    }

    const existing = await Class.findOne({ name });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Class already exists",
      });
    }

    const newClass = await Class.create({ name });

    return res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: newClass,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ------------------------
// GET ALL CLASSES
// ------------------------
export const getAllClasses = async (_req: Request, res: Response) => {
  try {
    const classes = await Class.find().sort({ name: 1 });

    return res.json({
      success: true,
      count: classes.length,
      data: classes,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ------------------------
// GET CLASS BY ID
// ------------------------
export const getClassById = async (req: Request, res: Response) => {
  try {
    const classData = await Class.findById(req.params.id);

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    return res.json({
      success: true,
      data: classData,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ------------------------
// UPDATE CLASS
// ------------------------
export const updateClass = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const updated = await Class.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    return res.json({
      success: true,
      message: "Class updated",
      data: updated,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ------------------------
// DELETE CLASS (HARD DELETE)
// ------------------------
export const deleteClass = async (req: Request, res: Response) => {
  try {
    const deleted = await Class.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    return res.json({
      success: true,
      message: "Class deleted successfully",
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
