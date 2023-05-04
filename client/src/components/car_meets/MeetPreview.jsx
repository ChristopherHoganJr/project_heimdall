import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// components
import AttendButton from "./AttendButton";
import DeclineButton from "./DeclineButton";
import DeleteButton from "./DeleteButton";

const MeetPreview = ({ meet, currentUser, setMeets, meets }) => {
  const declineMeet = (e) => {
    e.preventDefault();
    console.log(meet);
    axios
      .put(`/api/carmeet/decline/${meet._id}`, meet, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        meet.attendance.users = meet.attendance.users.filter(
          (user) => user._id !== res.data._id
        );
        setMeets([...meets]);
        console.log(meet);
      })
      .catch((err) => console.log(err));
  };

  const attendMeet = (e) => {
    e.preventDefault();
    axios
      .put(`/api/carmeet/attend/${meet._id}`, meet, {
        withCredentials: true,
      })
      .then((res) => {
        meet.attendance.users = [...meet.attendance.users, res.data];
        setMeets([...meets]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='border-2 border-black rounded-md p-3 flex flex-col gap-1 items-start'>
      <h2 className='font-semibold text-3xl w-full text-center'>
        {meet?.title}
      </h2>
      {meet?.image && <img src={`http://localhost:8000/${meet?.image}`} />}
      {currentUser?.id !== meet?.host?._id && (
        <p className='text-sm'>Hosted by: {meet?.host.username}</p>
      )}
      <div className='flex gap-2'>
        <div className='flex flex-col gap-2 flex-wrap'>
          <p className='p-2 border-black rounded-md border-2'>
            <span className='font-semibold'>Date:</span> {meet?.date}
          </p>
          <Link to={`/carmeets/${meet?._id}`} className='btn btn-view'>
            View Meet
          </Link>
          {currentUser?.username === meet?.host?.username ? (
            <>
              <Link to={`/carmeets/edit/${meet?._id}`} className='btn btn-edit'>
                Edit Post
              </Link>
              <DeleteButton setMeets={setMeets} meets={meets} meet={meet} />
            </>
          ) : (
            <>
              {meet?.attendance?.users?.find(
                (user) => user["_id"] === currentUser?.id
              ) ? (
                <DeclineButton declineMeet={declineMeet} />
              ) : (
                <AttendButton attendMeet={attendMeet} />
              )}
            </>
          )}
        </div>
        <div className='border-2 border-black p-2 rounded-md break-all '>
          <h3>Location: {meet?.location}</h3>
          <Link to={meet?.locationLink} className='underline text-blue-500'>
            {meet?.locationLink}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MeetPreview;
