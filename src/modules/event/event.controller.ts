import { Request, Response } from "express";
import Event from "./event.model"

export const createEvent= async (req: Request, res: Response) => {
  try {
    

    const event = await Event.create({
      ...req.body,
    
    });

    return res.status(201).json({
      success: true,
      data: event,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


  export const getAllEvent=async (req: Request, res: Response) => {
    try {
      const event = await Event.find();
      return res.status(200).json({ success: true, data:event });
    } 
    catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  export const getSEventById= async (req: Request, res: Response) => {
    try {
      const event = await Event.findById(req.params.id);
      return res.status(200).json({ success: true, event });
    } catch (err: any) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
  }

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const updateData: any = { ...req.body };

 

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


  export const deleteEvent=async (req: Request, res: Response) => {
    try {
      await Event.findByIdAndDelete(req.params.id);
      return res
        .status(200)
        .json({ success: true, message: "event deleted" });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

