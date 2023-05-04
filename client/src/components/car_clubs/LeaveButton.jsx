import React from "react";
import axios from "axios";

const LeaveButton = ({ leaveClub }) => {
  return (
    <button className='btn btn-delete' onClick={(e) => leaveClub(e)}>
      Leave Club
    </button>
  );
};

export default LeaveButton;
