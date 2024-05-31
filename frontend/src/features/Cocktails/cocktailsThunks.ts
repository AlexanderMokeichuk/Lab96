import {createAsyncThunk} from "@reduxjs/toolkit";
import {CocktailApi, FullCocktailForm} from "../../type";
import axiosApi from "../../axiosApi";

export const postCocktail = createAsyncThunk<void, FullCocktailForm>(
  "cocktails/post",
  async (cocktail) => {
    try {
      const formData = new FormData();
      formData.append('name', cocktail.name);
      if (cocktail.image) {
        formData.append('image', cocktail.image);
      }
      formData.append('recipe', cocktail.recipe);
      formData.append('ingredients', JSON.stringify(cocktail.ingredients));
      await axiosApi.post('/cocktails', formData);
    } catch (error) {
      console.log(error);
    }
  },
);

export const fetchCocktails = createAsyncThunk<CocktailApi[], undefined>(
  "cocktails/fetchCocktails",
  async () => {
    try {
      const {data: response} = await axiosApi.get<CocktailApi[]>("/cocktails");
      return response;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
);

export const fetchMyCocktails = createAsyncThunk<CocktailApi[], string>(
  "cocktails/fetchMyCocktails",
  async (userID) => {
    try {
      const {data: response} = await axiosApi.get<CocktailApi[]>(`/cocktails?user=${userID}`);
      return response;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
);

export const fetchCocktailById = createAsyncThunk<CocktailApi | null, string>(
  "cocktails/fetchCocktailsById",
  async (id) => {
    try {
      const {data: response} = await axiosApi.get(`/cocktails/${id}`);
      return response;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
);

export const editIsPublishCocktail = createAsyncThunk<void, string>(
  "cocktails/editCocktail",
  async (id) => {
    try {
      await axiosApi.patch(`/cocktails/${id}/togglePublished`);
    } catch (e) {
      console.log(e);
    }
  }
);

export const deleteCocktail = createAsyncThunk<void, string>(
  "cocktails/deleteCocktail",
  async (id) => {
    try {
      await axiosApi.delete(`/cocktails/${id}`);
    } catch (e) {
      console.log(e);
    }
  }
);