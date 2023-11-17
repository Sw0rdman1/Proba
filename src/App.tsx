import { AppProvider } from "./context/app/AppContext";
import RootNavigation from "./navigation";
import "./utils/firebaseConfig";

export default function App() {
  return (
    <AppProvider>
      <RootNavigation />
    </AppProvider>
  );
}
