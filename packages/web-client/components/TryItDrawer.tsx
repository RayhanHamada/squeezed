import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import React, { createRef, useState } from 'react';

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export const TryItDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const firstField = createRef<HTMLInputElement>();

  const [rawLink, setRawLink] = useState('');

  const onTextBoxChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    e.preventDefault();
    setRawLink(e.target.textContent?.trim() ?? '');
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      size="xs"
      initialFocusRef={firstField}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton border="1px" />
        <DrawerHeader borderBottomWidth="1px">
          Try it <b>Free</b>
        </DrawerHeader>

        <DrawerBody maxH="full">
          <Flex flexDir="column" alignItems="stretch" justifyContent="center">
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">
                  Paste your loooooong links here
                </FormLabel>
                <Textarea onChange={onTextBoxChange} />
              </Box>

              <Box>
                <FormLabel htmlFor="url">Url</FormLabel>
                <InputGroup>
                  <InputLeftAddon>http://</InputLeftAddon>
                  <Input
                    type="url"
                    id="url"
                    placeholder="Please enter domain"
                  />
                  <InputRightAddon>.com</InputRightAddon>
                </InputGroup>
              </Box>

              <Box>
                <FormLabel htmlFor="owner">Select Owner</FormLabel>
                <Select id="owner" defaultValue="segun">
                  <option value="segun">Segun Adebayo</option>
                  <option value="kola">Kola Tioluwani</option>
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor="desc">Description</FormLabel>
                <Textarea id="desc" />
              </Box>
            </Stack>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
