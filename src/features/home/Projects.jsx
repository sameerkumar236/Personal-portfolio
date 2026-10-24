import { uiContent } from "@/data/ui.js";
import Corners from "@/components/layout/Corners.jsx";
import { projects } from "@/data/portfolio.js";
import { getIcon } from "@/lib/icon.js";
import Image from "@/components/ui/image.jsx";
import Link from "@/components/navigation/Link.jsx";

const ProjectCard = ({ project, idx }) => {
    return (
        <div
            key={project.title}
            className={`${idx === 0 ? "" : "border-l"} z-10 p-2 md:p-3 flex flex-col gap-2 justify-between min-w-75`}
        >
            <div className="space-y-2">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={300}
                    height={160}
                    className="w-full h-fit aspect-video border"
                />
                <div className="flex items-center gap-2">
                    <Image
                        src={project.iconUrl}
                        alt={project.title}
                        width={32}
                        height={32}
                        className="size-5"
                    />
                    <h3 className="font-semibold">{project.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{project.description}</p>
            </div>

            <div className="space-y-2">
                {project.skills && (
                    <div className="flex gap-2 items-center">
                        {project.skills.map((skill) => {
                            const IconComp = getIcon(skill.iconName);
                            return <IconComp key={skill.name} title={skill.name} />;
                        })}
                    </div>
                )}

                <div className="flex gap-1 items-center">
                    {project.links.map((link, idx) => {
                        const IconComp = getIcon(link.iconName);
                        return (
                            <Link
                                key={link.name}
                                href={link.url}
                                target={link.target}
                                className="border group text-sm bg-foreground/10 px-1.5 py-0.5 flex items-center gap-2 justify-center"
                            >
                                <IconComp
                                    className={`size-4 ${idx === 0 ? "group-hover:-translate-y-1/4 group-hover:translate-x-1/4" : "group-hover:scale-125 group-hover:text-emerald-600"} transition-all duration-300`}
                                />
                                {link.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export const Projects = () => {
    return (
        <div className="relative">
            <Corners />
            <div className="p-4 sm:p-6 mt-16 sm:mt-20 md:mt-24 border-y flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-3xl md:text-5xl font-pixel">
                    <span>{uiContent.sectionTitles.projects[0]}</span>
                    <span className=" text-muted-foreground">
                        {uiContent.sectionTitles.projects[1]}
                    </span>
                </h2>
                <Link
                    href={uiContent.projectsLink.href}
                    className="shrink-0 border bg-foreground/10 px-3 py-1.5 text-xs sm:text-sm hover:bg-foreground/20 transition-colors focus-visible:outline-2 focus-visible:outline-ring"
                >
                    {uiContent.projectsLink.label}
                </Link>
            </div>
            <div className="relative w-full p-4 border-b overflow-hidden">
                <div className="flex w-full overflow-auto border">
                    <span className="absolute -top-1 left-0 my-1 mx-4 font-mono text-[10px] text-muted-foreground/50">
                        flex w-full overflow-auto
                    </span>
                    {projects.map((project, index) => {
                        return project?.show ? (
                            <ProjectCard project={project} idx={index} key={index} />
                        ) : null;
                    })}
                </div>
            </div>
        </div>
    );
};
