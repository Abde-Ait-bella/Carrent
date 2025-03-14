'use client'
import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] ,variable: '--font-poppins', });


// const inter = Inter({
//   subsets: ['latin'],
//   weight: ['400', '500', '600'],
//   variable: '--font-inter',
// });


const dashboardLayout = ({children}) => {

  return (
    <div className={`${poppins.variable}`}>
      <div className='flex bg-gray-50 dark:bg-gray-900 h-screen'>
        <Sidebar />
        <div className='flex flex-col flex-1 w-full'>
          <Navbar />
          <main className='h-full overflow-y-auto'>
            <div className='grid mx-auto px-6 container'>
              <h2 className='my-6 font-semibold text-gray-700 dark:text-gray-200 text-2xl'>
                Dashboard
              </h2>
              {/* <!-- CTA --> */}

              {children}

            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default dashboardLayout