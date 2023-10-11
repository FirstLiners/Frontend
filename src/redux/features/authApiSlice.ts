"use client";
//@eslint-disable
//@ts-ignore
// роуты в приложеннии
import build from "next/dist/build";
import { apiSlice } from "../services/apiSlice";

interface User {
  email: string;
  first_name?: string;
  last_name?: string;
}

interface SocialAuthArgs {
  provider: string;
  state: string;
  code: string;
}

interface CreateUserResponse {
  success: boolean;
  user: User;
}

interface Token {
  access?: string;
  refresh?: string;
}

const authApiSlice = apiSlice.injectEndpoints({
  //@eslint-disable-next-line

  endpoints: (builder) => ({
    retrieveUser: builder.query<User, void>({
      query: () => "/users/me",
    }),
    socialAutenticate: builder.mutation<CreateUserResponse, SocialAuthArgs>({
      query: ({ provider, state, code }) => ({
        url: `/o/${provider}/?state=${encodeURIComponent(
          state,
        )}&code=${encodeURIComponent(code)}`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/users/token/",
        method: "POST",
        body: { email, password },
      }),
    }),
    register: builder.mutation({
      query: ({ email, password }) => ({
        url: "/jwt/create/",
        method: "POST",
        body: { email, password },
      }),
    }),

    verify: builder.mutation({
      query: () => ({
        url: "/users/token/verify/",
        method: "POST",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout/",
        method: "POST",
      }),
    }),

    activation: builder.mutation({
      query: ({ uid, token }) => ({
        url: "/users/activation",
        method: "POST",
        body: { uid, token },
      }),
    }),
  }),
});

export const {
  useRetrieveUserQuery,
  useSocialAutenticateMutation,
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useLogoutMutation,
  useActivationMutation,
} = authApiSlice;
