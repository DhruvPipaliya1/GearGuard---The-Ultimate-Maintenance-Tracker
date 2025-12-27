import { verifyToken } from "../auth/jwt.utils.js";
import User from "../models/User.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw { statusCode: 401, message: "Unauthorized" };
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      throw { statusCode: 401, message: "User not authorized" };
    }

    req.user = {
      id: user._id,
      role: user.role,
      teamId: user.teamId
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
