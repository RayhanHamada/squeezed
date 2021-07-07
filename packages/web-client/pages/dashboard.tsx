import { Navbar } from '@/components/Navbar';
import { Redirecting } from '@/components/Redirecting';
import { fb } from '@/lib/firebase-client';
import { useUserDataStore } from '@/lib/store';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Skeleton,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { FaPlus } from 'react-icons/fa';

export default function Dashboard() {
  const router = useRouter();
  const { uid } = useUserDataStore();
  const [user, isAuthLoading] = useAuthState(fb.auth());

  /**
   * ambil semua url_data dari firestore
   */
  const [snapshot, , isCollectionLoading] = useCollection(
    fb.firestore().collection('url_data').where('uid', '==', uid)
  );

  /**
   * jika tidak ada user ataupun tidak loading, maka redirect ke home
   */
  useEffect(() => {
    let timeout: any;
    if (!(user || isAuthLoading)) {
      timeout = setTimeout(() => {
        router.replace('/');
      }, 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [user, isAuthLoading, router]);

  if (!(user || isAuthLoading)) {
    return <Redirecting />;
  }

  return (
    <Container
      maxW="full"
      h={{ base: '120vh', md: 'full', lg: '100vh' }}
      p="0"
      marginX="0"
      bgColor="black"
    >
      <Navbar />
      <Head>
        <title>Squeezed</title>
        <meta name="description" content="Shorten your link with Squeezed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="full" pt="8">
        <Flex flexDir="column" px="4" h="50vh" maxH="full">
          <Flex>
            <Text textColor="white" fontSize="2xl" fontWeight="bold">
              Your Links
            </Text>
            {/* <Box w="8" /> */}
            <Spacer />
            <Button rightIcon={<FaPlus />}>Create Link</Button>
          </Flex>
          <Box h="4" />
          <Skeleton isLoaded={!isCollectionLoading}>
            {false ? (
              <Text textColor="white" textAlign="center">
                Seems empty. Create your link by clicking the white button on
                the right.
              </Text>
            ) : (
              <Flex flexDir="column" overflowY="auto" h="40vh">
                {/* {snapshot.docs.map((doc) => {
                    const urlData: URLData = {
                      id: doc.ref.id,
                      ...doc.data(),
                    };

                    return 
                  })} */}

                <Box h="8" textColor="white">
                  p
                </Box>
                <Box h="8" textColor="white">
                  p
                </Box>
                <Box h="8" textColor="white">
                  p
                </Box>
                <Box h="8" textColor="white">
                  p
                </Box>
                <Box h="8" textColor="white">
                  p
                </Box>
                <Box h="8" textColor="white">
                  p
                </Box>
                <Box h="8" textColor="white">
                  p
                </Box>
                <Box h="8" textColor="white">
                  p
                </Box>
                <Box h="8" textColor="white">
                  p
                </Box>
                <Box h="8" textColor="white">
                  p
                </Box>
                <Box h="8" textColor="white">
                  p
                </Box>
                <Box h="8" textColor="white">
                  p
                </Box>
                <Box h="8" textColor="white">
                  p
                </Box>
                <Box h="8" textColor="white">
                  p
                </Box>
                <Box h="8" textColor="white">
                  p
                </Box>
                <Box h="8" textColor="white">
                  p
                </Box>
              </Flex>
            )}
          </Skeleton>
        </Flex>
        <Divider color="white" />
        <Flex flexDir="column" maxH="full" h="full" px="4" pt="4">
          <Text textColor="white" fontSize="2xl" fontWeight="bold">
            Link Title
          </Text>
        </Flex>
        {/* <Grid templateColumns="repeat(auto-fit, 1fr)" maxH="full">
          
        </Grid> */}
      </Container>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};
