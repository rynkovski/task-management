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
  id: Id;
  columnId: Id;
  content: string;
};

export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};
