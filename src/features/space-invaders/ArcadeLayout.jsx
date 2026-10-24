import { useLocation } from "react-router-dom";
import { pageCopy } from "@/data/pages.js";
import Link from "@/components/navigation/Link.jsx";
import { Button } from "@/components/ui/button.jsx";
import { ChevronLeft } from "lucide-react";

const ArcadeLayout = ({ children }) => {
    const { pathname } = useLocation();
    const isMainArcade = pathname === "/games";
    const headerTitle = isMainArcade ? pageCopy.arcade.header : pageCopy.arcade.invadersHeader;
    return (
        <main className="min-h-screen bg-background flex flex-col items-center relative overflow-hidden px-4">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-destructive rounded-full blur-[120px]" />
            </div>
            <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between w-full p-4 md:p-8 pointer-events-none">
                <div className="pointer-events-auto">
                    <Link href={isMainArcade ? "/" : "/games"}>
                        <Button variant="ghost" size="sm" className="gap-2 font-mono group">
                            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            {isMainArcade
                                ? pageCopy.arcade.exitPortfolio
                                : pageCopy.arcade.exitArcade}
                        </Button>
                    </Link>
                </div>
                <div className="text-right pointer-events-auto">
                    <h1 className="text-xl md:text-2xl font-bold font-mono tracking-tighter uppercase">
                        {headerTitle}
                    </h1>
                </div>
            </div>

            {children}
        </main>
    );
};

export default ArcadeLayout;
