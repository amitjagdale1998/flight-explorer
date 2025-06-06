import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import FetchData from "./component/FetchData";
import Signup from "./component/Signup";
import Home from "./component/Home";
import AdminHome from "./admin/AdminHome";

function App() {
  const user = JSON.parse(localStorage.getItem("loggedin-user"));

  return (
    <>
      <BrowserRouter>
        <Routes>
          {!user && (
            <>
              <Route path="/" element={<Login />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />} />
            </>
          )}

          {user?.role === "User" && (
            <>
              {" "}
              <Route path="/getdata" element={<FetchData />} />
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Home />} />
            </>
          )}
          {user?.role === "Admin" && (
            <>
              <Route excat="/home" path="/home" element={<AdminHome />} />
              <Route path="/" element={<AdminHome />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
