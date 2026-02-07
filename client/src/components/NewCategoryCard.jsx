import { HiPlus } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

const NewCategoryCard = () => {
  return (
    <div className='flex justify-center items-center border-2 border-gray-400 border-dashed rounded-xl py-8'>
      <NavLink
        to='/categories/create'
        className='flex flex-col justify-center items-center gap-3 cursor-pointer'
      >
        <HiPlus className='h-6 w-auto text-gray-500' />
        <span className='font-medium text-gray-500'>Add Category</span>
      </NavLink>
    </div>
  );
};

export default NewCategoryCard;
