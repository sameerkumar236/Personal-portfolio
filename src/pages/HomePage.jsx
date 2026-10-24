import JsonLd from "@/components/seo/JsonLd.jsx";
import Link from "@/components/navigation/Link.jsx";
import PageSeo from "@/components/seo/PageSeo.jsx";
import { homeSchemas } from "@/data/home.js";
import { pageCopy, pageMetadata } from "@/data/pages.js";
import { myInfo } from "@/data/portfolio.js";
import { About } from "@/features/home/About.jsx";
import { Education } from "@/features/home/Education.jsx";
import { Experience } from "@/features/home/Experience.jsx";
import { Footer } from "@/features/home/Footer.jsx";
import { Projects } from "@/features/home/Projects.jsx";
import { Skills } from "@/features/home/Skills.jsx";
import { Topbar } from "@/features/home/Topbar.jsx";
import BottomBlur from "@/features/home/BottomBlur.jsx";

export const metadata = pageMetadata.home;

const HomePage = () => {
    return (
        <>
            <PageSeo metadata={metadata} />
            {homeSchemas.map((schema, index) => (
                <JsonLd key={index} jsonLd={schema} />
            ))}
            <div className="overflow-hidden lg:p-6 transition-all duration-300">
                <div className="lg:h-[calc(100dvh-48px)] h-dvh overflow-auto relative lg:border">
                    <Topbar />
                    <div className="z-10 max-w-3xl mx-auto relative">
                        <div className="border-x">
                            <About />
                            <Experience />
                            <Projects />
                            <Skills />
                            <Education />
                            <Footer />
                        </div>
                    </div>

                    <div className="h-fit md:h-20 w-full border-t">
                        <div className="max-w-3xl mx-auto border-x h-full relative">
                            <div className="text-muted-foreground flex items-center justify-between text-xs py-1 px-2">
                                <p>{pageCopy.copyright}</p>
                                <div className="flex gap-2 items-center">
                                    {myInfo.contacts.slice(0, 3).map((contact) => {
                                        return (
                                            <Link
                                                key={contact.name}
                                                href={contact.url}
                                                className="hover:underline transition-all duration-300"
                                            >
                                                {contact.name}.com
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <BottomBlur />
                </div>
            </div>
        </>
    );
};

export default HomePage;
