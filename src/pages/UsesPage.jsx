import BorderLayoutForStaticPages from "@/components/layout/BorderLayoutForStaticPages.jsx";
import { lastUpdated, usesEntries } from "@/data/uses.js";
import { getIcon } from "@/lib/icon.js";
import PageSeo from "@/components/seo/PageSeo.jsx";
import { pageHeadings, pageMetadata } from "@/data/pages.js";
import { Fragment } from "react";

export const metadata = pageMetadata.uses;

const UsesPage = () => {
    return (
        <>
            <PageSeo metadata={metadata} />
            <BorderLayoutForStaticPages
                title={pageHeadings.uses.title}
                desc={pageHeadings.uses.description}
                lastUpdated={lastUpdated}
            >
                <div className="relative">
                    <div className="pt-4">
                        {usesEntries.map((entry) => (
                            <Fragment key={entry.category}>
                                <div className="border-y px-4 md:px-6 py-2 mb-4 md:mb-6">
                                    <h2 className="text-lg sm:text-xl font-pixel">
                                        {entry.category}
                                    </h2>
                                </div>
                                <div className="flex flex-wrap gap-1 px-4 md:px-6 relative mb-4 md:mb-6">
                                    {entry.items.map((item) => {
                                        const Icon = getIcon(item.iconName);
                                        return (
                                            <div
                                                key={item.name}
                                                className="relative flex w-fit h-fit justify-center items-center gap-1.5 p-1.5 bg-foreground/5 border transition-colors duration-300"
                                            >
                                                <Icon className="size-4" />
                                                <span className="text-sm">{item.name}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </div>
            </BorderLayoutForStaticPages>
        </>
    );
};

export default UsesPage;
