import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as z from 'zod';

import Spinner from '../components/Spinner';
import { reset, signUp } from '../features/auth/authSlice';
import signUpSchema from '../schemas/userSchema';

const SignUp = () => {
  const backgroundImage = '/src/assets/bg-gradient.png';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess || user) {
      navigate('/');
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      return toast.error('All fields are required!');
    }

    const result = signUpSchema.safeParse(formData);

    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(signUp(userData));
    }
  };

  return isLoading ? (
    <>
      <div className='flex justify-center items-center h-screen bg-gray-100'>
        <Spinner loading={true} />
      </div>
    </>
  ) : (
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
                Sign up
              </h2>
              <p className='mt-2 text-center text-gray-600'>
                Create your account to continue
              </p>
            </div>

            <div className='mt-5'>
              <form
                onSubmit={onSubmit}
                method='POST'
                className='space-y-5'
                noValidate
              >
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-900'
                  >
                    Name
                  </label>
                  <div className='mt-2'>
                    <input
                      id='name'
                      name='name'
                      type='text'
                      value={name}
                      placeholder='John Doe'
                      onChange={onChange}
                      required
                      className='block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-text-green sm:text-sm'
                    />
                  </div>
                </div>

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
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium text-gray-900'
                  >
                    Password
                  </label>
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

                <div>
                  <label
                    htmlFor='confirm-password'
                    className='block text-sm font-medium text-gray-900'
                  >
                    Confirm Password
                  </label>
                  <div className='mt-2'>
                    <input
                      id='confirmPassword'
                      name='confirmPassword'
                      type='password'
                      value={confirmPassword}
                      onChange={onChange}
                      placeholder='********'
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
                    Sign up
                  </button>
                </div>
              </form>

              <p className='mt-4 text-center text-sm text-gray-500'>
                Already have an account?{' '}
                <NavLink
                  to='/auth/sign-in'
                  className='font-semibold text-text-green hover:text-brand-green'
                >
                  Sign in
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
