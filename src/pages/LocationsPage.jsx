import BorderLayoutForStaticPages from "@/components/layout/BorderLayoutForStaticPages.jsx";
import Link from "@/components/navigation/Link.jsx";
import PageSeo from "@/components/seo/PageSeo.jsx";
import { cities, lastUpdated } from "@/data/locations.js";
import { pageCopy, pageHeadings, pageMetadata } from "@/data/pages.js";

export const metadata = pageMetadata.locations;

const LocationsPage = () => (
    <>
        <PageSeo metadata={metadata} />
        <BorderLayoutForStaticPages
            title={pageHeadings.locations.title}
            desc={pageHeadings.locations.description}
            lastUpdated={lastUpdated}
        >
            <div className="pt-4">
                <p className="text-muted-foreground text-sm px-4 md:px-6">
                    {pageCopy.locations.introduction} <strong>{pageCopy.locations.origin}</strong>
                    {pageCopy.locations.remoteExperience}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 p-4 md:p-6">
                    {cities.map((city) => (
                        <Link
                            key={city.slug}
                            href={`/locations/${city.slug}`}
                            className="border px-3 py-2 hover:bg-foreground/5 transition-colors"
                        >
                            <span className="text-sm font-medium">{city.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">{city.state}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </BorderLayoutForStaticPages>
    </>
);

export default LocationsPage;
