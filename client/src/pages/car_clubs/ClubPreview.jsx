import React from "react";

const ClubPreview = ({ club }) => {
  return (
    <div className='border-2 border-black p-3 rounded-md'>
      <p>{club.name}</p>
      <p>{club.about}</p>
      <div>
        <p>Tags:</p>
        <div className='flex gap-2'>
          {club?.tags.map((e, i) => (
            <p key={i}>{e}</p>
          ))}
        </div>
      </div>
      <p>President: {club.president}</p>
    </div>
  );
};

export default ClubPreview;
