import { pageCopy } from "@/data/pages.js";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { cn } from "@/lib/utils.js";
import Link from "@/components/navigation/Link.jsx";
import { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";

const STORAGE_KEY = pageCopy.notes.storageKey;

const isNote = (value) =>
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "string" &&
    "text" in value &&
    typeof value.text === "string" &&
    "link" in value &&
    typeof value.link === "string" &&
    "pinned" in value &&
    typeof value.pinned === "boolean" &&
    "createdAt" in value &&
    typeof value.createdAt === "number";

const loadNotes = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const notes = JSON.parse(raw);
        return Array.isArray(notes) ? notes.filter(isNote) : [];
    } catch {
        return [];
    }
};

const saveNotes = (notes) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
        return;
    }
};

const Notes = () => {
    const [notes, setNotes] = useState(loadNotes);
    const [draft, setDraft] = useState("");
    const [draftLink, setDraftLink] = useState("");
    useEffect(() => {
        saveNotes(notes);
    }, [notes]);
    const addNote = () => {
        const text = draft.trim();
        const link = draftLink.trim();
        if (!text) return;
        setNotes((prev) => [
            {
                id: crypto.randomUUID(),
                text,
                link,
                pinned: false,
                createdAt: Date.now(),
            },
            ...prev,
        ]);
        setDraft("");
        setDraftLink("");
    };
    const togglePin = (id) => {
        setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
    };
    const deleteNote = (id) => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
    };
    const sorted = [...notes].sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return b.createdAt - a.createdAt;
    });
    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            <div className="flex flex-col w-full gap-2 p-2 mb-6 border">
                <Input
                    className="py-4"
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={pageCopy.notes.placeholder}
                />
                <Input
                    className="py-4"
                    type="text"
                    value={draftLink}
                    onChange={(e) => setDraftLink(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addNote()}
                    placeholder={pageCopy.notes.linkPlaceholder}
                />
                <Button onClick={addNote} variant={"secondary"} size={"sm"}>
                    {pageCopy.notes.add}
                </Button>
            </div>

            <div className="flex flex-col gap-2 w-full h-125 overflow-auto">
                {sorted.map((note) => (
                    <div
                        key={note.id}
                        className={cn(
                            "flex w-full items-center gap-3 px-4 py-3 border group transition-colors",
                            note.pinned ? "bg-foreground/10" : "bg-foreground/0",
                        )}
                    >
                        <Button
                            onClick={() => togglePin(note.id)}
                            size={"icon-sm"}
                            variant={"outline"}
                            title={note.pinned ? pageCopy.notes.unpin : pageCopy.notes.pin}
                        >
                            {note.pinned ? (
                                <MdPushPin className="size-4" />
                            ) : (
                                <MdOutlinePushPin className="size-4" />
                            )}
                        </Button>
                        <div className="w-full">
                            <p className="flex-1 text-sm break-all">{note.text}</p>
                            <Link
                                href={note.link}
                                target="_blank"
                                className="text-sm text-blue-500 break-all truncate w-[40%]"
                            >
                                {note.link}
                            </Link>
                        </div>
                        <Button
                            variant={"destructive"}
                            size={"icon-sm"}
                            onClick={() => deleteNote(note.id)}
                            className="group-hover:opacity-100"
                            title={pageCopy.notes.remove}
                        >
                            <IoTrashOutline className="size-4" />
                        </Button>
                    </div>
                ))}
            </div>

            {sorted.length === 0 && (
                <p className="text-center text-white/20 text-sm mt-8">{pageCopy.notes.empty}</p>
            )}
        </div>
    );
};

export default Notes;
