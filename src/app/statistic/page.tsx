"use client";
// Remember you must use an AuthProvider for
// client components to useSession
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import UserNameCard from "../components/UserNameCard";

export default function StatisticPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/statistic");
    },
  });

  return (
    <main className="flex justify-center items-start p-6 min-h-screen">
      <section className="flex flex-col gap-6">
        <UserNameCard user={session?.user} pagetype={"Statistic"} />
      </section>
    </main>
  );
}
