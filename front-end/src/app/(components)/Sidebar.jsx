import { faCarRear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Poppins, Quicksand } from 'next/font/google';
import Link from "next/link";

import { usePathname } from "next/navigation";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });
const quicksand = Quicksand({ subsets: ['latin'], weight: ['400', '700'] });

function Sidebar () {
  const pathname = usePathname();
  return (
    <div>
      <aside className='md:block z-20 fixed flex-shrink-0 bg-white dark:bg-gray-800 w-64 h-full overflow-y-auto'>
        <div className='py-4 text-gray-500 dark:text-gray-400'>
          <a
             className={`ml-6 font-bold text-gray-800 dark:text-gray-200 text-3xl ${poppins.className}`}
            href='/'
          >
            Carrent
          </a>
          <ul className='mt-6'>
            <li className='relative px-3 py-3 pl-5'>
              <span
                className={` ${pathname == '/dashboard' ? '' : pathname == '/dashboard/clients' ? '' : 'hidden'} left-0 absolute inset-y-0 bg-[#1F4068] rounded-tr-lg rounded-br-lg w-1`}
                aria-hidden='true'
              ></span>
              <Link
                className='inline-flex items-center w-full font-semibold text-gray-800 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100 text-sm transition-colors duration-150'
                href='/dashboard'
              >
                <svg
                  className='w-5 h-5'
                  aria-hidden='true'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'></path>
                </svg>
                <span className={`text-lg ml-3 ${poppins.className}`}>Dashboard</span>
              </Link>
            </li>
          </ul>
          <ul>
            <li className='relative px-3 py-3 pl-5'>
            <span
                className={` ${pathname == '/dashboard/statistical' ? '' : 'hidden'} left-0 absolute inset-y-0 bg-[#1F4068] rounded-tr-lg rounded-br-lg w-1`}
                aria-hidden='true'
              ></span>
              <Link
                className='inline-flex items-center w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150'
                href='/dashboard/statistical'
              >
                <svg
                  className='w-5 h-5'
                  aria-hidden='true'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'></path>
                </svg>
                <span className={`ml-4 text-xl ${pathname == '/dashboard/statistical' ? 'text-gray-800': ''} ${quicksand.className}`} >Statistique</span>
              </Link>
            </li>
            <li className='relative py-3 pl-[1.4rem]'>
            <span
                className={` ${pathname == '/dashboard/cars' ? '' : pathname == '/dashboard/clients' ? '' : 'hidden'} left-0 absolute inset-y-0 bg-[#1F4068] rounded-tr-lg rounded-br-lg w-1`}
                aria-hidden='true'
              ></span>
              <Link
                className={`inline-flex items-center w-full font-semibold ${pathname == '/dashboard/cars' ? 'text-gray-800': '' } hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150`}
                href='/dashboard/cars'
              >
                {/* <svg
                  className='w-5 h-5'
                  aria-hidden='true'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'></path>
                </svg> */}
                <FontAwesomeIcon icon={faCarRear} size="lg" />
                <span className={`ml-4 text-xl ${quicksand.className}`}>Voitures</span>
              </Link>
            </li>
            <li className='relative px-3 py-3 pl-5'>
              <a
                className='inline-flex items-center w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150'
                href='charts.html'
              >
                
                <span className={`ml-4 text-xl ${quicksand.className}`}>Charts</span>
              </a>
            </li>
            <li className='relative px-3 py-3 pl-5'>
              <a
                className='inline-flex items-center w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150'
                href='modals.html'
              >
                <svg
                  className='w-5 h-5'
                  aria-hidden='true'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'></path>
                </svg>
                <span className={`ml-4 text-xl ${quicksand.className}`}>Modals</span>
              </a>
            </li>
            {/* <li className='relative px-3 py-3 pl-5'>
              <a
                className='inline-flex items-center w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150'
                href='tables.html'
              >
                <svg
                  className='w-5 h-5'
                  aria-hidden='true'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M4 6h16M4 10h16M4 14h16M4 18h16'></path>
                </svg>
                <span className='ml-4'>Tables</span>
              </a>
            </li>
            <li className='relative px-3 py-3 pl-5'>
              <button
                className='inline-flex justify-between items-center w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150'
                // @click="togglePagesMenu"
                aria-haspopup='true'
              >
                <span className='inline-flex items-center'>
                  <svg
                    className='w-5 h-5'
                    aria-hidden='true'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path d='M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z'></path>
                  </svg>
                  <span className='ml-4'>Pages</span>
                </span>
                <svg
                  className='w-4 h-4'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fill-rule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
              </button>
              <template x-if='isPagesMenuOpen'>
                <ul
                  className='space-y-2 mt-2 p-2 rounded-md bghadow-inner overflow-hidden font-medium text-gray-500 dark:text-gray-400 text-sm'
                  aria-label='submenu'
                >
                  <li className='px-2 py-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-150'>
                    <a className='w-full' href='pages/login.html'>
                      Login
                    </a>
                  </li>
                  <li className='px-2 py-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-150'>
                    <a className='w-full' href='pages/create-account.html'>
                      Create account
                    </a>
                  </li>
                  <li className='px-2 py-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-150'>
                    <a className='w-full' href='pages/forgot-password.html'>
                      Forgot password
                    </a>
                  </li>
                  <li className='px-2 py-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-150'>
                    <a className='w-full' href='pages/404.html'>
                      404
                    </a>
                  </li>
                  <li className='px-2 py-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-150'>
                    <a className='w-full' href='pages/blank.html'>
                      Blank
                    </a>
                  </li>
                </ul>
              </template>
            </li> */}
          </ul>
          <div className='my-6 px-6'>
            <button className='flex justify-between items-center bg-purple-600 hover:bg-purple-700 active:bg-purple-600 px-4 py-2 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-purple w-full font-medium text-white text-sm leading-5 transition-colors duration-150'>
              Create account
              <span className='ml-2' aria-hidden='true'>
                +
              </span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
