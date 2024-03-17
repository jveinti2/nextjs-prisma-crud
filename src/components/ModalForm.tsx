"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNotes } from "@/context/NoteContext";
import { HiMiniPlus, HiMiniPencil } from "react-icons/hi2";

export default function ModalForm({ id, titleNote, contentNote }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { createNote, updateNote } = useNotes();

  useEffect(() => {
    if (isEdit) {
      setTitle(titleNote);
      setContent(contentNote);
    }
  }, [isEdit]);

  return (
    <>
      {id ? (
        <button
          className=" bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm p-2 rounded shadow hover:shadow-lg outline-none focus:outline-none "
          onClick={() => {
            setIsModalOpen(true), setIsEdit(true);
          }}
        >
          <HiMiniPencil />
        </button>
      ) : (
        <button
          className=" bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm p-2 rounded shadow hover:shadow-lg outline-none focus:outline-none "
          onClick={() => setIsModalOpen(true)}
        >
          <HiMiniPlus />
        </button>
      )}
      <div>
        {isModalOpen ? (
          <>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (isEdit) {
                  await updateNote({ id, title, content });
                } else {
                  await createNote({ title, content });
                }
                setIsModalOpen(false);
              }}
            >
              <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                <div className="relative w-auto max-w-3xl mx-auto my-6">
                  <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                      <h3 className="text-3xl font-semibold text-black">
                        Formulario de nota
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setIsModalOpen(false)}
                      >
                        <span className="block w-6 h-6 text-3xl text-black bg-transparent outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    <div className="relative flex-auto p-6">
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="title"
                        >
                          Título
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="title"
                          type="text"
                          placeholder="Título de la nota"
                          onChange={(e) => setTitle(e.target.value)}
                          value={title}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="content"
                        >
                          Contenido
                        </label>
                        <textarea
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="content"
                          placeholder="Contenido de la nota"
                          onChange={(e) => setContent(e.target.value)}
                          value={content}
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cerrar
                      </button>
                      <button
                        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="submit"
                        style={{ transition: "all .15s ease" }}
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fixed inset-0 z-0 bg-black opacity-25"></div>
            </form>
          </>
        ) : null}
      </div>
    </>
  );
}
