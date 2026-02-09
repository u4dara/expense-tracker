import {
  Banknote,
  Bot,
  Briefcase,
  BriefcaseMedical,
  Car,
  Dumbbell,
  Film,
  GraduationCap,
  Home,
  PartyPopper,
  PawPrint,
  PiggyBank,
  Plane,
  ShoppingCart,
  Utensils,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

const icons = [
  { id: 'cart', icon: ShoppingCart },
  { id: 'food', icon: Utensils },
  { id: 'car', icon: Car },
  { id: 'home', icon: Home },
  { id: 'travel', icon: Plane },
  { id: 'cash', icon: Banknote },
  { id: 'health', icon: BriefcaseMedical },
  { id: 'gym', icon: Dumbbell },
  { id: 'movie', icon: Film },
  { id: 'edu', icon: GraduationCap },
  { id: 'pet', icon: PawPrint },
  { id: 'party', icon: PartyPopper },
  { id: 'savings', icon: PiggyBank },
  { id: 'energy', icon: Zap },
  { id: 'work', icon: Briefcase },
  { id: 'tech', icon: Bot },
];

const CreateNewCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '',
    icon: '',
  });
  const [selectedIcon, setSelectedIcon] = useState('');

  console.log(formData);

  const { name, description, color } = formData;

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className='flex items-center justify-center px-6 py-12 grow'>
      <div className='w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl ring-1 ring-gray-900/5 sm:p-10 md:max-w-xl'>
        {/* Title */}
        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl font-bold'>Create New Category</h2>
          <p className='text-lg text-gray-500'>
            Define a new category with custom visual identifiers.
          </p>
        </div>

        {/* Data Form */}
        <form method='POST' noValidate className='space-y-5 mt-7'>
          {/* Category Name */}
          <div className='flex flex-col gap-3'>
            <div>
              <label
                htmlFor='name'
                className='block text-lg font-semibold text-gray-900 md:text-md'
              >
                Category Name
              </label>
            </div>
            <div>
              <input
                id='name'
                name='name'
                type='text'
                value={name}
                placeholder='Food and Dining'
                onChange={onChange}
                required
                className='block w-full px-3 py-2 text-lg text-gray-900 bg-white rounded-lg outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-text-green md:text-md'
              />
            </div>
          </div>

          {/* Description */}
          <div className='flex flex-col gap-3'>
            <div>
              <label
                htmlFor='name'
                className='block text-lg font-semibold text-gray-900 md:text-md'
              >
                Description
              </label>
            </div>
            <div>
              <textarea
                id='description'
                name='description'
                type='text'
                value={description}
                rows='4'
                placeholder='What kind of transactions fall into this category?'
                onChange={onChange}
                required
                className='block w-full px-3 py-2 text-lg text-gray-900 bg-white rounded-lg outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-text-green md:text-md'
              />
            </div>
          </div>

          {/* Theme Color */}
          <div className='flex flex-col gap-3'>
            <div>
              <label
                htmlFor='name'
                className='block text-lg font-semibold text-gray-900 md:text-md'
              >
                Category Theme Color
              </label>
            </div>
            <div className='flex justify-between'>
              <label className='relative flex items-center justify-center p-1 text-lg transition-all rounded-full cursor-pointer ring-offset-1 focus-within:ring-2 focus-within:ring-blue-500'>
                <input
                  type='radio'
                  name='color'
                  value='blue'
                  checked={color === 'blue'}
                  onChange={onChange}
                  className='sr-only peer'
                />
                <span className='w-10 h-10 bg-blue-500 border rounded-full shadow-sm border-black/10'></span>
                <span className='absolute inset-0 border-2 border-transparent rounded-full peer-checked:border-blue-500'></span>
              </label>

              <label className='relative flex items-center justify-center p-1 transition-all rounded-full cursor-pointer ring-offset-1 focus-within:ring-2 focus-within:ring-rose-500'>
                <input
                  type='radio'
                  name='color'
                  value='rose'
                  checked={color === 'rose'}
                  onChange={onChange}
                  className='sr-only peer'
                />
                <span className='w-10 h-10 border rounded-full shadow-sm bg-rose-500 border-black/10'></span>
                <span className='absolute inset-0 border-2 border-transparent rounded-full peer-checked:border-rose-500'></span>
              </label>

              <label className='relative flex items-center justify-center p-1 transition-all rounded-full cursor-pointer ring-offset-1 focus-within:ring-2 focus-within:ring-amber-500'>
                <input
                  type='radio'
                  name='color'
                  value='amber'
                  checked={color === 'amber'}
                  onChange={onChange}
                  className='sr-only peer'
                />
                <span className='w-10 h-10 border rounded-full shadow-sm bg-amber-500 border-black/10'></span>
                <span className='absolute inset-0 border-2 border-transparent rounded-full peer-checked:border-amber-500'></span>
              </label>

              <label className='relative flex items-center justify-center p-1 transition-all rounded-full cursor-pointer ring-offset-1 focus-within:ring-2 focus-within:ring-green-500'>
                <input
                  type='radio'
                  name='color'
                  value='green'
                  checked={color === 'green'}
                  onChange={onChange}
                  className='sr-only peer'
                />
                <span className='w-10 h-10 bg-green-500 border rounded-full shadow-sm border-black/10'></span>
                <span className='absolute inset-0 border-2 border-transparent rounded-full peer-checked:border-green-500'></span>
              </label>

              <label className='relative flex items-center justify-center p-1 transition-all rounded-full cursor-pointer ring-offset-1 focus-within:ring-2 focus-within:ring-teal-500'>
                <input
                  type='radio'
                  name='color'
                  value='teal'
                  checked={color === 'teal'}
                  onChange={onChange}
                  className='sr-only peer'
                />
                <span className='w-10 h-10 bg-teal-500 border rounded-full shadow-sm border-black/10'></span>
                <span className='absolute inset-0 border-2 border-transparent rounded-full peer-checked:border-teal-500'></span>
              </label>

              <label className='relative flex items-center justify-center p-1 transition-all rounded-full cursor-pointer ring-offset-1 focus-within:ring-2 focus-within:ring-indigo-500'>
                <input
                  type='radio'
                  name='color'
                  value='indigo'
                  checked={color === 'indigo'}
                  onChange={onChange}
                  className='sr-only peer'
                />
                <span className='w-10 h-10 bg-indigo-500 border rounded-full shadow-sm border-black/10'></span>
                <span className='absolute inset-0 border-2 border-transparent rounded-full peer-checked:border-indigo-500'></span>
              </label>

              <label className='relative flex items-center justify-center p-1 transition-all rounded-full cursor-pointer ring-offset-1 focus-within:ring-2 focus-within:ring-violet-500'>
                <input
                  type='radio'
                  name='color'
                  value='violet'
                  checked={color === 'violet'}
                  onChange={onChange}
                  className='sr-only peer'
                />
                <span className='w-10 h-10 border rounded-full shadow-sm bg-violet-500 border-black/10'></span>
                <span className='absolute inset-0 border-2 border-transparent rounded-full peer-checked:border-violet-500'></span>
              </label>
            </div>
          </div>

          {/* Icon Selector */}
          <div className='flex flex-col gap-3'>
            <div>
              <label
                htmlFor='name'
                className='block text-lg font-semibold text-gray-900 md:text-md'
              >
                Category Icon
              </label>
            </div>
            <div className='grid grid-cols-5 gap-4'>
              {icons.map((item) => {
                const IconName = item.icon;
                const isSelected = selectedIcon === item.id;
                return (
                  <button
                    key={item.id}
                    type='button'
                    onClick={() => {
                      setSelectedIcon(item.id);
                      setFormData((prevState) => ({
                        ...prevState,
                        icon: item.id,
                      }));
                    }}
                    className={`
                    aspect-square h-15 flex items-center justify-center rounded-2xl transition-all duration-200
                    ${
                      isSelected
                        ? 'bg-green-600 text-white shadow-lg shadow-green-200 scale-105'
                        : 'bg-white border border-gray-100 text-slate-600 hover:border-green-300'
                    }
                  `}
                  >
                    <IconName
                      key={item.id}
                      name={item.id}
                      size={24}
                      strokeWidth={isSelected ? 3 : 2}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateNewCategory;
