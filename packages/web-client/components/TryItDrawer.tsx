import { isDev } from '@/global';
import type { TryItSchema } from '@/lib/formResolvers';
import { tryItResolver as resolver } from '@/lib/formResolvers';
import { useTryItStore } from '@/lib/store';
import { urlRegex } from '@/lib/utils';
import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Spacer,
  Spinner,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import React, { createRef, MouseEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaClipboard } from 'react-icons/fa';

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export const TryItDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const firstField = createRef<HTMLInputElement>();

  const [expanded, setIsExpanded] = useState(false);
  const toggleExpand: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsExpanded(!expanded);
  };

  const [uuidCode, setUUIDCode] = useState('');
  const [isFailedFetching, setIsFailedFetching] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<TryItSchema>({ resolver });

  const fetchAnonURL = useTryItStore((sel) => sel.fetchAnonURL);

  const onSubmit = handleSubmit(
    async ({ refURL }) => {
      if (isDev) {
        console.log(`${refURL}`);
      }

      await fetchAnonURL(refURL)
        .then((v) => v as string)
        .then((code) => {
          setUUIDCode(code);
        })
        .catch((err) => {
          if (isDev) {
            console.log(err);
          }

          setIsFailedFetching(true);

          setTimeout(() => {
            setIsFailedFetching(false);
          }, 1000);
        });
    },
    (errors) => {
      if (isDev) {
        console.log(errors);
      }
    }
  );

  const toast = useToast({
    description: 'Text Copied',
    title: 'Copied !',
    status: 'info',
    duration: 2000,
    position: 'bottom',
  });

  const copy: MouseEventHandler = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(`sqzd.xyz/${uuidCode}`);
    toast();
  };

  const isValidRefURL = urlRegex.test(watch('refURL'));
  const isRefURLEmpty = watch('refURL') === '';

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      size={expanded ? 'lg' : 'xs'}
      initialFocusRef={firstField}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton border="1px" />
        <DrawerHeader borderBottomWidth="1px" borderBottomColor="black">
          Try It <b>Now</b>
        </DrawerHeader>

        <DrawerBody maxH="full">
          <Flex flexDir="column" alignItems="stretch" justifyContent="center">
            <form action="" onSubmit={onSubmit}>
              <Stack spacing="24px">
                <Box>
                  <Textarea
                    placeholder="Paste Your Loooooooooooong link here"
                    h="32"
                    border="1px"
                    borderTop="4px"
                    borderRight="4px"
                    borderColor="black"
                    {...register('refURL')}
                  />
                  <Text textColor="red" fontSize="sm" h="4">
                    {isRefURLEmpty
                      ? ' '
                      : isValidRefURL
                      ? ' '
                      : `URL doesn't seems right`}
                  </Text>
                </Box>

                <Flex>
                  <Button
                    size="xs"
                    onClick={toggleExpand}
                    variant="outline"
                    borderTop="4px"
                    borderRight="4px"
                    borderColor="black"
                  >
                    {expanded ? 'Too big...' : 'More room please...'}
                  </Button>
                </Flex>
                <Button
                  size="md"
                  variant="outline"
                  border="2px"
                  borderColor="black"
                  type="submit"
                  borderTop="8px"
                  borderRight="8px"
                  isDisabled={isSubmitting || !isValidRefURL || isRefURLEmpty}
                >
                  Generate !
                </Button>
                <Text>Your Shortened URL is: </Text>
                {isSubmitting ? (
                  <Center>
                    <Spinner />
                  </Center>
                ) : undefined}
                {isFailedFetching ? (
                  <Text textColor="red">Failed fetching data for your url</Text>
                ) : undefined}

                {uuidCode !== '' ? (
                  <Flex justifyContent="space-between">
                    <Text onClick={copy} textColor="blue">
                      sqzd.xyz/{uuidCode}
                    </Text>
                    <Spacer />
                    <IconButton
                      size="xs"
                      aria-label="copy"
                      icon={<FaClipboard />}
                      onClick={copy}
                    ></IconButton>
                  </Flex>
                ) : undefined}
                {uuidCode !== '' ? (
                  <Text>
                    URL only last for the next 24 hour. Sign In to save your URL
                  </Text>
                ) : undefined}
              </Stack>
            </form>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
