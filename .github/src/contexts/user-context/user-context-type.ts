import { User } from '@/types/user';

export type State = {
  isAuthenticated: boolean;
  userData: User | null;
  [key: string]: any;
};

export enum ActionType {
  INITIALIZE = 'INITIALIZE',
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  SIGN_OUT = 'SIGN_OUT',
}
export type ActionTypes = InitializeAction | SignInAction | SignUpAction | SignOutAction;
export type InitializeAction = {
  type: ActionType.INITIALIZE;
  payload: {
    isAuthenticated: boolean;
    userData: User | null;
  };
};
export type SignInAction = {
  type: ActionType.SIGN_IN;
  payload: {
    userData: User;
  };
};
export type SignUpAction = {
  type: ActionType.SIGN_UP;
  payload: {
    userData: User;
  };
};
export type SignOutAction = {
  type: ActionType.SIGN_OUT;
};
