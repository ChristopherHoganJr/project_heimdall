import React from "react";

const DeclineButton = ({ declineMeet }) => {
  return (
    <button
      className='btn bg-orange-200 border-orange-600'
      onClick={(e) => declineMeet(e)}>
      Cant make it
    </button>
  );
};

export default DeclineButton;
