import { Outlet } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "./context/auth";

function App() {
  return (
    <AuthProvider>
      <RecoilRoot>
        <Outlet />
      </RecoilRoot>
    </AuthProvider>
  );
}

export default App;
