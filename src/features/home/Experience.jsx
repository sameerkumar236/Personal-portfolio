import { experiences } from "@/data/portfolio.js";
import { uiContent } from "@/data/ui.js";
import { ResumeSection } from "@/features/home/ResumeSection.jsx";
import { PiBuildingsLight } from "react-icons/pi";

const entries = experiences.map((experience) => ({
    ...experience,
    title: experience.position,
    subtitle: [experience.company, experience.location].filter(Boolean).join(" • "),
}));

export const Experience = () => (
    <ResumeSection
        id="experience"
        title={uiContent.sectionTitles.experience}
        entries={entries}
        icon={PiBuildingsLight}
    />
);
