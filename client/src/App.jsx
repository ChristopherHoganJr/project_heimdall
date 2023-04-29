import { Routes, Route } from "react-router-dom";
import axios from "axios";

// components
import Navbar from "./components/Navigation/Navbar";

// pages
import Landing from "./pages/Landing";
import Login from "./pages/account/Login";
import Register from "./pages/account/Register";

axios.defaults.baseURL = "http://localhost:8000";

function App() {
  return (
    <>
      <Navbar />
      <main className='p-2'>
        <Routes>
          <Route path={"/"} element={<Landing />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
