import type React from "react"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DomiHive - Real Estate Platform",
  description: "Smart property matching and inspection booking platform",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>

        {/* ⬇️ REQUIRED ROOT ELEMENT */}
        <div id="react-grab-root"></div>

        {/* ⬇️ Load react-grab properly */}
        <Script
          src="https://unpkg.com/react-grab/dist/index.global.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  )
}
