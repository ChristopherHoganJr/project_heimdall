import React from "react";
import { Link } from "react-router-dom";

const MeetPreview = ({ title, about, host, meet_id, currentUser }) => {
  console.log(currentUser);
  return (
    <div className='border-2 border-black rounded-md p-3 flex flex-col gap-1 items-start'>
      <p className='font-semibold'>{title}</p>
      <p className=''>{about}</p>
      {currentUser?.username === host.username ? (
        <Link
          to={`/carmeets/edit/${meet_id}`}
          className='px-6 py-2 border-2 border-black'>
          Edit Post
        </Link>
      ) : (
        <p className='text-sm'>Hosted by: {host.username}</p>
      )}
    </div>
  );
};

export default MeetPreview;
