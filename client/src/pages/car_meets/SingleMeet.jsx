import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// contexts
import { UserContext } from "../../contexts/UserContext";

// components
import DeclineButton from "../../components/car_meets/DeclineButton";
import AttendButton from "../../components/car_meets/AttendButton";
import UserPreview from "../../components/shared/UserPreview";

const SingleMeet = () => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser?.id);
  const { meet_id } = useParams();
  const [meet, setMeet] = useState({});
  useEffect(() => {
    axios
      .get(`/api/carmeet/${meet_id}`)
      .then((meetData) => setMeet(meetData.data))
      .catch((err) => console.log(err));
  }, [meet_id]);

  const declineMeet = (e) => {
    e.preventDefault();
    axios
      .put(`/api/carmeet/decline/${meet._id}`, meet, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        meet.attendance.users = meet.attendance.users.filter(
          (user) => user._id !== res.data._id
        );
        setMeet({ ...meet });
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
        console.log(res.data);
        meet.attendance.users = [...meet.attendance.users, res.data];
        setMeet({ ...meet });
      })
      .catch((err) => console.log(err));
  };

  console.log(meet);
  return (
    <>
      <h1 className='font-bold text-3xl'>{meet?.title}</h1>
      <h2 className='font-bold text-md'>Hosted By: {meet?.host?.username}</h2>
      {meet?.image && <img src={`http://localhost:8000/${meet?.image}`} />}

      <div className='flex gap-2 justify-center'>
        <p className='p-2 border-black rounded-md border-2'>
          <span className='font-semibold'>Date:</span> {meet?.date}
        </p>
        <p className='p-2 border-black rounded-md border-2'>
          <span className='font-semibold'>Time:</span> {meet?.time}
        </p>
      </div>
      <div className=''>
        <h3 className='font-semibold text-2xl'>About {meet?.title}</h3>
        <p>{meet?.about}</p>
      </div>
      <div className=''>
        <h3 className='font-semibold text-2xl'>
          Location: <span className='font-medium'>{meet?.location}</span>
        </h3>
        <Link to={meet?.locationLink} className='underline text-blue-500'>
          {meet?.locationLink}
        </Link>
      </div>

      <div className='flex gap-2 flex-wrap'>
        {currentUser?.username === meet?.host?.username ? (
          <>
            <Link to={`/carmeets/edit/${meet?._id}`} className='btn btn-edit'>
              Edit Post
            </Link>
          </>
        ) : (
          <>
            {meet?.attendance?.users.find(
              (user) => user["_id"] === currentUser?.id
            ) ? (
              <DeclineButton declineMeet={declineMeet} />
            ) : (
              <AttendButton attendMeet={attendMeet} />
            )}
          </>
        )}
      </div>
      <p>
        {meet?.attendance?.users?.length}{" "}
        {meet?.attendance?.users?.length > 1 ||
        meet?.attendance?.users?.length === 0
          ? "people are"
          : "person is"}{" "}
        attending the meet.
      </p>
      <div className='grid grid-cols-3 gap-3 '>
        {meet?.attendance?.users?.map((e, i) => (
          <UserPreview user={e} key={i} />
        ))}
      </div>
    </>
  );
};

export default SingleMeet;
