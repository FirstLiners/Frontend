"use client";
// эту страничку набираю в браузере ручками localhost:3000/trylogin это заготовка для /login
// здесь получаю токен и сохраняю его в локалсторадже хотя лучше бы сразу в сторе, но пока не
// написан getTokenSlice.tsx потому что вроде этот же функционал есть в authApiSlice.tsx это чисто списал
// с доки RTK Query и его пробую использовать параллелльно - useLoginMutation, и по отдельности резутаты не очень
// данные тяну в Sceleton.tsx который вызывается как лоадер даты с главной страницы.

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "../../redux/features/authApiSlice";
import { finishInitialLoad, setAuth } from "../../redux/features/authSlice";
import { useAppDispatch } from "../../redux/hooks";

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  interface Token {
    access?: string;
    refresh?: string;
  }

  // так советуют делать в доке RTK Query
  const [login, { isLoading, error }] = useLoginMutation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("with : ", email, password);
    login({ email, password })
      .unwrap()
      .then(({ access }) => {
        dispatch(setAuth());
        console.log("access_token", access);
        //stringify and store in localstorage

        localStorage.setItem("access_token", JSON.stringify(access));
        dispatch(finishInitialLoad());
        if (typeof window !== "undefined") {
          router.push("/login");
        }
      });
  };

  return (
    <main
      className={`p-0 flex justify-center  items-center w-screen h-screen bg-[#003C96]`}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value || "prostome2@prosto.me")}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value || "222")}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log in"}
        </button>
        {error && (
          <p>
            {/* @ts-ignore */}
            {JSON.stringify(error, null, 2).concat("---------error---------")}
          </p>
        )}
      </form>
    </main>
  );
};
export default Login;
