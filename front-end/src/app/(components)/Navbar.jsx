"use client";
import Link from "next/link"
import { useState } from "react"
import api from "../Api/axios";
import "../globals.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';


function Navbar () {

  const [click, setClick] = useState();
  const router = useRouter();

    const handelSubmit = async () => {
      setClick(!click)
      await api
      .post('/logout')
      .then(response => {
        const { status, data } = response
        
        if (status === 200) {
          toast.success(data.status)
          router.push('/');
          Cookies.remove('user_role');
          }
        })
        .catch(({ response }) => {
          toast.error(response?.data?.message || 'Une erreur est survenue !')
        })
    }

  return (
    <div>
      <header className='z-10 bg-white dark:bg-gray-800 shadow-md py-3'>
        <div className='flex justify-between items-center mx-auto px-6 h-full text-purple-600 dark:text-purple-300 container'>
          <button
            className='md:hidden mr-5 -ml-1 p-1 rounded-md focus:outline-none focus:shadow-outline-purple'
            aria-label='Menu'
          >
            <svg
              className='w-6 h-6'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
          {/* <!-- Search input --> */}
          {/* <div className='flex flex-1 justify-center lg:mr-32'>
            <div className='relative mr-6 w-full max-w-xl focus-within:text-purple-500'>
              <div className='absolute inset-y-0 flex items-center pl-5'>
                <svg
                  className='w-4 h-4'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </div>
              <input
                className='bg-gray-100 focus:bg-white dark:bg-gray-700 form-input p-2 pr-2 pl-11 border-0 focus:border-purple-300 rounded-md dark:focus:shadow-outline-gray focus:outline-none focus:shadow-outline-purple w-full text-gray-700 text-md dark:text-gray-20 placeholder-gray-600 dark:placeholder-gray-500 dark:focus:placeholder-gray-600 focus:placeholder-gray-500'
                type='text'
                placeholder='Search for projects'
                aria-label='Search'
              />
            </div>
          </div> */}
          <div></div>
          <ul className='flex flex-shrink-0 items-center space-x-6'>
            <li className='flex'>
              <button
                className='rounded-md focus:outline-none focus:shadow-outline-purple'
                aria-label='Toggle color mode'
              >
                <template x-if='!dark'>
                  <svg
                    className='w-5 h-5'
                    aria-hidden='true'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'></path>
                  </svg>
                </template>
                <template x-if='dark'>
                  <svg
                    className='w-5 h-5'
                    aria-hidden='true'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </template>
              </button>
            </li>
            {/* <!-- Notifications menu --> */}
            {/*  */}
                  <li className='relative'>
                    <button id="dropdownHoverButton" onClick={()=> setClick(!click)} data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="inline-flex items-center font-medium text-white text-sm text-center relative mt-[2rem]" type="button">
                      {/* <img
                        className='rounded-full w-8 h-8 object-cover'
                        src='https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82'
                        alt=''
                        aria-hidden='true'
                      /> */}
                      <svg 
                        className="w-8 h-8  absolute bottom-0 right-0 bg-gray-200  rounded-full p-0.5 text-purple-600"
                        fill="currentColor" 
                        viewBox="0 0 20 15">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                      </svg>
                    </button>

                    <div id="dropdownHover" className={`${click ? "" : "hidden" }  z-10 bg-[#2C5A96] absolute mt-4 right-0 dark:bg-gray-700 shadow-sm rounded-lg divide-y divide-gray-100 w-44`}>
                      <ul className="py-2 font-font-medium text-gray-100 dark:text-gray-100 profile-dropdown" aria-labelledby="dropdownHoverButton">
                      <li>
                        <Link onClick={()=>setClick(!click)} href="#" className="block hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 hover:text-[#0E2540]">Dashboard</Link>
                      </li>
                      <li>
                        <Link onClick={()=>setClick(!click)} href="#" className="block hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 hover:text-[#0E2540]">Settings</Link>
                      </li>
                      <li>
                        <Link onClick={()=>setClick(!click)} href="#" className="block hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 hover:text-[#0E2540]">Earnings</Link>
                      </li>
                      <li>
                        <button onClick={handelSubmit}  className="block hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 w-full hover:text-[#0E2540] text-start">Sign out</button>
                      </li>
                      </ul>
                    </div>
            </li>
          </ul>
        </div>
      </header>
    </div>
  )
}

export default Navbar
