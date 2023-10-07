"use client";
import styles from "./about.module.css";
import React, { useState } from "react";
import Link from "next/link";
import type { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "../../redux/features/counterSlice";
import { Button } from "@/components/ui/button";
import axios from "axios";
import qs from "qs";

function ButtonAsChild({ ...props }) {
  return (
    <Button asChild variant="link">
      <Link href="/">{props.label}</Link>
    </Button>
  );
}

export default function Page() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <button className={styles.button} onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{count}</span>
        <button className={styles.button} onClick={() => dispatch(decrement())}>
          Decrement
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(2))}
        >
          Increment by 2
        </button>
      </div>
    </>
  );
}
