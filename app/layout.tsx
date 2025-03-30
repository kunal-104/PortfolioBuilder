import { NextUIProvider } from "@nextui-org/react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ContentProvider } from "@/context/ContentContext"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";  

const inter = Inter({ subsets: ["latin"] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let User={};
  const {getUser} = getKindeServerSession();
  User = await getUser();
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContentProvider 
        User={User}>
        <NextUIProvider>{children}</NextUIProvider>
        </ContentProvider>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
