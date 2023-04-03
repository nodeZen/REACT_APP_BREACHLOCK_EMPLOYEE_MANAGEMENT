import { configureStore } from '@reduxjs/toolkit'
import app from "./store/app.slice";
export const store = configureStore({
  reducer: {
    app,
  },
});