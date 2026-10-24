import { uiContent } from "@/data/ui.js";
import Link from "@/components/navigation/Link.jsx";
import { formatDateTime } from "@/lib/time.js";
import { cn } from "@/lib/utils.js";
import { useEffect, useState } from "react";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";

const DateTime = ({ className }) => {
    const [time, setTime] = useState(formatDateTime(new Date().getTime()));
    useEffect(() => {
        const interval = setInterval(() => {
            const t = new Date().getTime();
            const dtStr = formatDateTime(t);
            setTime(dtStr);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return <span className={cn(className, "w-36 text-center")}>{time}</span>;
};

export const StatusBar = ({ className, setIsMutedAction, isMuted }) => {
    return (
        <div className={cn(className, "z-20 flex max-w-full justify-end flex-wrap items-center")}>
            <Link
                href={uiContent.projectsLink.href}
                className="px-1 border-l border-b whitespace-nowrap hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
            >
                {uiContent.projectsLink.label}
            </Link>
            <DateTime className="px-1 border-l border-b" />
            {setIsMutedAction && (
                <button
                    type="button"
                    aria-pressed={!isMuted}
                    onClick={() => setIsMutedAction((p) => !p)}
                    className="px-1 border-l border-b flex items-center justify-center gap-0.5"
                >
                    {isMuted ? (
                        <IoPlaySharp className="size-3 fill-muted-foreground" />
                    ) : (
                        <IoPauseSharp className="size-3 fill-muted-foreground" />
                    )}
                    <span>{isMuted ? uiContent.play : uiContent.pause}</span>
                </button>
            )}
        </div>
    );
};
