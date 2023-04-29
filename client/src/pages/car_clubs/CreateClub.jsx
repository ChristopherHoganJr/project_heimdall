import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateClub = () => {
  const navigate = useNavigate();
  const [clubInfo, setClubInfo] = useState({
    name: "",
    about: "",
    tags: "",
  });

  const createClub = (e) => {
    e.preventDefault();
    e.preventDefault();
    axios
      .post("/api/carclub/new", clubInfo, { withCredentials: true })
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Create Car Club</h1>
      <form action='' onSubmit={(e) => createClub(e)}>
        <div className='flex flex-col gap-2'>
          <label htmlFor=''>Club Name: </label>
          <input
            type='text'
            className='border-2 border-black w-full px-2 py-1 rounded-md'
            placeholder='club name'
            value={clubInfo.name}
            onChange={(e) => setClubInfo({ ...clubInfo, name: e.target.value })}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor=''>Tell us about your club: </label>
          <input
            type='text'
            className='border-2 border-black w-full px-2 py-1 rounded-md'
            placeholder='Club summary'
            value={clubInfo.about}
            onChange={(e) =>
              setClubInfo({ ...clubInfo, about: e.target.value })
            }
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor=''>Tags: split tags with ', '</label>
          <input
            type='text'
            className='border-2 border-black w-full px-2 py-1 rounded-md'
            placeholder='Club tags'
            value={clubInfo.tags}
            onChange={(e) => setClubInfo({ ...clubInfo, tags: e.target.value })}
          />
        </div>
        <button className='border-2 border-black py-2 rounded-md mt-1'>
          Create Club
        </button>
      </form>
    </>
  );
};

export default CreateClub;
