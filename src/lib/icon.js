import {
    SiBun,
    SiCloudinary,
    SiCss,
    SiDocker,
    SiDrizzle,
    SiEsbuild,
    SiExpress,
    SiFastapi,
    SiFfmpeg,
    SiFlask,
    SiFramer,
    SiGit,
    SiGooglechrome,
    SiHono,
    SiHtml5,
    SiJavascript,
    SiMongodb,
    SiNextdotjs,
    SiPostman,
    SiPrisma,
    SiReact,
    SiRedux,
    SiShadcnui,
    SiSqlite,
    SiSwagger,
    SiTailwindcss,
    SiTypescript,
    SiVercel,
    SiGmail,
    SiSocketdotio,
    SiAngular,
} from "react-icons/si";
import { IoLogoGithub } from "react-icons/io5";
import { FaPython, FaGolang, FaNodeJs, FaCloudflare, FaLinkedinIn } from "react-icons/fa6";
import { GrFirefox } from "react-icons/gr";
import { BiLogoPostgresql } from "react-icons/bi";
import { DiRedis } from "react-icons/di";
import { VscLinkExternal } from "react-icons/vsc";

const icons = {
    // Languages
    SiHtml5,
    SiCss,
    SiTypescript,
    SiJavascript,
    FaPython,
    FaGolang,
    // Backend
    FaNodeJs,
    SiBun,
    GrFirefox,
    SiExpress,
    SiHono,
    SiFastapi,
    SiFlask,
    SiSocketdotio,
    // Frontend
    SiReact,
    SiNextdotjs,
    SiAngular,
    SiRedux,
    SiShadcnui,
    SiTailwindcss,
    SiFramer,
    SiFfmpeg,
    // Databases
    SiMongodb,
    BiLogoPostgresql,
    SiSqlite,
    DiRedis,
    SiPrisma,
    SiDrizzle,
    // Dev / Tools
    FaCloudflare,
    SiDocker,
    SiGit,
    SiPostman,
    SiSwagger,
    SiCloudinary,
    SiVercel,
    SiEsbuild,
    SiGooglechrome,
    // contacts
    IoLogoGithub,
    FaLinkedinIn,
    SiGmail,
    VscLinkExternal,
};

export function getIcon(iconName) {
    return icons[iconName];
}
