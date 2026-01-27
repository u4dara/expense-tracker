import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

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
        <nav className='w-full p-4 bg-white/10 backdrop-blur-md'>navbar</nav>
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

            <div className='mt-10'>
              <form onSubmit={onSubmit} method='POST' className='space-y-5'>
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
                    className='flex w-full justify-center rounded-md bg-text-green px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-green focus-visible:outline-2 focus-visible:outline-text-green transition-colors'
                  >
                    Sign up
                  </button>
                </div>
              </form>

              <p className='mt-8 text-center text-sm text-gray-500'>
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
