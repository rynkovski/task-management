import { CheckSquare, KanbanSquare, PlusSquare } from "lucide-react";

const boards = ["New board", "New board2", "New board3"];

function Sidebar() {
  return (
    <aside className="border border-zinc-400 p-8 my-8 mx-4 rounded-lg w-1/3">
      <p className="text-xl font-bold mb-8 flex items-center gap-2 cursor-default">
        <CheckSquare color="#6366f1" />
        kanban
      </p>
      <p className="mb-2">Boards:</p>
      <ul className="mb-6">
        {boards.map((board, idx) => {
          return (
            <li key={idx}>
              <a
                className="flex mb-2 hover:rounded-lg hover:bg-indigo-700 px-4 py-2 gap-2 active:bg-indigo-700"
                href=""
              >
                <KanbanSquare />
                {board}
              </a>
            </li>
          );
        })}
      </ul>
      <button className="flex text-indigo-500 gap-2 hover:rounded-lg hover:bg-indigo-700 px-4 py-2 hover:text-zinc-100">
        <PlusSquare /> Add New Board
      </button>
    </aside>
  );
}

export default Sidebar;
