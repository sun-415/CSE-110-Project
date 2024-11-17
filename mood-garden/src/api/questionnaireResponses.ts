import {
  QuestionnaireResponse,
  QuestionnaireResponseJSON,
  CreateQuestionnaireResponseRequest,
  UpdateQuestionnaireResponseRequest,
} from "../types/QuestionnaireResponse";
import { APIResult, get, del, patch, post, handleAPIError } from "./requests";

/**
 * Converts a QuestionnaireResponse from JSON that only contains primitive types
 * to our custom QuestionnaireResponse interface.
 *
 * @param response The JSON representation of the questionnaire response
 * @returns The parsed QuestionnaireResponse object
 */
function parseQuestionnaireResponse(
  response: QuestionnaireResponseJSON
): QuestionnaireResponse {
  return {
    _id: response._id,
    userId: response.userId,
    date: new Date(response.date),
    responses: response.responses,
  };
}

/**
 * Fetch all questionnaire responses from the backend.
 *
 * @returns A list of questionnaire responses
 */
export async function getQuestionnaireResponses(): Promise<
  APIResult<QuestionnaireResponse[]>
> {
  try {
    const response = await get("/api/questionnaireResponses");
    const json = (await response.json()) as QuestionnaireResponseJSON[];
    const responses = json.map(parseQuestionnaireResponse);
    return { success: true, data: responses };
  } catch (error) {
    return handleAPIError(error);
  }
}

/**
 * Fetch a single questionnaire response by ID from the backend.
 *
 * @param id The ID of the questionnaire response to fetch
 * @returns The questionnaire response object
 */
export async function getQuestionnaireResponseById(
  id: string
): Promise<APIResult<QuestionnaireResponse>> {
  try {
    const response = await get(`/api/questionnaireResponses/${id}`);
    const json = (await response.json()) as QuestionnaireResponseJSON;
    return { success: true, data: parseQuestionnaireResponse(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}

/**
 * Fetch a mapping from the date a questionnaire was filled to the id of the questionnaire response
 *
 * @param userId The user ID to filter questionnaire responses
 * @returns A list of questionnaire responses
 */
export async function getQuestionnaireResponsesByUserId(
  userId: string
): Promise<APIResult<Record<string, string>>> {
  try {
    const response = await get(`/api/questionnaireResponses/user/${userId}`);
    const json = (await response.json()) as Record<string, string>;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

/**
 * Create a new questionnaire response.
 *
 * @param response The data for the new questionnaire response
 * @returns The created questionnaire response object
 */
export async function createQuestionnaireResponse(
  response: CreateQuestionnaireResponseRequest
): Promise<APIResult<QuestionnaireResponse>> {
  try {
    const res = await post("/api/questionnaireResponses", response);
    const json = (await res.json()) as QuestionnaireResponseJSON;
    return { success: true, data: parseQuestionnaireResponse(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}

/**
 * Update an existing questionnaire response.
 *
 * @param id The ID of the questionnaire response to update
 * @param response The data to update in the questionnaire response
 * @returns The updated questionnaire response object
 */
export async function updateQuestionnaireResponse(
  id: string,
  response: UpdateQuestionnaireResponseRequest
): Promise<APIResult<QuestionnaireResponse>> {
  try {
    const res = await patch(`/api/questionnaireResponses/${id}`, response);
    const json = (await res.json()) as QuestionnaireResponseJSON;
    return { success: true, data: parseQuestionnaireResponse(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}

/**
 * Delete a questionnaire response.
 *
 * @param id The ID of the questionnaire response to delete
 * @returns A success message or error
 */
export async function deleteQuestionnaireResponse(
  id: string
): Promise<APIResult<null>> {
  try {
    await del(`/api/questionnaireResponses/${id}`);
    return { success: true, data: null };
  } catch (error) {
    return handleAPIError(error);
  }
}
