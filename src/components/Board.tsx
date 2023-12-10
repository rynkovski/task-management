import { Circle, Dot, PlusSquare } from "lucide-react";
import { useState } from "react";
import Modal from "./ui/modal";

const testColumns = [
  { title: "todo", iconColor: "red", items: ["do loundry", "go to the gym"] },
  { title: "doing", iconColor: "yellow", items: ["do homework"] },
  { title: "done", iconColor: "green", items: ["wash dishes"] },
];

function Board() {
  //   const [columns, setColumns] = useState(testColumns);
  const [open, setOpen] = useState(false);

  //   function createColumn() {
  //     const newColumn = {
  //       title: "test",
  //       iconColor: "blue",
  //       items: ["test", "test"],
  //     };
  //     setColumns([...testColumns, newColumn]);
  //   }
  return (
    <div className="flex h-1/2 rounded-lg my-4 gap-2 p-8 border border-zinc-400">
      {testColumns.map((column) => {
        return (
          <div
            key={column.title}
            className="border flex flex-col  border-zinc-300 p-2"
          >
            <h3 className="flex gap-2">
              <Circle color={column.iconColor} />
              {column.title} ({column.items.length})
            </h3>
            <ul>
              {column.items.map((item) => {
                return <li key={item}>- {item}</li>;
              })}
            </ul>
          </div>
        );
      })}

      <button
        onClick={() => setOpen(true)}
        className="flex items-center bg-slate-700 hover:bg-slate-700/80 gap-2 p-2 rounded-lg"
      >
        <PlusSquare /> Add Column
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex p-2 mt-8 w-56">
          <form className="text-black">
            <label htmlFor="title">Title:</label>
            <input
              className="border border-gray-400 px-2"
              type="text"
              placeholder="title"
            />
            Color:
            <div className="flex mt-2 gap-2">
              <span className="bg-red-600 w-4 h-4 rounded-full inline-block cursor-pointer"></span>
              <span className="bg-blue-600 w-4 h-4 rounded-full inline-block cursor-pointer"></span>
              <span className="bg-green-600 w-4 h-4 rounded-full inline-block cursor-pointer"></span>
              <span className="bg-yellow-400 w-4 h-4 rounded-full inline-block cursor-pointer"></span>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Board;
