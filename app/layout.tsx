import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TinyTales - Authentication',
  description: 'TinyTales Authentication System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  )
}

