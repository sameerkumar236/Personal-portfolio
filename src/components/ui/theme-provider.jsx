import { createContext, useCallback, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

const STORAGE_KEY = "portfolio-theme";

const getSavedTheme = () => {
    try {
        return localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
    } catch {
        return "dark";
    }
};

export const ThemeProvider = ({ children }) => {
    const [theme, updateTheme] = useState(getSavedTheme);
    const setTheme = useCallback((nextTheme) => {
        updateTheme(nextTheme);
        try {
            localStorage.setItem(STORAGE_KEY, nextTheme);
        } catch {
            return;
        }
    }, []);
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        document.documentElement.style.colorScheme = theme;
    }, [theme]);
    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
};
