import { configureStore } from "@reduxjs/toolkit";
import { listReducerc } from "../reducers/listReducer";

export const store = configureStore({
  reducer: {
    lists: listReducerc,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
