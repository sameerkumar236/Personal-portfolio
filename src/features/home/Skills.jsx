import { uiContent } from "@/data/ui.js";
import Corners from "@/components/layout/Corners.jsx";
import { skillsArray } from "@/data/portfolio.js";
import { getIcon } from "@/lib/icon.js";
import { motion } from "framer-motion";

const TwinklingSkill = ({ skill, index }) => {
    const IconComp = getIcon(skill.iconName);
    const duration = 1.5 + (index % 5) * 0.6;
    const delay = (index % 7) * 0.3;
    return (
        <motion.div
            key={skill.name}
            className="relative flex w-fit h-fit justify-center items-center gap-1.5 p-1.5 bg-foreground/5 border border-dashed transition-colors duration-300"
            animate={{
                borderColor: [
                    "color-mix(in oklab, var(--foreground) 30%, transparent)",
                    "color-mix(in oklab, var(--foreground) 100%, transparent)",
                    "color-mix(in oklab, var(--foreground) 30%, transparent)",
                ],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            <IconComp className="size-4" />
            <span className="text-xs">{skill.name}</span>
        </motion.div>
    );
};

export const Skills = () => {
    return (
        <div className="relative">
            <Corners />
            <h2 className="p-4 sm:p-6 mt-16 sm:mt-20 md:mt-24 border-y text-3xl md:text-5xl font-pixel">
                <span>{uiContent.sectionTitles.skills[0]}</span>
                <span className="text-muted-foreground">{uiContent.sectionTitles.skills[1]}</span>
            </h2>
            <div className="space-y-2 py-1 px-5.5 mt-4 relative border-y">
                <span className="absolute -top-5 left-0 my-1 mx-4 font-mono text-[10px] text-muted-foreground/50">
                    flex flex-wrap gap-1
                </span>
                <div className="absolute h-full w-px border-l top-0 left-4"></div>
                <div className="absolute h-full w-px border-l top-0 right-4"></div>
                <div className="flex flex-1 flex-wrap gap-1">
                    {skillsArray.map((skill, index) => (
                        <TwinklingSkill key={skill.name} skill={skill} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};
