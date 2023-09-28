import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import UserNameCard from "./components/UserNameCard";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <>
      {session ? (
        // если залогинен, то карточка с юзер
        <UserNameCard user={session?.user} pagetype={"Home"} />
      ) : (
        // если нет то показываем
        <h1 className="text-5xl">Залогиньтесь!</h1>
      )}
    </>
  );
}
