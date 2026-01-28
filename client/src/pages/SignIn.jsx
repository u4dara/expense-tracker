import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Spinner from '../components/Spinner';

const SignIn = () => {
  const backgroundImage = '/src/assets/bg-gradient.png';
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div
        className='flex min-h-screen flex-col bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Navbar */}
        <nav className='w-full p-4 bg-white/10 backdrop-blur-md'>
          <img src='/src/assets/brand-logo.png' className='w-40'></img>
        </nav>
        <div className='grow flex items-center justify-center px-6 py-12'>
          {/* Form Card */}
          <div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-gray-900/5 sm:p-10'>
            <div className='w-full'>
              <h2 className='text-center text-3xl font-bold tracking-tight text-gray-900'>
                Sign in
              </h2>
              <p className='mt-2 text-center text-gray-600'>
                Enter your credentials to access your account
              </p>
            </div>

            <div className='mt-5'>
              <form onSubmit={onSubmit} method='POST' className='space-y-5'>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-900'
                  >
                    Email address
                  </label>
                  <div className='mt-2'>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      value={email}
                      onChange={onChange}
                      placeholder='john@gmail.com'
                      required
                      className='block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-text-green sm:text-sm'
                    />
                  </div>
                </div>

                <div>
                  <div className='flex text-sm items-center justify-between'>
                    <label
                      htmlFor='password'
                      className='block font-medium text-gray-900'
                    >
                      Password
                    </label>
                    <div className='test-sm'>
                      <NavLink
                        to=''
                        className='font-semibold text-text-green hover:text-brand-green'
                      >
                        Forgot password?
                      </NavLink>
                    </div>
                  </div>
                  <div className='mt-2'>
                    <input
                      id='password'
                      name='password'
                      type='password'
                      value={password}
                      onChange={onChange}
                      placeholder='*******'
                      required
                      className='block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-text-green sm:text-sm'
                    />
                  </div>
                </div>

                <div className='pt-2'>
                  <button
                    type='submit'
                    className='flex w-full justify-center rounded-md bg-text-green px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-brand-green focus-visible:outline-2 focus-visible:outline-text-green transition-colors'
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className='mt-4 text-center text-sm text-gray-500'>
                New to Xpenso?{' '}
                <NavLink
                  to='/auth/sign-up'
                  className='font-semibold text-text-green hover:text-brand-green'
                >
                  Sign up
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
