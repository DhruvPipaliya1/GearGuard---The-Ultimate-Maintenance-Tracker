import User from "../models/User.model.js";
import Team from "../models/Team.model.js";
import { ROLES } from "../config/roles.js";
import { hashPassword } from "../auth/password.utils.js";

export const createUserService = async ({
  name,
  email,
  password,
  role,
  teamId
}) => {
  // Role validation
  if (![ROLES.EMPLOYEE, ROLES.TECHNICIAN].includes(role)) {
    throw {
      statusCode: 400,
      message: "Invalid role"
    };
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw {
      statusCode: 400,
      message: "User already exists"
    };
  }

  // If technician, team is mandatory
  if (role === ROLES.TECHNICIAN) {
    if (!teamId) {
      throw {
        statusCode: 400,
        message: "Technician must be assigned to a team"
      };
    }

    const team = await Team.findById(teamId);
    if (!team) {
      throw {
        statusCode: 404,
        message: "Team not found"
      };
    }
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    teamId: role === ROLES.TECHNICIAN ? teamId : null
  });

  // Add technician to team members
  if (role === ROLES.TECHNICIAN) {
    await Team.findByIdAndUpdate(teamId, {
      $push: { members: user._id }
    });
  }

  return user;
};
