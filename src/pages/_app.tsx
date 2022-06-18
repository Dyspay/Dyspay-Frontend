import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from "next-themes";

import { StyledEngineProvider } from '@mui/material/styles'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
          <ThemeProvider>
           <Component {...pageProps} />
            
          </ThemeProvider>

    </StyledEngineProvider>
  )
}

export default MyApp
