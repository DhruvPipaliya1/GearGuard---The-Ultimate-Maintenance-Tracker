import { loginService } from "./auth.service.js";

export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    const data = await loginService({ email, password, role });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data
    });
  } catch (error) {
    next(error);
  }
};
