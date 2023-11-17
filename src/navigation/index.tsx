import AuthStack from "./authStack";
import UserStack from "./userStack";
import { useAppContext } from "../context/app/useApp";
import LoadingScreen from "../screens/LoadingScreen";

export default function RootNavigation() {
  const { user, loading } = useAppContext();
  const isLoading = loading.user || loading.data;

  if (isLoading) {
    return <LoadingScreen loading={loading} />;
  }

  return user ? <UserStack /> : <AuthStack />;
}
