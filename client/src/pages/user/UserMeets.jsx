import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// contexts
import { UserContext } from "../../contexts/UserContext";

// components
import MeetPreview from "../../components/car_meets/MeetPreview";

const UserMeets = () => {
  const { currentUser } = useContext(UserContext);
  const { username } = useParams();

  const [meets, setMeets] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/user/${username}/carmeets`)
      .then((meetData) => setMeets(meetData.data))
      .catch((err) => console.log(err));
  }, [username]);

  let userMeets = meets.filter((meet) =>
    meet?.attendance?.users.find((user) => user["_id"] === currentUser?.id)
  );

  console.log(
    meets.filter((meet) =>
      meet?.attendance?.users.find((user) => user["_id"] === currentUser?.id)
    )
  );

  return (
    <>
      <h1>Main Car Meet Wall</h1>
      <div className=' flex flex-col gap-3'>
        {userMeets?.map((e, i) => (
          <MeetPreview
            key={i}
            meet={e}
            currentUser={currentUser}
            setMeets={setMeets}
            meets={meets}
          />
        ))}
      </div>
    </>
  );
};

export default UserMeets;
