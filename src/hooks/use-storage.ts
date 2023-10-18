import { useState, useEffect } from "react";

export default function useStorage(key: string, type = "sessionStorage") {
  const [value, setValue] = useState<string | null>(null);

  // Initial fetch from storage
  useEffect(() => {
    const storage = type === "sessionStorage" ? sessionStorage : localStorage;
    setValue(storage.getItem(key));
  }, [key, type]);

  // Persist to storage
  useEffect(() => {
    // first render, don't override/destroy existing item value
    if (value !== null) {
      const storage = type === "sessionStorage" ? sessionStorage : localStorage;
      storage.setItem(key, value);
    }
  }, [key, value, type]);

  return [value, setValue];
}
