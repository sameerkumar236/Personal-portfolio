import { uiContent } from "@/data/ui.js";
import Corners from "@/components/layout/Corners.jsx";

export const Footer = () => {
    return (
        <div className="relative mt-16 sm:mt-20 md:mt-24 border-t">
            <Corners />
            <div className="py-6 sm:py-8 md:py-12 w-full flex items-center justify-center mask-r-from-80% mask-l-from-80% mask-t-from-80% mask-b-to-75%">
                <h3 className="text-4xl sm:text-5xl md:text-7xl font-pixel">
                    <span>{uiContent.brand}</span>
                    <span className="text-muted-foreground">{uiContent.domainSuffix}</span>
                </h3>
            </div>
        </div>
    );
};
