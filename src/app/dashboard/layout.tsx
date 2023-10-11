import { Inter } from "next/font/google";

import { IconX as XMarkIcon } from "@tabler/icons-react";

// layout for dashboard page tailwindcss, white bg
// Пока не сделал - будет ошибка https://nextjs.org/docs/messages/module-not-found
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
      {/*  футер баннер для дашборда */}
    </section>
  );
}
