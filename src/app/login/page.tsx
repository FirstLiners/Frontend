"use client";

import { useLogin } from "@/src/hooks";
import LoginForm from "@/src/components/ui/forms/loginForm";
export default function Page() {
  const { email, password, isLoading, onChange, onSubmit } = useLogin();
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            signin
          </h2>
        </div>
        <LoginForm></LoginForm>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="mt-10 text-center text-sm text-gray-500">
            {" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            ></a>
          </p>
          u
        </div>
      </div>
    </>
  );
}
