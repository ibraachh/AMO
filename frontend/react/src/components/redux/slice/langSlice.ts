import i18n from "../../../lib/i18n/config";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  lang: string;
}

const initialState: CounterState = {
  lang: localStorage.getItem("i18nextLng") || i18n.language,
};

export const langSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    changeLang: (state, action: PayloadAction<any>) => {
      state.lang = action.payload;
      i18n.changeLanguage(action.payload);
      localStorage.setItem("i18nextLng", action.payload); // 🧠 yadda saxla
    },
  },
});

export const { changeLang } = langSlice.actions;

export default langSlice.reducer;
