import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// components
import Form_imageUpload from "../../components/shared/Form_imageUpload";

const CreateMeet = () => {
  const { club_id } = useParams();
  const navigate = useNavigate();
  const [meet, setMeet] = useState({
    host: club_id,
    title: "",
    about: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    locationLink: "",
    image: "",
  });

  const createMeet = (e) => {
    e.preventDefault();
    axios
      .post("/api/carmeet/new", meet, { withCredentials: true })
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <h1>Create Meet Page</h1>
      <form action='' className='form' onSubmit={(e) => createMeet(e)}>
        <div className='form-section'>
          <label htmlFor=''>Meet Name: </label>
          <input
            type='text'
            className='form-input'
            placeholder='meet name'
            value={meet.title}
            onChange={(e) => setMeet({ ...meet, title: e.target.value })}
          />
        </div>
        {meet?.image && <img src={`http://localhost:8000/${meet?.image}`} />}
        <Form_imageUpload formInfo={meet} setFormInfo={setMeet} />
        <div className='form-section'>
          <label htmlFor=''>About Meet: </label>
          <textarea
            value={meet.about}
            onChange={(e) => setMeet({ ...meet, about: e.target.value })}
            className='form-input textarea'></textarea>
        </div>
        <div className='form-section'>
          <label htmlFor=''>Meet Location</label>
          <input
            type='text'
            className='form-input'
            placeholder='Google Maps URL'
            value={meet.location}
            onChange={(e) => setMeet({ ...meet, location: e.target.value })}
          />
        </div>
        <div className='form-section'>
          <label htmlFor=''>Meet Location Link</label>
          <input
            type='text'
            className='form-input'
            placeholder='Google Maps URL'
            value={meet.locationLink}
            onChange={(e) => setMeet({ ...meet, locationLink: e.target.value })}
          />
        </div>
        <div className='flex gap-2 justify-center'>
          <div className='form-section'>
            <label htmlFor=''>Date:</label>
            <input
              type='date'
              className='form-input'
              placeholder='meet date'
              value={meet.date}
              onChange={(e) => setMeet({ ...meet, date: e.target.value })}
            />
          </div>

          <div className='form-section'>
            <label htmlFor=''>Start Time:</label>
            <input
              type='time'
              className='form-input'
              placeholder=''
              value={meet.startTime}
              onChange={(e) => setMeet({ ...meet, startTime: e.target.value })}
            />
          </div>
          <div className='form-section'>
            <label htmlFor=''>End Time: </label>
            <input
              type='time'
              className='form-input'
              placeholder=''
              value={meet.endTime}
              onChange={(e) => setMeet({ ...meet, endTime: e.target.value })}
            />
          </div>
        </div>

        <button className='btn btn-submit'>Post Meet</button>
      </form>
    </>
  );
};

export default CreateMeet;
