import User from "../models/User";
import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";

// @desc Get all users
// @route GET /api/users
// @access Private
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().lean().exec();

  if (!users.length) {
    return next(createHttpError(404, "No users found."));
  }

  res.json(users);
});

// @desc Create new user
// @route POST /api/users
// @access Private
export const createUser = asyncHandler(async (req, res, next) => {
  const { id, email, name, targetSleepTime } = req.body;

  const existingUser = await User.findOne({ $or: [{ email }, { id }] })
    .lean()
    .exec();
  if (existingUser) {
    return next(
      createHttpError(409, "User with this email or ID already exists.")
    );
  }

  const newUser = new User({ _id: id, email, name, targetSleepTime });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private
export const getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id).lean().exec();

  if (!user) {
    return next(createHttpError(404, "User not found."));
  }

  res.json(user);
});

// @desc Update a user
// @route PATCH /api/users/:id
// @access Private
export const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, targetSleepTime, score } = req.body;

  if (!name && targetSleepTime === undefined) {
    return next(
      createHttpError(
        400,
        "At least one field is required: name or targetSleepTime."
      )
    );
  }

  const user = await User.findById(id);
  if (!user) {
    return next(createHttpError(404, "User not found."));
  }

  if (name) {
    user.name = name;
  }

  if (targetSleepTime !== undefined) {
    user.targetSleepTime = targetSleepTime;
  }

  if (score !== undefined) {
    user.score = score;
  }

  try {
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// @desc Delete a user
// @route DELETE /api/users/:id
// @access Private
export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(createHttpError(404, "User not found."));
  }

  try {
    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    next(error);
  }
});
