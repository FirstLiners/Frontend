import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import UserCard from "../components/UserCard";
import { redirect } from "next/navigation";
import UserNameCard from "../components/UserNameCard";

export default async function DasboardPage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
    
  }

  return (
    <section className="flex flex-col gap-6 " >
      <UserNameCard user={session?.user} pagetype={"Dashbord"} />
    </section>
  );
}
