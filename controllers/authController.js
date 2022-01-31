import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const register = async (req, res, next) => {
  // note: server has express.json()
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new BadRequestError("please provide all values"));
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    return next(BadRequestError("Email already in use"));
  }

  const user = await User.create({ name, email, password });
  res.status(StatusCodes.CREATED).json({
    user,
  });
};

const login = async (req, res) => {
  res.send("login user");
};

const updateUser = async (req, res) => {
  res.send("update user");
};

export { register, login, updateUser };
