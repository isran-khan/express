import { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoBD(req.body);
    res.status(200).json({                
      success: true,
      message: "User Login Successfully!!",
      data: { accessToken: result },      
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    res.status(401).json({ success: false, message });   
  }
};

export const authController = {
  loginUser,
};
