import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// components
import Form_imageUpload from "../../components/shared/Form_imageUpload";

const EditClub = () => {
  const navigate = useNavigate();
  const { club_id } = useParams();

  const [clubInfo, setClubInfo] = useState({
    name: "",
    about: "",
    tags: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get(`/api/carclub/${club_id}`)
      .then((clubData) =>
        setClubInfo({ ...clubData.data, tags: clubData.data.tags.join(", ") })
      )
      .catch((err) => console.log(err));
  }, [club_id]);

  const editClub = (e) => {
    e.preventDefault();
    axios
      .put(`/api/carclub/update/${club_id}`, clubInfo, {
        withCredentials: true,
      })
      .then(() => navigate("/carclubs/"))
      .catch((err) => console.log(err));
  };

  console.log(clubInfo);
  return (
    <>
      {" "}
      <h1>Create Car Club</h1>
      <form action='' onSubmit={(e) => editClub(e)} className='form'>
        <div className='flex flex-col gap-2'>
          <label htmlFor=''>Club Name: </label>
          <input
            type='text'
            className='form-input'
            placeholder='club name'
            value={clubInfo.name}
            onChange={(e) => setClubInfo({ ...clubInfo, name: e.target.value })}
          />
        </div>
        {clubInfo?.image && (
          <img src={`http://localhost:8000/${clubInfo?.image}`} />
        )}
        <Form_imageUpload formInfo={clubInfo} setFormInfo={setClubInfo} />
        <div className='flex flex-col gap-2'>
          <label htmlFor=''>Tell us about your club: </label>
          <input
            type='text'
            className='form-input'
            placeholder='Club summary'
            value={clubInfo.about}
            onChange={(e) =>
              setClubInfo({ ...clubInfo, about: e.target.value })
            }
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor=''>Tags: split tags with ', '</label>
          <input
            type='text'
            className='form-input'
            placeholder='Club tags'
            value={clubInfo.tags}
            onChange={(e) => setClubInfo({ ...clubInfo, tags: e.target.value })}
          />
        </div>
        <button className='btn btn-submit'>Submit Club Data</button>
      </form>
    </>
  );
};

export default EditClub;
