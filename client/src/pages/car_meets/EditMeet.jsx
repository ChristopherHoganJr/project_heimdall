import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditMeet = () => {
  const navigate = useNavigate();
  const { meet_id } = useParams();

  const [meet, setMeet] = useState({
    title: "",
    about: "",
  });

  useEffect(() => {
    axios
      .get(`/api/carmeet/${meet_id}`)
      .then((meetData) => setMeet(meetData.data))
      .catch((err) => console.log(err));
  }, [meet_id]);

  const editMeet = (e) => {
    e.preventDefault();
    axios
      .put(`/api/carmeet/update/${meet_id}`, meet, { withCredentials: true })
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  console.log(meet);
  return (
    <>
      <h1>Edit Meet Page</h1>
      <form
        action=''
        className='flex flex-col gap-2'
        onSubmit={(e) => editMeet(e)}>
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
          Update Meet Info
        </button>
      </form>
    </>
  );
};

export default EditMeet;
