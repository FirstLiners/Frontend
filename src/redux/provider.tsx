"use client";

import { makeStore } from "./store";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export default function StoreProvider({ children }: Props) {
  return <Provider store={makeStore()}>{children}</Provider>;
}
