import { createContext, useContext } from "react";

export const BoardContext = createContext<string | undefined>(undefined);

export function useBoardIdContext() {
  const boardId = useContext(BoardContext);

  if (boardId === undefined) {
    throw new Error("useBoardIdContext must be used with a BoardContext");
  }
  return boardId;
}
