import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import NextProgress from 'nextjs-progressbar'
import { SessionProvider } from 'next-auth/react'
import Navbar from '../components/Navbar'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <NextProgress />
      <SessionProvider session={session}>
        <Navbar/>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  )
}
