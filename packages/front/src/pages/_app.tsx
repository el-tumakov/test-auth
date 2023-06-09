import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import '@/styles/globals.css';
import '@/styles/variables.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
