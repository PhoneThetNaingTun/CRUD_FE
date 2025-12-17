import { AuthSliceState, User } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthSliceState = { token: undefined, user: null };

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    removeUser: (state, action: PayloadAction<null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | undefined>) => {
      state.token = action.payload;
    },
  },
});

export const { setUser, removeUser, setToken } = AuthSlice.actions;
export default AuthSlice.reducer;
