import { DocumentData } from "firebase/firestore";
export type Board = {
  title: string;
  color: string;
  //   createdAt: string;
};

export type TData = {
  tasks: DocumentData;
  title: string;
};

export type TaskCard = {
  cardId: string;
  data: DocumentData;
  title: string;
};

export type Task = {
  taskId: string;
  title: string;
  boardId: string;
  cardId: string;
  completed: boolean;
};
