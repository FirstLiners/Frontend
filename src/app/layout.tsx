import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthProvider";
import ThemeProvider from "./context/ThemeProvider";
import StoreProvider from "../redux/provider";
import type { Metadata } from "next";
import localFont from "next/font/local";

const myFont = localFont({
  src: [
    {
      path: "../fonts/Gilroy-Regular.woff2",
      style: "normal",
      weight: "600",
    },
  ],
});

export const metadata: Metadata = {
  title: "Hackaton Lenta",
  description: "Hackaton Lenta 2023, market sales ml prognosis dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={myFont.className}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <StoreProvider>
              <Navbar />
              <main className="flex justify-center items-start py-0 min-h-screen h-full w-full">
                {children}
              </main>
            </StoreProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
