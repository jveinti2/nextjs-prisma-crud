"use client";
import React, { useContext } from "react";
import { createContext, useState } from "react";

export const NoteContext = createContext<{
  notes: any[];
  loadNotes: () => Promise<void>;
  createNote: (note: any) => Promise<void>;
}>({
  notes: [],
  loadNotes: async () => {},
  createNote: async (note: any) => {},
});

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNotes must be used within a NoteProvider");
  }
  return context;
};

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<any>([]);

  async function loadNotes() {
    const res = await fetch("/api/notes/");
    const data = await res.json();
    setNotes(data);
  }

  async function createNote(note: any) {
    const res = await fetch("/api/notes/", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newNote = await res.json();
    setNotes([...notes, newNote]);
  }

  return (
    <NoteContext.Provider value={{ notes, loadNotes, createNote }}>
      {children}
    </NoteContext.Provider>
  );
};
