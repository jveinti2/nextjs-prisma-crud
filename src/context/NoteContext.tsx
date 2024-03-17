"use client";
import React, { useContext } from "react";
import { createContext, useState } from "react";

export const NoteContext = createContext<{
  notes: any[];
  loadNotes: () => Promise<void>;
  createNote: (note: any) => Promise<void>;
  updateNote: (note: any) => Promise<void>;
  deleteNote: (id: any) => Promise<void>;
}>({
  notes: [],
  loadNotes: async () => {},
  createNote: async (note: any) => {},
  updateNote: async (note: any) => {},
  deleteNote: async (id: any) => {},
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

  async function updateNote(note: any) {
    const res = await fetch(`/api/notes/${note.id}`, {
      method: "PUT",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const updatedNote = await res.json();
    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  }

  async function deleteNote(id: any) {
    const res = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setNotes(notes.filter((note) => note.id !== id));
  }

  return (
    <NoteContext.Provider
      value={{ notes, loadNotes, createNote, updateNote, deleteNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};
