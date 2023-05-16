import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// components
import AttendButton from "./AttendButton";
import DeclineButton from "./DeclineButton";
import DeleteButton from "./DeleteButton";

const MeetPreview = ({ meet, currentUser, setMeets, meets }) => {
  console.log(meet);

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
      <h2 className='font-semibold text-2xl w-full text-center'>
        {meet?.title}
      </h2>
      <div
        className='h-[300px] overflow-hidden w-full bg-center bg-no-repeat bg-cover'
        style={{
          backgroundImage: `url(http://localhost:8000/${meet?.image})`,
        }}></div>

      {currentUser?.id !== meet?.host?._id && (
        <p className='text-sm'>Hosted by: {meet?.host?.name}</p>
      )}
      <div className='grid grid-cols-2 gap-2 w-full'>
        <div className='flex flex-col gap-2'>
          <p className='p-2 border-black rounded-md border-2'>
            <span className='font-semibold text-md'>Date:</span> {meet?.date}
          </p>
          <Link to={`/carmeets/${meet?._id}`} className='btn btn-view'>
            View Meet
          </Link>
          {currentUser?.id === meet?.host?.president ? (
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
        <div className='border-2 border-black p-2 rounded-md break-all'>
          <h3>Location: {meet?.location}</h3>
          <Link to={meet?.locationLink} className='underline text-blue-500'>
            Maps Link
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MeetPreview;
