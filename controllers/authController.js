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

  await User.create({ name, email, password })
    .then((user) => {
      const token = user.createJWT();
      res.status(StatusCodes.CREATED).json({
        user: {
          email: user.email,
          lastName: user.lastName,
          location: user.location,
          name: user.name,
        },
        token,
      });
    })
    .catch((error) => {
      next(error);
    });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new BadRequestError("Please provide all values"));
    return;
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    next(new UnAuthenticatedError("Invalid Credentials"));
    return;
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    next(new UnAuthenticatedError("Invalid Credentials"));
    return;
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const updateUser = async (req, res, next) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    next(new BadRequestError("Please provide all values"));
    return;
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  // various setups
  // in this case only id
  // if other properties included, must re-generate

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};

export { register, login, updateUser };
