import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

// contexts
import { UserContext } from "../../contexts/UserContext";

// components
import ClubPreview from "../../components/car_clubs/ClubPreview";

const UserClubs = () => {
  const { currentUser } = useContext(UserContext);
  const { username } = useParams();

  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/user/${username}/carclubs`)
      .then((userClubs) => setClubs(userClubs.data))
      .catch((err) => console.log(err));
  }, [username]);

  let userClubs = clubs.filter((club) =>
    club.members.users.includes(currentUser.id)
  );

  return (
    <>
      <h1>{currentUser?.username} car clubs</h1>
      <div className='flex justify-end my-2'>
        <Link
          to={"/carclubs/create"}
          className='py-2 px-6 border-2 border-blue-500 rounded-md'>
          Create Club
        </Link>
      </div>
      <div className='item-container'>
        {userClubs?.map((e, i) => (
          <ClubPreview
            key={i}
            club={e}
            currentUser={currentUser}
            setClubs={setClubs}
            clubs={clubs}
          />
        ))}
      </div>
    </>
  );
};

export default UserClubs;
