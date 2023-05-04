import React from "react";
import axios from "axios";

const DeleteButton = ({ meet, setMeets, meets }) => {
  const deleteMeet = (e) => {
    e.preventDefault();
    axios
      .delete(`/api/carmeet/${meet._id}`, { withCredentials: true })
      .then((res) => {
        let newMeets = meets.filter((m) => m._id !== res.data._id);
        setMeets([...newMeets]);
      })
      .catch((err) => console.log(err));
  };
  return (
    <button onClick={(e) => deleteMeet(e)} className='btn btn-delete'>
      Delete Meet
    </button>
  );
};

export default DeleteButton;
