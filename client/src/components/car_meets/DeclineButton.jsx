import React from "react";
import axios from "axios";

const DeclineButton = ({ meet, setMeets, meets }) => {
  const declineMeet = (e) => {
    e.preventDefault();
    axios
      .put(`/api/carmeet/decline/${meet._id}`, meet, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("test");
        console.log(meet.attendance.users);
        meet.attendance.users = meet.attendance.users.filter(
          (user) => user !== res.data
        );
        console.log(meet.attendance.users);
        setMeets([...meets]);
      })
      .catch((err) => console.log(err));
  };

  console.log(meet);
  return (
    <button
      className='border-2 border-red-700 bg-red-200 py-2 px-6'
      onClick={(e) => declineMeet(e)}>
      Cant make it
    </button>
  );
};

export default DeclineButton;
