import './globals.css'
import type {Metadata}
from 'next'
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Ingredient Social',
  description: 'Where people can share recipe'
}

export default function RootLayout({children} : {
  children : React.ReactNode
}) {
  return (
    <html lang="en">
      <body classname={
        `${
          inter.className
        } bg-light-1`
      }>
        {children}</body>
    </html>
  )
}
