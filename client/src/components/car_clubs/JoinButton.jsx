import React from "react";
import axios from "axios";

const JoinButton = ({ joinClub }) => {
  return (
    <button className='btn btn-positive' onClick={(e) => joinClub(e)}>
      Join Club
    </button>
  );
};

export default JoinButton;
