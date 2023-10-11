"use client";
// import { options } from "./api/auth/[...nextauth]/options";
import styles from "./page.module.css";
import Sceleton from "./components/Sceleton/Sceleton";
import React, { useEffect, useState } from "react";
import NavButton from "./components/NavButton/Navbutton";
import MainPage from "@/app/components/MainPage/MainPage";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import useStorage from "./hook";

export default function Home() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  // const isLocalStorage = localStorage.getItem("access_token") !== "" && localStorage.getItem("access_token") !== null && localStorage.getItem("access_token") !== undefined;
  const [myValue] = useStorage("access_token");
  const isLocalStorage =
    myValue !== "" && myValue !== null && myValue !== undefined;

  const { push } = useRouter();

  useEffect(() => {
    !isLocalStorage && !isAuthenticated && push("/login");
  }, [isLocalStorage, push]);

  return (
    <>
      {isAuthenticated ? (
        // если залогинен, то показываем скелетон (где загружаются данные и устанавливаются в стор)
        <>
          {
            //"sales",  "stores", "forecasts" очень большой объем данных, поэтому ... не показываем
            ["skus"].map((element) => (
              <Sceleton key={element} apiEndpoint={element} />
            ))
          }
          <MainPage />
        </>
      ) : // if not logged in, show login button with link to login page
      !isAuthenticated ? (
        <>
          <main
            className={`p-0 flex justify-center  items-center w-screen h-screen bg-[#003C96] `}
          ></main>
        </>
      ) : (
        <h1></h1>
      )}
    </>
  );
}
