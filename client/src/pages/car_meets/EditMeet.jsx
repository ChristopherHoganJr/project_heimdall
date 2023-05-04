import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//components
import Form_imageUpload from "../../components/shared/Form_imageUpload";

const EditMeet = () => {
  const navigate = useNavigate();
  const { meet_id } = useParams();

  const [meet, setMeet] = useState({
    title: "",
    about: "",
    image: "",
    location: "",
    locationLink: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    axios
      .get(`/api/carmeet/${meet_id}`)
      .then((meetData) => setMeet(meetData.data))
      .catch((err) => console.log(err));
  }, [meet_id]);

  const editMeet = (e) => {
    e.preventDefault();
    axios
      .put(`/api/carmeet/update/${meet_id}`, meet, { withCredentials: true })
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  console.log(meet);
  return (
    <>
      <h1>Edit Meet Page</h1>
      <form action='' className='form' onSubmit={(e) => editMeet(e)}>
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
        <div className='form-section'>
          <label htmlFor=''>Date: ex: May 4th, 2023</label>
          <input
            type='text'
            className='form-input'
            placeholder='meet date'
            value={meet.date}
            onChange={(e) => setMeet({ ...meet, date: e.target.value })}
          />
        </div>
        <div className='form-section'>
          <label htmlFor=''>Start and End Time: ex: 8pm - 10pm</label>
          <input
            type='text'
            className='form-input'
            placeholder='meet time'
            value={meet.time}
            onChange={(e) => setMeet({ ...meet, time: e.target.value })}
          />
        </div>
        <button className='btn btn-submit'>Update Meet Info</button>
      </form>
    </>
  );
};

export default EditMeet;
