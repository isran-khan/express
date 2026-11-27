import { Request, Response } from "express";

import { userservice } from "./user.service";
// post user
const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userservice.creatUsersIntoDB(req.body);
    res.status(201).json({
      success: true,
      message: "User Created!!",
      data: result.rows[0],
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    res.status(500).json({
      success: false,
      message,
    });
  }
};

// get user
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userservice.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: "User Retrived successfully!!",
      data: result.rows,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    res.status(500).json({
      success: false,
      message,
    });
  }
};

// get single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userservice.getSingleUserFromDB(id as string);
    res.status(200).json({
      success: true,
      message: "User Retrived successfully!!",
      data: result.rows[0],
    });
    // console.log(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    res.status(500).json({
      success: false,
      message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userservice.updateUserFromDB(req.body, id as string);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully!!",
      data: result.rows[0],
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    res.status(500).json({
      success: false,
      message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userservice.deleteUserFromDB(id as string);
    if (result.rowCount === 0) {
      res.status(400).json({
        success: false,
        message: "User Not Found!!",
        // data: result.rows[0],
      });
    }
    res.status(200).json({
      success: true,
      message: "User Deleted successfully!!",
      // data: result.rows[0],
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    res.status(500).json({
      success: false,
      message,
    });
  }
};

// all export
export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
