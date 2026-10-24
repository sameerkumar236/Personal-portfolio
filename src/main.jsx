import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.jsx";
import { ThemeProvider } from "./components/ui/theme-provider.jsx";
import "./styles/globals.css";

document.querySelectorAll("[data-page-head]").forEach((element) => element.remove());

const root = document.getElementById("root");

if (!root) throw new Error("The application root element is missing."); 

createRoot(root).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>,
);