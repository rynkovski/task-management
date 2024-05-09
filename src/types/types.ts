export type Board = {
  title: string;
  color: string;
  //   createdAt: string;
};

export type Task = {
  id: Id;
  data: {
    columnId: Id;
    title: string;
  };
};

export type Id = string | number;

export type Column = {
  id: Id;
  data: {
    title: string;
  };
};
