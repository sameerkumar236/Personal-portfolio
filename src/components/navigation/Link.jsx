import { Link as RouterLink } from "react-router-dom";

const Link = ({ href, children, target, rel, download, ...props }) => {
    const safeRel = rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);
    const isInternal = href.startsWith("/") && !href.startsWith("//");
    const isFile = /\.[a-z0-9]+(?:[?#]|$)/i.test(href);
    if (isInternal && !download && !isFile) {
        return (
            <RouterLink to={href} target={target} rel={safeRel} {...props}>
                {children}
            </RouterLink>
        );
    }
    return (
        <a href={href} target={target} rel={safeRel} download={download} {...props}>
            {children}
        </a>
    );
};

export default Link;
