import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import BinaryRainCursor from "@/components/binary-rain-cursor"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bulbul Sharma - Full Stack Developer",
  description:
    "Building intelligent, user-friendly digital experiences. Full-stack developer specializing in React, Node.js, and AI solutions.",
  openGraph: {
    title: "Bulbul Sharma - Full Stack Developer",
    description: "Full-stack developer creating innovative web and mobile solutions",
    type: "website",
  },
}

export const viewport = {
  themeColor: "#0f1e3c",
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${_inter.className} font-sans antialiased`}>
        <BinaryRainCursor />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
