import { HiTrash } from "react-icons/hi2";
import ModalForm from "./ModalForm";
import { useNotes } from "@/context/NoteContext";
export default function Card({ id, title, content, createdAt, updatedAt }) {
  const { deleteNote } = useNotes();
  return (
    <>
      <a
        href="#"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {content}
        </p>
        <p>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            {createdAt}
          </span>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            {updatedAt}
          </span>
        </p>
        <div className="flex gap-1 mt-2">
          <ModalForm id={id} titleNote={title} contentNote={content} />
          <button
            className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
            onClick={() => deleteNote(id)}
          >
            <HiTrash />
          </button>
        </div>
      </a>
    </>
  );
}
