"use client";
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

  const [login, { isLoading, error }] = useLoginMutation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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

  React.useEffect(() => {
    !token
      ? handToken("prostome2@prosto.me", "222")
      : console.log("alredy token", token);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(email, password);
    // call function handToken with useEffect wrapper
    handToken(email, password);
  };

  React.useEffect(() => {
    // if token changed save it to localstorage
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
          {JSON.stringify(error, null, 2)}
        </p>
      )}
    </form>
  );
};
export default Login;
