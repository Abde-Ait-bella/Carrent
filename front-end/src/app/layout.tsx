import type { Metadata } from 'next'
import './globals.css'
import { Urbanist } from "next/font/google"
// import "@/node_modules/react-modal-video/css/modal-video.css"
// import "../../public/assets/css/main.css"

export const metadata: Metadata = {
  title: 'Carrent',
  description: 'Application location Auto'
}

const urbanist = Urbanist({
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	variable: "--urbanist",
	display: 'swap',
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${urbanist.variable}`}>{children}</body>
		</html>
	)
}

