import type { AppProps } from 'next/app';
import '@fontsource/advent-pro/300.css';
import '@fontsource/advent-pro/400.css';
import '@fontsource/advent-pro/500.css';
import '@fontsource/advent-pro/700.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
  typography: {
    "fontFamily": `"Advent Pro", sans-serif`,
    "fontSize": 16,
  },
  components: {
    // Name of the component

  },

});
export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
}
