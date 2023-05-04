import React from "react";
import { Link } from "react-router-dom";

const UserPreview = ({ user }) => {
  return (
    <Link
      to={`/user/${user?.username}`}
      className='border-2 border-black h-[150px] w-32 grid grid-rows-[20%_80%] rounded-md overflow-hidden'>
      <div className=' h-full flex items-center justify-center'>
        <p className='flex items-center justify-center font-bold'>
          {user?.username}
        </p>
      </div>

      {user?.image && (
        <div
          style={{
            backgroundImage: `url('http://localhost:8000/${user?.image}')`,
          }}
          className='h-full w-full bg-cover bg-center bg-no-repeat'></div>
      )}
    </Link>
  );
};

export default UserPreview;
