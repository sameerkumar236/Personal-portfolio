import { uiContent } from "@/data/ui.js";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const OpenToWork = () => {
    const [showOverlay, setShowOverlay] = useState(true);
    return (
        <div className="flex items-center relative w-fit">
            <AnimatePresence>
                {showOverlay ? (
                    <motion.div
                        key="dot"
                        layoutId="dot"
                        initial={{
                            width: "200dvw",
                            height: "200dvw",
                            backgroundColor: "var(--background)",
                        }}
                        animate={{
                            width: "4px",
                            height: "4px",
                            padding: "4px",
                            backgroundColor: "var(--color-green-500)",
                        }}
                        transition={{
                            duration: 1.5,
                            delay: 0.25,
                            ease: "circInOut",
                        }}
                        onAnimationComplete={() => setShowOverlay(false)}
                        className="fixed p-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden flex items-center justify-center"
                    >
                        <span className="font-pixel text-2xl font-bold whitespace-nowrap ">
                            {uiContent.brand}
                            <span className="text-muted-foreground">{uiContent.domainSuffix}</span>
                        </span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="dot"
                        layoutId="dot"
                        className="absolute w-1 h-1 p-1 animate-pulse rounded-full bg-green-500"
                    />
                )}
            </AnimatePresence>
            <motion.span
                initial={{
                    marginLeft: "0px",
                }}
                animate={{
                    marginLeft: "16px",
                }}
                transition={{
                    duration: 0.5,
                    delay: 2,
                }}
            >
                {uiContent.openToWork}
            </motion.span>
        </div>
    );
};

export default OpenToWork;
