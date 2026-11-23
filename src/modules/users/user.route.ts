import { Router } from "express";

import { userController } from "./user.controller";

const router = Router();

// Post User
router.post("/", userController.createUser);

// Get User
router.get("/", userController.getAllUsers);

// get single user
router.get("/:id",userController.getSingleUser)
router.put("/:id",userController.updateUser)
router.delete("/:id",userController.deleteUser)

export const userRouter = router;
