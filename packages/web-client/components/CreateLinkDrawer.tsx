import { useCreateLinkStore } from '@/lib/store';
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
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Spacer,
  Spinner,
  Stack,
  Switch,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import React, { createRef, MouseEvent, useState } from 'react';
import { FaClipboard } from 'react-icons/fa';

type Props = {
  isOpen: boolean;
  onClose(): void;
};

export const CreateLinkDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const firstField = createRef<HTMLInputElement>();
  const {
    isRefURLValid,
    createLinkRefURL,
    isFetching,
    currentNumberInput,
    radioState,
    enabled,
    generatedCode,
    toggleEnabled,
    radioOnChange,
    onTitleChange,
    onNumberInputChange,
    onTextBoxChange,
    fetchUUID,
    reset,
  } = useCreateLinkStore();

  /**
   * expand size drawer
   */
  const [isExpanded, setExpanded] = useState(false);
  const toggleExpanded = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.blur();
    setExpanded(!isExpanded);
  };

  const toast = useToast({
    description: `${createLinkRefURL} copied !`,
    title: 'Copied !',
    status: 'info',
    duration: 2000,
    position: 'bottom',
  });

  const copy = () => {
    navigator.clipboard.writeText(createLinkRefURL);
    toast();
  };

  const onDrawerClose = () => {
    reset();
    onClose();
  };

  return (
    <Drawer
      placement="right"
      isOpen={isOpen}
      onClose={onDrawerClose}
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
            <form>
              <Stack spacing="16px">
                <Button
                  size="xs"
                  onClick={toggleExpanded}
                  variant="outline"
                  borderTop="4px"
                  borderRight="4px"
                  borderColor="black"
                  w="32"
                >
                  {isExpanded ? 'Too big...' : 'More room please...'}
                </Button>
                <FormControl isDisabled={isFetching}>
                  <FormLabel>Link Title</FormLabel>
                  <Input
                    type="text"
                    border="1px"
                    borderColor="black"
                    placeholder="No Title"
                    onChange={onTitleChange}
                    ref={firstField}
                  />
                  <FormHelperText>
                    Optional. By default title would be named &ldquo;No
                    Title&ldquo;
                  </FormHelperText>
                </FormControl>
                <FormControl isDisabled={isFetching}>
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
                </FormControl>

                <FormControl isDisabled={isFetching}>
                  <RadioGroup
                    onChange={radioOnChange}
                    onClick={(e) => e.currentTarget.blur()}
                    value={radioState}
                  >
                    <Stack direction="column">
                      <Radio value="1" onClick={(e) => e.currentTarget.blur()}>
                        Permanent
                      </Radio>
                      <Radio value="2" onClick={(e) => e.currentTarget.blur()}>
                        Expires in:{' '}
                      </Radio>
                      <Flex alignItems="center">
                        <NumberInput
                          defaultValue={currentNumberInput}
                          onChange={onNumberInputChange}
                          isDisabled={radioState === '1' || isFetching}
                          _disabled={{ opacity: 0.2 }}
                          min={1}
                        >
                          <NumberInputField
                            border="1px"
                            borderTop="4px"
                            borderRight="4px"
                            borderColor="black"
                            _hover={{ opacity: 1 }}
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                        <Box w="4" />
                        <Text>Hour(s)</Text>
                      </Flex>
                    </Stack>
                  </RadioGroup>
                </FormControl>

                <FormControl
                  display="flex"
                  alignItems="center"
                  isDisabled={isFetching}
                >
                  <Switch
                    isChecked={enabled}
                    onChange={toggleEnabled}
                    isDisabled={isFetching}
                  />
                  <FormLabel mb="0" ml="2">
                    Enabled
                  </FormLabel>
                </FormControl>

                <Button
                  size="md"
                  variant="outline"
                  border="2px"
                  borderColor="black"
                  onClick={fetchUUID}
                  borderTop="8px"
                  borderRight="8px"
                  isDisabled={
                    !isRefURLValid || createLinkRefURL === '' || isFetching
                  }
                >
                  Generate !
                </Button>
                <Text>Your link are: </Text>
                {isFetching ? (
                  <Center>
                    <Spinner color="black" />
                  </Center>
                ) : generatedCode !== '' ? (
                  <Flex justifyContent="space-between">
                    <Text onClick={copy} textColor="blue">
                      sqzd.xyz/{generatedCode}
                    </Text>
                    <Spacer />
                    <IconButton
                      size="xs"
                      aria-label="copy"
                      icon={<FaClipboard />}
                      onClick={copy}
                    />
                  </Flex>
                ) : undefined}

                <Button
                  size="md"
                  variant="outline"
                  border="2px"
                  borderColor="black"
                  borderTop="8px"
                  borderRight="8px"
                  w="25%"
                  type="reset"
                  onClick={reset}
                >
                  Reset
                </Button>
              </Stack>
            </form>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
