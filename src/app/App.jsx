import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import JsonLd from "@/components/seo/JsonLd.jsx";
import { myInfo } from "@/data/portfolio.js";
import { site } from "@/data/site.js";
import envvars from "@/lib/envvars.js";
import { buildOrganizationJsonLd } from "@/lib/json-ld.js";
import Analytics from "./Analytics.jsx";
import ScrollToTop from "./ScrollToTop.jsx";

const HomePage = lazy(() => import("@/pages/HomePage.jsx"));

const ProjectsPage = lazy(() => import("@/pages/ProjectsPage.jsx"));

const NowPage = lazy(() => import("@/pages/NowPage.jsx"));

const UsesPage = lazy(() => import("@/pages/UsesPage.jsx"));

const LocationsPage = lazy(() => import("@/pages/LocationsPage.jsx"));

const LocationPage = lazy(() => import("@/pages/LocationPage.jsx"));

const GamesPage = lazy(() => import("@/pages/GamesPage.jsx"));

const SpaceInvadersPage = lazy(() => import("@/pages/SpaceInvadersPage.jsx"));

const PlaygroundPage = lazy(() => import("@/pages/PlaygroundPage.jsx"));

const NotFoundPage = lazy(() => import("@/pages/NotFoundPage.jsx"));

const organization = buildOrganizationJsonLd(
    site.name,
    site.description,
    envvars.BASE_URL,
    `${envvars.BASE_URL}${site.logo}`,
    myInfo.contacts.map((contact) => contact.url),
);

const App = () => (
    <>
        <JsonLd jsonLd={organization} />
        <ScrollToTop />
        <Suspense
            fallback={
                <div
                    className="flex min-h-dvh items-center justify-center font-pixel"
                    role="status"
                >
                    {site.loading}
                </div>
            }
        >
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/now" element={<NowPage />} />
                <Route path="/uses" element={<UsesPage />} />
                <Route path="/locations" element={<LocationsPage />} />
                <Route path="/locations/:city" element={<LocationPage />} />
                <Route path="/games" element={<GamesPage />} />
                <Route path="/games/pixel-space-invaders" element={<SpaceInvadersPage />} />
                <Route path="/newpage" element={<PlaygroundPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
        <Analytics />
    </>
);

export default App;
