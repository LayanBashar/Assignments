import UserModel from "../models/usersModel.js";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  try {
    if (req.session.authenticated && req.session.userId) {
      const user = await UserModel.findById(req.session.userId);
    }
  } catch (error) {}
};
