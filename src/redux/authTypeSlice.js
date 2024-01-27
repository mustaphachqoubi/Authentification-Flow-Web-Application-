import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "signin",
}

export const authTypeSlice = createSlice({
  name: "authType",
  initialState,
  reducers: {
    setAuthType: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setAuthType } = authTypeSlice.actions
export default authTypeSlice.reducer
