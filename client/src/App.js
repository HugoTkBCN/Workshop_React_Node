import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const [team, setTeam] = useState(null);

  useEffect(() => {
  }, [team]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Navigate to="/app" />} />
        <Route path="app" element={<Layout team={team} setTeam={setTeam} />}>
          <Route index element={<Home team={team} setTeam={setTeam} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
