import { useCreateLinkStore } from '@/lib/store';
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
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { createRef, useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose(): void;
};

export const CreateLinkDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const firstField = createRef<HTMLInputElement>();
  const { onTextBoxChange, isRefURLValid, createLinkRefURL } =
    useCreateLinkStore();

  const [isExpanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!isExpanded);

  return (
    <Drawer
      placement="right"
      isOpen={isOpen}
      onClose={onClose}
      size={isExpanded ? 'xl' : 'sm'}
      initialFocusRef={firstField}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton border="1px" />
        <DrawerHeader borderBottomWidth="1px" borderBottomColor="black">
          Create Link
        </DrawerHeader>

        <DrawerBody maxH="full">
          <Flex flexDir="column" alignItems="stretch" justifyContent="center">
            <Stack spacing="24px">
              <FormControl>
                <FormLabel>Link Title</FormLabel>
                <Input type="text" border="1px" borderColor="black" />
                <FormHelperText>
                  Optional. By default title would be the same as the generated
                  link !
                </FormHelperText>
              </FormControl>
              <Box>
                <Textarea
                  placeholder="Paste Your Loooooooooooong link here"
                  h="32"
                  onChange={onTextBoxChange}
                  border="1px"
                  borderTop="4px"
                  borderRight="4px"
                  borderColor="black"
                />
                <Text textColor="red" fontSize="sm">
                  {isRefURLValid ? '' : 'URL seems to be wrong ;('}
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
                  {isExpanded ? 'Too big...' : 'More room please...'}
                </Button>
              </Flex>
              <Button
                size="md"
                variant="outline"
                border="2px"
                borderColor="black"
                onClick={(e) => {}}
                borderTop="8px"
                borderRight="8px"
                isDisabled={!isRefURLValid || createLinkRefURL === ''}
              >
                Generate !
              </Button>
            </Stack>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
