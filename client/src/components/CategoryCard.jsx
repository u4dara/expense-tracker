import { TbArrowBigUpLinesFilled } from 'react-icons/tb'; // Expense icon
import { TbArrowBigDownLinesFilled } from 'react-icons/tb'; // Income icon
import { IoFastFood } from 'react-icons/io5'; // Food icon

const CategoryCard = ({ category }) => {
   return (
      <div className="flex flex-col gap-3 bg-white px-4 py-6 rounded-md shadow-md">
         {/* Icons */}
         <div className="flex justify-between items-center">
            {/* Category icon */}
            <div className="bg-[#FFF7ED] p-2 rounded-md border border-[#FFEDD5]">
               <IoFastFood className="h-6 w-auto text-[#EB6119]" />
            </div>
            {/* Expense-Income icon */}
            <div>
               {category.type === 'expense' ? (
                  <TbArrowBigDownLinesFilled className="h-5.5 w-auto text-secondary-red" />
               ) : (
                  <TbArrowBigUpLinesFilled className="h-5.5 w-auto  text-brand-green" />
               )}
            </div>
         </div>

         {/* Details */}
         <div className="flex flex-col gap-2">
            {/* Title */}
            <p className="text-md font-bold">{category.name}</p>
         </div>
      </div>
   );
};
export default CategoryCard;
