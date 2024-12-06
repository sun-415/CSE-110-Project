import QuestionnaireResponse from "../models/QuestionnaireResponse";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import validationErrorParser from "../utils/validationErrorParser";

// @desc Get all questionnaire responses
// @route GET /api/questionnaireResponses
// @access Private
export const getAllResponses = asyncHandler(async (req, res, next) => {
  const responses = await QuestionnaireResponse.find().lean().exec();

  if (!responses.length) {
    return next(createHttpError(404, "No questionnaire responses found."));
  }

  res.json(responses);
});

// @desc Create a new questionnaire response
// @route POST /api/questionnaireResponses
// @access Private
export const createResponse = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createHttpError(400, validationErrorParser(errors)));
  }

  const { userId, date, responses } = req.body;

  // Check if a response for the same day already exists
  const existingResponse = await QuestionnaireResponse.findOne({
    userId,
    date,
  })
    .lean()
    .exec();

  if (existingResponse) {
    return next(
      createHttpError(
        409,
        "Questionnaire response with this date already exists for this user."
      )
    );
  }

  const newResponse = new QuestionnaireResponse({
    userId,
    date,
    responses,
  });

  try {
    const savedResponse = await newResponse.save();
    res.status(201).json(savedResponse);
  } catch (error) {
    next(error);
  }
});

// @desc Get a questionnaire response by ID
// @route GET /api/questionnaireResponses/:id
// @access Private
export const getResponseById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const response = await QuestionnaireResponse.findById(id).lean().exec();

  if (!response) {
    return next(createHttpError(404, "Questionnaire response not found."));
  }

  res.json(response);
});

// @desc Update a questionnaire response
// @route PATCH /api/questionnaireResponses/:id
// @access Private
export const updateResponse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(createHttpError(400, validationErrorParser(errors)));
  }

  const { date, responses } = req.body;

  if (!date && !responses) {
    return next(
      createHttpError(400, "At least one field is required: date or responses.")
    );
  }

  const response = await QuestionnaireResponse.findById(id);
  if (!response) {
    return next(createHttpError(404, "Questionnaire response not found."));
  }

  if (date) {
    response.date = date;
  }

  if (responses) {
    response.responses = responses;
  }

  try {
    const updatedResponse = await response.save();
    res.json(updatedResponse);
  } catch (error) {
    next(error);
  }
});

// @desc Delete a questionnaire response
// @route DELETE /api/questionnaireResponses/:id
// @access Private
export const deleteResponse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const response = await QuestionnaireResponse.findById(id);

  if (!response) {
    return next(createHttpError(404, "Questionnaire response not found."));
  }

  try {
    await response.deleteOne();
    res
      .status(200)
      .json({ message: "Questionnaire response deleted successfully." });
  } catch (error) {
    next(error);
  }
});

// @desc Get questionnaire responses by user ID
// @route GET /api/questionnaireResponses/user/:userId
// @access Private
export const getResponsesByUserId = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  const responses = await QuestionnaireResponse.find({ userId }).lean().exec();

  if (!responses || responses.length === 0) {
    return next(
      createHttpError(
        404,
        `No questionnaire responses found for user ${userId}.`
      )
    );
  }

  const dateToId: Record<string, string> = {};
  responses.forEach((response) => {
    dateToId[response.date] = response._id.toString();
  });

  res.json(dateToId);
});
