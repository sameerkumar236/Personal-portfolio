import PageSeo from "@/components/seo/PageSeo.jsx";
import { pageMetadata } from "@/data/pages.js";
import Clock from "@/features/playground/Clock.jsx";
import Notes from "@/features/playground/Notes.jsx";

export const metadata = pageMetadata.playground;

const PlaygroundPage = () => (
    <>
        <PageSeo metadata={metadata} />
        <div className="min-h-screen bg-black flex flex-col items-center pt-24 pb-16 gap-12">
            <Clock />
            <Notes />
        </div>
    </>
);

export default PlaygroundPage;
