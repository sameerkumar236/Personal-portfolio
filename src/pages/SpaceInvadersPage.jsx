import PageSeo from "@/components/seo/PageSeo.jsx";
import { pageMetadata } from "@/data/pages.js";
import ArcadeLayout from "@/features/space-invaders/ArcadeLayout.jsx";
import GameContainer from "@/features/space-invaders/GameContainer.jsx";

export const metadata = pageMetadata.spaceInvaders;

const SpaceInvadersPage = () => (
    <ArcadeLayout>
        <PageSeo metadata={metadata} />
        <div className="z-10 flex flex-col items-center justify-center w-full h-screen overflow-hidden">
            <GameContainer />
        </div>
    </ArcadeLayout>
);

export default SpaceInvadersPage;
