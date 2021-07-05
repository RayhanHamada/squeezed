import { useTryItStore } from '@/lib/store';
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
import React, { createRef } from 'react';
import { FaClipboard } from 'react-icons/fa';

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export const TryItDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const firstField = createRef<HTMLInputElement>();

  const toast = useToast({
    description: 'Text Copied',
    title: 'Copied !',
    status: 'info',
    duration: 2000,
    position: 'bottom',
  });

  const {
    fetchAnonURL,
    isError,
    isFetching,
    shortenedURL,
    onTextBoxChange,
    toggleExpanded,
    refURL,
    expanded,
    isRefURLValid,
  } = useTryItStore();

  const copy = () => {
    navigator.clipboard.writeText(refURL);
    toast();
  };

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
          Try it <b>Free</b>
        </DrawerHeader>

        <DrawerBody maxH="full">
          <Flex flexDir="column" alignItems="stretch" justifyContent="center">
            <Stack spacing="24px">
              <Box>
                <Textarea
                  placeholder="Paste Your Loooooooooooong link here"
                  h="32"
                  onChange={onTextBoxChange}
                  border="1px"
                  borderColor="black"
                />
                <Text textColor="red" fontSize="sm">
                  {isRefURLValid ? '' : 'URL seems to be invalid'}
                </Text>
              </Box>

              <Flex>
                <Button
                  size="xs"
                  onClick={toggleExpanded}
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
                onClick={fetchAnonURL}
                borderTop="8px"
                borderRight="8px"
                isDisabled={!isRefURLValid}
              >
                Generate !
              </Button>
              <Text>Your Shortened URL is: </Text>
              {isFetching ? (
                <Center>
                  <Spinner />
                </Center>
              ) : undefined}
              {isError ? (
                <Text textColor="red">Failed fetching data for your url</Text>
              ) : undefined}

              {shortenedURL !== '' ? (
                <Flex justifyContent="space-between">
                  <Text onClick={copy} textColor="blue">
                    {shortenedURL}
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
              {shortenedURL !== '' ? (
                <Text>
                  URL only last for the next 24 hour. Sign In to save your URL
                </Text>
              ) : undefined}
            </Stack>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
