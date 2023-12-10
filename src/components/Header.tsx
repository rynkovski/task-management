import { PlusSquare, Settings2 } from "lucide-react";
import Button from "./ui/button";

function Header() {
  return (
    <header className="flex items-center justify-end gap-2 p-8 border-b border-t border-r border-zinc-400">
      <Button
        style={"bg-indigo-700/70"}
        text={"Add task"}
        icon={<PlusSquare />}
      />
      <Button icon={<Settings2 />} />
    </header>
  );
}

export default Header;
