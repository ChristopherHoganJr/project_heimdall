import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

// contexts
import { UserContext } from "./contexts/UserContext";

// components
import Navbar from "./components/Navigation/Navbar";

// pages
import Landing from "./pages/Landing";

// pages -- account
import Login from "./pages/account/Login";
import Register from "./pages/account/Register";

// pages -- car meets
import MainWall from "./pages/car_meets/MainWall";
import CreateMeet from "./pages/car_meets/CreateMeet";
import EditMeet from "./pages/car_meets/EditMeet";

axios.defaults.baseURL = "http://localhost:8000";

function App() {
  const { currentUser } = useContext(UserContext);
  return (
    <>
      <Navbar />
      <main className='p-2'>
        <Routes>
          {currentUser ? (
            <Route path={"/"} element={<MainWall />} />
          ) : (
            <Route path={"/"} element={<Landing />} />
          )}
          {/* Account Paths */}
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          {/* Car Meet Paths */}
          <Route path={"/carmeets/create"} element={<CreateMeet />} />
          <Route path={"/carmeets/edit/:meet_id"} element={<EditMeet />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
