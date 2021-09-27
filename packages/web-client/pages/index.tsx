import { Navbar } from '@/components/Navbar';
import { SignInModal } from '@/components/SignInModal';
import { SignUpModal } from '@/components/SignUpModal';
import { TryItDrawer } from '@/components/TryItDrawer';
import { fb } from '@/lib/firebase-client';
import { useModalData, useUserDataStore } from '@/lib/store';
import {
  Button,
  Center,
  Container,
  Flex,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { MouseEvent, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
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
    reason: "We won't keeps you waiting by watching ads",
    Icon: AiOutlineDashboard,
  },
];

export default function Home() {
  const router = useRouter();
  const toDashboard = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  /**
   * for sign in modal
   */
  const {
    isOpen: isSignInOpen,
    onClose: onSignInClose,
    onOpen: onSignInOpen,
  } = useDisclosure();

  /**
   * for sign up modal
   */
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();

  /**
   * for try it drawer
   */
  const {
    isOpen: isDrawerOpen,
    onClose: onDrawerClose,
    onOpen: onDrawerOpen,
  } = useDisclosure();

  const { setSignInOnOpen, setSignUpOnOpen } = useModalData();

  const [user, loading] = useAuthState(fb.auth());
  const { updateAll } = useUserDataStore();

  /**
   * register callback ke state zustand
   */
  useEffect(() => {
    setSignInOnOpen(onSignInOpen);
    setSignUpOnOpen(onSignUpOpen);
  }, [setSignInOnOpen, setSignUpOnOpen, onSignInOpen, onSignUpOpen]);

  useEffect(() => {
    /**
     * tutup modal sign in ataupun sign up
     */
    if (user) {
      onSignInClose();
      onSignUpClose();

      /**
       * kalo user exists update state user
       */
      updateAll({
        uid: user.uid,
        username: user.displayName ?? undefined,
        email: user.email ?? undefined,
      });
    }
  }, [user, onSignInClose, onSignUpClose, updateAll]);

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
        <title>Squeezed</title>
        <meta name="description" content="Shorten your link with Squeezed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      {/* modal sign in dan sign up */}
      <SignInModal isOpen={isSignInOpen} onClose={onSignInClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />

      {/* drawer try it */}
      <TryItDrawer isOpen={isDrawerOpen} onClose={onDrawerClose} />

      {/* landing page body */}
      <Text textAlign="center" fontSize="4xl" color="white" mt="40">
        Shorten your URL <b>within seconds !</b>
      </Text>
      <Text textAlign="center" paddingTop="8" fontSize="lg" color="white">
        <b>Squeezed</b> enables you to make your own simple, shortened and easy
        to share links.
      </Text>
      <Center paddingTop="8">
        {loading ? (
          <Spinner color="white" />
        ) : !user ? (
          <Button
            alignSelf="center"
            size="lg"
            _hover={{ opacity: 0.7 }}
            onClick={onDrawerOpen}
          >
            Try It&nbsp;<b>Now</b>
          </Button>
        ) : (
          <Button
            alignSelf="center"
            size="lg"
            _hover={{ opacity: 0.7 }}
            onClick={toDashboard}
          >
            Go To Dashboard
          </Button>
        )}
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
