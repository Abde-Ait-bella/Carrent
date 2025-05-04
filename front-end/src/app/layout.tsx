import type { Metadata } from 'next'
import './globals.css'
import { Urbanist } from 'next/font/google'
// Fix the import path for react-modal-video
import "react-modal-video/css/modal-video.css"
import "../../public/assets/css/main.css"
import '../../public/tailwind-output.css'

import StoreProvider from '@/app/StoreProvider'

export const metadata: Metadata = {
  title: 'Carrent',
  description: 'Application location Auto'
}

const urbanist = Urbanist({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--urbanist',
  display: 'swap'
})

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <html lang='en'>
        <head>
          {/* Force reload of CSS on refresh */}
          <link rel="stylesheet" href="/assets/css/main.css" key="maincss" />
          <link rel="stylesheet" href="/tailwind-output.css" key="tailwind" />
        </head>
        <body className={`${urbanist.variable} bg-[#F2F9FE]`}>
          <StoreProvider>{children}</StoreProvider>
        </body>
      </html>
    </>
  )
}
