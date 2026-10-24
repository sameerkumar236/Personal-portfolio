import { Button } from "@/components/ui/button.jsx";
import { uiContent } from "@/data/ui.js";
import { copyToClipboard } from "@/lib/clipboard.js";
import envvars from "@/lib/envvars.js";
import { useEffect, useState } from "react";
import { IoCheckmark, IoCopyOutline } from "react-icons/io5";
import { VscLinkExternal } from "react-icons/vsc";

const Cli = () => {
    const [isCopied, setIsCopied] = useState(false);
    const text = `${envvars.BASE_URL}`;
    const scriptUrl = `${envvars.BASE_URL}`;
    const handleCopyBtnClick = async () => {
        await copyToClipboard(text);
        setIsCopied(true);
    };
    const handleOpenScript = () => {
        window.open(scriptUrl, "_blank", "noopener,noreferrer");
    };
    useEffect(() => {
        if (!isCopied) return;
        const timeout = setTimeout(() => {
            setIsCopied(false);
        }, 3000);
        return () => {
            clearTimeout(timeout);
        };
    }, [isCopied]);
    return (
        <div className="w-full flex justify-between items-center gap-4">
            <button
                type="button"
                aria-label={uiContent.openScript}
                onClick={handleOpenScript}
                className="px-2 py-1 h-9 flex items-center border-x text-muted-foreground bg-muted/10 text-sm sm:text-base font-mono font-pixel"
            >
                {text}
            </button>
            <div className="flex items-center gap-2">
                <Button
                    onClick={handleCopyBtnClick}
                    disabled={isCopied}
                    aria-label={isCopied ? uiContent.commandCopied : uiContent.copyCommand}
                    size={"icon"}
                    variant={"ghost"}
                    className="border-x text-muted-foreground [&_svg:not([class*='size-'])]:size-3.5"
                >
                    {isCopied ? <IoCheckmark className="text-green-500" /> : <IoCopyOutline />}
                </Button>
                <Button
                    onClick={handleOpenScript}
                    aria-label={uiContent.openScript}
                    size={"icon"}
                    variant={"ghost"}
                    className="border-x text-muted-foreground [&_svg:not([class*='size-'])]:size-3.5 hidden sm:flex"
                >
                    <VscLinkExternal />
                </Button>
            </div>
        </div>
    );
};

export default Cli;
