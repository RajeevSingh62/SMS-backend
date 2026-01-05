import { Request, Response } from "express";

import User from "../auth/auth.model";
import studentModel from "../student/student.model";
import staffModule from "../staff/staff.module";
import { StudentMonthlyFee } from "../fee/student-monthly-fee.model";


export const adminDashboard = async (req: Request, res: Response) => {
  try {
    // 1️⃣ Month & Year handling
    const month = Number(req.query.month) || new Date().getMonth() + 1;
    const year = Number(req.query.year) || new Date().getFullYear();

    // 2️⃣ Parallel queries (FAST 🚀)
    const [
      totalStudents,
      totalStaff,
      feeStats,
      defaulterCount,
    ] = await Promise.all([
      studentModel.countDocuments(),
      staffModule.countDocuments(),

      StudentMonthlyFee.aggregate([
        {
          $match: { month, year }
        },
        {
          $group: {
            _id: null,
            totalGenerated: { $sum: "$totalAmount" },
            totalCollected: { $sum: "$paidAmount" },
            totalDue: { $sum: "$dueAmount" }
          }
        }
      ]),

      StudentMonthlyFee.countDocuments({
        month,
        year,
        dueAmount: { $gt: 0 }
      })
    ]);

    // 3️⃣ Safe extraction
    const feeSummary = feeStats[0] || {
      totalGenerated: 0,
      totalCollected: 0,
      totalDue: 0
    };

    // 4️⃣ Response
    res.status(200).json({
      success: true,
      data: {
        students: {
          total: totalStudents
        },
        staff: {
          total: totalStaff
        },
        fees: {
          month,
          year,
          ...feeSummary,
          defaulters: defaulterCount
        }
      }
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
export const studentOnboardChart=async(req:Request,res:Response)=>{
  try {
    const year = Number(req.query.year) || new Date().getFullYear();

    const data = await studentModel.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" }
        }
      },
      {
        $match: { year }
      },
      {
        $group: {
          _id: "$month",
          students: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.json({
      success: true,
      data
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getFeeChartData = async (req: Request, res: Response) => {
  try {
    const year = Number(req.query.year) || new Date().getFullYear();

    const data = await StudentMonthlyFee.aggregate([
      {
        $match: { year }
      },
      {
        $group: {
          _id: "$month",
          totalGenerated: { $sum: "$totalAmount" },
          totalCollected: { $sum: "$paidAmount" },
          totalDue: { $sum: "$dueAmount" }
        }
      },
      {
        $sort: { _id: 1 } // Jan → Dec
      }
    ]);

    res.json({
      success: true,
      data
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};