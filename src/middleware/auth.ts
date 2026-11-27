import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";

const auth = (...roles: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(roles);
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({
        success: true,
        message: "Unauthorized access!!",
      });
    }
    const decoded = jwt.verify(
      token as string,
      config.jwt_secret,
    ) as JwtPayload;
    //   console.log(decoded)
    const user = await pool.query(
      `
           SELECT * FROM users WHERE email=$1
        `,
      [decoded.email],
    );

    if (user.rowCount === 0) {
      res.status(404).json({
        success: true,
        message: "User not found!!",
      });
    }
    if (!user.rows[0].is_active) {
      res.status(403).json({
        success: true,
        message: "Forbidden!!",
      });
    }

    req.user = decoded;
    console.log(req);

    next();
  };
};

export default auth;
