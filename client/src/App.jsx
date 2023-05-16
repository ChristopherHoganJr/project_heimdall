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
import SingleMeet from "./pages/car_meets/SingleMeet";

// pages -- car clubs
import CarClubWall from "./pages/car_clubs/CarClubWall";
import CreateClub from "./pages/car_clubs/CreateClub";
import SingleClub from "./pages/car_clubs/SingleClub";
import EditClub from "./pages/car_clubs/EditClub";

// pages -- user
import UserClubs from "./pages/user/UserClubs";
import UserMeets from "./pages/user/UserMeets";
import UserProfile from "./pages/user/UserProfile";

axios.defaults.baseURL = "http://localhost:8000";

function App() {
  const { currentUser } = useContext(UserContext);
  return (
    <>
      <Navbar />
      <main className='p-2 flex flex-col gap-2 max-w-7xl mx-auto'>
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
          <Route path={"/carmeets/create/:club_id"} element={<CreateMeet />} />
          <Route path={"/carmeets/edit/:meet_id"} element={<EditMeet />} />
          <Route path={"/carmeets/:meet_id"} element={<SingleMeet />} />
          {/* Car Club Paths */}
          <Route path={"/carclubs/"} element={<CarClubWall />} />
          <Route path={"/carclubs/create"} element={<CreateClub />} />
          <Route path={"/carclubs/:club_id"} element={<SingleClub />} />
          <Route path={"/carclubs/edit/:club_id"} element={<EditClub />} />
          {/* User Paths */}
          <Route path={"/user/:username"} element={<UserProfile />} />
          <Route path={"/user/:username/carclubs"} element={<UserClubs />} />
          <Route path={"/user/:username/carmeets"} element={<UserMeets />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
