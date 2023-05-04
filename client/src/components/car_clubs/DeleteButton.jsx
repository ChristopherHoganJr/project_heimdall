import React from "react";
import axios from "axios";

const DeleteButton = ({ deleteMeet }) => {
  return (
    <button onClick={(e) => deleteMeet(e)} className='btn btn-delete'>
      Delete Club
    </button>
  );
};

export default DeleteButton;
