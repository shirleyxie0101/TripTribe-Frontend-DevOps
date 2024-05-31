import { createContext, useContext } from 'react';

import { State } from './user-context-type';

export const initialState: State = {
  isAuthenticated: false,
  userData: null,
};
export type SignInInputs = {
  email: string;
  password: string;
};
export type SignUpInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UserContextProps = State & {
  signIn: ({ email, password }: SignInInputs) => Promise<void>;
  signUp: ({ firstName, lastName, email, password }: SignUpInputs) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
};

export const UserContext = createContext<UserContextProps>({
  ...initialState,
  signIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  initialize: () => Promise.resolve(),
});

export const useUserContext = () => useContext(UserContext);
