import { Request, Response } from "express";
import Staff from "./staff.module";

export const  createStaff = async (req: Request, res: Response) => {
    try {
      const staff = await Staff.create(req.body);
      return res.status(201).json({ success: true, staff });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

  export const getAllStaff=async (req: Request, res: Response) => {
    try {
      const staff = await Staff.find();
      return res.status(200).json({ success: true, data:staff });
    } 
    catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  export const getStaff= async (req: Request, res: Response) => {
    try {
      const staff = await Staff.findById(req.params.id);
      return res.status(200).json({ success: true, staff });
    } catch (err: any) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
  }

  export const updateStaff=async (req: Request, res: Response) => {
    try {
      const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.status(200).json({ success: true, staff });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  export const deleteStaff=async (req: Request, res: Response) => {
    try {
      await Staff.findByIdAndDelete(req.params.id);
      return res
        .status(200)
        .json({ success: true, message: "Staff deleted" });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

