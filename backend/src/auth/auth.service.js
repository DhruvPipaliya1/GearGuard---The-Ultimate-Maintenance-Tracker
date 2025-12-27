import User from "../models/User.model.js";
import { generateToken } from "./jwt.utils.js";

export const loginService = async ({ email, password, role }) => {
  const user = await User.findOne({ email, isActive: true }).select("+password");

  if (!user) {
    throw { statusCode: 401, message: "Invalid credentials" };
  }

  // role mismatch protection
  if (role && user.role !== role) {
    throw { statusCode: 403, message: "Role mismatch" };
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw { statusCode: 401, message: "Invalid credentials" };
  }

  const token = generateToken({
    id: user._id,
    role: user.role,
    teamId: user.teamId
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};
