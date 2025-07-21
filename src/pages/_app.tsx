import { Inter, Playfair_Display } from 'next/font/google'
import { Layout } from "@/components/layout/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair'
})

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
