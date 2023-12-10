import {
  CheckSquare,
  Circle,
  KanbanSquare,
  PlusSquare,
  Settings2,
} from "lucide-react";

const boards = ["New board", "New board2", "New board3"];

function App() {
  return (
    <div className="bg-slate-800">
      <div className="max-w-7xl min-h-screen mx-auto flex  text-zinc-100">
        <aside className="border border-zinc-400 p-8 my-8 w-1/3">
          <p className="text-xl font-bold mb-8 flex items-center gap-2">
            <CheckSquare color="#6366f1" />
            kanban
          </p>
          <p className="mb-2">Boards:</p>
          <ul className="mb-6">
            {boards.map((board) => {
              return (
                <li>
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
        <div className="my-8 w-full">
          <header className="flex items-center justify-end gap-2 p-8 border-b border-t border-r border-zinc-400">
            <button className="flex gap-2 hover:bg-indigo-700/75 rounded-lg bg-indigo-700 px-4 py-2">
              <PlusSquare />
              Add task
            </button>
            <button className="hover:bg-indigo-700 p-2 rounded-lg">
              <Settings2 />
            </button>
          </header>
          <div className="flex gap-2 p-8 border-b  border-r border-zinc-400">
            <div className="border border-zinc-300 p-2">
              <h3 className="flex gap-2">
                <Circle color="red" />
                todo (2)
              </h3>
              <ul>
                <li>do loundry</li>
                <li>go to the gym</li>
              </ul>
            </div>
            <div className="border border-zinc-300 p-2">
              <h3 className="flex gap-2">
                <Circle color="yellow" />
                doing (1)
              </h3>
              <ul>
                <li>do homework</li>
              </ul>
            </div>
            <div className="border border-zinc-300 p-2">
              <h3 className="flex gap-2">
                <Circle color="green" />
                done (1)
              </h3>
              <ul>
                <li>wash dishes</li>
              </ul>
            </div>
            <button className="flex items-center bg-slate-700 gap-2 p-2 rounded-lg">
              <PlusSquare /> Add Column
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
