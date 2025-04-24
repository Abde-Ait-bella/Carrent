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

// const  test = 


const dashboardLayout = ({children}) => {

  return (
    <div className={`${poppins.variable}  h-screen`}>
      <div className='flex dark:bg-gray-900'>
        <Sidebar />
        <div className='flex flex-col flex-1 ml-64 w-full'>
          <Navbar />
          <main className='overflow-y-auto'>
            <div className='grid mx-auto px-6 container'>
              <h2 className={`${poppins.variable} my-6 font-semibold text-[#CAE9FF] dark:text-gray-200 text-2xl`}>
              Administrateur
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