import React from "react";

const ProfileForm_Car = ({ vehicle, setVehicle }) => {
  return (
    <div>
      <div className='form-section'>
        <label htmlFor=''>Make: </label>
        <input
          type='text'
          className='form-input'
          value={vehicle.make}
          onChange={(e) => setVehicle({ ...vehicle, make: e.target.value })}
        />
      </div>
      <div className='form-section'>
        <label htmlFor=''>Model: </label>
        <input
          type='text'
          className='form-input'
          value={vehicle.model}
          onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
        />
      </div>
      <div className='form-section'>
        <label htmlFor=''>Tier: </label>
        <input
          type='text'
          className='form-input'
          value={vehicle.tier}
          onChange={(e) => setVehicle({ ...vehicle, tier: e.target.value })}
        />
      </div>
    </div>
  );
};

export default ProfileForm_Car;
