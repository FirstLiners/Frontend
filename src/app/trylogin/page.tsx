"use client";
// эту страничку набираю в браузере ручками localhost:3000/trylogin это заготовка для /login
// здесь получаю токен и сохраняю его в локалсторадже хотя лучше бы сразу в сторе, но пока не
// написан getTokenSlice.tsx потому что вроде этот же функционал есть в authApiSlice.tsx это чисто списал
// с доки RTK Query и его пробую использовать параллелльно - useLoginMutation, и по отдельности резутаты не очень
// данные тяну в Sceleton.tsx который вызывается как лоадер даты с главной страницы.

import React, { useEffect, useState } from "react";

import { useLoginMutation } from "../../redux/features/authApiSlice";
import axios from "axios";
import qs from "qs";

const Login = () => {
  interface Token {
    access?: string;
    refresh?: string;
  }

  const [token, setToken] = useState<Token | undefined>();
  // так советуют делать в доке RTK Query
  const [login, { isLoading, error }] = useLoginMutation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // моя функция которая делает запрос на получение токена и сохраняет его в стейт
  function handToken(email?: string | any, password?: string | any) {
    try {
      const data = {
        email: email || "prostome2@prosto.me",
        password: password || "222",
      };
      const config = {
        method: "POST",
        mode: "no-cors",
        //   refferer: "http://localhost:3000",
        maxBodyLength: Infinity,
        url: "http://127.0.0.1:8000/api/v1/users/token/",

        ContentType: "application/json",
        Accept: "application/vnd.api+json",

        headers: {},
        data: qs.stringify(data),
      };
      axios(config)
        .then((response) => {
          console.log(`access_token - ${response.status}`);
          return response.data;
        })
        .then((data) => {
          setToken(data.access);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    } finally {
      console.log(token);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("with : ", email, password);
    login({ email, password });
    handToken({ email, password });
  };

  React.useEffect(() => {
    !token ? console.log("no token") : console.log("alredy token", token);
  }, []);

  React.useEffect(() => {
    //  token changed -> save it to localstorage
    console.log("token changed", token);
    localStorage.setItem("access_token", JSON.stringify(token));
  }, [token]);

  return (
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
  );
};
export default Login;
