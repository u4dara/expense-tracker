import { BiLogoFacebook, BiLogoPatreon, BiLogoTiktok } from 'react-icons/bi';

const Footer = () => {
  return (
    <footer className=' py-4 border-t border-gray-300 mt-8'>
      <div className='px-2 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <div className='flex items-center justify-center gap-8'>
            <div>
              <BiLogoFacebook className='w-auto h-6 text-gray-500 cursor-pointer hover:text-gray-700' />
            </div>
            <div>
              <BiLogoPatreon className='w-auto h-6 text-gray-500 cursor-pointer hover:text-gray-700' />
            </div>
            <div>
              <BiLogoTiktok className='w-auto h-6 text-gray-500 cursor-pointer hover:text-gray-700' />
            </div>
          </div>
          <div className='flex justify-center w-full text-sm text-gray-600 min-h-fit'>
            &copy; 2025 Xpenso &middot; All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
