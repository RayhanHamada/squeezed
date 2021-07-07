import { ChakraProvider } from '@chakra-ui/react';
import 'firebase/auth';
import 'firebase/firestore';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
