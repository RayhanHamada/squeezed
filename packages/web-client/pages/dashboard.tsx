import { CreateLinkDrawer } from '@/components/CreateLinkDrawer';
import { Navbar } from '@/components/Navbar';
import { Redirecting } from '@/components/Redirecting';
import { dayjs } from '@/lib/dayjs';
import { fb } from '@/lib/firebase-client';
import { URLData } from '@/lib/model-types';
import { useUserDataStore } from '@/lib/store';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Skeleton,
  Spacer,
  StackDivider,
  Switch,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { FaPlus } from 'react-icons/fa';

export default function Dashboard() {
  const router = useRouter();
  const { uid } = useUserDataStore();
  const [user, isAuthLoading] = useAuthState(fb.auth());

  const [selectedID, setSelectedID] = useState('');

  /**
   * Create Link Modal disclosure
   */
  const {
    isOpen: isCreateLinkModalOpen,
    onClose: onCreateLinkModalClose,
    onOpen,
  } = useDisclosure();

  /**
   * ambil semua url_data dari firestore
   */
  const [snapshot, isCollectionLoading, error] = useCollection(
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
      h={{ base: '120vh', md: '100vh', lg: '100vh' }}
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
      <CreateLinkDrawer
        isOpen={isCreateLinkModalOpen}
        onClose={onCreateLinkModalClose}
      />
      <Container maxW="full" pt="8">
        <Flex flexDir="column" px="4" h="80vh" maxH="full">
          <Flex>
            <Text textColor="white" fontSize="2xl" fontWeight="bold">
              Your Links
            </Text>

            <Spacer />
            <Skeleton isLoaded={!isAuthLoading}>
              <Button rightIcon={<FaPlus />} onClick={onOpen}>
                Create Link
              </Button>
            </Skeleton>
          </Flex>
          <Box h="4" />
          <Skeleton isLoaded={!isCollectionLoading}>
            {!snapshot || snapshot?.docs.length === 0 ? (
              <Text textColor="white" textAlign="center">
                Seems empty. Create your link by clicking the white button on
                the right.
              </Text>
            ) : (
              <VStack
                overflowY="auto"
                spacing="4"
                h="60vh"
                w="full"
                align="start"
                divider={<StackDivider borderColor="gray.200" />}
              >
                {snapshot.docs.map((doc) => {
                  const {
                    id,
                    title,
                    created_at,
                    uuid_code,
                    expire_at,
                    enabled,
                  } = {
                    id: doc.ref.id,
                    ...doc.data(),
                  } as URLData;

                  const dateCreatedAt = dayjs
                    .unix(created_at)
                    .format('DD/MM/YYYY HH:mm');

                  const dateExpiredAt = expire_at
                    ? dayjs.unix(expire_at).format('DD/MM/YYYY HH:mm')
                    : undefined;

                  return (
                    <Flex
                      key={id}
                      w="full"
                      justifyContent="start"
                      alignItems="center"
                      opacity={id === selectedID ? 0.7 : 1}
                      pr="4"
                    >
                      <Box>
                        <Checkbox colorScheme="green" />
                      </Box>
                      <VStack alignItems="start" px="4">
                        <Text
                          color="white"
                          fontWeight="bold"
                          fontSize="md"
                          onClick={() => setSelectedID(id!)}
                          _hover={{
                            cursor: 'pointer',
                            textDecor: 'underline',
                          }}
                        >
                          {title}
                        </Text>
                        <Button color="white" variant="link" fontSize="sm">
                          sqzd.xyz/{uuid_code}
                        </Button>
                        <Text color="white" fontSize="xs">
                          Created at: {dateCreatedAt} <b> | </b>
                          {dateExpiredAt
                            ? ` Expired at ${dateExpiredAt}`
                            : 'Permanent'}
                        </Text>
                      </VStack>
                      <Spacer />
                      <Text color="white" pr="2">
                        Enabled
                      </Text>
                      <Switch
                        isChecked={enabled}
                        onChange={(e) => {
                          e.preventDefault();
                          doc.ref.update({
                            enabled: !enabled,
                          } as Partial<URLData>);
                        }}
                      ></Switch>
                    </Flex>
                  );
                })}
              </VStack>
            )}
          </Skeleton>
        </Flex>
      </Container>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};
