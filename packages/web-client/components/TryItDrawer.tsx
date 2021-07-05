import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { createRef, MouseEventHandler, useState } from 'react';

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export const TryItDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const firstField = createRef<HTMLInputElement>();

  const [rawLink, setRawLink] = useState('');
  const [isDrawerExpanded, setDrawerExpanded] = useState(false);
  const [fetchState, setFetchState] = useState<
    'nofetch' | 'fetching' | 'fetched'
  >('nofetch');

  const onTextBoxChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    e.preventDefault();
    setRawLink(e.target.textContent?.trim() ?? '');
  };

  const toggleExpand: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setDrawerExpanded(() => !isDrawerExpanded);
  };

  const fetchShortenedURL = async () => {
    setFetchState('fetching');
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      size={isDrawerExpanded ? 'lg' : 'xs'}
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
                <FormLabel htmlFor="username"></FormLabel>
                <Textarea
                  placeholder="Paste Your Loooooooooooong link here"
                  h="32"
                  onChange={onTextBoxChange}
                  border="1px"
                  borderColor="black"
                />
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
                  {isDrawerExpanded ? 'Too big...' : 'More room please...'}
                </Button>
              </Flex>
              <Button
                size="md"
                variant="outline"
                border="2px"
                borderColor="black"
                onClick={fetchShortenedURL}
                borderTop="8px"
                borderRight="8px"
              >
                Generate !
              </Button>
              <Text>Your Shortened URL is:</Text>
            </Stack>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
