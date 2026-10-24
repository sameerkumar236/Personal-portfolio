import { uiContent } from "@/data/ui.js";
import { ThemeToggle } from "@/components/ui/ThemeToggle.jsx";

export const Topbar = () => {
    return (
        <div className="relative border-b">
            <div className="max-w-3xl mx-auto border-x py-6">
                <div className="flex items-center justify-between gap-1 sm:gap-4 border-y px-4 sm:px-6 relative h-9">
                    <>
                        <span className="text-muted-foreground/50 text-[10px] font-mono absolute top-full left-2 mt-1">
                            max-w-3xl mx-auto
                        </span>
                        <span className="text-muted-foreground/50 text-[10px] font-mono absolute bottom-full right-2 mb-1">
                            flex items-center justify-between gap-4
                        </span>
                    </>
                    <div className="w-full sm:w-fit">
                        <h2 className="text-2xl border-x px-1 w-fit font-pixel">
                            <span>{uiContent.brand}</span>
                            <span className="text-muted-foreground">{uiContent.domainSuffix}</span>
                        </h2>
                    </div>
                    <ThemeToggle className="border-x hover:border rounded-none" />
                </div>
            </div>
        </div>
    );
};
