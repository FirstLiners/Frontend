"use client";
// import { options } from "./api/auth/[...nextauth]/options";
import Sceleton from "./components/Sceleton/Sceleton";
import React, { useEffect, useState } from "react";
import NavButton from "./components/NavButton/Navbutton";
export default function Home() {
  // const session = await getServerSession(options);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  return (
    <>
      {accessToken ? (
        // если залогинен, то показываем скелетон (где загружаются данные и устанавливаются в стор)
        <>
          {["skus", "stores", "sales", "forecasts"].map((element) => (
            <Sceleton key={element} apiEndpoint={element} />
          ))}
        </>
      ) : // if not logged in, show login button with link to login page
      !accessToken ? (
        <>
          <h1 className="text-5xl">Залогиньтесь!</h1>
          {/* login button with nextjs navlink  */}
          <NavButton link="/trylogin" label="Войти" />
          Войти
        </>
      ) : (
        <h1></h1>
      )}
    </>
  );
}
