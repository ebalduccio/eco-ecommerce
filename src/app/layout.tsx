import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: {
    default: "EcoShop",
    template: "%s | EcoShop"
  },
  description: "Discover our curated selection of eco-friendly and sustainable products. From reusable items to organic clothing, make a positive impact with every purchase.",
  keywords: [
    "eco-friendly",
    "sustainable products",
    "organic",
    "zero waste",
    "environmental",
    "green shopping",
    "eco store",
    "sustainable living",
    "eco conscious",
    "recycled materials"
  ],
  authors: [
    { name: "Digicat Team" }
  ],
  category: "E-commerce",
  applicationName: "EcoShop",
  generator: "Next.js",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL('https://ecoshop.example.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "EcoShop - Sustainable Products for a Better World",
    description: "Discover our curated selection of eco-friendly and sustainable products. Make a positive impact with every purchase.",
    url: 'https://ecoshop.example.com',
    siteName: 'EcoShop',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'theme-color': '#22c55e', // green-600 from your theme
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'EcoShop',
    'format-detection': 'telephone=no',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}