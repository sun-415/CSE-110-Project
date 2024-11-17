export interface User {
  _id: string;
  email: string;
  name: string;
  targetSleepTime: number;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserJSON {
  _id: string;
  email: string;
  name: string;
  targetSleepTime: number;
  score: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  targetSleepTime: number;
  score: number;
}

export interface UpdateUserRequest {
  name?: string;
  targetSleepTime?: number;
  score?: number;
}
