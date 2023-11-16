import { useContext } from "react";
import { AppContext, AppDispatchContext } from "./AppContext";

export function useAppContext() {
  return useContext(AppContext);
}

export function useDispatchContext() {
  return useContext(AppDispatchContext);
}
