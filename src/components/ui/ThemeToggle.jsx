import { useCallback, useEffect } from "react";
import { TbCircleHalf2 } from "react-icons/tb";
import { uiContent } from "@/data/ui.js";
import { Button } from "./button.jsx";
import { useTheme } from "./theme-provider.jsx";

export const ThemeToggle = ({ className }) => {
    const { setTheme, theme } = useTheme();
    const toggleTheme = useCallback(() => {
        setTheme(theme === "light" ? "dark" : "light");
    }, [setTheme, theme]);
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key.toLowerCase() === "m") {
                event.preventDefault();
                toggleTheme();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleTheme]);
    return (
        <Button
            size={"icon"}
            variant={"ghost"}
            title={uiContent.themeShortcut}
            aria-label={uiContent.toggleTheme}
            className={className}
            onClick={toggleTheme}
        >
            <TbCircleHalf2 className="size-5" />
        </Button>
    );
};
