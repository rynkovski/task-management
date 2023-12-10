import { Circle, PlusSquare } from "lucide-react";
import { useState } from "react";

function Board() {
  const [columns, setColumns] = useState([
    { title: "todo", iconColor: "red", items: ["do loundry", "go to the gym"] },
    { title: "doing", iconColor: "yellow", items: ["do homework"] },
    { title: "done", iconColor: "green", items: ["wash dishes"] },
  ]);

  function createColumn() {
    setColumns([{ title: "test", iconColor: "blue", items: ["test"] }]);
  }
  return (
    <div className="flex jus gap-2 p-8 border-b  border-r border-zinc-400">
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
            <button>add item</button>
          </div>
        );
      })}

      <button
        onClick={() => createColumn}
        className="flex items-center bg-slate-700 hover:bg-slate-700/80 gap-2 p-2 rounded-lg"
      >
        <PlusSquare /> Add Column
      </button>
    </div>
  );
}

export default Board;
