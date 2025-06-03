//costume middleware
import UserModel from "../models/usersModel.js";
import jwt from "jsonwebtoken";
export const athenticate = async (req, res, next) => {
  try {
    if (req.session.authenticated && req.session.userId) {
      const user = await UserModel.findById(decoded.id);
      if (user) {
        req.user = user;
        return next();
      }
    }

    // const authHeader = req.headers["authorization"];
    // const token = authHeader?.split(" ")[1];
    const token = req.cookie.token;
    if (!token) throw new Error("Auth token missing");
    //decoded
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);
    if (!user) throw new Error("User not found");

    //renew the session
    req.session.userId = user.id;
    req.session.athenticated = true;
    req.user = user;
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};
export const authrize = (roles = []) => {
  return (req, res, next) => {
    if (roles.length && !roles.includes(req.user.role)) {
      const errpr = new Error("Unauthorized axxess");
      error.statusCode = 403;
      return next(error);
    }
    next();
  };
};
