import Sidebar from "./components/Sidebar";

import Header from "./components/Header";
import Board from "./components/Board";

function App() {
  return (
    <div className="bg-slate-800">
      <div className="max-w-7xl min-h-screen mx-auto flex  text-zinc-100">
        <Sidebar />
        <div className="my-8 mr- w-full">
          <Header />
          <Board />
        </div>
      </div>
    </div>
  );
}

export default App;
