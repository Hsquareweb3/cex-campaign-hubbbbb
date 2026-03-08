import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hype Score Calculator',
  description: 'Calculate and track hype scores for Web3 projects',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="75" font-size="75" fill="%23FF006E">🚀</text></svg>',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-black via-purple-950 to-black text-white">
        {children}
      </body>
    </html>
  )
}