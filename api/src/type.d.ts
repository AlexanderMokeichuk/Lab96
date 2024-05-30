import {Model} from "mongoose";

export interface User {
  email: string,
  password: string,
  token: string,
  role: string,
  avatar: string | null,
  displayName: string,
  googleID: string | null;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>,
  generateToken(): void,
}

export type UserModel = Model<User, unknown, UserMethods>;