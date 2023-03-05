import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Component/Layout";
import IndexPages from "./Pages/IndexPages";
import LoginPage from "./Pages/LoginPage";
import RegistePage from "./Pages/RegisterPage";
import { UserContextProvider } from "./Context/UserContext";
import CreatePost from "./Pages/CreatePost";
import PostPage from "./Pages/PostPage";

function App() {

  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPages />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistePage />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
