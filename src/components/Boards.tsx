import { CheckSquare, KanbanSquare, PlusSquare } from "lucide-react";
import { useState } from "react";

export const Boards = ({ boards, onBoardClick, activeBoard }: any) => {
  return (
    <aside className="w-1/3 p-8 mx-4 my-8 border rounded-lg border-zinc-400">
      <p className="flex items-center gap-2 mb-8 text-xl font-bold cursor-default">
        <CheckSquare color="#6366f1" />
        kanban
      </p>
      <p className="mb-2">Boards:</p>
      <ul className="mb-6">
        {boards.map((board: any, index: any) => (
          <button
            className="flex justify-between gap-2 px-4 py-2 hover:bg-indigo-700 hover:rounded-lg"
            key={index}
            onClick={() => onBoardClick(index)}
            style={{ fontWeight: index === activeBoard ? "bold" : "normal" }}
          >
            <KanbanSquare />
            {board.label}
          </button>
        ))}
      </ul>
      <button className="flex gap-2 px-4 py-2 text-indigo-500 hover:rounded-lg hover:bg-indigo-700 hover:text-zinc-100">
        <PlusSquare /> Add New Board
      </button>
    </aside>
  );
};

export const BoardsContent = ({ boards, activeBoard }: any) => {
  return <div className="w-2/3 mx-4 my-8 ">{boards[activeBoard].content}</div>;
};

export const BoardsComponent = ({ boards }: any) => {
  const [activeBoard, setActiveBoard] = useState(0);

  const handleBoardClick = (index: any) => {
    setActiveBoard(index);
  };

  return (
    <div className="flex h-screen">
      <Boards
        boards={boards}
        onBoardClick={handleBoardClick}
        activeBoard={activeBoard}
      />
      <BoardsContent boards={boards} activeBoard={activeBoard} />
    </div>
  );
};
