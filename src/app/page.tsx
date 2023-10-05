import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

import MainPage from "@/app/components/MainPage/MainPage";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <>
      {session ? (
        // если залогинен, то карточка с юзер
        <MainPage/>
      ) : (
        // если нет то показываем
        <h1 className="text-5xl">Пользователь не авторизован</h1>
      )}
    </>
  );
}
