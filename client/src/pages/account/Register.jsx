import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// contexts
import { UserContext } from "../../contexts/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  const [loginInfo, setLoginInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerAccount = (e) => {
    e.preventDefault();
    axios
      .post("/api/account/register", loginInfo, { withCredentials: true })
      .then((user) => {
        setCurrentUser(user.data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Account Registration Page</h1>
      <form
        action=''
        className='border-2 border-black rounded-md p-4 flex flex-col gap-3'
        onSubmit={(e) => registerAccount(e)}>
        <div className='flex flex-col gap-1'>
          <label htmlFor=''>Username: </label>
          <input
            className='border-2 border-black rounded-md p-1 w-full'
            type='text'
            placeholder='username'
            value={loginInfo.username}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, username: e.target.value })
            }
          />
        </div>
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
        <div className='flex flex-col gap-1'>
          <label htmlFor=''>Confirm Password: </label>
          <input
            className='border-2 border-black rounded-md p-1 w-full'
            type='password'
            placeholder='confirm password'
            value={loginInfo.confirmPassword}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, confirmPassword: e.target.value })
            }
          />
        </div>
        <button className='border-2 border-black py-2 rounded-md mt-1'>
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
