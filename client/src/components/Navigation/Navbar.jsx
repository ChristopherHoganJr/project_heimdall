import React, { useContext } from "react";
import { Link } from "react-router-dom";

// contexts
import { UserContext } from "../../contexts/UserContext";

const Navbar = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <nav className='flex px-2 justify-between h-24 items-center border-b-2 border-black'>
      <Link to='/'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-10 h-10'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
          />
        </svg>
      </Link>
      <div className='flex gap-5'>
        {currentUser ? (
          <>
            <Link to='/carclubs/'>All Clubs</Link>
            <Link to='/carmeets/create'>Create Meet</Link>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
