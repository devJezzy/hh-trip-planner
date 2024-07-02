// pages/_app.tsx
import type { AppProps } from 'next/app';
import { PlanProvider } from '../context/PlanContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlanProvider>
      <Component {...pageProps} />
    </PlanProvider>
  );
}

export default MyApp;