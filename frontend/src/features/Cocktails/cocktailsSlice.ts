import {CocktailApi} from "../../type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchCocktails, fetchMyCocktails} from "./cocktailsThunks";

interface CocktailsSlice {
  cocktails: CocktailApi[];
  laudingCocktail: boolean;
}

const InitialState: CocktailsSlice = {
  cocktails: [],
  laudingCocktail: false,
};

const cocktailsSlice = createSlice({
  name: "cocktails",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCocktails.pending, (state) => {
      state.laudingCocktail = true;
    }).addCase(fetchCocktails.fulfilled, (state, {payload: cocktails}: PayloadAction<CocktailApi[]>) => {
      state.cocktails = cocktails;
      state.laudingCocktail = false;
    }).addCase(fetchCocktails.rejected, (state) => {
      state.laudingCocktail = false;
    });

    builder.addCase(fetchMyCocktails.pending, (state) => {
      state.laudingCocktail = true;
    }).addCase(fetchMyCocktails.fulfilled, (state, {payload: cocktails}: PayloadAction<CocktailApi[]>) => {
      state.cocktails = cocktails;
      state.laudingCocktail = false;
    }).addCase(fetchMyCocktails.rejected, (state) => {
      state.laudingCocktail = false;
    });
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;

export const selectCocktails = (state: RootState) => state.cocktails.cocktails;
export const selectCocktailsLauding = (state: RootState) => state.cocktails.laudingCocktail;
