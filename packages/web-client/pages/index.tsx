import { Navbar } from '@/components/Navbar';
import { SignInModal } from '@/components/SignInModal';
import { Container, useDisclosure } from '@chakra-ui/react';
import Head from 'next/head';

export default function Home() {
  /**
   * sign in modal disclosure
   */
  const { isOpen, onClose } = useDisclosure();

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
