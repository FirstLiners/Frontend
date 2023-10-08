"use client";
// import { options } from "./api/auth/[...nextauth]/options";
import styles from "./page.module.css";
import Sceleton from "./components/Sceleton/Sceleton";
import React, { useEffect, useState } from "react";
import NavButton from "./components/NavButton/Navbutton";
import MainPage from "@/app/components/MainPage/MainPage";
import { useAppSelector } from "@/redux/hooks";

export default function Home() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <>
      {isAuthenticated ? (
        // если залогинен, то показываем скелетон (где загружаются данные и устанавливаются в стор)
        <>
          <MainPage />
          {
            //"sales",  "stores", "forecasts" очень большой объем данных, поэтому ... не показываем
            ["skus"].map((element) => (
              <Sceleton key={element} apiEndpoint={element} />
            ))
          }
        </>
      ) : // if not logged in, show login button with link to login page
      !isAuthenticated ? (
        <>
          <main
            className={`p-0 flex justify-center  items-center w-screen h-screen bg-[#003C96] `}
          >
            <h1 className={` text-5xl text-white`}>
              <NavButton link="/login" label="" />
              Пользователь не авторизован
              {/* login button with nextjs navlink  */}
            </h1>
          </main>
        </>
      ) : (
        <h1></h1>
      )}
    </>
  );
}
