"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useLoginMutation } from "@/src/redux/features/authApiSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function useLogin() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
      // [event.target.name]: event.target.value,
    });
  };
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    login({ email, password })
      .unwrap()
      .then(() => {
        router.push("/");
      })

      .catch(() => {
        console.log("some fails");
      });
  };
  return {
    email,
    password,
    isLoading,
    onChange,
    onSubmit,
  };
}
