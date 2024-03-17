"use client";
import { useEffect } from "react";
import Card from "@/components/Card";
import ModalForm from "@/components/ModalForm";
import { useNotes } from "@/context/NoteContext";

function HomePage() {
  const { notes: notesDb, loadNotes, getNoteById } = useNotes();

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <>
      <div className="container mx-auto space-y-3">
        <div className="flex justify-center gap-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Notas
          </h1>
          <ModalForm />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {notesDb.map((note) => (
            <div key={note.id}>
              <Card
                id={note.id}
                title={note.title}
                content={note.content}
                createdAt={note.createdAt}
                updatedAt={note.updatedAt}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
