import AuthStack from "./authStack";
import UserStack from "./userStack";
import { useAppContext } from "../context/app/useApp";

export default function RootNavigation() {
  const { user, loading } = useAppContext();
  const isLoading = loading.user || loading.data;

  if (isLoading) {
    // TODO: Add a loading screen
  }

  return user ? <UserStack /> : <AuthStack />;
}
