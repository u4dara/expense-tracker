import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Spinner from '../components/Spinner';
import { getCategories, reset } from '../features/category/categorySlice';
import CategoryCard from './CategoryCard';

const CategoryDisplay = () => {
  const { user } = useSelector((state) => state.auth);
  const { categories, isLoading, isError, message } = useSelector(
    (state) => state.category,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth/sign-in');
    } else {
      dispatch(getCategories());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (isError) {
      console.error(message);
    }
  }, [isError, message]);

  return (
    <div className='w-full'>
      {isLoading ? (
        <div className='flex justify-center items-center'>
          <Spinner />
        </div>
      ) : categories.active?.length > 0 || categories.archived?.length > 0 ? (
        <div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4'>
          {categories.active.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className='flex justify-center items-center'>
          <p className='text-gray-500'>No categories found.</p>
        </div>
      )}
    </div>
  );
};
export default CategoryDisplay;
