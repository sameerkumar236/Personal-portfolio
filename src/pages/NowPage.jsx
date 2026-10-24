import BorderLayoutForStaticPages from "@/components/layout/BorderLayoutForStaticPages.jsx";
import { lastUpdated, nowEntries } from "@/data/now.js";
import PageSeo from "@/components/seo/PageSeo.jsx";
import { pageHeadings, pageMetadata } from "@/data/pages.js";

export const metadata = pageMetadata.now;

const NowPage = () => {
    return (
        <>
            <PageSeo metadata={metadata} />
            <BorderLayoutForStaticPages
                title={pageHeadings.now.title}
                desc={pageHeadings.now.description}
                lastUpdated={lastUpdated}
            >
                <div className="relative">
                    <div className="pt-4">
                        {nowEntries.map((entry) => (
                            <section key={entry.title} className="border-t p-4">
                                <h2 className="text-xl font-semibold">{entry.title}</h2>
                                <p className="text-muted-foreground mt-1">{entry.description}</p>
                            </section>
                        ))}
                    </div>
                </div>
            </BorderLayoutForStaticPages>
        </>
    );
};

export default NowPage;
