import './globals.css'
import { Roboto } from 'next/font/google'
import { NextAuthProvider } from './provider'
// import { Providers } from './providerUI'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin']
})

export const metadata = {
  title: 'Meneses',
  description: 'Made by Raymund P. Lapuz 4th year BSIT student of Bulacan State University',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={roboto.className}
      >
        {/* <FileProvider> */}
        <NextAuthProvider>
          {/* <Providers> */}
          {children}
          {/* </Providers> */}
        </NextAuthProvider>
        {/* </FileProvider> */}
      </body>
    </html>
  )
}
