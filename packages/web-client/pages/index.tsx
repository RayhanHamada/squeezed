import { Navbar } from '@/components/Navbar';
import { SignInModal } from '@/components/SignInModal';
import { SignUpModal } from '@/components/SignUpModal';
import { useModalData } from '@/lib/store';
import { Container, useDisclosure } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {
  /**
   * sign in modal disclosure
   */
  const {
    isOpen: isSignInOpen,
    onClose: onSignInClose,
    onOpen: onSignInOpen,
  } = useDisclosure();

  /**
   * sign up modal disclosure
   */
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();

  const { setSignInOnOpen, setSignUpOnOpen } = useModalData();

  /**
   * register callback ke state zustand
   */
  useEffect(() => {
    setSignInOnOpen(onSignInOpen);
    setSignUpOnOpen(onSignUpOpen);
  }, [setSignInOnOpen, setSignUpOnOpen, onSignInOpen, onSignUpOpen]);

  return (
    <Container maxW="full" h="100vh" p="0" marginX="0" bgColor="black">
      <Head>
        <title>Squeezed: Shorten your link with Squeezed</title>
        <meta name="description" content="Shorten your link with Squeezed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <SignInModal isOpen={isSignInOpen} onClose={onSignInClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Container>
  );
}
