// src/state/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api"; // Assuming you use RTK Query

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
