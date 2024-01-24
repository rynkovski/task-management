export type Board = {
  title: string;
  color: string;
  //   createdAt: string;
};

export type TaskCard = {
  title: string;
  boardId: string;
  cardId: string;
};

export type BoardId = {
  id: string;
};
