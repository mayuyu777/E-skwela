import '@/styles/globals.css'
import '@fullcalendar/common/main.css';

import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider>
        <Head>
          <title>E-Skwela Buyong High School</title>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}
