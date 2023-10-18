"use client";
import { useTheme } from "next-themes";
import { IconSun, IconMoon } from "@tabler/icons-react";

const ThemeSwitch: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isActive = theme === "light";

  const switchClasses = `flex items-center justify-center w-6 h-6 text-dark bg-white rounded-full transform ${
    isActive ? "translate-x-0" : "translate-x-6"
  } transition-transform duration-500 ease-in-out`;

  return (
    <div
      className="relative w-14 h-8 rounded-full p-1 cursor-pointer bg-[#ccc]"
      onClick={toggleTheme}
    >
      <button className={switchClasses}>
        {isActive ? <IconSun size={16} /> : <IconMoon />}
      </button>
    </div>
  );
};

export default ThemeSwitch;
