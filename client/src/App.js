import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Component/Layout";
import IndexPages from "./Pages/IndexPages";
import LoginPage from "./Pages/LoginPage";
import RegistePage from "./Pages/RegisterPage";
import { UserContextProvider } from "./Context/UserContext";

function App() {

  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPages />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistePage />} />
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
