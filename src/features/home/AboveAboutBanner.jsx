import { useEffect, useState } from "react";
import { DitherCanvas, loadDitherFile } from "./DitherCanvas.jsx";

const AboveAboutBanner = ({ isMuted = true }) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        let active = true;
        loadDitherFile("/star_boy_rotated_240p.dith")
            .then((frames) => {
                if (active) setData(frames);
            })
            .catch(() => {
                if (active) setData(null);
            });
        return () => {
            active = false;
        };
    }, []);
    return (
        <div className="absolute top-0 flex items-center w-full">
            <div className="w-full mask-t-from-75% md:mask-t-from-80% mask-b-from-40%">
                {data && (
                    <DitherCanvas
                        className="h-100 sm:h-full w-full object-cover"
                        frames={data.frames}
                        width={data.width}
                        height={data.height}
                        bitDepth={data.bitDepth}
                        fps={data.fps}
                        playing={data.frames.length > 1}
                        colors={["var(--background)", "var(--foreground)"]}
                        audioSrc="/star_boy_rotated.mp3"
                        muted={isMuted}
                    />
                )}
            </div>
        </div>
    );
};

export default AboveAboutBanner;
