import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleClub = () => {
  const { club_id } = useParams();
  const [club, setClub] = useState({});

  useEffect(() => {
    axios
      .get(`/api/carclub/${club_id}`)
      .then((clubData) => setClub(clubData.data))
      .catch((err) => console.log(err));
  }, [club_id]);

  console.log(club);

  return (
    <>
      <h1>{club?.name}</h1>
      <h4>Club President: {club?.president?.username}</h4>
      <div>
        <h2>About {club?.name}</h2>
        <p>{club?.about}</p>
      </div>
      <div className='flex flex-wrap gap-2'>
        <h3>Club Type:</h3>
        {club?.tags?.map((e, i) => (
          <p key={i}>{e}</p>
        ))}
      </div>
      <div>
        <h5>Club Members: {club?.members?.users?.length}</h5>
        <div>
          {club?.members?.users?.map((e, i) => (
            <p>{e?.username}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default SingleClub;
