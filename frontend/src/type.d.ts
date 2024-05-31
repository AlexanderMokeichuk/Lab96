export interface RegisterMutation {
  email: string;
  password: string;
  avatar: File | null;
  displayName: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}
export interface User {
  _id: string;
  email: string;
  token: string;
  role: string,
  avatar: string | null,
  displayName: string,
  googleID: string | null;
}

export interface RegisterResponse {
  user: User;
  massage: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface CocktailInForm {
  name: string;
  image: File | null;
  recipe: string;
}

export interface Ingredient {
  id: string,
  name: string;
  quantity: string;
}

export interface FullCocktailForm extends CocktailInForm{
  ingredients: Ingredient[];
}

export interface Cocktail {
  userID: Types.ObjectId;
  name: string;
  image: string | null;
  recipe: string;
  isPublished: boolean;
  ingredients: Ingredient[];
}
export interface CocktailApi extends Cocktail{
  _id: string,
}
