import React, { createContext, useReducer } from "react";
import { Action, State } from "./context.interface";

const initialState = {
  user: null,
  loading: {
    user: true,
    data: true,
    login: false,
    register: false,
  },
  posts: [],
};

export const AppContext = createContext<State>(initialState);
export const AppDispatchContext = createContext<
  React.Dispatch<Action> | undefined
>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

export const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...state,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        loading: {
          ...state.loading,
          user: false,
        },
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    case "LOGIN_ERROR":
      return {
        ...state,
      };

    case "LOADING":
      return {
        ...state,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};
