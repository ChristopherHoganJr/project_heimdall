import React from "react";
import { Link } from "react-router-dom";

// components
import AttendButton from "./AttendButton";
import DeclineButton from "./DeclineButton";
import DeleteButton from "./DeleteButton";

const MeetPreview = ({ meet, currentUser, setMeets, meets }) => {
  return (
    <div className='border-2 border-black rounded-md p-3 flex flex-col gap-1 items-start'>
      <Link to={`/carmeets/${meet?._id}`} className='font-semibold'>
        {meet?.title}
      </Link>
      <p className=''>{meet?.about}</p>
      {currentUser?.username === meet?.host?.username ? (
        <>
          <Link
            to={`/carmeets/edit/${meet?._id}`}
            className='px-6 py-2 border-2 border-black'>
            Edit Post
          </Link>
          <DeleteButton setMeets={setMeets} meets={meets} meet={meet} />
        </>
      ) : (
        <>
          <p className='text-sm'>Hosted by: {meet?.host.username}</p>
          {meet?.attendance?.users.includes(currentUser?.id) ? (
            <DeclineButton setMeets={setMeets} meets={meets} meet={meet} />
          ) : (
            <AttendButton setMeets={setMeets} meets={meets} meet={meet} />
          )}
        </>
      )}
      <p>
        {meet?.attendance?.users?.length}{" "}
        {meet?.attendance?.users?.length > 1 ||
        meet?.attendance?.users?.length === 0
          ? "people are"
          : "person is"}{" "}
        attending the meet.
      </p>
    </div>
  );
};

export default MeetPreview;
