import { PlusSquare } from "lucide-react";
import { useState } from "react";

type AddColumnType = {
  setOpen: any;
  setColumns: any;
  columns: any;
};

function AddColumnModal({ setOpen, setColumns, columns }: AddColumnType) {
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
    <div className="w-56 p-2 mt-8">
      <form onSubmit={handleSubmit} className="text-black">
        <label htmlFor="title">Title:</label>
        <input
          onChange={handleChange}
          value={title}
          className="px-2 border border-gray-400"
          type="text"
          placeholder="title"
        />
        Color:
        <div className="flex items-center justify-center gap-2 m-2">
          <input
            onClick={getColorValue}
            className="inline-block w-4 h-4 bg-red-600 rounded-full cursor-pointer focus:outline-none focus:ring focus:ring-black"
            id="red"
          ></input>
          <input
            onClick={getColorValue}
            className="inline-block w-4 h-4 bg-blue-600 rounded-full cursor-pointer focus:outline-none focus:ring focus:ring-black"
            id="blue"
          ></input>
          <input
            onClick={getColorValue}
            className="inline-block w-4 h-4 bg-green-600 rounded-full cursor-pointer focus:outline-none focus:ring focus:ring-black"
            id="green"
          ></input>
          <input
            onClick={getColorValue}
            className="inline-block w-4 h-4 bg-yellow-400 rounded-full cursor-pointer focus:outline-none focus:ring focus:ring-black"
            id="yellow"
          ></input>
        </div>
        <button
          type="submit"
          className="flex justify-center w-full gap-2 py-2 rounded-lg hover:bg-slate-700/80"
        >
          <PlusSquare /> Add
        </button>
      </form>
    </div>
  );
}

export default AddColumnModal;
