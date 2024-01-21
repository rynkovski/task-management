export type AuthorizationStoreState = {
  authorized: boolean;
  setAuthorized: (flag: boolean) => void;
};

export type LoginInput = {
  email: string;
  password: string;
};
