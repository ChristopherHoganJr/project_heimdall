import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// components
import ClubPreview from "./ClubPreview";

const CarClubWall = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    axios
      .get("/api/carclub/", { withCredentials: true })
      .then((clubData) => setClubs(clubData.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Car Club Wall</h1>
      <div className='flex justify-end my-2'>
        <Link
          to={"/carclubs/create"}
          className='py-2 px-6 border-2 border-blue-500 rounded-md'>
          Create Club
        </Link>
      </div>
      <div className='flex flex-col gap-3'>
        {clubs && clubs?.map((e, i) => <ClubPreview key={i} club={e} />)}
      </div>
    </>
  );
};

export default CarClubWall;
