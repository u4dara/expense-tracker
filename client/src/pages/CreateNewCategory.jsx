import { useState } from 'react';

const CreateNewCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '',
    icon: '',
  });

  const { name, description, color, icon } = formData;

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className='flex items-center justify-center px-6 py-12 grow'>
      <div className='w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl ring-1 ring-gray-900/5 sm:p-10'>
        {/* Title */}
        <div className='flex flex-col gap-2'>
          <h2 className='text-xl font-bold'>Create New Category</h2>
          <p className='text-gray-500'>
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
                className='block font-semibold text-gray-900 text-md md:text-sm'
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
                className='block w-full px-3 py-2 text-gray-900 bg-white rounded-lg outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-text-green sm:text-sm'
              />
            </div>
          </div>

          {/* Description */}
          <div className='flex flex-col gap-3'>
            <div>
              <label
                htmlFor='name'
                className='block font-semibold text-gray-900 text-md md:text-sm'
              >
                Description
              </label>
            </div>
            <div>
              <textarea
                id='name'
                name='name'
                type='text'
                value={description}
                rows='4'
                placeholder='What kind of transactions fall into this category?'
                onChange={onChange}
                required
                className='block w-full px-3 py-2 text-gray-900 bg-white rounded-lg outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-text-green sm:text-sm'
              />
            </div>
          </div>

          {/* Theme Color */}
          <div className='flex flex-col gap-3'>
            <div>
              <label
                htmlFor='name'
                className='block font-semibold text-gray-900 text-md md:text-sm'
              >
                Category Theme Color
              </label>
            </div>
            <div className='flex justify-between'>
              <label className='relative flex items-center justify-center p-1 transition-all rounded-full cursor-pointer ring-offset-1 focus-within:ring-2 focus-within:ring-blue-500'>
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
        </form>
      </div>
    </div>
  );
};
export default CreateNewCategory;
