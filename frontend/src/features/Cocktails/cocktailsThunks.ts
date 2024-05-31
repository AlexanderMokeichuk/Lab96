import {createAsyncThunk} from "@reduxjs/toolkit";
import {CocktailApi} from "../../type";
import axiosApi from "../../axiosApi";

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