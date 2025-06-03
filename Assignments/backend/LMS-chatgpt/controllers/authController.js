import UserModel from "../models/usersModel.js";
import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} from "../utils/validation.js";
const AuthController = {
  //regestration
  async register(req, res, next) {
    try {
      const { error, value } = registerSchema.validate(req.body);
      if (error) throw new Error(error.details[0].message);
      const { email, password, name } = value;
      //to make sure there is no same email
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) throw new Error("Email already in use");
      const newUser = await UserModel.create({ email, password, name });

      const token = UserModel.generateToken(newUser.id);

      req.session.userId = newUser.id;
      req.session.authenticated = true;

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, //1 day
        sameSite: "strict",
      });

      res.status(201).json({
        success: true,
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  //login
  async login(req, res, next) {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) throw new Error(error.details[0].message);
      const { email, password } = value;
      //to find email
      const user = await UserModel.findByEmail(email);
      //to make sure that user have this email
      if (!user) throw new Error("Invalid Credantials");
      //match the password
      const isMatch = await UserModel.verifyPassword(password, user.password);
      if (!isMatch) throw new Error("Invalid password");

      //create session

      req.session.userId = user.id;
      req.session.authenticated = true;
      //generate token
      const token = UserModel.generateToken(user.id);
      // configiration of cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, //1 day
        sameSite: "strict",
      });

      res.json({
        success: true,
        token: token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  //change the password
  async changePassword(req, res, next) {
    try {
      //validation
      const { error, value } = changePasswordSchema.validate(req.body);
      if (error) throw new Error(error.details[0].message);
      const { currentPassword, newPassword } = value;
      const user = await UserModel.findByEmail(req.user.email);
      if (!user) throw new Error("Invalid Credantials");
      const isMatch = await UserModel.verifyPassword(
        currentPassword,
        user.password
      );
      if (!isMatch) throw new Error("Current password is incorrect");
      await UserModel.updatePassword(user.id, newPassword);
      res.json({ success: true, message: "password updated successfully" });
    } catch (error) {
      next(error);
    }
  },

  async getCurrentLoginOnfo(req, res, next) {
    try {
      const user = await UserModel.findById(req.user.id);
      if (!user) throw new Error("User not found");
      res.json({
        success: true,
        user,
      });
    } catch (error) {}
  },

  async logout(req, res, next) {
    try {
      req.session.destroy((err) => {
        if (err) throw err;
      });
      res.clearCookie("token");
      res.clearCookie("connect.sid");
      res.json({ success: true, message: "Loggged out successfully" });
    } catch (error) {}
  },
};

export default AuthController;
