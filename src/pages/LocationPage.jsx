import { useParams } from "react-router-dom";
import BorderLayoutForStaticPages from "@/components/layout/BorderLayoutForStaticPages.jsx";
import Link from "@/components/navigation/Link.jsx";
import PageSeo from "@/components/seo/PageSeo.jsx";
import { cities, lastUpdated } from "@/data/locations.js";
import { getLocationMetadata, pageCopy, pageMetadata } from "@/data/pages.js";
import { visibleProjects } from "@/data/projects.js";
import NotFoundPage from "./NotFoundPage.jsx";

export const metadata = pageMetadata.location;

const LocationPage = () => {
    const { city: slug } = useParams();
    const city = cities.find((location) => location.slug === slug);
    if (!city) return <NotFoundPage />;
    const copy = pageCopy.locations;
    return (
        <>
            <PageSeo metadata={getLocationMetadata(city)} />
            <BorderLayoutForStaticPages
                key={city.slug}
                title={`${city.name}, ${city.state}`}
                desc={copy.description}
                lastUpdated={lastUpdated}
            >
                <div className="pt-4">
                    <section className="border-t px-4 md:px-6 py-4">
                        <h2 className="text-lg sm:text-xl font-pixel">{copy.aboutTitle}</h2>
                        <p className="text-muted-foreground text-sm mt-1">
                            {copy.aboutIntroduction} <strong>{copy.origin}</strong>
                            {copy.aboutDescription}
                        </p>
                    </section>
                    <section className="border-t px-4 md:px-6 py-4">
                        <h2 className="text-lg sm:text-xl font-pixel">{copy.stackTitle}</h2>
                        <p className="text-muted-foreground text-sm mt-1">
                            {copy.stackDescription}
                        </p>
                    </section>
                    <section className="border-t p-4 md:p-6">
                        <h2 className="text-lg sm:text-xl font-pixel">{copy.projectsTitle}</h2>
                        <div className="mt-2 space-y-2">
                            {visibleProjects.map((project) => (
                                <Link
                                    key={project.title}
                                    href="/projects"
                                    className="block border px-3 py-2 hover:bg-foreground/5 transition-colors"
                                >
                                    <span className="text-sm font-medium">{project.title}</span>
                                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                        {project.description}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </section>
                    <section className="border-t px-4 md:px-6 py-4">
                        <h2 className="text-lg sm:text-xl font-pixel">{copy.openSourceTitle}</h2>
                        <p className="text-muted-foreground text-sm mt-1">
                            {copy.openSourceIntroduction}{" "}
                            <Link href="/projects" className="text-primary hover:underline">
                                {copy.openSourceProject}
                            </Link>
                            {copy.openSourceDescription}
                        </p>
                    </section>
                </div>
            </BorderLayoutForStaticPages>
        </>
    );
};

export default LocationPage;
