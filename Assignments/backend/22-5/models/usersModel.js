//  Raw SQL Queries
import { query } from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// obj constructor function
const UserModel = {
  async create({ email, password, name }) {
    try {
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.BCRYPT_SALT_ROUNDS)
      );
      //rows :result
      const { rows } = await query(
        `INSERT INTO users (email, password, name) VALUES ($1, $2, $3)
   RETURNING *`,
        [email, hashedPassword, name]
      );
      return rows[0];
    } catch (error) {
      if (error.code === "23505") {
        throw new Error("Email already exist");
      }
      throw error;
    }
  },
  //find user by email
  async findByEmail(email) {
    try {
      const { rows } = await query(`SELECT * FROM users WHERE email=$1`, [
        email,
      ]);
      if (rows.length > 0) return rows[0];
    } catch (error) {
      throw error;
    }
  },
  //find user by id
  async findById(id) {
    const { rows } = await query(
      `SELECT id,email,name,role FROM users WHERE id=$1`,
      [id]
    );
    return rows[0];
  },
  //token
  //we put expiration date 2 day or
  generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });
  },

  //verified repeated password
  async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  },

  //update password
  async updatePassword(userId, newPassword) {
    const hashedNewPassword = await bcrypt.hash(
      newPassword,
      parseInt(process.env.BCRYPT_SALT_ROUNDS)
    );
    await query(`UPDATE users SET password =$1 WHERE id =$2`, [
      hashedNewPassword,
      userId,
    ]);
  },
};

export default UserModel;
