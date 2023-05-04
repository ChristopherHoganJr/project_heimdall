import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// components
import DeleteButton from "./DeleteButton";
import JoinButton from "./JoinButton";
import LeaveButton from "./LeaveButton";

const ClubPreview = ({ club, currentUser, setClubs, clubs }) => {
  const joinClub = (e) => {
    e.preventDefault();
    axios
      .put(`/api/carclub/join/${club._id}`, club, {
        withCredentials: true,
      })
      .then((res) => {
        club.members.users = [...club.members.users, res.data._id];
        setClubs([...clubs]);
      })
      .catch((err) => console.log(err));
  };

  const leaveClub = (e) => {
    e.preventDefault();
    axios
      .put(`/api/carclub/leave/${club._id}`, club, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(club.members.users);
        club.members.users = club.members.users.filter(
          (user) => user !== res.data._id
        );
        setClubs([...clubs]);
      })
      .catch((err) => console.log(err));
  };

  const deleteMeet = (e) => {
    e.preventDefault();
    axios
      .delete(`/api/carclub/${club._id}`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        let newClubs = clubs?.filter((c) => c._id !== res.data._id);
        setClubs([...newClubs]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className={`border-4 p-3 rounded-md ${
        club?.members?.users.includes(currentUser?.id)
          ? "border-green-600"
          : "border-black"
      }`}>
      <p className='font-bold text-2xl'>{club?.name}</p>
      {club?.image && (
        <img
          src={`http://localhost:8000/${club?.image}`}
          className='rounded-md w-full max-h-[300px] object-cover'
        />
      )}
      <p>{club?.about}</p>
      <div className='flex gap-2 flex-wrap justify-center items-center py-2'>
        <div className='flex gap-2'>
          {club?.tags?.map((e, i) => (
            <p
              className='py-1 px-2 rounded-full border-2 border-black text-sm'
              key={i}>
              {e}
            </p>
          ))}
        </div>
      </div>
      <p className='pb-2'>President: {club?.president?.username}</p>
      <div className='flex gap-3 '>
        <Link to={`/carclubs/${club?._id}`} className='btn btn-view'>
          View Club
        </Link>
        {currentUser?.id === club?.president?._id ? (
          <>
            <Link to={`/carclubs/edit/${club?._id}`} className='btn btn-edit'>
              Edit Club
            </Link>
            <DeleteButton deleteMeet={deleteMeet} />
          </>
        ) : club?.members?.users.includes(currentUser?.id) ? (
          <LeaveButton leaveClub={leaveClub} />
        ) : (
          <JoinButton joinClub={joinClub} />
        )}
      </div>
    </div>
  );
};

export default ClubPreview;
