import { Outlet } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "./context/auth";
import { ErrorProvider } from "./commons/hooks/message";

function App() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <RecoilRoot>
          <Outlet />
        </RecoilRoot>
      </AuthProvider>
    </ErrorProvider>
  );
}

export default App;
