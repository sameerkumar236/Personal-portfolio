import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { site } from "@/data/site.js";

const Analytics = () => {
    const { pathname, search } = useLocation();
    useEffect(() => {
        if (!import.meta.env.PROD || document.getElementById("google-analytics")) return;
        window.dataLayer = window.dataLayer ?? [];
        window.gtag = function () {
            window.dataLayer?.push(arguments);
        };
        window.gtag("js", new Date());
        window.gtag("config", site.analytics.googleId, { send_page_view: false });
        const googleScript = document.createElement("script");
        googleScript.id = "google-analytics";
        googleScript.async = true;
        googleScript.src = `https://www.googletagmanager.com/gtag/js?id=${site.analytics.googleId}`;
        document.head.append(googleScript);
        const rumScript = document.createElement("script");
        rumScript.src = site.analytics.rumScript;
        rumScript.async = true;
        rumScript.dataset.worker = site.analytics.rumWorker;
        rumScript.dataset.key = site.analytics.rumKey;
        document.head.append(rumScript);
    }, []);
    useEffect(() => {
        if (import.meta.env.PROD) {
            window.gtag?.("event", "page_view", { page_path: pathname + search });
        }
    }, [pathname, search]);
    return (
        <>
            <VercelAnalytics />
            <SpeedInsights />
        </>
    );
};

export default Analytics;
