"use client";
// this page clear isAuthenticatd state in store and say goodbye to user
import React, { use, useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { logout as SetLogout } from "@/redux/features/authSlice";

const Page: React.FC = () => {
  const dispatch = useAppDispatch();
  // in useEffect
  useEffect(() => {
    // clear token
    localStorage.removeItem("access_token");
    dispatch(SetLogout());
  }, []);

  return (
    <div
      className={`p-0 flex justify-center  items-center w-screen h-screen bg-[#003C96]`}
    >
      <h1 className="text-white">bye...</h1>
    </div>
  );
};

export default Page;
