import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// components
import Form_imageUpload from "../../components/shared/Form_imageUpload";

const CreateClub = () => {
  const navigate = useNavigate();
  const [clubInfo, setClubInfo] = useState({
    name: "",
    about: "",
    tags: "",
    image: "",
  });

  const createClub = (e) => {
    e.preventDefault();
    axios
      .post("/api/carclub/new", clubInfo, { withCredentials: true })
      .then(() => navigate("/carclubs/"))
      .catch((err) => console.log(err));
  };

  console.log(clubInfo);
  return (
    <>
      <h1>Create Car Club</h1>
      <form action='' onSubmit={(e) => createClub(e)} className='form'>
        <div className='form-section'>
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
        <div className='form-section'>
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
        <div className='form-section'>
          <label htmlFor=''>Tags: split tags with ', '</label>
          <input
            type='text'
            className='form-input'
            placeholder='Club tags'
            value={clubInfo.tags}
            onChange={(e) => setClubInfo({ ...clubInfo, tags: e.target.value })}
          />
        </div>
        <button className='btn btn-submit'>Create Club</button>
      </form>
    </>
  );
};

export default CreateClub;
