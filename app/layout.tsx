import './globals.css'
import Header from './components/header';
import { NextAuthProvider } from "@/app/lib/session";

export const metadata = {
  title: 'MPG Tracker',
  description: 'Track your cars gas mileage.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="area" >
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <NextAuthProvider>
        <div className="context overflow-auto flex flex-col h-screen">
          <div className="flex-none">
            <Header/>
          </div>
          <div className="grow content-center items-center">
            {children}
          </div>
        </div>
        </NextAuthProvider>
      </body>
    </html>
  )
}
