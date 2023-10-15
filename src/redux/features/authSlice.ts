import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TokenPayload {
  access?: string;
  refresh?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  token?: TokenPayload;
}

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  token: {
    access: "",
    refresh: "",
  },
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuthenticated = true;
    },

    setToken: (state, action: PayloadAction<TokenPayload>) => {
      if (action) {
        const { access, refresh } = action.payload;
        state.token = {
          access,
          refresh,
        };
      }
    },
    clearToken: (state) => {
      state.token = {
        access: "",
        refresh: "",
      };
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    finishInitialLoad: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setAuth, logout, setToken, finishInitialLoad } =
  authSlice.actions;
export default authSlice.reducer;
