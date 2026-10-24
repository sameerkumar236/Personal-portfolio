import { useRef, useEffect, useCallback, useMemo, useState } from "react";
import { decodeAll } from "@/lib/dither/decoder.js";

export async function loadDitherFile(path) {
    const response = await fetch(path);
    if (!response.ok)
        throw new Error(`Failed to load .dith file: ${response.status} ${response.statusText}`);
    const buffer = new Uint8Array(await response.arrayBuffer());
    return decodeAll(buffer);
}

function cssColorToRgba(color) {
    if (color.startsWith("var(")) {
        const el = document.createElement("div");
        el.style.color = color;
        document.body.appendChild(el);
        const resolved = getComputedStyle(el).color;
        document.body.removeChild(el);
        return cssColorToRgba(resolved);
    }
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2], d[3]];
}

const BW_PALETTE = [
    [0, 0, 0, 255],
    [255, 255, 255, 255],
];

const COLOR_PALETTE = [
    [0, 0, 0, 255],
    [255, 0, 0, 255],
    [0, 255, 0, 255],
    [255, 255, 0, 255],
    [0, 0, 255, 255],
    [255, 0, 255, 255],
    [0, 255, 255, 255],
    [255, 255, 255, 255],
];

function frameToImageData(frame, width, height, bitDepth = 1, palette) {
    const imageData = new ImageData(width, height);
    const colors = palette ?? (bitDepth === 1 ? BW_PALETTE : COLOR_PALETTE);
    if (bitDepth === 1) {
        const bytesPerRow = Math.ceil(width / 8);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const byteIdx = Math.floor(x / 8) + y * bytesPerRow;
                const bitIdx = 7 - (x % 8);
                const bit = (frame[byteIdx] >> bitIdx) & 1;
                const destIdx = (y * width + x) * 4;
                const c = colors[bit] ?? BW_PALETTE[bit];
                imageData.data[destIdx] = c[0];
                imageData.data[destIdx + 1] = c[1];
                imageData.data[destIdx + 2] = c[2];
                imageData.data[destIdx + 3] = c[3];
            }
        }
        return imageData;
    }
    for (let i = 0; i < width * height; i++) {
        const destIdx = i * 4;
        const idx = frame[i] & 7;
        const c = colors[idx] ?? COLOR_PALETTE[idx];
        imageData.data[destIdx] = c[0];
        imageData.data[destIdx + 1] = c[1];
        imageData.data[destIdx + 2] = c[2];
        imageData.data[destIdx + 3] = c[3];
    }
    return imageData;
}

function startPlayback(ctx, frames, width, height, fps, bitDepth = 1, audioEl, palette) {
    if (frames.length === 0) return () => {};
    const playbackFrames = frames.length > 1 ? [...frames, frames[0]] : frames;
    const frameInterval = 1000 / fps;
    let currentFrame = -1;
    let startTime = 0;
    let rafId;
    let stopped = false;
    function paint(rawIndex) {
        const imageData = frameToImageData(
            playbackFrames[rawIndex],
            width,
            height,
            bitDepth,
            palette,
        );
        ctx.putImageData(imageData, 0, 0);
    }
    function tick(timestamp) {
        if (stopped) return;
        let index;
        if (audioEl && !audioEl.paused) {
            index = Math.floor(audioEl.currentTime * fps) % playbackFrames.length;
        } else if (audioEl?.ended) {
            stopped = true;
            return;
        } else {
            if (startTime === 0) startTime = timestamp;
            const elapsed = timestamp - startTime;
            index = Math.floor(elapsed / frameInterval) % playbackFrames.length;
        }
        if (index !== currentFrame) {
            currentFrame = index;
            paint(index);
        }
        rafId = requestAnimationFrame(tick);
    }
    paint(0);
    currentFrame = 0;
    if (frames.length > 1) {
        rafId = requestAnimationFrame(tick);
    }
    return () => {
        stopped = true;
        cancelAnimationFrame(rafId);
    };
}

export const DitherCanvas = ({
    frames,
    width,
    height,
    bitDepth = 1,
    fps = 30,
    playing = false,
    className,
    audioSrc,
    muted = true,
    colors,
}) => {
    const canvasRef = useRef(null);
    const stopRef = useRef(null);
    const audioRef = useRef(null);
    const [themeVersion, setThemeVersion] = useState(0);
    const usesCssVars = colors?.some((c) => c.startsWith("var("));
    useEffect(() => {
        if (!usesCssVars) return;
        const el = document.documentElement;
        const observer = new MutationObserver(() => setThemeVersion((v) => v + 1));
        observer.observe(el, { attributes: true, attributeFilter: ["class", "style"] });
        return () => observer.disconnect();
    }, [usesCssVars]);
    const palette = useMemo(() => colors?.map(cssColorToRgba), [colors, themeVersion]);
    const stop = useCallback(() => {
        stopRef.current?.();
        stopRef.current = null;
    }, []);
    useEffect(() => {
        if (!audioSrc) {
            audioRef.current = null;
            return;
        }
        const audio = new Audio(audioSrc);
        audio.loop = true;
        audio.muted = muted;
        audioRef.current = audio;
        return () => {
            audio.pause();
            audio.src = "";
            audioRef.current = null;
        };
    }, [audioSrc]);
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) audio.muted = muted;
    }, [muted]);
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || frames.length <= 1) return;
        audio.muted = muted;
        if (playing) {
            if (audio.paused) {
                audio.currentTime = 0;
                audio.play().catch(() => {});
            }
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    }, [playing, frames.length, muted]);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || frames.length === 0) return;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        stop();
        if (frames.length > 1 && playing) {
            stopRef.current = startPlayback(
                ctx,
                frames,
                width,
                height,
                fps,
                bitDepth,
                audioRef.current ?? undefined,
                palette,
            );
        } else {
            const imageData = frameToImageData(frames[0], width, height, bitDepth, palette);
            ctx.putImageData(imageData, 0, 0);
        }
    }, [frames, width, height, bitDepth, fps, playing, stop, palette]);
    useEffect(() => stop, [stop]);
    return <canvas ref={canvasRef} className={className} />;
};
