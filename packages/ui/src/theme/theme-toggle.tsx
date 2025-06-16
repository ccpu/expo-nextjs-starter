"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until after hydration to avoid mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getThemeLabel = () => {
    if (!mounted) return "Theme"; // Show fallback until mounted

    switch (theme) {
      case "light":
        return "Light Theme";
      case "dark":
        return "Dark Theme";
      case "system":
        return "System Theme";
      default:
        return "Theme";
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`rounded-md border px-4 py-2 transition-colors ${
        mounted && theme === "dark"
          ? "border-gray-600 bg-gray-800 text-white hover:bg-gray-700"
          : "border-gray-300 bg-white text-black hover:bg-gray-100"
      } ${className ?? ""}`}
    >
      {getThemeLabel()}
    </button>
  );
}
