import User from "../models/user.schema.js";
import AppError from "../utils/error.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const cookieOption = {
  maxAge: 2 * 24 * 60 * 60 * 1000,
  httpOnly: true,
};

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  // console.log(name, email, password);
  if (!(name, email, password)) {
    return next(new AppError("All field is required", 405));
  }
  try {
    const existsEmail = await User.findOne({ email });
    if (existsEmail) {
      return next(new AppError("Email alreday exists", 404));
    }
    const user = await User.create({ name, email, password });

    if (!user) {
      return next(new AppError("User not created,try again", 404));
    }

    await user.save();
    user.password = undefined;

    const token = await jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 2 * 24 * 60 * 60 * 1000,
      }
    );

    res.cookie("token", token, cookieOption);

    res.status(200).json({
      success: true,
      message: "User Registerd successfully",
      user,
    });
  } catch (e) {
    return next(new AppError(e.message, 404));
  }
};
//
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email, password)) {
      return next(new AppError("All feild is require", 405));
    }
    const user = await User.findOne({ email }).select("+password");

    if (user) {
      await bcrypt.compare(password, user.password);
    }

    const token = await jwt.sign(
      {
        id: user._id,
        // name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 2 * 24 * 60 * 60 * 1000,
      }
    );

    res.cookie("token", token, cookieOption);

    res.status(200).json({
      success: true,
      message: "User login successfully",
      user,
    });
  } catch (e) {
    return next(new AppError(e.message, 404));
  }
};
//
const authUser = (req, res, next) => {};

export { register, login, authUser };
