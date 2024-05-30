import mongoose, {Schema} from "mongoose";
import {Cocktail} from "../type";

const CocktailSchema = new Schema<Cocktail>({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String || null,
  recipe: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
  ingredients: {
    type: [],
    required: true,
  },
}, {
  versionKey: false,
});

const Cocktail = mongoose.model("Cocktail", CocktailSchema);
export default Cocktail;