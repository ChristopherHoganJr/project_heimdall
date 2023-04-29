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

// pages -- car clubs
import CarClubWall from "./pages/car_clubs/CarClubWall";
import CreateClub from "./pages/car_clubs/CreateClub";

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
          {/* Car Club Paths */}
          <Route path={"/carclubs/"} element={<CarClubWall />} />
          <Route path={"/carclubs/create"} element={<CreateClub />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
