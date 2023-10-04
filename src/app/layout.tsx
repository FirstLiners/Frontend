import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthProvider";
import ThemeProvider from "./context/ThemeProvider";
import StoreProvider from "../redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hackaton Lenta",
  description: "Hackaton Lenta 2023, market dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <StoreProvider>
            <Navbar />
            <main className="flex justify-center items-start p-6 min-h-screen">
              {children}
            </main>
        </StoreProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
