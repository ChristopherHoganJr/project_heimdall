import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

// contexts
import { UserContext } from "../../contexts/UserContext";

// components
import ProfileForm from "../../components/user_profile/ProfileForm";
import ClubPreview from "../../components/car_clubs/ClubPreview";

const UserProfile = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { username } = useParams();
  const [editProfile, setEditProfile] = useState(false);
  const [profile, setProfile] = useState({
    realName: "",
    biography: "",
    image: "",
  });

  console.log(profile);
  const [clubs, setClubs] = useState([]);
  useEffect(() => {
    const getUserData = async () => {
      await axios
        .get(`/api/profile/${username}`, { withCredentials: true })
        .then((res) => setProfile(res.data[0]))
        .catch((err) => console.log(err));
      await axios
        .get(`/api/user/${username}/carclubs`)
        .then((userClubs) => setClubs(userClubs.data))
        .catch((err) => console.log(err));
    };
    getUserData();
  }, [username]);

  const editProfileSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`/api/profile/${username}`, profile, {
        withCredentials: true,
      })
      .then((res) => setEditProfile(false))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1 className='text-3xl font-bold'>{username}</h1>
      {profile?.image && (
        <img src={`http://localhost:8000/${profile?.image}`} />
      )}
      {editProfile ? (
        <ProfileForm
          profile={profile}
          setProfile={setProfile}
          submitProfile={editProfileSubmit}
        />
      ) : (
        <>
          {currentUser?.id === profile?._id && (
            <button
              onClick={() => setEditProfile(true)}
              className='btn btn-edit'>
              Edit
            </button>
          )}
          <h2>Name: {profile?.realName || "User hasn't filled this out"}</h2>
          <p>About Me: {profile?.biography || "User hasn't filled this out"}</p>
          <div className='flex flex-col gap-3'>
            <h2>Car Clubs</h2>
            {clubs?.map((e, i) => (
              <Link
                to={`/carclubs/${e._id}`}
                key={i}
                className='border-black border-2 p-3 rounded-md'>
                <h3>{e.name}</h3>
                <div className='flex flex-wrap gap-2 justify-center '>
                  {e?.tags?.map((j, k) => (
                    <p
                      className='px-2 py-1 rounded-full border-2 border-black text-sm'
                      key={k}>
                      {j}
                    </p>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
