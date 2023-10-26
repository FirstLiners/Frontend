"use client";
// import { options } from "./api/auth/[...nextauth]/options";
import styles from "./page.module.css";
// import Sceleton from "./components/Sceleton/Sceleton";
import React, { useEffect, useState } from "react";
import MainPage from "@/components/MainPage/MainPage";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
// import useStorage from "@/hooks/use-storage";
import useStorage from "@rehooks/local-storage";

type Token = {
  access?: string;
  refresh?: string;
};

export default function Home() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [storagetoken] = useStorage("token");
  const authState = useAppSelector((state) => state.auth);
  const token = authState.token ? (authState.token as unknown as Token) : (storagetoken as unknown as Token);

  const { push, replace, refresh } = useRouter();
  // TODO заменить на token из редакса
  useEffect(() => {
    console.log("token /", token);
    console.log("backend", process.env.NEXT_PUBLIC_BACKEND);

    typeof window !== "undefined" && !isAuthenticated && !token?.access && push("/login");
  }, [token, push, isAuthenticated, replace]);

  return (
    <>
      <MainPage />
    </>
  );
}
