import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

// contexts
import { UserContext } from "../../contexts/UserContext";

// components
import MeetPreview from "../../components/car_meets/MeetPreview";

const MainWall = () => {
  const { currentUser } = useContext(UserContext);
  const [meets, setMeets] = useState([]);

  useEffect(() => {
    axios
      .get("/api/carmeet/", { withCredentials: true })
      .then((meetData) => setMeets(meetData.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <h1>Main Car Meet Wall</h1>
      <div className=' flex flex-col gap-3'>
        {meets?.map((e, i) => (
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

export default MainWall;
