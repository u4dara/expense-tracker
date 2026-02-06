import { IoFastFood } from 'react-icons/io5'; // Food icon
import {
  TbArrowBigDownLinesFilled,
  TbArrowBigUpLinesFilled,
  TbDotsVertical,
} from 'react-icons/tb'; // Expense icon

const CategoryCard = ({ category }) => {
  return (
    <div className='flex flex-col gap-3 bg-white px-4 py-6 rounded-xl shadow-md'>
      {/* Options Menu */}
      <div className='flex justify-end cursor-pointer'>
        <TbDotsVertical className='h-6 w-auto text-black' />
      </div>

      {/* Icons */}
      <div className='flex justify-between items-center'>
        {/* Category icon */}
        <div className='bg-[#FFF7ED] p-2.5 rounded-xl border border-[#FFEDD5]'>
          <IoFastFood className='h-6 w-auto text-[#EB6119]' />
        </div>
        {/* Expense-Income icon */}
        <div>
          {category.type === 'expense' ? (
            <TbArrowBigDownLinesFilled className='h-5.5 w-auto text-secondary-red' />
          ) : (
            <TbArrowBigUpLinesFilled className='h-5.5 w-auto  text-brand-green' />
          )}
        </div>
      </div>

      {/* Details */}
      <div className='flex flex-col gap-2'>
        {/* Title */}
        <p className='text-md font-bold'>{category.name}</p>
      </div>
    </div>
  );
};
export default CategoryCard;
