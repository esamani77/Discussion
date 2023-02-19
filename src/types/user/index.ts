export type UserState = {
  avatar: string;
  name: string;
};

type SetAction = {
  type: "SET";
  payload: UserState;
};

type UnsetACtion = {
  type: "UNSET";
};

export type UserAction = SetAction | UnsetACtion;
