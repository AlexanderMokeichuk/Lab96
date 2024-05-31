import express, {Router} from "express";
import auth from "../middleware/auth";
import {clearImages, imagesUpload} from "../multer";
import mongoose from "mongoose";
import Cocktail from "../models/ Cocktail";
import permit from "../middleware/permit";

const cocktailsRouter = express.Router();

cocktailsRouter.post(
  "/",
  auth,
  imagesUpload.single("image"),
  async (req, res, next) => {
    try {
      const whiteList = {
        userID: req.body.userID,
        name: req.body.name,
        image: req.file ? req.file.filename : null,
        recipe: req.body.recipe,
        ingredients: req.body.ingredients,
      };

      const cocktail = new Cocktail(whiteList);
      await cocktail.save();

      return res.send(cocktail);
    } catch (e) {
      if (req.file) {
        clearImages(req.file.filename);
      }
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }
      next(e);
    }
  });

cocktailsRouter.get("/", async (req, res, next) => {
  const query = req.query.user as string;
  try {
    if (query) {
      if (!mongoose.Types.ObjectId.isValid(query)) {
        return res.status(422).send({error: "Not found User!!"});
      }
      const cocktailsById = await Cocktail.find({userID: query}).
      select('userID name image isPublished');

      return res.send(cocktailsById);
    }

    const cocktails: Cocktail[] = await Cocktail.find().
    select('userID name image isPublished');

    return res.send(cocktails);
  } catch (e) {
    next(e);
  }
});

cocktailsRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const cocktailById: Cocktail | null = await Cocktail.findById({_id: id});
    if (cocktailById) {
      return res.send(cocktailById);
    } else {
      return res.status(422).send({error: "Cocktail not found!"});
    }
  } catch (e) {
    next(e);
  }
});

cocktailsRouter.patch("/:id/togglePublished", auth, permit(["admin"]), async (req, res, next) => {
  const {id} = req.params;

  try {
    const cocktail = await Cocktail.findById({_id: id});

    if (!cocktail) return res.status(400).send({error: "Not found Cocktail!"});

    cocktail.isPublished = !cocktail.isPublished;
    await cocktail.save();
    return res.send(cocktail);
  } catch (e) {
    next(e);
  }
});

cocktailsRouter.delete("/:id", auth, permit(["admin"]), async (req, res, next) => {
  const id = req.params.id;
  try {

    const cocktail = await Cocktail.findOne({_id: id});
    if (!cocktail) {
      return res.status(404).send({error: "Not found Cocktail!"});
    }

    await Cocktail.findOneAndDelete({_id: id});
    return res.send({message: "Deleted!", id: id});
  } catch (e) {
    next();
  }
});

export default cocktailsRouter;