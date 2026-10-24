import PageSeo from "@/components/seo/PageSeo.jsx";
import { arcadeGames, pageCopy, pageMetadata } from "@/data/pages.js";
import ArcadeLayout from "@/features/space-invaders/ArcadeLayout.jsx";
import Link from "@/components/navigation/Link.jsx";
import { Play, Gamepad2 } from "lucide-react";

export const metadata = pageMetadata.games;

const GamesPage = () => {
    return (
        <ArcadeLayout>
            <PageSeo metadata={metadata} />
            <div className="z-10 flex flex-col items-center justify-center gap-12 w-full flex-1 py-12">
                <div className="flex flex-col items-center gap-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold font-mono tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/50">
                        {pageCopy.arcade.title}
                    </h1>
                    <p className="text-muted-foreground font-mono text-sm max-w-md">
                        {pageCopy.arcade.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                    {arcadeGames.map((game) => (
                        <Link key={game.id} href={game.href} className="group relative">
                            <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-destructive rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500" />
                            <div className="relative flex flex-col gap-4 p-6 bg-background border border-foreground/10 group-hover:border-primary/50 transition-colors">
                                <div className="flex items-start justify-between">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <Gamepad2 className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                                        {game.difficulty}
                                    </span>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold font-mono group-hover:text-primary transition-colors">
                                        {game.title}
                                    </h2>
                                    <p className="text-xs text-muted-foreground font-mono mt-1">
                                        {game.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-foreground/5">
                                    <span className="text-[10px] font-mono text-muted-foreground/50 italic">
                                        {game.version}
                                    </span>
                                    <div className="flex items-center gap-1 text-xs font-mono font-bold group-hover:translate-x-1 transition-transform">
                                        {pageCopy.arcade.initialize} <Play className="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </ArcadeLayout>
    );
};

export default GamesPage;
