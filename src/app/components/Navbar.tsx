"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../shared/lenta_logo.svg";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default function Navbar() {

  const { data: session } = useSession()
  const labelSign = session ?  "Выйти" : "Войти"
  const hrefSign = session ?  "/api/auth/signout" : "/api/auth/signin"
  return (
    <nav className="bg-[#003C96] pr-40 pl-40 flex h-[64px] justify-between">
      <ul className="flex text-white items-center h-[64px]">
      <div>
        <Image src={Logo} alt="Логотип" width={101} height={40} className="pt-[12px] pb-[12px]" />
      </div>
        <li className="ml-10 h-[64px] items-center flex">
          <Link href="/">Главная</Link>
        </li>
        <li className="ml-8 h-[64px] items-center flex">
          {/* dashboard/page.tsx */}
          <Link href="/dashboard">Данные по прогнозу</Link>
        </li>
        <li className="ml-8 h-[64px] items-center flex">
          {/* statistic/page.tsx */}
          <Link href="/statistic">Статистика</Link>
        </li>
      </ul>
      <ul className="flex text-white items-center ml-9 h-[64px]">
        <li className="h-[64px] items-center flex">
          {/* для этого линка нужно сделать кастомную страницу, сейчас ее нет. */}
          <Link href={hrefSign}>{labelSign}</Link>
        </li>
        </ul>
      <style jsx>{`
        li {
          /* Ваш стиль без рамки */
        }

        li:active,
        li:focus {
          border-bottom: 2px solid #FFB900; 
          color: #FFB900;
        }
      `}</style>
    </nav>
  );
}
