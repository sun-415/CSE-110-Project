import { body } from "express-validator";

const validateId = body("id")
  .isString()
  .withMessage("id must be a string")
  .notEmpty()
  .withMessage("id is required");

const validateUserId = body("userId")
  .isString()
  .withMessage("userId must be a string")
  .notEmpty()
  .withMessage("userId is required");

const validateDate = body("date")
  .isISO8601()
  .withMessage("Date must be a valid ISO 8601 date string")
  .notEmpty()
  .withMessage("Date is required");

const validateResponses = body("responses")
  .isObject()
  .withMessage("Responses must be an object")
  .notEmpty()
  .withMessage("Responses are required");

export const createResponseValidator = [
  validateId,
  validateUserId,
  validateDate,
  validateResponses,
];

// Exported validators for updating a response
export const updateResponseValidator = [
  validateDate.optional(),
  validateResponses.optional(),
];
