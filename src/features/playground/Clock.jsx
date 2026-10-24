import { useEffect, useState } from "react";

const Clock = () => {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    useEffect(() => {
        const tick = () => {
            const now = new Date();
            setTime(
                now.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                }),
            );
            setDate(
                now.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
            );
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);
    return (
        <div className="font-pixel flex flex-col items-center justify-center gap-2">
            <span suppressHydrationWarning className="text-5xl text-white">
                {time}
            </span>
            <span suppressHydrationWarning className="text-xl text-white/60">
                {date}
            </span>
        </div>
    );
};

export default Clock;
