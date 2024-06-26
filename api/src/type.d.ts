import {Model} from "mongoose";
import Types = module;

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

export interface UserApi extends User {
  _id: Types.ObjectId;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
}

export interface Cocktail {
  userID: Types.ObjectId;
  name: string;
  image: string | null;
  recipe: string;
  isPublished: boolean;
  ingredients: Ingredient[];
}