import { BulkActionAlert } from '@/components/BulkActionAlert';
import { BulkActionMenu } from '@/components/BulkActionMenu';
import { CreateLinkDrawer } from '@/components/CreateLinkDrawer';
import { DeleteAlert } from '@/components/DeleteAlert';
import { EditLinkModal } from '@/components/EditLinkModal';
import { Navbar } from '@/components/Navbar';
import { Redirecting } from '@/components/Redirecting';
import { dayjs } from '@/lib/dayjs';
import { fb } from '@/lib/firebase-client';
import { URLData } from '@/lib/model-types';
import {
  useDeleteStore,
  useEditLinkStore,
  useURLDataStore,
  useUserDataStore,
} from '@/lib/store';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  IconButton,
  Skeleton,
  Spacer,
  StackDivider,
  Switch,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

export default function Dashboard() {
  const router = useRouter();

  const [user, isAuthLoading] = useAuthState(fb.auth());
  const { uid, setUID } = useUserDataStore();

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

    if (user) {
      setUID(user.uid);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [user, isAuthLoading, router, setUID]);

  const [selectedID, setSelectedID] = useState('');

  /**
   * Create Link drawer disclosure
   */
  const {
    isOpen: isCreateLinkModalOpen,
    onClose: onCreateLinkModalClose,
    onOpen,
  } = useDisclosure();

  /**
   * Edit link modal disclosure
   */
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  /**
   * delete item disclosure
   */
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  /**
   * bulk operation disclosure
   */
  const {
    isOpen: isBulkActionAlertOpen,
    onClose: onBulkActionAlertClose,
    onOpen: onBulkActionAlertOpen,
  } = useDisclosure();

  const { currentURLID, setCurrentURLID } = useEditLinkStore();

  const onClickEdit = (id: string) => {
    setCurrentURLID(id);
    onEditOpen();
  };

  /**
   * untuk delete per item
   */
  const { setItemID } = useDeleteStore();

  const singleDelete = (itemID: string) => {
    setItemID(itemID);
    onDeleteOpen();
  };

  /**
   * untuk bulk operation (delete, enable, dan disable)
   */
  const { addDataID, removeDataID } = useURLDataStore();

  /**
   * ambil semua url_data dari firestore
   */
  const [snapshot, isCollectionLoading] = useCollection(
    fb.firestore().collection('url_data').where('uid', '==', uid)
  );

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

      <DeleteAlert isOpen={isDeleteOpen} onClose={onDeleteClose} />
      <BulkActionAlert
        isOpen={isBulkActionAlertOpen}
        onClose={onBulkActionAlertClose}
      />
      <Container maxW="full" pt="8">
        <Flex flexDir="column" px="4" h="80vh" maxH="full">
          <Flex>
            <Text textColor="white" fontSize="2xl" fontWeight="bold">
              Your Links
            </Text>

            <Spacer />
            <Box mx="4">
              <BulkActionMenu onAlertOpen={onBulkActionAlertOpen} />
            </Box>
            <Skeleton isLoaded={!isAuthLoading}>
              <Button rightIcon={<FaPlus />} onClick={onOpen}>
                Create Link
              </Button>
            </Skeleton>
          </Flex>
          <Box h="4" />

          {/* untuk nama kolom */}
          <Flex w="full" justifyContent="start" alignItems="center" pr="4">
            <Text textColor="white" px="8" fontWeight="bold" fontSize="lg">
              Links
            </Text>
            <Spacer />
            <Text
              textColor="white"
              mx="4"
              fontWeight="bold"
              fontSize="lg"
              display={{ base: 'none', md: 'block', lg: 'block' }}
            >
              Enabled
            </Text>
            <Text
              textColor="white"
              mx={{ base: '8', md: '4', lg: '4' }}
              fontWeight="bold"
              fontSize="lg"
            >
              Edit
            </Text>
            <Text
              textColor="white"
              mx="4"
              fontWeight="bold"
              fontSize="lg"
              display={{ base: 'none', md: 'block', lg: 'block' }}
            >
              Delete
            </Text>
          </Flex>
          <Divider my="2" />
          {/* isi kolom */}
          <Skeleton
            isLoaded={!isCollectionLoading}
            borderBottom="1px"
            borderColor="white"
          >
            {!snapshot || snapshot?.docs.length === 0 ? (
              <Text textColor="white" textAlign="center">
                Seems empty. Create your link by clicking the white button on
                the right.
              </Text>
            ) : (
              <VStack
                overflowY="auto"
                spacing="4"
                h="50vh"
                w="full"
                align="start"
                divider={<StackDivider borderColor="gray.200" />}
              >
                {snapshot.docs
                  .sort((a, b) => b.data().created_at - a.data().created_at)
                  .map((doc) => {
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
                          <Checkbox
                            colorScheme="green"
                            display={{ base: 'none', md: 'inline' }}
                            onChange={(e) => {
                              if (e.target.checked) {
                                addDataID(doc.id);
                                return;
                              }

                              removeDataID(doc.id);
                            }}
                          />
                        </Box>
                        <VStack alignItems="start" px="4">
                          <Text
                            color="white"
                            fontWeight="bold"
                            fontSize="md"
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

                        <Switch
                          mx="4"
                          colorScheme="green"
                          isChecked={enabled}
                          onChange={(e) => {
                            e.preventDefault();
                            doc.ref.update({
                              enabled: !enabled,
                            } as Partial<URLData>);
                          }}
                          display={{
                            base: 'none',
                            md: 'inherit',
                            lg: 'inherit',
                          }}
                        ></Switch>
                        <IconButton
                          mx="4"
                          aria-label="edit"
                          icon={<FaEdit color="white" />}
                          bgColor="transparent"
                          _hover={{ bgColor: 'transparent', opacity: 0.7 }}
                          onClick={(e) => {
                            e.preventDefault();
                            onClickEdit(doc.id);
                          }}
                        />
                        <IconButton
                          mx="4"
                          aria-label="delete"
                          icon={<FaTrash color="red" />}
                          bgColor="transparent"
                          _hover={{ bgColor: 'transparent', opacity: 0.7 }}
                          display={{
                            base: 'none',
                            md: 'inherit',
                            lg: 'inherit',
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            singleDelete(doc.id);
                          }}
                        />
                      </Flex>
                    );
                  })}
              </VStack>
            )}
          </Skeleton>
        </Flex>
      </Container>
      <EditLinkModal isOpen={isEditOpen} onClose={onEditClose} />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};
