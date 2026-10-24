import BorderLayoutForStaticPages from "@/components/layout/BorderLayoutForStaticPages.jsx";
import { lastUpdated, visibleProjects } from "@/data/projects.js";
import { getIcon } from "@/lib/icon.js";
import PageSeo from "@/components/seo/PageSeo.jsx";
import { pageHeadings, pageMetadata } from "@/data/pages.js";
import Image from "@/components/ui/image.jsx";
import Link from "@/components/navigation/Link.jsx";

export const metadata = pageMetadata.projects;

const ProjectsPage = () => {
    return (
        <>
            <PageSeo metadata={metadata} />
            <BorderLayoutForStaticPages
                title={pageHeadings.projects.title}
                desc={pageHeadings.projects.description}
                lastUpdated={lastUpdated}
            >
                <div className="relative">
                    <div className="pt-4">
                        {visibleProjects.map((project, index) => (
                            <article
                                key={project.title}
                                className="border-t p-4 flex flex-col sm:flex-row gap-4 items-start"
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h2 className="text-lg sm:text-xl font-pixel">
                                            {project.title}
                                        </h2>
                                    </div>
                                    <p className="text-muted-foreground text-sm mb-2">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1 mb-2">
                                        {project.skills?.map((skill) => (
                                            <span
                                                key={skill.name}
                                                className="text-xs bg-foreground/10 px-2 py-0.5 border"
                                            >
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-1">
                                        {project.links?.map((link) => {
                                            const Icon = getIcon(link.iconName);
                                            return (
                                                <Link
                                                    key={link.name}
                                                    href={link.url}
                                                    target={link.target}
                                                    className="border text-sm bg-foreground/10 px-2 py-0.5 flex items-center gap-1.5 hover:bg-foreground/20 transition-colors"
                                                >
                                                    <Icon className="size-4" />
                                                    {link.name}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                                {project.imageUrl && (
                                    <Image
                                        src={project.imageUrl}
                                        alt={project.title}
                                        width={180}
                                        height={96}
                                        loading={index === 0 ? "eager" : "lazy"}
                                        fetchPriority={index === 0 ? "high" : undefined}
                                        className="w-full sm:w-50 aspect-video border shrink-0 object-cover"
                                    />
                                )}
                            </article>
                        ))}
                    </div>
                </div>
            </BorderLayoutForStaticPages>
        </>
    );
};

export default ProjectsPage;
