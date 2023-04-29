import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateMeet = () => {
  const navigate = useNavigate();
  const [meet, setMeet] = useState({
    title: "",
    about: "",
  });

  const createMeet = (e) => {
    e.preventDefault();
    axios
      .post("/api/carmeet/new", meet, { withCredentials: true })
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <h1>Create Meet Page</h1>
      <form
        action=''
        className='flex flex-col gap-2'
        onSubmit={(e) => createMeet(e)}>
        <div className='flex flex-col gap-2'>
          <label htmlFor=''>Meet Name: </label>
          <input
            type='text'
            className='border-2 border-black w-full px-2 py-1 rounded-md'
            placeholder='meet name'
            value={meet.title}
            onChange={(e) => setMeet({ ...meet, title: e.target.value })}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor=''>About Meet: </label>
          <textarea
            value={meet.about}
            onChange={(e) => setMeet({ ...meet, about: e.target.value })}
            className='border-2 border-black w-full px-2 py-1 h-28 rounded-md'></textarea>
        </div>
        <button className='border-2 border-black py-2 rounded-md mt-1'>
          Post Meet
        </button>
      </form>
    </>
  );
};

export default CreateMeet;
