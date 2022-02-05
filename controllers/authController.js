import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const register = async (req, res, next) => {
  // console.log(req.body);
  // note: server has express.json()
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    next(new BadRequestError("Please provide all values"));
    return;
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    next(new BadRequestError("Email already in use"));
    return;
  }

  const user = await User.create({ name, email, password })
    .then((user) => {
      res.status(StatusCodes.CREATED).json({
        user,
      });
    })
    .catch((error) => {
      next(error);
    });
};

const login = async (req, res) => {
  res.send("login user asdfafas");
};

const updateUser = async (req, res) => {
  res.send("update user");
};

export { register, login, updateUser };
