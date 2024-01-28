export type Board = {
  title: string;
  color: string;
  //   createdAt: string;
};

export type TaskCard = {
  title: string;
  cardId: string;
};

export type Task = {
  taskId: string;
  title: string;
  boardId: string;
  cardId: string;
  completed: boolean;
};
