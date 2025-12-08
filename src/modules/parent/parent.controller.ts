import { Request,Response } from "express";
import Parent from "./parent.model";




// CREATE PARENT
export const createParent = async (req: Request, res: Response) => {
  try {
    const { user, children, occupation, contactNumber, address } = req.body;

    const parent = await Parent.create({
      user,
      children,
      occupation,
      contactNumber,
      address,
    });

    return res.status(201).json({
      success: true,
      message: "Parent created successfully",
      data: parent,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};


// GET ALL PARENTS
export const getAllParent = async (req: Request, res: Response) => {
  try {
    const parents = await Parent.find()
      .populate("user")
      .populate("children");

    return res.json({
      success: true,
      data: parents,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET SINGLE PARENT
export const getParentById = async (req: Request, res: Response) => {
  try {
    const parent = await Parent.findById(req.params.id)
      .populate("user")
      .populate("children");

    return res.json({
      success: true,
      data: parent,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// UPDATE PARENT
export const updateParent = async (req: Request, res: Response) => {
  try {
    const parent = await Parent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.json({
      success: true,
      message: "Parent updated successfully",
      data: parent,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// DELETE PARENT
export const deleteParent = async (req: Request, res: Response) => {
  try {
    await Parent.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: "Parent deleted successfully",
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
