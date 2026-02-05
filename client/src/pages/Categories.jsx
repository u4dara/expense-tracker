import { BiSearchAlt } from 'react-icons/bi';

import CategoryDisplay from '../components/CategoryDisplay';

const Categories = () => {
   return (
      <section className="px-2 mx-auto my-5 max-w-7xl sm:px-6 lg:px-8">
         {/* Title */}
         <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Expense Categories</h2>
            <p>Manage and track your spending groups with customizable tags.</p>
         </div>

         {/* Search bar & Create Button */}
         <div className="flex items-center justify-between w-full gap-5 my-8">
            <div className="flex items-center w-full max-w-2xl gap-5 px-4 py-1.5 bg-white rounded-md shadow-md">
               <BiSearchAlt className="h-5.5 w-auto" />
               <input type="text" className="text-lg outline-0" />
            </div>
            <div className="flex items-center justify-center shadow-md">
               <button className="px-3 py-2 text-white rounded-md cursor-pointer text-nowrap bg-brand-green hover:bg-text-green">
                  Create New Category
               </button>
            </div>
         </div>

         {/* Category Display */}
         <div>
            <CategoryDisplay />
         </div>
      </section>
   );
};
export default Categories;
