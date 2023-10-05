import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import UserNameCard from "./components/UserNameCard";
import Sceleton from "./components/Sceleton/Sceleton"; 

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <>
      {session ? (
        // если залогинен, то карточка с юзер
        <Sceleton />
      ) : (
        // если нет то показываем
        <h1 className="text-5xl">Залогиньтесь!</h1>
      )}
    </>
  );
}
