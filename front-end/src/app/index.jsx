import React from 'react'
import "./assets/css"

function index() {
  return (
    <div
    class="flex bg-gray-50 dark:bg-gray-900 h-screen" >
    {/* <aside class="hidden md:block z-20 flex-shrink-0 bg-white dark:bg-gray-800 w-64 overflow-y-auto"
    >
      <div class="py-4 text-gray-500 dark:text-gray-400">
        <a
          class="ml-6 font-bold text-gray-800 dark:text-gray-200 text-lg"
          href="#"
        >
          Windmill
        </a>
        <ul class="mt-6">
          <li class="relative px-6 py-3">
            <span
              class="left-0 absolute inset-y-0 bg-purple-600 rounded-tr-lg rounded-br-lg w-1"
              aria-hidden="true"
            ></span>
            <a
              class="inline-flex items-center w-full font-semibold text-gray-800 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100 text-sm transition-colors duration-150"
              href="index.html"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              <span class="ml-4">Dashboard</span>
            </a>
          </li>
        </ul>
        <ul>
          <li class="relative px-6 py-3">
            <a
              class="inline-flex items-center w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150"
              href="forms.html"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                ></path>
              </svg>
              <span class="ml-4">Forms</span>
            </a>
          </li>
          <li class="relative px-6 py-3">
            <a
              class="inline-flex items-center w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150"
              href="cards.html"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                ></path>
              </svg>
              <span class="ml-4">Cards</span>
            </a>
          </li>
          <li class="relative px-6 py-3">
            <a
              class="inline-flex items-center w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150"
              href="charts.html"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                ></path>
                <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
              </svg>
              <span class="ml-4">Charts</span>
            </a>
          </li>
          <li class="relative px-6 py-3">
            <a
              class="inline-flex items-center w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150"
              href="buttons.html"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                ></path>
              </svg>
              <span class="ml-4">Buttons</span>
            </a>
          </li>
          <li class="relative px-6 py-3">
            <a
              class="inline-flex items-center w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150"
              href="modals.html"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                ></path>
              </svg>
              <span class="ml-4">Modals</span>
            </a>
          </li>
          <li class="relative px-6 py-3">
            <a
              class="inline-flex items-center w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150"
              href="tables.html"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
              <span class="ml-4">Tables</span>
            </a>
          </li>
          <li class="relative px-6 py-3">
            <button
              class="inline-flex justify-between items-center w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150"
              @click="togglePagesMenu"
              aria-haspopup="true"
            >
              <span class="inline-flex items-center">
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  ></path>
                </svg>
                <span class="ml-4">Pages</span>
              </span>
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <template x-if="isPagesMenuOpen">
              <ul
                x-transition:enter="transition-all ease-in-out duration-300"
                x-transition:enter-start="opacity-25 max-h-0"
                x-transition:enter-end="opacity-100 max-h-xl"
                x-transition:leave="transition-all ease-in-out duration-300"
                x-transition:leave-start="opacity-100 max-h-xl"
                x-transition:leave-end="opacity-0 max-h-0"
                class="space-y-2 bg-gray-50 dark:bg-gray-900 shadow-inner mt-2 p-2 rounded-md overflow-hidden font-medium text-gray-500 dark:text-gray-400 text-sm"
                aria-label="submenu"
              >
                <li
                  class="px-2 py-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-150"
                >
                  <a class="w-full" href="pages/login.html">Login</a>
                </li>
                <li
                  class="px-2 py-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-150"
                >
                  <a class="w-full" href="pages/create-account.html">
                    Create account
                  </a>
                </li>
                <li
                  class="px-2 py-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-150"
                >
                  <a class="w-full" href="pages/forgot-password.html">
                    Forgot password
                  </a>
                </li>
                <li
                  class="px-2 py-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-150"
                >
                  <a class="w-full" href="pages/404.html">404</a>
                </li>
                <li
                  class="px-2 py-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-150"
                >
                  <a class="w-full" href="pages/blank.html">Blank</a>
                </li>
              </ul>
            </template>
          </li>
        </ul>
        <div class="my-6 px-6">
          <button
            class="flex justify-between items-center bg-purple-600 hover:bg-purple-700 active:bg-purple-600 px-4 py-2 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-purple w-full font-medium text-white text-sm leading-5 transition-colors duration-150"
          >
            Create account
            <span class="ml-2" aria-hidden="true">+</span>
          </button>
        </div>
      </div>
    </aside> */}

    <div
      x-show="isSideMenuOpen"
      x-transition:enter="transition ease-in-out duration-150"
      x-transition:enter-start="opacity-0"
      x-transition:enter-end="opacity-100"
      x-transition:leave="transition ease-in-out duration-150"
      x-transition:leave-start="opacity-100"
      x-transition:leave-end="opacity-0"
      class="z-10 fixed inset-0 flex sm:justify-center items-end sm:items-center bg-black bg-opacity-50"
    ></div>
    <div
      class="md:hidden z-20 fixed inset-y-0 flex-shrink-0 bg-white dark:bg-gray-800 mt-16 w-64 overflow-y-auto"
      x-show="isSideMenuOpen"
      x-transition:enter="transition ease-in-out duration-150"
      x-transition:enter-start="opacity-0 transform -translate-x-20"
      x-transition:enter-end="opacity-100"
      x-transition:leave="transition ease-in-out duration-150"
      x-transition:leave-start="opacity-100"
      x-transition:leave-end="opacity-0 transform -translate-x-20"
      // @click.away="closeSideMenu"
      // @keydown.escape="closeSideMenu"
    >
      <div class="py-4 text-gray-500 dark:text-gray-400">
        <a
          class="ml-6 font-bold text-gray-800 dark:text-gray-200 text-lg"
          href="#"
        >
          Windmill
        </a>
        <ul class="mt-6">
          <li class="relative px-6 py-3">
            <span
              class="left-0 absolute inset-y-0 bg-purple-600 rounded-tr-lg rounded-br-lg w-1"
              aria-hidden="true"
            ></span>
            <a
              class="inline-flex items-center w-full font-semibold text-gray-800 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100 text-sm transition-colors duration-150"
              href="index.html"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              <span class="ml-4">Dashboard</span>
            </a>
          </li>
        </ul>
        <ul>
          <li class="relative px-6 py-3">
            <a
              class="inline-flex items-center w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150"
              href="forms.html"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                ></path>
              </svg>
              <span class="ml-4">Forms</span>
            </a>
          </li>
          <li class="relative px-6 py-3">
            <a
              class="inline-flex items-center w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150"
              href="cards.html"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                ></path>
              </svg>
              <span class="ml-4">Cards</span>
            </a>
          </li>
          {/* <li class="relative px-6 py-3">
            <a
              class="inline-flex items-center w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150"
              href="charts.html"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                ></path>
                <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
              </svg>
              <span class="ml-4">Charts</span>
            </a>
          </li> */}
          <li class="relative px-6 py-3">
            <a
              class="inline-flex items-center w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150"
              href="buttons.html"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                ></path>
              </svg>
              <span class="ml-4">Buttons</span>
            </a>
          </li>
          <li class="relative px-6 py-3">
            <a
              class="inline-flex items-center w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150"
              href="modals.html"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                ></path>
              </svg>
              <span class="ml-4">Modals</span>
            </a>
          </li>
          <li class="relative px-6 py-3">
            <a
              class="inline-flex items-center w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150"
              href="tables.html"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
              <span class="ml-4">Tables</span>
            </a>
          </li>
          <li class="relative px-6 py-3">
            <button
              class="inline-flex justify-between items-center w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150"
              // @click="togglePagesMenu"
              aria-haspopup="true"
            >
              <span class="inline-flex items-center">
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  ></path>
                </svg>
                <span class="ml-4">Pages</span>
              </span>
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <template x-if="isPagesMenuOpen">
              <ul
                x-transition:enter="transition-all ease-in-out duration-300"
                x-transition:enter-start="opacity-25 max-h-0"
                x-transition:enter-end="opacity-100 max-h-xl"
                x-transition:leave="transition-all ease-in-out duration-300"
                x-transition:leave-start="opacity-100 max-h-xl"
                x-transition:leave-end="opacity-0 max-h-0"
                class="space-y-2 bg-gray-50 dark:bg-gray-900 shadow-inner mt-2 p-2 rounded-md overflow-hidden font-medium text-gray-500 dark:text-gray-400 text-sm"
                aria-label="submenu"
              >
                <li
                  class="px-2 py-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-150"
                >
                  <a class="w-full" href="pages/login.html">Login</a>
                </li>
                <li
                  class="px-2 py-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-150"
                >
                  <a class="w-full" href="pages/create-account.html">
                    Create account
                  </a>
                </li>
                <li
                  class="px-2 py-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-150"
                >
                  <a class="w-full" href="pages/forgot-password.html">
                    Forgot password
                  </a>
                </li>
                <li
                  class="px-2 py-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-150"
                >
                  <a class="w-full" href="pages/404.html">404</a>
                </li>
                <li
                  class="px-2 py-1 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-150"
                >
                  <a class="w-full" href="pages/blank.html">Blank</a>
                </li>
              </ul>
            </template>
          </li>
        </ul>
        <div class="my-6 px-6">
          <button
            class="flex justify-between items-center bg-purple-600 hover:bg-purple-700 active:bg-purple-600 px-4 py-2 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-purple font-medium text-white text-sm leading-5 transition-colors duration-150"
          >
            Create account
            <span class="ml-2" aria-hidden="true">+</span>
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col flex-1 w-full">
      <header class="z-10 bg-white dark:bg-gray-800 shadow-md py-4">
        <div
          class="flex justify-between items-center mx-auto px-6 h-full text-purple-600 dark:text-purple-300 container"
        >
          <button
            class="md:hidden mr-5 -ml-1 p-1 rounded-md focus:outline-none focus:shadow-outline-purple"
            // @click="toggleSideMenu"
            aria-label="Menu"
          >
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          {/* <!-- Search input --> */}
          <div class="flex flex-1 justify-center lg:mr-32">
            <div
              class="relative mr-6 w-full max-w-xl focus-within:text-purple-500"
            >
              <div class="absolute inset-y-0 flex items-center pl-2">
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                class="bg-gray-100 focus:bg-white dark:bg-gray-700 form-input pr-2 pl-8 border-0 focus:border-purple-300 rounded-md dark:focus:shadow-outline-gray focus:outline-none focus:shadow-outline-purple w-full text-gray-700 dark:text-gray-200 text-sm text-lg placeholder-gray-600 dark:placeholder-gray-500 dark:focus:placeholder-gray-600 focus:placeholder-gray-500"
                type="text"
                placeholder="Search for projects"
                aria-label="Search"
              />
            </div>
          </div>
          <ul class="flex flex-shrink-0 items-center space-x-6">
            {/* <!-- Theme toggler --> */}
            <li class="flex">
              <button
                class="rounded-md focus:outline-none focus:shadow-outline-purple"
                // @click="toggleTheme"
                aria-label="Toggle color mode"
              >
                <template x-if="!dark">
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                    ></path>
                  </svg>
                </template>
                <template x-if="dark">
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </template>
              </button>
            </li>
            {/* <!-- Notifications menu --> */}
            <li class="relative">
              <button
                class="relative rounded-md focus:outline-none focus:shadow-outline-purple align-middle"
                // @click="toggleNotificationsMenu"
                // @keydown.escape="closeNotificationsMenu"
                aria-label="Notifications"
                aria-haspopup="true"
              >
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                  ></path>
                </svg>
                {/* <!-- Notification badge --> */}
                <span
                  aria-hidden="true"
                  class="inline-block top-0 right-0 absolute bg-red-600 border-2 border-white dark:border-gray-800 rounded-full w-3 h-3 -translate-y-1 translate-x-1 transform"
                ></span>
              </button>
              <template x-if="isNotificationsMenuOpen">
                <ul
                  x-transition:leave="transition ease-in duration-150"
                  x-transition:leave-start="opacity-100"
                  x-transition:leave-end="opacity-0"
                  // @click.away="closeNotificationsMenu"
                  // @keydown.escape="closeNotificationsMenu"
                  class="right-0 absolute space-y-2 bg-white dark:bg-gray-700 shadow-md mt-2 p-2 border border-gray-100 dark:border-gray-700 rounded-md w-56 text-gray-600 dark:text-gray-300"
                >
                  <li class="flex">
                    <a
                      class="inline-flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-md w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150"
                      href="#"
                    >
                      <span>Messages</span>
                      <span
                        class="inline-flex justify-center items-center bg-red-100 dark:bg-red-600 px-2 py-1 rounded-full font-bold text-red-600 dark:text-red-100 text-xs leading-none"
                      >
                        13
                      </span>
                    </a>
                  </li>
                  <li class="flex">
                    <a
                      class="inline-flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-md w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150"
                      href="#"
                    >
                      <span>Sales</span>
                      <span
                        class="inline-flex justify-center items-center bg-red-100 dark:bg-red-600 px-2 py-1 rounded-full font-bold text-red-600 dark:text-red-100 text-xs leading-none"
                      >
                        2
                      </span>
                    </a>
                  </li>
                  <li class="flex">
                    <a
                      class="inline-flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-md w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150"
                      href="#"
                    >
                      <span>Alerts</span>
                    </a>
                  </li>
                </ul>
              </template>
            </li>
            {/* <!-- Profile menu --> */}
            <li class="relative">
              <button
                class="rounded-full focus:shadow-outline-purple focus:outline-none align-middle"
                // @click="toggleProfileMenu"
                // @keydown.escape="closeProfileMenu"
                aria-label="Account"
                aria-haspopup="true"
              >
                <img
                  class="rounded-full w-8 h-8 object-cover"
                  src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                  alt=""
                  aria-hidden="true"
                />
              </button>
              <template x-if="isProfileMenuOpen">
                <ul
                  x-transition:leave="transition ease-in duration-150"
                  x-transition:leave-start="opacity-100"
                  x-transition:leave-end="opacity-0"
                  // @click.away="closeProfileMenu"
                  // @keydown.escape="closeProfileMenu"
                  class="right-0 absolute space-y-2 bg-white dark:bg-gray-700 shadow-md mt-2 p-2 border border-gray-100 dark:border-gray-700 rounded-md w-56 text-gray-600 dark:text-gray-300"
                  aria-label="submenu"
                >
                  <li class="flex">
                    <a
                      class="inline-flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-md w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150"
                      href="#"
                    >
                      <svg
                        class="mr-3 w-4 h-4"
                        aria-hidden="true"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                      <span>Profile</span>
                    </a>
                  </li>
                  <li class="flex">
                    <a
                      class="inline-flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-md w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150"
                      href="#"
                    >
                      <svg
                        class="mr-3 w-4 h-4"
                        aria-hidden="true"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        ></path>
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span>Settings</span>
                    </a>
                  </li>
                  <li class="flex">
                    <a
                      class="inline-flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-md w-full font-semibold hover:text-gray-800 dark:hover:text-gray-200 text-sm transition-colors duration-150"
                      href="#"
                    >
                      <svg
                        class="mr-3 w-4 h-4"
                        aria-hidden="true"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        ></path>
                      </svg>
                      <span>Log out</span>
                    </a>
                  </li>
                </ul>
              </template>
            </li>
          </ul>
        </div>
      </header>
      <main class="h-full overflow-y-auto">
        <div class="grid mx-auto px-6 container">
          <h2
            class="my-6 font-semibold text-gray-700 dark:text-gray-200 text-2xl"
          >
            Dashboard
          </h2>
          {/* <!-- CTA --> */}
          <a
            class="flex justify-between items-center bg-purple-600 shadow-md mb-8 p-4 rounded-lg focus:outline-none focus:shadow-outline-purple font-semibold text-purple-100 text-sm"
            href="https://github.com/estevanmaito/windmill-dashboard"
          >
            <div class="flex items-center">
              <svg
                class="mr-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                ></path>
              </svg>
              <span>Star this project on GitHub</span>
            </div>
            <span>View more &RightArrow;</span>
          </a>
          {/* <!-- Cards --> */}
          <div class="gap-6 grid md:grid-cols-2 xl:grid-cols-4 mb-8">
            {/* <!-- Card --> */}
            <div
              class="flex items-center bg-white dark:bg-gray-800 shadow-xs p-4 rounded-lg"
            >
              <div
                class="bg-orange-100 dark:bg-orange-500 mr-4 p-3 rounded-full text-orange-500 dark:text-orange-100"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                  ></path>
                </svg>
              </div>
              <div>
                <p
                  class="mb-2 font-medium text-gray-600 dark:text-gray-400 text-sm"
                >
                  Total clients
                </p>
                <p
                  class="font-semibold text-gray-700 dark:text-gray-200 text-lg"
                >
                  6389
                </p>
              </div>
            </div>
            {/* <!-- Card --> */}
            <div
              class="flex items-center bg-white dark:bg-gray-800 shadow-xs p-4 rounded-lg"
            >
              <div
                class="bg-green-100 dark:bg-green-500 mr-4 p-3 rounded-full text-green-500 dark:text-green-100"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <p
                  class="mb-2 font-medium text-gray-600 dark:text-gray-400 text-sm"
                >
                  Account balance
                </p>
                <p
                  class="font-semibold text-gray-700 dark:text-gray-200 text-lg"
                >
                  $ 46,760.89
                </p>
              </div>
            </div>
            {/* <!-- Card --> */}
            <div
              class="flex items-center bg-white dark:bg-gray-800 shadow-xs p-4 rounded-lg"
            >
              <div
                class="bg-blue-100 dark:bg-blue-500 mr-4 p-3 rounded-full text-blue-500 dark:text-blue-100"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                  ></path>
                </svg>
              </div>
              <div>
                <p
                  class="mb-2 font-medium text-gray-600 dark:text-gray-400 text-sm"
                >
                  New sales
                </p>
                <p
                  class="font-semibold text-gray-700 dark:text-gray-200 text-lg"
                >
                  376
                </p>
              </div>
            </div>
            {/* <!-- Card --> */}
            <div
              class="flex items-center bg-white dark:bg-gray-800 shadow-xs p-4 rounded-lg"
            >
              <div
                class="bg-teal-100 dark:bg-teal-500 mr-4 p-3 rounded-full text-teal-500 dark:text-teal-100"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <p
                  class="mb-2 font-medium text-gray-600 dark:text-gray-400 text-sm"
                >
                  Pending contacts
                </p>
                <p
                  class="font-semibold text-gray-700 dark:text-gray-200 text-lg"
                >
                  35
                </p>
              </div>
            </div>
          </div>

          {/* <!-- New Table --> */}
          <div class="shadow-md rounded-lg w-full overflow-hidden">
            <div class="w-full overflow-x-auto">
              <table class="w-full whitespace-no-wrap">
                <thead>
                  <tr
                    class="bg-gray-50 dark:bg-gray-800 dark:border-gray-700 border-b font-semibold text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wide"
                  >
                    <th class="px-4 py-3">Client</th>
                    <th class="px-4 py-3">Amount</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody
                  class="bg-white dark:bg-gray-800 divide-y dark:divide-gray-700"
                >
                  <tr class="text-gray-700 dark:text-gray-400">
                    <td class="px-4 py-3">
                      <div class="flex items-center text-sm">
                        {/* <!-- Avatar with inset shadow --> */}
                        <div
                          class="hidden md:block relative mr-3 rounded-full w-8 h-8"
                        >
                          <img
                            class="rounded-full w-full h-full object-cover"
                            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                            alt=""
                            loading="lazy"
                          />
                          <div
                            class="absolute inset-0 shadow-inner rounded-full"
                            aria-hidden="true"
                          ></div>
                        </div>
                        <div>
                          <p class="font-semibold">Hans Burger</p>
                          <p class="text-gray-600 dark:text-gray-400 text-xs">
                            10x Developer
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      $ 863.45
                    </td>
                    <td class="px-4 py-3 text-xs">
                      <span
                        class="bg-green-100 dark:bg-green-700 px-2 py-1 rounded-full font-semibold text-green-700 dark:text-green-100 leading-tight"
                      >
                        Approved
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      6/10/2020
                    </td>
                  </tr>

                  <tr class="text-gray-700 dark:text-gray-400">
                    <td class="px-4 py-3">
                      <div class="flex items-center text-sm">
                        {/* <!-- Avatar with inset shadow --> */}
                        <div
                          class="hidden md:block relative mr-3 rounded-full w-8 h-8"
                        >
                          <img
                            class="rounded-full w-full h-full object-cover"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&facepad=3&fit=facearea&s=707b9c33066bf8808c934c8ab394dff6"
                            alt=""
                            loading="lazy"
                          />
                          <div
                            class="absolute inset-0 shadow-inner rounded-full"
                            aria-hidden="true"
                          ></div>
                        </div>
                        <div>
                          <p class="font-semibold">Jolina Angelie</p>
                          <p class="text-gray-600 dark:text-gray-400 text-xs">
                            Unemployed
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      $ 369.95
                    </td>
                    <td class="px-4 py-3 text-xs">
                      <span
                        class="bg-orange-100 dark:bg-orange-600 px-2 py-1 rounded-full font-semibold text-orange-700 dark:text-white leading-tight"
                      >
                        Pending
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      6/10/2020
                    </td>
                  </tr>

                  <tr class="text-gray-700 dark:text-gray-400">
                    <td class="px-4 py-3">
                      <div class="flex items-center text-sm">
                        {/* <!-- Avatar with inset shadow --> */}
                        <div
                          class="hidden md:block relative mr-3 rounded-full w-8 h-8"
                        >
                          <img
                            class="rounded-full w-full h-full object-cover"
                            src="https://images.unsplash.com/photo-1551069613-1904dbdcda11?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                            alt=""
                            loading="lazy"
                          />
                          <div
                            class="absolute inset-0 shadow-inner rounded-full"
                            aria-hidden="true"
                          ></div>
                        </div>
                        <div>
                          <p class="font-semibold">Sarah Curry</p>
                          <p class="text-gray-600 dark:text-gray-400 text-xs">
                            Designer
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      $ 86.00
                    </td>
                    <td class="px-4 py-3 text-xs">
                      <span
                        class="bg-red-100 dark:bg-red-700 px-2 py-1 rounded-full font-semibold text-red-700 dark:text-red-100 leading-tight"
                      >
                        Denied
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      6/10/2020
                    </td>
                  </tr>

                  <tr class="text-gray-700 dark:text-gray-400">
                    <td class="px-4 py-3">
                      <div class="flex items-center text-sm">
                        {/* <!-- Avatar with inset shadow --> */}
                        <div
                          class="hidden md:block relative mr-3 rounded-full w-8 h-8"
                        >
                          <img
                            class="rounded-full w-full h-full object-cover"
                            src="https://images.unsplash.com/photo-1551006917-3b4c078c47c9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                            alt=""
                            loading="lazy"
                          />
                          <div
                            class="absolute inset-0 shadow-inner rounded-full"
                            aria-hidden="true"
                          ></div>
                        </div>
                        <div>
                          <p class="font-semibold">Rulia Joberts</p>
                          <p class="text-gray-600 dark:text-gray-400 text-xs">
                            Actress
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      $ 1276.45
                    </td>
                    <td class="px-4 py-3 text-xs">
                      <span
                        class="bg-green-100 dark:bg-green-700 px-2 py-1 rounded-full font-semibold text-green-700 dark:text-green-100 leading-tight"
                      >
                        Approved
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      6/10/2020
                    </td>
                  </tr>

                  <tr class="text-gray-700 dark:text-gray-400">
                    <td class="px-4 py-3">
                      <div class="flex items-center text-sm">
                        {/* <!-- Avatar with inset shadow --> */}
                        <div
                          class="hidden md:block relative mr-3 rounded-full w-8 h-8"
                        >
                          <img
                            class="rounded-full w-full h-full object-cover"
                            src="https://images.unsplash.com/photo-1546456073-6712f79251bb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                            alt=""
                            loading="lazy"
                          />
                          <div
                            class="absolute inset-0 shadow-inner rounded-full"
                            aria-hidden="true"
                          ></div>
                        </div>
                        <div>
                          <p class="font-semibold">Wenzel Dashington</p>
                          <p class="text-gray-600 dark:text-gray-400 text-xs">
                            Actor
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      $ 863.45
                    </td>
                    <td class="px-4 py-3 text-xs">
                      <span
                        class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full font-semibold text-gray-700 dark:text-gray-100 leading-tight"
                      >
                        Expired
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      6/10/2020
                    </td>
                  </tr>

                  <tr class="text-gray-700 dark:text-gray-400">
                    <td class="px-4 py-3">
                      <div class="flex items-center text-sm">
                        {/* <!-- Avatar with inset shadow --> */}
                        <div
                          class="hidden md:block relative mr-3 rounded-full w-8 h-8"
                        >
                          <img
                            class="rounded-full w-full h-full object-cover"
                            src="https://images.unsplash.com/photo-1502720705749-871143f0e671?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=b8377ca9f985d80264279f277f3a67f5"
                            alt=""
                            loading="lazy"
                          />
                          <div
                            class="absolute inset-0 shadow-inner rounded-full"
                            aria-hidden="true"
                          ></div>
                        </div>
                        <div>
                          <p class="font-semibold">Dave Li</p>
                          <p class="text-gray-600 dark:text-gray-400 text-xs">
                            Influencer
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      $ 863.45
                    </td>
                    <td class="px-4 py-3 text-xs">
                      <span
                        class="bg-green-100 dark:bg-green-700 px-2 py-1 rounded-full font-semibold text-green-700 dark:text-green-100 leading-tight"
                      >
                        Approved
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      6/10/2020
                    </td>
                  </tr>

                  <tr class="text-gray-700 dark:text-gray-400">
                    <td class="px-4 py-3">
                      <div class="flex items-center text-sm">
                        {/* <!-- Avatar with inset shadow --> */}
                        <div
                          class="hidden md:block relative mr-3 rounded-full w-8 h-8"
                        >
                          <img
                            class="rounded-full w-full h-full object-cover"
                            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                            alt=""
                            loading="lazy"
                          />
                          <div
                            class="absolute inset-0 shadow-inner rounded-full"
                            aria-hidden="true"
                          ></div>
                        </div>
                        <div>
                          <p class="font-semibold">Maria Ramovic</p>
                          <p class="text-gray-600 dark:text-gray-400 text-xs">
                            Runner
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      $ 863.45
                    </td>
                    <td class="px-4 py-3 text-xs">
                      <span
                        class="bg-green-100 dark:bg-green-700 px-2 py-1 rounded-full font-semibold text-green-700 dark:text-green-100 leading-tight"
                      >
                        Approved
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      6/10/2020
                    </td>
                  </tr>

                  <tr class="text-gray-700 dark:text-gray-400">
                    <td class="px-4 py-3">
                      <div class="flex items-center text-sm">
                        {/* <!-- Avatar with inset shadow --> */}
                        <div
                          class="hidden md:block relative mr-3 rounded-full w-8 h-8"
                        >
                          <img
                            class="rounded-full w-full h-full object-cover"
                            src="https://images.unsplash.com/photo-1566411520896-01e7ca4726af?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                            alt=""
                            loading="lazy"
                          />
                          <div
                            class="absolute inset-0 shadow-inner rounded-full"
                            aria-hidden="true"
                          ></div>
                        </div>
                        <div>
                          <p class="font-semibold">Hitney Wouston</p>
                          <p class="text-gray-600 dark:text-gray-400 text-xs">
                            Singer
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      $ 863.45
                    </td>
                    <td class="px-4 py-3 text-xs">
                      <span
                        class="bg-green-100 dark:bg-green-700 px-2 py-1 rounded-full font-semibold text-green-700 dark:text-green-100 leading-tight"
                      >
                        Approved
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      6/10/2020
                    </td>
                  </tr>

                  <tr class="text-gray-700 dark:text-gray-400">
                    <td class="px-4 py-3">
                      <div class="flex items-center text-sm">
                        {/* <!-- Avatar with inset shadow --> */}
                        <div
                          class="hidden md:block relative mr-3 rounded-full w-8 h-8"
                        >
                          <img
                            class="rounded-full w-full h-full object-cover"
                            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                            alt=""
                            loading="lazy"
                          />
                          <div
                            class="absolute inset-0 shadow-inner rounded-full"
                            aria-hidden="true"
                          ></div>
                        </div>
                        <div>
                          <p class="font-semibold">Hans Burger</p>
                          <p class="text-gray-600 dark:text-gray-400 text-xs">
                            10x Developer
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      $ 863.45
                    </td>
                    <td class="px-4 py-3 text-xs">
                      <span
                        class="bg-green-100 dark:bg-green-700 px-2 py-1 rounded-full font-semibold text-green-700 dark:text-green-100 leading-tight"
                      >
                        Approved
                      </span>
                    </td>
                    <td class="px-4 py-3 text-sm">
                      6/10/2020
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              class="grid sm:grid-cols-9 bg-gray-50 dark:bg-gray-800 px-4 py-3 dark:border-gray-700 border-t font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide"
            >
              <span class="flex items-center col-span-3">
                Showing 21-30 of 100
              </span>
              <span class="col-span-2"></span>
              {/* <!-- Pagination --> */}
              <span class="flex sm:justify-end col-span-4 mt-2 sm:mt-auto">
                <nav aria-label="Table navigation">
                  <ul class="inline-flex items-center">
                    <li>
                      <button
                        class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                        aria-label="Previous"
                      >
                        <svg
                          aria-hidden="true"
                          class="fill-current w-4 h-4"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button
                        class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                      >
                        1
                      </button>
                    </li>
                    <li>
                      <button
                        class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                      >
                        2
                      </button>
                    </li>
                    <li>
                      <button
                        class="bg-purple-600 px-3 py-1 border border-purple-600 border-r-0 rounded-md focus:outline-none focus:shadow-outline-purple text-white transition-colors duration-150"
                      >
                        3
                      </button>
                    </li>
                    <li>
                      <button
                        class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                      >
                        4
                      </button>
                    </li>
                    <li>
                      <span class="px-3 py-1">...</span>
                    </li>
                    <li>
                      <button
                        class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                      >
                        8
                      </button>
                    </li>
                    <li>
                      <button
                        class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                      >
                        9
                      </button>
                    </li>
                    <li>
                      <button
                        class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                        aria-label="Next"
                      >
                        <svg
                          class="fill-current w-4 h-4"
                          aria-hidden="true"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </li>
                  </ul>
                </nav>
              </span>
            </div>
          </div>

          {/* <!-- Charts --> */}
          <h2
            class="my-6 font-semibold text-gray-700 dark:text-gray-200 text-2xl"
          >
            Charts
          </h2>
          <div class="gap-6 grid md:grid-cols-2 mb-8">
            <div
              class="bg-white dark:bg-gray-800 shadow-xs p-4 rounded-lg min-w-0"
            >
              <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                Revenue
              </h4>
              <canvas id="pie"></canvas>
              <div
                class="flex justify-center space-x-3 mt-4 text-gray-600 dark:text-gray-400 text-sm"
              >
                {/* <!-- Chart legend --> */}
                <div class="flex items-center">
                  <span
                    class="inline-block bg-blue-500 mr-1 rounded-full w-3 h-3"
                  ></span>
                  <span>Shirts</span>
                </div>
                <div class="flex items-center">
                  <span
                    class="inline-block bg-teal-600 mr-1 rounded-full w-3 h-3"
                  ></span>
                  <span>Shoes</span>
                </div>
                <div class="flex items-center">
                  <span
                    class="inline-block bg-purple-600 mr-1 rounded-full w-3 h-3"
                  ></span>
                  <span>Bags</span>
                </div>
              </div>
            </div>
            <div
              class="bg-white dark:bg-gray-800 shadow-xs p-4 rounded-lg min-w-0"
            >
              <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                Traffic
              </h4>
              <canvas id="line"></canvas>
              <div
                class="flex justify-center space-x-3 mt-4 text-gray-600 dark:text-gray-400 text-sm"
              >
                {/* <!-- Chart legend --> */}
                <div class="flex items-center">
                  <span
                    class="inline-block bg-teal-600 mr-1 rounded-full w-3 h-3"
                  ></span>
                  <span>Organic</span>
                </div>
                <div class="flex items-center">
                  <span
                    class="inline-block bg-purple-600 mr-1 rounded-full w-3 h-3"
                  ></span>
                  <span>Paid</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  )
}

export default index