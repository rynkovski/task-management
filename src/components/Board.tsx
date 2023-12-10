import { Circle, PlusSquare } from "lucide-react";
import { useState } from "react";
import Modal from "./ui/modal";

const testColumns = [
  { title: "todo", iconColor: "red", items: ["do loundry", "go to the gym"] },
  { title: "doing", iconColor: "yellow", items: ["do homework"] },
  { title: "done", iconColor: "green", items: ["wash dishes"] },
];

function Board() {
  const [columns, setColumns] = useState(testColumns);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");

  function getColorValue(e: any) {
    setColor(e.target.id.toString());
  }
  const handleChange = (event: any) => {
    setTitle(event.target.value);
  };
  const handleSubmit = (event: any) => {
    if (title) {
      const newColumn = {
        title: title,
        iconColor: color,
        items: ["test", "test2"],
      };
      setColumns(columns.concat(newColumn));
    }
    event.preventDefault();
    setOpen(false);
  };
  return (
    <div className="flex h-1/2 rounded-lg my-4 gap-2 p-8 border border-zinc-400">
      {columns.map((column) => {
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
        <div className="p-2 mt-8 w-56">
          <form onSubmit={handleSubmit} className="text-black">
            <label htmlFor="title">Title:</label>
            <input
              onChange={handleChange}
              value={title}
              className="border border-gray-400 px-2"
              type="text"
              placeholder="title"
            />
            Color:
            <div className="flex m-2 gap-2 items-center justify-center">
              <input
                onClick={getColorValue}
                className="bg-red-600 w-4 h-4 rounded-full inline-block cursor-pointer focus:outline-none focus:ring focus:ring-black"
                id="red"
              ></input>
              <input
                onClick={getColorValue}
                className="bg-blue-600 w-4 h-4 rounded-full inline-block cursor-pointer focus:outline-none focus:ring focus:ring-black"
                id="blue"
              ></input>
              <input
                onClick={getColorValue}
                className="bg-green-600 w-4 h-4 rounded-full inline-block cursor-pointer focus:outline-none focus:ring focus:ring-black"
                id="green"
              ></input>
              <input
                onClick={getColorValue}
                className="bg-yellow-400 w-4 h-4 rounded-full inline-block cursor-pointer focus:outline-none focus:ring focus:ring-black"
                id="yellow"
              ></input>
            </div>
            <button
              type="submit"
              className="flex w-full justify-center hover:bg-slate-700/80 gap-2 py-2 rounded-lg"
            >
              <PlusSquare /> Add
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Board;
