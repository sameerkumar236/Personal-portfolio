import { useLocation } from "react-router-dom";
import JsonLd from "@/components/seo/JsonLd.jsx";
import { site } from "@/data/site.js";
import envvars from "@/lib/envvars.js";
import { buildWebPageJsonLd } from "@/lib/json-ld.js";

const PageSeo = ({ metadata }) => {
    const { pathname } = useLocation();
    const url = new URL(metadata.canonical ?? pathname, envvars.BASE_URL).href;
    const image = metadata.openGraph?.images?.[0] ?? site.image;
    const imageUrl = new URL(typeof image === "string" ? image : image.url, envvars.BASE_URL).href;
    return (
        <>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <meta
                name="robots"
                content={
                    metadata.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"
                }
            />
            <meta name="google-site-verification" content={site.googleVerification} />
            <link rel="canonical" href={url} />
            <meta property="og:title" content={metadata.openGraph?.title ?? metadata.title} />
            <meta
                property="og:description"
                content={metadata.openGraph?.description ?? metadata.description}
            />
            <meta property="og:type" content={metadata.openGraph?.type ?? "website"} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={imageUrl} />
            <meta
                property="og:image:alt"
                content={typeof image === "string" ? metadata.title : (image.alt ?? metadata.title)}
            />
            <meta property="og:site_name" content={site.title} />
            <meta property="og:locale" content={site.locale} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={site.twitter} />
            <meta name="twitter:title" content={metadata.title} />
            <meta name="twitter:description" content={metadata.description} />
            <meta name="twitter:image" content={imageUrl} />
            <JsonLd jsonLd={buildWebPageJsonLd(metadata.title, metadata.description, url)} />
        </>
    );
};

export default PageSeo;
