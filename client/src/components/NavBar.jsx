import {
  BiBarChartAlt2,
  BiBox,
  BiCreditCard,
  BiHomeSmile,
} from 'react-icons/bi';
import { CgClose, CgMenu } from 'react-icons/cg';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { reset, signOut } from '../features/auth/authSlice';

const NavBar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onToggleMenu = () => {
    setNavOpen(!navOpen);

    const navList = document.querySelector('.nav-list');
    navList.classList.toggle('top-[14%]');
  };

  const onSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      dispatch(signOut());
      dispatch(reset());
      navigate('/auth/sign-in');
    }
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? 'flex items-center gap-2 text-black py-2 text-lg'
      : 'flex items-center gap-2 text-lg text-gray-400 py-2 hover:text-gray-700';

  return (
    <nav>
      <div className='px-2 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-18 lg:gap-4'>
          <div className='flex items-center mr-4 shrink-0'>
            <img src='/src/assets/brand-logo.png' className='w-40' />
          </div>
          <div className=' bg-gray-50 nav-list absolute  min-h-[16vh] left-0 -top-full w-full flex flex-col gap-6 items-center px-5 py-4 md:w-auto md:min-h-fit md:static md:justify-center lg:gap-12 md:flex-row duration-300'>
            <NavLink to='/' className={linkClass}>
              <BiHomeSmile className='h-5.5 w-auto' />
              Home
            </NavLink>
            <NavLink to='/categories' className={linkClass}>
              <BiBox className='h-5.5 w-auto' />
              Categories
            </NavLink>
            <NavLink to='/transactions' className={linkClass}>
              <BiCreditCard className='h-5.5 w-auto' />
              Transactions
            </NavLink>
            <NavLink to='/trends' className={linkClass}>
              <BiBarChartAlt2 className='h-5.5 w-auto' />
              Trends
            </NavLink>
          </div>

          <div className='flex items-center justify-center gap-7'>
            <div>
              {user ? (
                <button
                  className='flex justify-center items-center gap-1.5 bg-brand-green text-white py-2 px-3.5 rounded-md hover:bg-text-green cursor-pointer'
                  onClick={onSignOut}
                >
                  <FaSignOutAlt />
                  Sign out
                </button>
              ) : (
                <NavLink
                  to='/auth/sign-in'
                  className='flex justify-center items-center gap-1.5 bg-black text-white py-2 px-3 rounded-md hover:bg-gray-700 cursor-pointer'
                >
                  <FaSignInAlt />
                  Sign in
                </NavLink>
              )}
            </div>
            <div onClick={onToggleMenu} className='md:hidden'>
              {navOpen ? (
                <CgClose className='w-auto h-8 cursor-pointer' />
              ) : (
                <CgMenu className='w-auto h-8 cursor-pointer' />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
