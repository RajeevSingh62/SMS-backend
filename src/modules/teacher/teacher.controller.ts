import { Request,Response } from "express";
import  Teacher from "./teacher.model";
import {User} from "../auth/auth.model";
import { resolve } from "path";


export const createTeacher = async (req: Request, res: Response) => {
  try {
    const { name, email, password, subject, qualification, experience } = req.body;

    // 1. Create USER with role "teacher"
    const user = await User.create({
      name,
      email,
      password,
      role: "teacher"
    });

    // 2. Create Teacher profile
    const teacher = await Teacher.create({
      user: user._id,
      subject,
      qualification,
      experience
    });

    return res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      data: { user, teacher }
    });

  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllTeachers=async(req:Request,res:Response)=>{
    try {
        const teacher=await Teacher.find().populate("user","-password")
         return res.status(200).json({
            message:"Teachers Fetched successfully",
            data:teacher
         })
    } catch (error:any) {
        return res.status(500).json({
success: false, message: error.message
        })
    }
}

export const getTeacherById = async (req: Request, res: Response) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate("user", "-password");
    if (!teacher) return res.status(404).json({ success: false, message: "Teacher not found" });

    res.json({ success: true, data: teacher });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};