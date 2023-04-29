import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// contexts
import { UserContext } from "../../contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const loginAccount = (e) => {
    e.preventDefault();
    axios
      .post("/api/account/login", loginInfo, { withCredentials: true })
      .then((user) => {
        setCurrentUser(user.data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Login Page</h1>
      <form
        action=''
        className='border-2 border-black rounded-md p-4 flex flex-col gap-3'
        onSubmit={(e) => loginAccount(e)}>
        <div className='flex flex-col gap-1'>
          <label htmlFor=''>Email: </label>
          <input
            className='border-2 border-black rounded-md p-1 w-full'
            type='email'
            placeholder='email address'
            value={loginInfo.email}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, email: e.target.value })
            }
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor=''>Password: </label>
          <input
            className='border-2 border-black rounded-md p-1 w-full'
            type='password'
            placeholder='password'
            value={loginInfo.password}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
          />
        </div>
        <button className='border-2 border-black py-2 rounded-md mt-1'>
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
