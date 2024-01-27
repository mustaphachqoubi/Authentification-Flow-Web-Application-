import { configureStore } from '@reduxjs/toolkit'
import authTypeReducer from "./redux/authTypeSlice"

export const store = configureStore({
  reducer: {
    authType: authTypeReducer,
  },
})
