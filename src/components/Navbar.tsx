"use client";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/shared/lenta_logo.svg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout as SetLogout } from "@/redux/features/authSlice";
import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLogoutMutation } from "@/redux/features/authApiSlice";

export default function Navbar() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { token } = useAppSelector((state) => state.auth);

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const linkRef1 = useRef<HTMLAnchorElement>(null);
  function doClick1() {
    if (linkRef1.current && typeof window !== "undefined") {
      linkRef1.current.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  }

  const linkRef2 = useRef<HTMLAnchorElement>(null);
  function doClick2() {
    if (linkRef2.current && typeof window !== "undefined") {
      linkRef2.current.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  }

  useEffect(() => {
    // fire doClick() after a second
    /*  console.log("doClick1");
    pathname == "/" &&
      setTimeout(() => {
        doClick2();
      }, 1000);

    console.log("doClick2");
    pathname == "/dashboard" &&
      setTimeout(() => {
        doClick2();
      }, 2000); */
  }, [pathname]);

  const labelSign = isAuthenticated ? "Выйти" : "Войти";
  const hrefSign = isAuthenticated ? "/logout" : "/login";
  useEffect(() => {
    // ошибка?
    // !isAuthenticated && localStorage.removeItem("access_token");
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated && (
        <nav className="bg-[#003C96] pr-40 pl-40 flex h-[64px] justify-between">
          <ul className="flex text-white items-center h-[64px]">
            <div>
              <Image src={Logo} alt="Логотип" width={101} className="pt-[12px] pb-[12px] h-auto" />
            </div>

            <li className="ml-10 h-[64px] items-center flex">
              {isAuthenticated && (
                <Link className={pathname == "/" ? styles.active_link : ""} href="/" ref={linkRef2}>
                  Главная
                </Link>
              )}
            </li>

            <li className="ml-8 h-[64px] items-center flex">
              {/* dashboard/page.tsx */}
              {isAuthenticated && (
                <Link className={pathname == "/dashboard" ? styles.active_link : ""} href="/dashboard" ref={linkRef1}>
                  Данные по прогнозу
                </Link>
              )}
            </li>
            <li className="ml-8 h-[64px] items-center flex">
              {/* statistic/page.tsx */}
              {isAuthenticated && (
                <Link className={pathname == "/statistic" ? styles.active_link : ""} href="/statistic">
                  Статистика
                </Link>
              )}
            </li>
          </ul>
          <ul className="flex text-white items-center ml-9 h-[64px]">
            {isAuthenticated && (
              <li className="h-[64px] items-center flex">
                {/* для этого линка нужно сделать кастомную страницу, сейчас ее нет. */}

                <Link href={hrefSign}>{labelSign}</Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  );
}
