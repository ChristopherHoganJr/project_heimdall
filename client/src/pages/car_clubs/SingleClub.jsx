import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

// contexts
import { UserContext } from "../../contexts/UserContext";

// components
import UserPreview from "../../components/shared/UserPreview";
import DeleteButton from "../../components/car_clubs/DeleteButton";
import JoinButton from "../../components/car_clubs/JoinButton";
import LeaveButton from "../../components/car_clubs/LeaveButton";
import MeetPreview from "../../components/car_meets/MeetPreview";

const SingleClub = () => {
  const { currentUser } = useContext(UserContext);
  const { club_id } = useParams();
  const [club, setClub] = useState({});
  const [clubMeets, setClubMeets] = useState([]);

  console.log(clubMeets);

  useEffect(() => {
    axios
      .get(`/api/carclub/${club_id}`)
      .then((clubData) => setClub(clubData.data))
      .catch((err) => console.log(err));
    axios
      .get(`/api/carclub/${club_id}/carmeets`)
      .then((clubData) => setClub(clubData.data))
      .catch((err) => console.log(err));
  }, [club_id]);

  console.log(club);

  const leaveClub = (e) => {
    e.preventDefault();
    axios
      .put(`/api/carclub/leave/${club._id}`, club, {
        withCredentials: true,
      })
      .then((res) => {
        club.members.users = club.members.users.filter(
          (user) => user._id !== res.data._id
        );
        setClub({ ...club });
      })
      .catch((err) => console.log(err));
  };

  const joinClub = (e) => {
    e.preventDefault();
    axios
      .put(`/api/carclub/join/${club._id}`, club, {
        withCredentials: true,
      })
      .then((res) => {
        club.members.users = [...club.members.users, res.data];
        setClub({ ...club });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1 className='font-bold text-3xl'>{club?.name}</h1>
      <h4 className='font-semibold text-md'>
        Club President:{" "}
        <Link to={`/user/${club?.president?.username}`} className='underline'>
          {club?.president?.username}
        </Link>
      </h4>
      {currentUser?.id === club?.president?._id && (
        <Link to={`/carmeets/create/${club._id}`}>Create Meet</Link>
      )}
      {club?.image && <img src={`http://localhost:8000/${club?.image}`} />}

      <div className='flex flex-wrap gap-2 justify-center'>
        {club?.tags?.map((e, i) => (
          <p key={i} className='py-1 px-2 rounded-full border-2 border-black'>
            {e}
          </p>
        ))}
      </div>
      <div className='rounded-md'>
        <h2 className='font-semibold text-2xl'>About {club?.name}</h2>
        <p>{club?.about}</p>
      </div>
      <div>
        <h2>Upcoming Meets:</h2>
        {clubMeets?.map((e, i) => (
          <MeetPreview
            key={i}
            meet={e}
            currentUser={currentUser}
            setMeets={setMeets}
            meets={meets}
          />
        ))}
      </div>

      <div>
        <h5 className='font-semibold text-2xl'>
          Total: Club Members: {club?.members?.users?.length}
        </h5>
        <div className='flex gap-3 my-2'>
          {currentUser?.id === club?.president?._id ? (
            <>
              <Link to={`/carclubs/edit/${club?._id}`} className='btn btn-edit'>
                Edit Club
              </Link>
              <DeleteButton />
            </>
          ) : club?.members?.users.find(
              (user) => user["_id"] === currentUser?.id
            ) ? (
            <LeaveButton leaveClub={leaveClub} />
          ) : (
            <JoinButton joinClub={joinClub} />
          )}
        </div>
        <div className='grid grid-cols-3 gap-3 '>
          {club?.members?.users?.map((e, i) => (
            <UserPreview user={e} key={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SingleClub;
