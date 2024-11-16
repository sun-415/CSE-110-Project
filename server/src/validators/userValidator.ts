import { body } from "express-validator";

const validateId = body("_id")
  .isString()
  .withMessage("_id must be a string")
  .isLength({ min: 1 })
  .withMessage("_id is required");

const validateEmail = body("email")
  .isEmail()
  .withMessage("Email must be a valid email address")
  .notEmpty()
  .withMessage("Email is required");

const validateName = body("name")
  .isString()
  .withMessage("Name must be a string")
  .isLength({ min: 2 })
  .withMessage("Name must be at least 2 characters")
  .notEmpty()
  .withMessage("Name is required");

const validateTargetSleepTime = body("targetSleepTime")
  .isNumeric()
  .withMessage("Target sleep time must be a number")
  .notEmpty()
  .withMessage("Target sleep time is required");

const validateScore = body("Score")
  .isNumeric()
  .withMessage("Score time must be a number")
  .optional();

export const createUserValidator = [
  validateId,
  validateEmail,
  validateName,
  validateTargetSleepTime,
  validateScore,
];

export const updateUserValidator = [
  validateName.optional(),
  validateTargetSleepTime.optional(),
  validateScore,
];
