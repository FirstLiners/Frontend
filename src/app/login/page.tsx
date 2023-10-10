"use client";
// эту страничку набираю в браузере ручками localhost:3000/trylogin это заготовка для /login
// здесь получаю токен и сохраняю его в локалсторадже хотя лучше бы сразу в сторе, но пока не
// написан getTokenSlice.tsx потому что вроде этот же функционал есть в authApiSlice.tsx это чисто списал
// с доки RTK Query и его пробую использовать параллелльно - useLoginMutation, и по отдельности резутаты не очень
// данные тяну в Sceleton.tsx который вызывается как лоадер даты с главной страницы.

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "../../redux/features/authApiSlice";
import { setAuth, finishInitialLoad } from "../../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Eye, EyeOff } from "react-feather";
import Image from "next/image";
import Logo from "../shared/lenta_logo.svg";
import useStorage from "../hook";

const Login = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const router = useRouter();

  interface Token {
    access?: string;
    refresh?: string;
  }

  const [passwordError, setPasswordError] = React.useState(""); // Состояние для ошибки пароля

  const [login, { isLoading, error }] = useLoginMutation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("with : ", email, password);

    login({ email, password })
      .unwrap()
      .then(({ access }) => {
        console.log("access_token", access);
        //   localStorage.setItem("access_token", JSON.stringify(access));
        setAccessToken(access);
        dispatch(setAuth());
        dispatch(finishInitialLoad());
        if (typeof window !== "undefined") {
          router.push("/");
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          setPasswordError("Неверный пароль или логин");
        } else {
          // Обработка других возможных ошибок
        }
      });
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const errstyle = "flex rounded-lg flex-colum border-[#EF4545]";
  const okstyle = "w-[340px] h-[56px] text-[16px]";
  if (isAuthenticated) {
    router.replace("/");
  }

  return (
    <main
      className={`p-0 flex justify-center flex-col items-center w-screen h-screen bg-[#003C96]`}
    >
      <div>
        <Image src={Logo} alt="Логотип" width={453} height={180} />
      </div>
      <h1 className="text-white text-[32px] max-w-[557px] text-center pb-[20px]">
        Инструмент прогноза по товарам собственного производства
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex-col flex justify-center w-[560px] h-[486px] bg-white rounded-[20px]"
        autoComplete="off"
      >
        <h1 className="text-black text-[24px] text-center pb-[40px]">
          Вход в учетную запись
        </h1>
        <div className="mx-auto pb-4">
          <h2 className="pb-2">Введите свой логин</h2>
          <input
            type="email"
            value={email}
            placeholder="prostome2@prosto.me"
            onChange={(e) => setEmail(e.target.value || "prostome2@prosto.me")}
            className="w-[340px] border pl-2 text-[16px] h-[56px] rounded-lg"
          />
        </div>
        <div className="mx-auto w-[340px] pb-4">
          {!error && <h2 className="pb-2">Введите свой пароль</h2>}
          {error && (
            <h2 className="pb-2 border-[#EF4545] text-[#EF4545]">
              Неверный пароль
            </h2>
          )}
          <div
            className={`flex rounded-lg flex-column border  ${
              passwordError ? errstyle : okstyle
            }`}
          >
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value || "")}
              className="w-[316px] h-[56px] text-[16px] ml-2"
            />
            <div
              className="my-auto cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </div>
          </div>
        </div>

        <div className="mx-auto">
          <button
            type="submit"
            disabled={isLoading}
            className="w-[340px] h-[56px] text-white rounded-lg bg-[#003C96]"
          >
            {isLoading ? "Вход..." : "Войти"}
          </button>
          <p className="text-[12px] text-gray-400">
            Забыли пароль или логин? Обратитесь к администратору
          </p>
        </div>
      </form>
    </main>
  );
};

export default Login;
