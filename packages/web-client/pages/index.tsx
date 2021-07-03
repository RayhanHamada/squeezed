import { Navbar } from '@/components/Navbar';
import { SignInModal } from '@/components/SignInModal';
import { useModalData } from '@/lib/store';
import { Container, useDisclosure } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {
  /**
   * sign in modal disclosure
   */
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { setSignInOnOpen } = useModalData();

  useEffect(() => {
    setSignInOnOpen(onOpen);
  }, [setSignInOnOpen, onOpen]);

  return (
    <Container maxW="full" h="100vh" p="0" marginX="0" bgColor="black">
      <Head>
        <title>Squeezed: Shorten your link with Squeezed</title>
        <meta name="description" content="Shorten your link with Squeezed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <SignInModal isOpen={isOpen} onClose={onClose} />
    </Container>
  );
}
