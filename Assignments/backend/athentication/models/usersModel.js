import { query } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserModel = {
  // إنشاء مستخدم جديد
  async create({
    email,
    password,
    name,
    role = "student",
    avatar = null,
    oauth_provider = null,
    oauth_id = null,
  }) {
    try {
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.BCRYPT_SALT_ROUNDS)
      );

      const { rows } = await query(
        `INSERT INTO users (email, password_hash, name, role, avatar, oauth_provider, oauth_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id, email, name, role, avatar, created_at`,
        [email, hashedPassword, name, role, avatar, oauth_provider, oauth_id]
      );

      return rows[0];
    } catch (error) {
      if (error.code === "23505") {
        throw new Error("Email already exists");
      }
      throw error;
    }
  },

  async findByEmail(email) {
    const { rows } = await query(
      `SELECT id, email, name, role, password_hash, is_active, avatar FROM users WHERE email = $1`,
      [email]
    );
    if (rows.length === 0) throw new Error("User not found");
    return rows[0];
  },

  async findById(id) {
    const { rows } = await query(
      `SELECT id, email, name, role, avatar, is_active, created_at FROM users WHERE id = $1`,
      [id]
    );
    if (rows.length === 0) throw new Error("User not found");
    return rows[0];
  },

  generateToken(userId, role) {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });
  },

  async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  },

  async updatePassword(userId, newPassword) {
    const hashedNewPassword = await bcrypt.hash(
      newPassword,
      parseInt(process.env.BCRYPT_SALT_ROUNDS)
    );
    await query(
      `UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2`,
      [hashedNewPassword, userId]
    );
  },

  async activateUser(id) {
    const { rows } = await query(
      `UPDATE users SET is_active = TRUE, updated_at = NOW() WHERE id = $1 RETURNING id, is_active`,
      [id]
    );
    if (rows.length === 0) throw new Error("User not found");
    return rows[0];
  },

  async deactivateUser(id) {
    const { rows } = await query(
      `UPDATE users SET is_active = FALSE, updated_at = NOW() WHERE id = $1 RETURNING id, is_active`,
      [id]
    );
    if (rows.length === 0) throw new Error("User not found");
    return rows[0];
  },

  async updateRole(userId, role) {
    const { rows } = await query(
      `UPDATE users SET role = $1, updated_at = NOW() WHERE id = $2 RETURNING id, role`,
      [role, userId]
    );
    if (rows.length === 0) throw new Error("User not found");
    return rows[0];
  },

  async getAllUsers() {
    const { rows } = await query(
      `SELECT id, name, email, role, is_active, created_at FROM users`
    );
    return rows;
  },

  async updateUser(id, { name, email, role, avatar }) {
    const { rows } = await query(
      `UPDATE users SET name = $1, email = $2, role = $3, avatar = $4, updated_at = NOW() WHERE id = $5
       RETURNING id, name, email, role, avatar`,
      [name, email, role, avatar, id]
    );
    if (rows.length === 0) throw new Error("User not found");
    return rows[0];
  },

  async deleteUser(id) {
    const { rows } = await query(
      `DELETE FROM users WHERE id = $1 RETURNING id`,
      [id]
    );
    if (rows.length === 0) throw new Error("User not found");
    return rows[0];
  },

  async updateProfile(id, { name, email, avatar }) {
    try {
      const { rows } = await query(
        `UPDATE users SET name = $1, email = $2, avatar = $3, updated_at = NOW() WHERE id = $4
         RETURNING id, name, email, avatar`,
        [name, email, avatar, id]
      );
      if (rows.length === 0) throw new Error("User not found");
      return rows[0];
    } catch (error) {
      if (error.code === "23505") {
        throw new Error("Email already exists");
      }
      throw error;
    }
  },
};

export default UserModel;
