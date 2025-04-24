import { faCarRear, faTicket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Poppins, Quicksand } from 'next/font/google';
import Link from "next/link";

import { usePathname } from "next/navigation";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });
const quicksand = Quicksand({ subsets: ['latin'], weight: ['400', '700'] });

function Sidebar() {
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
            {/* <li className='relative px-3 py-3 pl-5'>
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
                <span className={`ml-4 text-xl ${pathname == '/dashboard/statistical' ? 'text-gray-800' : ''} ${quicksand.className}`} >Statistique</span>
              </Link>
            </li> */}
            <li className='relative py-3 pl-[1.4rem]'>
              <span
                className={` ${pathname == '/dashboard/cars' ? '' : pathname == '/dashboard/clients' ? '' : 'hidden'} left-0 absolute inset-y-0 bg-[#1F4068] rounded-tr-lg rounded-br-lg w-1`}
                aria-hidden='true'
              ></span>
              <Link
                className={`inline-flex items-center w-full font-semibold ${pathname == '/dashboard/cars' ? 'text-gray-800' : ''} hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150`}
                href='/dashboard/cars'
              >
                <FontAwesomeIcon icon={faCarRear} size="lg" />
                <span className={`ml-4 text-xl ${quicksand.className}`}>Voitures</span>
              </Link>
            </li>
            <li className='relative py-3 pl-[1.4rem]'>
              <span
                className={` ${pathname == '/dashboard/reservations' ? '' : pathname == '/dashboard/clients' ? '' : 'hidden'} left-0 absolute inset-y-0 bg-[#1F4068] rounded-tr-lg rounded-br-lg w-1`}
                aria-hidden='true'
              ></span>
              <Link
                className={`inline-flex items-center w-full font-semibold ${pathname == '/dashboard/reservations' ? 'text-gray-800' : ''} hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150`}
                href='/dashboard/reservations'
              >
                <FontAwesomeIcon icon={faTicket} size="lg" />
                <span className={`ml-4 text-xl ${quicksand.className}`}>Reservation</span>
              </Link>
            </li>
          </ul>
          {/* <div className='my-6 px-6'>
            <button className='flex justify-between items-center bg-purple-600 hover:bg-purple-700 active:bg-purple-600 px-4 py-2 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-purple w-full font-medium text-white text-sm leading-5 transition-colors duration-150'>
              Create account
              <span className='ml-2' aria-hidden='true'>
                +
              </span>
            </button>
          </div> */}
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
