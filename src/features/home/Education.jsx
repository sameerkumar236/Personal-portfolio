import { education } from "@/data/portfolio.js";
import { uiContent } from "@/data/ui.js";
import { ResumeSection } from "@/features/home/ResumeSection.jsx";
import { PiGraduationCapLight } from "react-icons/pi";

const entries = education.map((entry) => ({
    ...entry,
    title: entry.qualification,
    subtitle: entry.institution,
}));

export const Education = () => (
    <ResumeSection
        id="education"
        title={uiContent.sectionTitles.education}
        entries={entries}
        icon={PiGraduationCapLight}
    />
);
