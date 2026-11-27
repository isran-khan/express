import config from "../../config";
import { pool } from "../../db";
import { ILogin } from "./auth.interface";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

const loginUserIntoBD = async (payload: ILogin) => {
  // chack if the user exist --> done
  // chack if the password mach --> Done
  // chack the user status -->done
  // If pass all then genarate JWT  token

  const { email, password } = payload;
  const user = await pool.query(
    `
              SELECT * FROM users WHERE email=$1
        `,
    [email],
  );
  //   console.log(user)
  if (user.rowCount === 0) {
    throw new Error("Invalid credentials!!");
  }
  const matchPassword = await bcrypt.compare(password, user.rows[0].password);
  if (!matchPassword) {
    throw new Error("Invalid credentials!!");
  }
  if (!user.rows[0].is_active) {
    throw new Error("Access Denied!!");
  }

  const dbUser = user.rows[0];

  const jwtPayload = {
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
    role: dbUser.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_secret, {
    expiresIn: "1d",
  });

  return accessToken;
};

export const authService = {
  loginUserIntoBD,
};
