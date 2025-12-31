import { Request, Response } from "express";
import Section from "./section.model";
import Class from "../classes/classes.model";

// ------------------------
// CREATE SECTION
// ------------------------
export const createSection = async (req: Request, res: Response) => {
  try {
    const { name, classId,capacity } = req.body;

    if (!name || !classId) {
      return res.status(400).json({
        success: false,
        message: "Section name and classId are required",
      });
    }

    // Check class exists
    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    // Prevent duplicate section in same class
    const exists = await Section.findOne({ name, classId });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Section already exists in this class",
      });
    }

    const section = await Section.create({ name, classId,capacity });

    return res.status(201).json({
      success: true,
      message: "Section created successfully",
      data: section,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ------------------------
// GET ALL SECTIONS
// ------------------------
export const getAllSections = async (req: Request, res: Response) => {
  try {
    const { classId } = req.query;

    const filter: any = {};
    if (classId) filter.classId = classId;

    const sections = await Section.find(filter)
      .populate("classId", "name")
      .sort({ name: 1 });

    return res.json({
      success: true,
      count: sections.length,
      data: sections,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ------------------------
// GET SECTION BY ID
// ------------------------
export const getSectionById = async (req: Request, res: Response) => {
  try {
    const section = await Section.findById(req.params.id)
      .populate("classId", "name");

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    return res.json({
      success: true,
      data: section,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ------------------------
// UPDATE SECTION
// ------------------------
export const updateSection = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const updated = await Section.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    return res.json({
      success: true,
      message: "Section updated",
      data: updated,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ------------------------
// DELETE SECTION
// ------------------------
export const deleteSection = async (req: Request, res: Response) => {
  try {
    const deleted = await Section.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    return res.json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
