import "./App.css";
import { Route, Routes } from "react-router-dom";

import React, { useEffect } from "react";
import Navigation from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NewArticle from "./components/AddArticle";
import { useNavigate } from "react-router-dom";

//===============================================================

import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const { isLoggedIn } = useSelector((state) => {
    return { isLoggedIn: state.auth.isLoggedIn };
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, [isLoggedIn]);
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path={"/"} element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newArticle" element={<NewArticle />} />
      </Routes>
    </div>
  );
};

export default App;
