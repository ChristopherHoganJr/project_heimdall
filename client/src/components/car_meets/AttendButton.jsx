import React from "react";
import axios from "axios";

const AttendButton = ({ meet, setMeets, meets }) => {
  const attendMeet = (e) => {
    e.preventDefault();
    axios
      .put(`/api/carmeet/attend/${meet._id}`, meet, {
        withCredentials: true,
      })
      .then((res) => {
        meet.attendance.users = [...meet.attendance.users, res.data];
        setMeets([...meets]);
      })
      .catch((err) => console.log(err));
  };
  return (
    <button
      className='border-2 border-green-700 bg-green-200 py-2 px-6'
      onClick={(e) => attendMeet(e)}>
      Attend Meet
    </button>
  );
};

export default AttendButton;
