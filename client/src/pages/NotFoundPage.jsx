import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className='flex justify-center items-center h-screen bg-white px-6 py-24 sm:py-32 lg:px-8'>
        <div className='text-center'>
          <p className='text-8xl font-semibold text-theme-default'>404</p>
          <h1 className='mt-8 text-2xl font-semibold tracking-tight text-balance text-gray-900 sm:text-2xl'>
            Page not found
          </h1>
          <p className='mt-2 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8'>
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <button
              type='submit'
              className='rounded-md bg-theme-dark px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs cursor-pointer hover:bg-theme-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-border'
            >
              Go back home
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
