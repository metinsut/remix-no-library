import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";

export enum ThemeEnums {
  LIGHT = "light",
  DARK = "dark",
}

export function useTheme() {
  const fetcher = useFetcher();
  const [theme, setTheme] = useState<ThemeEnums>(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains(ThemeEnums.DARK)
        ? ThemeEnums.DARK
        : ThemeEnums.LIGHT;
    }
    return ThemeEnums.LIGHT;
  });

  const toggleTheme = () => {
    const newTheme = theme === ThemeEnums.LIGHT ? ThemeEnums.DARK : ThemeEnums.LIGHT;
    setTheme(newTheme);
    fetcher.submit({ theme: newTheme }, { method: "POST", action: "/api/theme" });
  };

  useEffect(() => {
    document.documentElement.classList.remove(ThemeEnums.LIGHT, ThemeEnums.DARK);
    document.documentElement.classList.add(theme);
  }, [theme]);

  return { theme, toggleTheme };
}
