import UserModel from "../models/usersModel.js";
import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} from "../utils/validation.js";

const AuthController = {
  // Register a new user
  async register(req, res, next) {
    try {
      const { error, value } = registerSchema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: error.details[0].message });
      }

      const { email, password, name } = value;
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res
          .status(409)
          .json({ success: false, message: "Email already exists" });
      }

      const newUser = await UserModel.create({ email, password, name });
      const token = UserModel.generateToken(newUser.id, newUser.role);

      res.status(201).json({
        success: true,
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // Login user
  async login(req, res, next) {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: error.details[0].message });
      }

      const { email, password } = value;
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }

      const isMatch = await UserModel.verifyPassword(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid password" });
      }

      req.session.userId = user.id;
      req.session.authenticated = true;
      req.session.role = user.role;

      const token = UserModel.generateToken(user.id, user.role);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });

      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // Change Password
  async changePassword(req, res, next) {
    try {
      const { error, value } = changePasswordSchema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .json({ success: false, message: error.details[0].message });
      }

      const { currentPassword, newPassword } = value;
      const user = await UserModel.findByEmail(req.user.email);
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }

      const isMatch = await UserModel.verifyPassword(
        currentPassword,
        user.password
      );
      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Current password is incorrect" });
      }

      await UserModel.updatePassword(user.id, newPassword);

      res.json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  //logout
  async logout(req, res, next) {
    try {
      req.session.destroy((err) => {
        if (err) return next(err);

        res.clearCookie("token");
        res.clearCookie("connect.sid");
        res.json({ success: true, message: "Logged out successfully" });
      });
    } catch (error) {
      next(error);
    }
  },

  async resetPassword(req, res, next) {
    try {
      const { email } = req.body;
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      res.json({
        success: true,
        message: "Password reset link sent to your email",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
