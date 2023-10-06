"use client";
// Remember you must use an AuthProvider for
// client components to useSession

import { redirect } from "next/navigation";
import UserNameCard from "../components/UserNameCard";

export default function StatisticPage() {
  return (
    <main className="flex justify-center items-start p-6 min-h-screen">
      <section className="flex flex-col gap-6"></section>
    </main>
  );
}
