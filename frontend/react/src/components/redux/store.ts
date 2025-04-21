import { configureStore } from "@reduxjs/toolkit";
import { langSlice } from "./slice/langSlice";

export const store = configureStore({
  reducer: {
    langSlice: langSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
