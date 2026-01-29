import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as z from 'zod';

import Spinner from '../components/Spinner';
import { reset, signIn } from '../features/auth/authSlice';
import signInSchema from '../schemas/signInSchema';

const SignIn = () => {
  const backgroundImage = '/src/assets/bg-gradient.png';
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

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

    if (!email || !password) toast.error('All fields are required!');

    const result = signInSchema.safeParse(formData);

    if (!result.success) {
      const tree = z.treeifyError(result.error);

      const allErrors = [
        ...(tree.errors || []),
        ...Object.values(tree.properties || {}).flatMap((p) => p.errors),
      ];

      if (allErrors.length > 0) toast.error(allErrors[0]);
      return;
    } else {
      const userData = {
        email,
        password,
      };
      dispatch(signIn(userData));
    }
  };

  return isLoading ? (
    <>
      <div className='flex items-center justify-center h-screen bg-gray-100'>
        <Spinner loading={true} />
      </div>
    </>
  ) : (
    <>
      <div
        className='flex flex-col min-h-screen bg-center bg-no-repeat bg-cover'
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Navbar */}
        <nav className='w-full p-4 bg-white/10 backdrop-blur-md'>
          <img src='/src/assets/brand-logo.png' className='w-40'></img>
        </nav>
        <div className='flex items-center justify-center px-6 py-12 grow'>
          {/* Form Card */}
          <div className='w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl ring-1 ring-gray-900/5 sm:p-10'>
            <div className='w-full'>
              <h2 className='text-3xl font-bold tracking-tight text-center text-gray-900'>
                Sign in
              </h2>
              <p className='mt-2 text-center text-gray-600'>
                Enter your credentials to access your account
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
                      className='block w-full px-3 py-2 text-gray-900 bg-white rounded-md outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-text-green sm:text-sm'
                    />
                  </div>
                </div>

                <div>
                  <div className='flex items-center justify-between text-sm'>
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
                      className='block w-full px-3 py-2 text-gray-900 bg-white rounded-md outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-text-green sm:text-sm'
                    />
                  </div>
                </div>

                <div className='pt-2'>
                  <button
                    type='submit'
                    className='flex justify-center w-full px-3 py-2 text-base font-semibold text-white transition-colors rounded-md shadow-sm bg-text-green hover:bg-brand-green focus-visible:outline-2 focus-visible:outline-text-green'
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className='mt-4 text-sm text-center text-gray-500'>
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
