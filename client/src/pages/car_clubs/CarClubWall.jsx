import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// context
import { UserContext } from "../../contexts/UserContext";

// components
import ClubPreview from "../../components/car_clubs/ClubPreview";

const CarClubWall = () => {
  const [clubs, setClubs] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("/api/carclub/", { withCredentials: true })
      .then((clubData) => setClubs(clubData.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(clubs);

  return (
    <>
      <h1>Car Club Wall</h1>

      <div className='flex flex-col gap-3'>
        {clubs &&
          clubs?.map((e, i) => (
            <ClubPreview
              key={i}
              setClubs={setClubs}
              club={e}
              clubs={clubs}
              currentUser={currentUser}
            />
          ))}
      </div>
    </>
  );
};

export default CarClubWall;
