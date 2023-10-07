import './globals.css'
import { Inter } from 'next/font/google'
import { NextAuthProvider } from './provider'
import { Providers } from './providerUI'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Meneses',
  description: 'Made by Raymund P. Lapuz 4th year BSIT student of Bulacan State University',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          {/* <Providers> */}
          {children}
          {/* </Providers> */}
        </NextAuthProvider>
      </body>
    </html>
  )
}
