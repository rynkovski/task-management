import { Circle, PlusSquare } from "lucide-react";
import { useEffect, useState } from "react";
import Modal from "./ui/modal";
import AddColumnModal from "./add-column";

function Board({ columnsData }: any) {
  const [columns, setColumns] = useState(columnsData);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    if (localStorage.hasOwnProperty("columns")) {
      // const columns = JSON.parse(localStorage.getItem("columns"));
      if (columns) {
        setColumns(columns);
      }
    } else {
      console.log(columns);
    }
  }, []);

  return (
    <div className="flex h-full gap-2 p-4 border rounded-lg border-zinc-400">
      {columns.map((column: any) => {
        return (
          <div
            key={column.title}
            className="flex flex-col p-2 border h-fit border-zinc-400"
          >
            <h3 className="flex gap-2">
              <Circle color={column.iconColor} />
              {column.title} ({column.items.length})
            </h3>
            <ul>
              {column.items.map((item: any) => {
                return <li key={item}>- {item}</li>;
              })}
            </ul>
            <button className="flex items-center gap-2 p-2 rounded-lg bg-slate-700 hover:bg-slate-700/80">
              <PlusSquare /> Add
            </button>
          </div>
        );
      })}

      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 p-2 rounded-lg bg-slate-700 hover:bg-slate-700/80"
      >
        <PlusSquare /> Add Column
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <AddColumnModal
          setColumns={setColumns}
          columns={columns}
          setOpen={setOpen}
        />
      </Modal>
    </div>
  );
}

export default Board;
