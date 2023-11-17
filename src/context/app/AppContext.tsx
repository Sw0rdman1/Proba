import { createContext, useEffect, useReducer } from "react";
import { Action, State } from "./context.interface";

const initialState = {
  user: null,
  loading: {
    user: true,
    data: false,
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
    case "USER_LOGGED_IN":
      return {
        ...state,
        user: action.payload.user,
        loading: {
          ...state.loading,
          user: false,
          data: true,
        },
      };

    case "USER_NOT_LOGGED_IN":
      return {
        ...state,
        user: null,
        loading: {
          ...state.loading,
          user: false,
        },
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

  useEffect(() => {
    const checkUserLoggedIn = () => {
      setTimeout(() => {
        const user = null;

        if (user) {
          dispatch({
            type: "USER_LOGGED_IN",
            payload: { user: user },
          });
        } else {
          dispatch({ type: "USER_NOT_LOGGED_IN" });
        }
      }, 500);
    };
    checkUserLoggedIn();
  }, []);

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};
