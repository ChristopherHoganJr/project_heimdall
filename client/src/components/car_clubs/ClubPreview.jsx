import React from "react";
import { Link } from "react-router-dom";

const ClubPreview = ({ club }) => {
  return (
    <Link
      to={`/carclubs/${club._id}`}
      className='border-2 border-black p-3 rounded-md'>
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
      <p>President: {club.president.username}</p>
    </Link>
  );
};

export default ClubPreview;
