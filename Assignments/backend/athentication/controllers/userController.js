import UserModel from "../models/usersModel.js";

// إنشاء مستخدم جديد
export const createUser = async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// عرض البروفايل للمستخدم الحالي
export const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update profile للمستخدم الحالي
export const updateProfile = async (req, res, next) => {
  try {
    const user = await UserModel.updateProfile(req.user.id, req.body);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// تحديث بيانات المستخدم
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await UserModel.updateUser(req.user.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// حذف مستخدم
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    await UserModel.deleteUser(userId);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// تغيير الدور
export const changeUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const updatedUser = await UserModel.updateRole(userId, role);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// جلب كل المستخدمين
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// تفعيل المستخدم
export const activateUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await UserModel.activateUser(userId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// تعطيل المستخدم
export const deactivateUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await UserModel.deactivateUser(userId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
