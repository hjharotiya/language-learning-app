import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState: StateType = {
  loading: false,
  words: [],
  result: [],
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    getWordsRequest: (state) => {
      state.loading = true;
    },
    getWordsSuccess: (state, action: PayloadAction<WordType[]>) => {
      state.loading = false;
      state.words = action.payload;
    },
    getWordsFail: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
    saveResult: (state, action: PayloadAction<string[]>) => {
      state.loading = false;
      state.result = action.payload;
    },
    ClearState: (state) => {
      (state.loading = false),
        (state.result = []),
        (state.words = []),
        (state.error = undefined);
    },
  },
});

export const {
  getWordsFail,
  getWordsSuccess,
  getWordsRequest,
  saveResult,
  ClearState,
} = rootSlice.actions;

export default rootSlice.reducer;
