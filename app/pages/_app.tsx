import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import Head from 'next/head'
import { NextUIProvider, createTheme } from '@nextui-org/react'

const theme = createTheme({
  type: "dark", 
  theme: {
    colors: {
      primaryGray: '#2C363F',
      primaryLightHover: '#4a5b69',
      primary: '#E75A7C',
      primaryHover: '#F96B8D',
      light: '#f2f2f2',
      text:'#D6DBD2',
      textHover:'#F2F5EA',
      secondaryGreen: '#BBC7A4',
      error:'#eb2344',
      success:'#99f0a5',
    },
    space: {},
    fonts: {}
  }
})

function MyApp({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return (
    <NextUIProvider theme={theme}>
      <SessionProvider session={session}>
          <Head>
            <title>Happy Routine</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
        <Component {...pageProps} />
      </SessionProvider>
    </NextUIProvider>
  )
}

export default MyApp
