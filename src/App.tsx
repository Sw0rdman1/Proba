import { AppProvider } from "./context/app/AppContext";
import RootNavigation from "./navigation";

export default function App() {
  return (
    <AppProvider>
      <RootNavigation />
    </AppProvider>
  );
}
