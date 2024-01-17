import Board from "./components/Board";
import { BoardsComponent } from "./components/Boards";

const testColumns1 = [
  { title: "todo", iconColor: "red", items: ["do loundry", "go to the gym"] },
  { title: "doing", iconColor: "yellow", items: ["do homework"] },
  { title: "done", iconColor: "green", items: ["wash dishes"] },
];

const testColumns2 = [
  { title: "todo2", iconColor: "red", items: ["do loundry", "go to the gym"] },
  { title: "doing2", iconColor: "yellow", items: ["do homework"] },
  { title: "done2", iconColor: "green", items: ["wash dishes"] },
];

function App() {
  const boards = [
    { label: "Tab 1", content: <Board columnsData={testColumns1} /> },
    { label: "Tab 2", content: <div>Content for Tab 2</div> },
    { label: "Tab 3", content: <div>Content for Tab 3</div> },
  ];

  return (
    <div className="bg-slate-800">
      <div className="min-h-screen mx-auto max-w-7xl text-zinc-100">
        <BoardsComponent boards={boards} />
      </div>
    </div>
  );
}

export default App;
