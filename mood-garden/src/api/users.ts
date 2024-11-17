import {
  CreateUserRequest,
  UpdateUserRequest,
  User,
  UserJSON,
} from "../types/User";
import { APIResult, get, del, patch, post, handleAPIError } from "./requests";

/**
 * Converts a User from JSON that only contains primitive types to our custom
 * User interface.
 *
 * @param user The JSON representation of the user
 * @returns The parsed User object
 */
function parseUser(user: UserJSON): User {
  return {
    _id: user._id,
    email: user.email,
    name: user.name,
    targetSleepTime: user.targetSleepTime,
    score: user.score,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
  };
}

/**
 * Fetch all users from the backend.
 *
 * @returns A list of users
 */
export async function getUsers(): Promise<APIResult<User[]>> {
  try {
    const response = await get("/api/users");
    const json = (await response.json()) as UserJSON[];
    const users = json.map(parseUser);
    return { success: true, data: users };
  } catch (error) {
    return handleAPIError(error);
  }
}

/**
 * Fetch a single user by ID from the backend.
 *
 * @param id The ID of the user to fetch
 * @returns The user object
 */
export async function getUserById(id: string): Promise<APIResult<User>> {
  try {
    const response = await get(`/api/users/${id}`);
    const json = (await response.json()) as UserJSON;
    return { success: true, data: parseUser(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function createUser(
  user: CreateUserRequest
): Promise<APIResult<User>> {
  try {
    const response = await post("/api/users", user);
    const json = (await response.json()) as UserJSON;
    return { success: true, data: parseUser(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function updateUser(
  id: string,
  user: UpdateUserRequest
): Promise<APIResult<User>> {
  try {
    const response = await patch(`/api/users/${id}`, user);
    const json = (await response.json()) as UserJSON;
    return { success: true, data: parseUser(json) };
  } catch (error) {
    return handleAPIError(error);
  }
}

/**
 * Delete a user from the backend.
 *
 * @param id The ID of the user to delete
 * @returns A success message or error
 */
export async function deleteUser(id: string): Promise<APIResult<null>> {
  try {
    await del(`/api/users/${id}`);
    return { success: true, data: null };
  } catch (error) {
    return handleAPIError(error);
  }
}
