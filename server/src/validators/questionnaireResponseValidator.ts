import { body } from "express-validator";

const validateUserId = body("userId")
  .isString()
  .withMessage("userId must be a string")
  .notEmpty()
  .withMessage("userId is required");

const validateDate = body("date")
  .isISO8601()
  .withMessage("Date must be a valid date")
  .notEmpty()
  .withMessage("Date is required");

const validateResponses = body("responses")
  .isArray()
  .withMessage("Responses must be an array")
  .notEmpty()
  .withMessage("Responses are required");

export const createResponseValidator = [
  validateUserId,
  validateDate,
  validateResponses,
];

// Exported validators for updating a response
export const updateResponseValidator = [
  validateDate.optional(),
  validateResponses.optional(),
];
