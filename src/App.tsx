import { AppRouter } from "./router";
import { SocketProvider } from "./context/SocketProvider";

function App() {
  return (
    <SocketProvider>
      <AppRouter />
    </SocketProvider>
  );
}

export default App;
