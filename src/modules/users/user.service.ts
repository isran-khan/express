import { pool } from "../../db";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt"

const creatUsersIntoDB = async (payload: IUser) => {
  const { name, email, password, age } = payload;
  const hashPassword = await bcrypt.hash(password,10)
  // console.log(hash)
  // console.log(password)
  const result = await pool.query(
    `
       INSERT INTO users (name, email, password, age) VALUES($1,$2,$3,$4) RETURNING *
    `,
    [name, email, hashPassword, age],
  );
  delete result.rows[0].password
  return result;
};

const getAllUsersFromDB = async()=>{
     const result = await pool.query(`
        SELECT * FROM users
      `);
      return result
}

const getSingleUserFromDB = async(id: string)=>{
    //  const { id } = payload;
    const result = await pool.query(
      `
        SELECT * FROM users WHERE id=$1
      `,
      [id],
    );
    return result
}

const updateUserFromDB =async(payload: IUser, id: string)=>{
    const { name, age, password, is_active } = payload;
    const result = await pool.query(
      `
      UPDATE users
      SET
        name = COALESCE($1, name),
        password = COALESCE($2, password),
        age = COALESCE($3, age),
        is_active = COALESCE($4, is_active),
        updated_at = NOW()
      WHERE id = $5
      RETURNING id, name, email, age, is_active, created_at, updated_at
      `,
      [name ?? null, password ?? null, age ?? null, is_active ?? null, id],
    );
    return result
}

const deleteUserFromDB = async(id: string)=>{
    const result = await pool.query(`
           DELETE FROM users WHERE id=$1
       `,
          [id]
      ) 
      return result
}

export const userservice = {
  creatUsersIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
   deleteUserFromDB,
};
