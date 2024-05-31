import React, { ReactNode, useCallback, useEffect, useReducer } from 'react';

import { authMe } from '@/api/authMe';
import { authRegister } from '@/api/authRegister';
import { authSignIn } from '@/api/authSignin';
import { ACCESS_KEY, LOGIN_MESSAGE, REFRESH_KEY } from '@/constants/local-storage';
import { ActionType, InitializeAction, State } from '@/contexts/user-context/user-context-type';

import { SignInInputs, SignUpInputs, UserContext, initialState } from './user-context';

// create a reference to signOut function
let signOutUser: () => void;
export const globalSignOut = () => {
  if (signOutUser) {
    signOutUser();
  }
};

const reducer = (state: State, action: any): State => {
  switch (action.type) {
    case 'INITIALIZE': {
      const { isAuthenticated, userData } = action.payload as InitializeAction['payload'];
      return {
        ...state,
        isAuthenticated,
        userData,
      };
    }
    case 'SIGN_IN': {
      const { userData } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        userData,
      };
    }
    case 'SIGN_UP': {
      return { ...state };
    }
    case 'SIGN_OUT': {
      return {
        ...state,
        isAuthenticated: false,
        userData: null,
      };
    }
    default:
      return state;
  }
};

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    const accessToken = localStorage.getItem(ACCESS_KEY);
    if (accessToken) {
      try {
        const res = await authMe();
        if (!res) return;
        const userData = res.data;
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: true,
            userData,
          },
        });
      } catch (err) {
        console.error('init error', err);
      }
    } else {
      dispatch({
        type: ActionType.INITIALIZE,
        payload: {
          isAuthenticated: false,
          userData: null,
        },
      });
    }
  }, [dispatch]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const signIn = useCallback(
    async ({ email, password }: SignInInputs): Promise<void> => {
      try {
        const res = await authSignIn(email, password);
        if (res.data.message === 'login success') {
          const { accessToken, refreshToken, message } = res.data;

          localStorage.setItem(ACCESS_KEY, accessToken);
          localStorage.setItem(REFRESH_KEY, refreshToken);
          localStorage.setItem(LOGIN_MESSAGE, message);

          const resMe = await authMe();
          if (!resMe) return;
          const userData = resMe.data;
          dispatch({
            type: ActionType.SIGN_IN,
            payload: {
              userData,
            },
          });
        } else {
          const { message } = res.data;
          localStorage.setItem(LOGIN_MESSAGE, message);
        }
      } catch (err) {
        // console.error('sign in failed', err);
        throw err;
      }
    },
    [dispatch]
  );

  const signUp = useCallback(
    async ({ firstName, lastName, email, password }: SignUpInputs): Promise<void> => {
      try {
        await authRegister(firstName, lastName, email, password);
      } catch (err) {
        console.error('sign up failed', err);
        throw err;
      }
    },

    []
  );

  const signOut = useCallback(async () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    dispatch({ type: ActionType.SIGN_OUT });
  }, [dispatch]);

  signOutUser = signOut;

  return (
    <UserContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        initialize,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
