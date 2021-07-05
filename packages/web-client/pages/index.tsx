import { Navbar } from '@/components/Navbar';
import { SignInModal } from '@/components/SignInModal';
import { SignUpModal } from '@/components/SignUpModal';
import { useModalData } from '@/lib/store';
import {
  Button,
  Center,
  Container,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect } from 'react';
import {
  AiOutlineCloud,
  AiOutlineDashboard,
  AiOutlineLock,
} from 'react-icons/ai';

const whyReasons = [
  {
    reason: 'Keep Your link safely in our secure database.',
    Icon: AiOutlineCloud,
  },
  {
    reason: 'Easily enable and disable your links if needed.',
    Icon: AiOutlineLock,
  },
  {
    reason: "We won't show you dozens of boring ads and keep you waiting.",
    Icon: AiOutlineDashboard,
  },
];

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
    <Container
      maxW="full"
      h={{ base: '120vh', md: 'full', lg: '100vh' }}
      p="0"
      // px="4"
      marginX="0"
      bgColor="black"
    >
      <Head>
        <title>Squeezed: Shorten your link with Squeezed</title>
        <meta name="description" content="Shorten your link with Squeezed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      {/* modal sign in dan sign up */}
      <SignInModal isOpen={isSignInOpen} onClose={onSignInClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />

      {/* landing page body */}

      <Text textAlign="center" fontSize="4xl" color="white" mt="40">
        Shorten your URL <b>within seconds !</b>
      </Text>
      <Text textAlign="center" paddingTop="8" fontSize="lg" color="white">
        <b>Squeezed</b> enables you to make your own simple, shortened and easy
        to share links.
      </Text>
      <Center paddingTop="8">
        <Button alignSelf="center" size="lg" _hover={{ opacity: 0.7 }}>
          Try Free Now
        </Button>
      </Center>

      {/* Why Section */}
      <Text
        textAlign="center"
        paddingTop="16"
        fontSize="3xl"
        textDecor="underline"
        color="white"
      >
        Why Us ?
      </Text>
      <Flex paddingY="4" alignItems="center" justifyContent="center">
        {whyReasons.map(({ reason, Icon }, idx) => (
          <Flex
            key={idx}
            marginX="4"
            w="12em"
            flexDir="column"
            alignItems="center"
          >
            <Icon color="white" size="4em" />
            <Text
              textAlign="center"
              paddingTop="8"
              fontSize="md"
              color="white"
              flexWrap="wrap"
            >
              {reason}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Container>
  );
}
