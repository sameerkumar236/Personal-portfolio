const HEADER_SIZE = 16;

function decodeHeader(buffer) {
    const magic = String.fromCharCode(buffer[0], buffer[1], buffer[2], buffer[3]);
    if (magic !== "DITH") {
        throw new Error(`Invalid magic bytes: expected "DITH", got "${magic}"`);
    }
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    return {
        width: view.getUint16(4, true),
        height: view.getUint16(6, true),
        frameCount: view.getUint32(8, true),
        fps: view.getUint8(12),
        bitDepth: view.getUint8(13),
    };
}

function extractFrame(header, buffer, frameIndex) {
    const frameByteSize = Math.ceil((header.width * header.height * header.bitDepth) / 8);
    const offset = HEADER_SIZE + frameIndex * frameByteSize;
    return buffer.slice(offset, offset + frameByteSize);
}

export function decodeAll(buffer) {
    const header = decodeHeader(buffer);
    const frames = [];
    for (let i = 0; i < header.frameCount; i++) {
        frames.push(extractFrame(header, buffer, i));
    }
    return { ...header, frames };
}
