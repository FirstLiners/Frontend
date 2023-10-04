import { ReactNode } from "react";
import Link from "next/link";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-blue-100 to-white">
      <div className="w-96">
        <h1 className="text-4xl font-bold text-center">page title</h1>
        <div className="text-gray-400 text-sm text-center mt-5">
          Don&apos;t have an account?{" "}
          <Link legacyBehavior href="/register">
            <a className="text-blue-500 hover:underline">Sign Up</a>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
