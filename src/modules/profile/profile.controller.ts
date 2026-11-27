import { Request, Response} from "express";
import { profileService } from "./profile.service";

const createProfile = async(req: Request, res: Response)=>{
    try {
        const result = await profileService.createProfileIntoBD(req.body)
        res.status(201).json({
      success: true,
      message: "Profile Created!!",
      data: result,
    });
    } catch (error) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";
        res.status(500).json({
          success: false,
          message,
        });
    }
}

export const profileController ={
    createProfile,
}