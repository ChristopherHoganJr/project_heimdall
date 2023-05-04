import React from "react";

const AttendButton = ({ attendMeet }) => {
  return (
    <button className='btn btn-positive' onClick={(e) => attendMeet(e)}>
      Attend Meet
    </button>
  );
};

export default AttendButton;
