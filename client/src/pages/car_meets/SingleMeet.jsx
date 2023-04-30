import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleMeet = () => {
  const { meet_id } = useParams();
  const [meet, setMeet] = useState({});
  useEffect(() => {
    axios
      .get(`/api/carmeet/${meet_id}`)
      .then((meetData) => setMeet(meetData.data))
      .catch((err) => console.log(err));
  }, [meet_id]);

  console.log(meet);
  return (
    <>
      <h1>{meet?.title}</h1>
      <h2>Hosted By: {meet?.host?.username}</h2>
      <div>
        <h3>About {meet?.title}</h3>
        <p>{meet?.about}</p>
      </div>
    </>
  );
};

export default SingleMeet;
