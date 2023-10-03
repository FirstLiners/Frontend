"use client"
import Link from "next/link";
import Image from "next/image";
import Logo from "../shared/lenta_logo.svg";

export default function Navbar() {
  return (
    <nav className="bg-[#003C96] pr-4 pl-36 flex h-[64px]">
      <div>
        <Image src={Logo} alt="Логотип" width={101} height={40} className="pt-[12px] pb-[12px]" />
      </div>
      <ul className="flex text-white items-center ml-9 h-[64px]">
        <li className="h-[64px] items-center flex">
          <Link href="/">Главная</Link>
        </li>
        <li className="ml-5 h-[64px] items-center flex">
          {/* dashboard/page.tsx */}
          <Link href="/dashboard">Прогноз</Link>
        </li>
        <li className="ml-5 h-[64px] items-center flex">
          {/* statistic/page.tsx */}
          <Link href="/statistic">Статистика</Link>
        </li>
        <li className="ml-5 h-[64px] items-center flex">
          {/* для этого линка нужно сделать кастомную страницу, сейчас ее нет. */}
          <Link href="/api/auth/signin">Sign In</Link>
        </li>
        <li className="ml-5 h-[64px] items-center flex">
          {/* для этого линка нужно сделать кастомную страницу, сейчас ее нет. */}
          <Link href="/api/auth/signout">Sign Out</Link>
        </li>
        <li className="ml-5 h-[64px] items-center flex">
          {/* about/page.tsx */}
          <Link href="/about">О проекте</Link>
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
