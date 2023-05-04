import React from "react";
import Form_imageUpload from "../shared/form_imageUpload";

const ProfileForm = ({ profile, setProfile, submitProfile }) => {
  return (
    <form className='form' onSubmit={(e) => submitProfile(e)}>
      <div className='form-section'>
        <Form_imageUpload formInfo={profile} setFormInfo={setProfile} />
      </div>
      <div className='form-section'>
        <label htmlFor=''>Real Name:</label>
        <input
          type='text'
          placeholder='real name'
          className='form-input'
          value={profile.realName}
          onChange={(e) => setProfile({ ...profile, realName: e.target.value })}
        />
      </div>
      <div className='form-section'>
        <label htmlFor=''>Tell the community about yourself:</label>
        <textarea
          name=''
          id=''
          className='form-input textarea'
          value={profile.biography}
          onChange={(e) =>
            setProfile({ ...profile, biography: e.target.value })
          }></textarea>
      </div>
      <button className='btn btn-submit'>Submit Profile</button>
    </form>
  );
};

export default ProfileForm;
