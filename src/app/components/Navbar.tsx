import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

export default function Navbar() {
  return (
    <nav className="bg-gray-300 p-4">

      <ul className="flex justify-evenly text-2xl font-bold">
        <li>
          <Link href="/">Главная</Link>
        </li>
        <li>
          {/* для этого линка нужно сделать кастомную страницу, сейчас ее нет. */}
          <Link href="/api/auth/signin">Sign In</Link>
        </li>
        <li>
          {/* для этого линка нужно сделать кастомную страницу, сейчас ее нет. */}
          <Link href="/api/auth/signout">Sign Out</Link>
        </li>
        <li>
          {/* dashboard/page.tsx */}
          <Link href="/dashboard">Прогноз</Link>
        </li>
        <li>
          {/* statistic/page.tsx */}
          <Link href="/statistic">Статистика</Link>
        </li>
        <li>
          {/* about/page.tsx */}
          <Link href="/about">О проекте</Link>
        </li>
        <ThemeSwitch />
      </ul>

    </nav>

  );
}
